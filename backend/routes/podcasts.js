const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all podcasts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const featured = req.query.featured === 'true';

    const where = {
      published: true,
      ...(category && { category: { slug: category } }),
      ...(featured && { featured: true })
    };

    const [podcasts, total] = await Promise.all([
      prisma.podcast.findMany({
        where,
        include: {
          host: {
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
      prisma.podcast.count({ where })
    ]);

    res.json({
      podcasts,
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

// Get single podcast
router.get('/:slug', async (req, res) => {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: { slug: req.params.slug },
      include: {
        host: {
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

    if (!podcast || !podcast.published) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    await prisma.podcast.update({
      where: { id: podcast.id },
      data: { views: { increment: 1 } }
    });

    res.json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
