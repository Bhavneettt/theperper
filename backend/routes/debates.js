const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get active debate topics with paired articles
router.get('/active', async (req, res) => {
  try {
    const debates = await prisma.debateTopic.findMany({
      where: {
        active: true
      },
      include: {
        articles: {
          where: {
            published: true
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
                title: true,
                company: true,
                industry: true
              }
            },
            category: true
          },
          orderBy: {
            publishedAt: 'desc'
          },
          take: 2 // Get two opposing views
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 1 // Get the most recent active debate
    });

    if (debates.length === 0 || debates[0].articles.length < 2) {
      return res.json(null); // No active debate available
    }

    const debate = debates[0];
    res.json({
      id: debate.id,
      title: debate.title,
      slug: debate.slug,
      description: debate.description,
      articles: debate.articles
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all debate topics
router.get('/', async (req, res) => {
  try {
    const debates = await prisma.debateTopic.findMany({
      where: {
        active: true
      },
      include: {
        articles: {
          where: {
            published: true
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
                title: true,
                company: true
              }
            }
          },
          take: 2
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    res.json(debates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
