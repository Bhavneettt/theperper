const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get active poll
router.get('/active', async (req, res) => {
  try {
    const poll = await prisma.poll.findFirst({
      where: {
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true }
            }
          }
        },
        _count: {
          select: { votes: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!poll) {
      return res.status(404).json({ message: 'No active poll found' });
    }

    // Calculate percentages
    const totalVotes = poll._count.votes;
    const pollWithPercentages = {
      ...poll,
      options: poll.options.map(option => ({
        ...option,
        votes: option._count.votes,
        percentage: totalVotes > 0 
          ? Math.round((option._count.votes / totalVotes) * 100) 
          : 0
      })),
      totalVotes
    };

    res.json(pollWithPercentages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Vote on poll
router.post('/:pollId/vote', async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionId } = req.body;
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    // Check if poll exists and is active
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true }
    });

    if (!poll || !poll.active) {
      return res.status(404).json({ message: 'Poll not found or inactive' });
    }

    if (poll.expiresAt && poll.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Poll has expired' });
    }

    // Check if option belongs to poll
    const option = poll.options.find(opt => opt.id === optionId);
    if (!option) {
      return res.status(400).json({ message: 'Invalid option' });
    }

    // Check if user already voted (by IP)
    const existingVote = await prisma.vote.findUnique({
      where: {
        pollId_userIp: {
          pollId,
          userIp
        }
      }
    });

    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted' });
    }

    // Create vote
    await prisma.vote.create({
      data: {
        pollId,
        optionId,
        userIp,
        userAgent
      }
    });

    // Return updated poll stats
    const updatedPoll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true }
            }
          }
        },
        _count: {
          select: { votes: true }
        }
      }
    });

    const totalVotes = updatedPoll._count.votes;
    const pollWithPercentages = {
      ...updatedPoll,
      options: updatedPoll.options.map(opt => ({
        ...opt,
        votes: opt._count.votes,
        percentage: totalVotes > 0 
          ? Math.round((opt._count.votes / totalVotes) * 100) 
          : 0
      })),
      totalVotes
    };

    res.json(pollWithPercentages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
