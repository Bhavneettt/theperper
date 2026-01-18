const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    const where = {
      published: true,
      ...(category && { category: { slug: category } })
    };

    const [interviews, total] = await Promise.all([
      prisma.interview.findMany({
        where,
        include: {
          interviewer: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          category: true,
          tags: true
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.interview.count({ where })
    ]);

    res.json({
      interviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single interview
router.get('/:slug', async (req, res) => {
  try {
    const interview = await prisma.interview.findUnique({
      where: { slug: req.params.slug },
      include: {
        interviewer: {
          select: {
            id: true,
            name: true,
            bio: true,
            avatar: true
          }
        },
        category: true,
        tags: true
      }
    });

    if (!interview || !interview.published) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    await prisma.interview.update({
      where: { id: interview.id },
      data: { views: { increment: 1 } }
    });

    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
