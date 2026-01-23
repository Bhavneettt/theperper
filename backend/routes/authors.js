const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        title: true,
        company: true,
        industry: true,
        credentials: true,
        role: true,
        createdAt: true
      }
    });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get author's contributions
router.get('/:id/articles', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: {
          authorId: req.params.id,
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
          category: true,
          tags: true
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.article.count({
        where: {
          authorId: req.params.id,
          published: true
        }
      })
    ]);

    res.json({
      articles,
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

// Get all authors/contributors
router.get('/', async (req, res) => {
  try {
    const authors = await prisma.user.findMany({
      where: {
        role: {
          in: ['CONTRIBUTOR', 'EDITOR', 'ADMIN']
        }
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        title: true,
        company: true,
        industry: true,
        bio: true,
        credentials: true
      },
      orderBy: { name: 'asc' }
    });

    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
