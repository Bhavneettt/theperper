const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all articles with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const beat = req.query.beat; // New: filter by beat slug
    const featured = req.query.featured === 'true';
    const contentType = req.query.contentType; // Filter by content type

    const where = {
      published: true,
      ...(category && { category: { slug: category } }),
      ...(beat && { category: { slug: beat } }), // Beat filtering via category slug
      ...(featured && { featured: true }),
      ...(contentType && { contentType: contentType })
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              title: true,
              company: true,
              industry: true,
              credentials: true
            }
          },
          category: true,
          tags: true
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.article.count({ where })
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

// Get single article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            bio: true,
            avatar: true,
            title: true,
            company: true,
            industry: true,
            credentials: true
          }
        },
        category: true,
        tags: true,
        DebateTopic: {
          include: {
            articles: {
              where: {
                published: true
              },
              take: 3,
              select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                    title: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!article || !article.published) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment views
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } }
    });

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured articles
router.get('/featured/latest', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        featured: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
            company: true,
            industry: true,
            credentials: true,
            bio: true
          }
        },
        category: true
      },
      orderBy: { publishedAt: 'desc' },
      take: 6
    });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
