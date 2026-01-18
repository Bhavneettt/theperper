const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Search across all content types
router.get('/', async (req, res) => {
  try {
    const query = req.query.q?.trim();
    const type = req.query.type; // 'article', 'interview', 'podcast', 'event', or 'all'
    const limit = parseInt(req.query.limit) || 10;

    if (!query || query.length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const searchTerm = `%${query}%`;

    const results = {
      articles: [],
      interviews: [],
      podcasts: [],
      events: []
    };

    if (!type || type === 'all' || type === 'article') {
      results.articles = await prisma.article.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          author: {
            select: {
              name: true,
              avatar: true
            }
          },
          category: true
        },
        take: limit,
        orderBy: { publishedAt: 'desc' }
      });
    }

    if (!type || type === 'all' || type === 'interview') {
      results.interviews = await prisma.interview.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { interviewee: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          interviewer: {
            select: {
              name: true,
              avatar: true
            }
          },
          category: true
        },
        take: limit,
        orderBy: { publishedAt: 'desc' }
      });
    }

    if (!type || type === 'all' || type === 'podcast') {
      results.podcasts = await prisma.podcast.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          host: {
            select: {
              name: true,
              avatar: true
            }
          },
          category: true
        },
        take: limit,
        orderBy: { publishedAt: 'desc' }
      });
    }

    if (!type || type === 'all' || type === 'event') {
      results.events = await prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { location: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          category: true
        },
        take: limit,
        orderBy: { startDate: 'asc' }
      });
    }

    const total = 
      results.articles.length +
      results.interviews.length +
      results.podcasts.length +
      results.events.length;

    res.json({
      query,
      total,
      results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
