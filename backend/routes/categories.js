const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        _count: {
          select: {
            articles: true,
            interviews: true,
            podcasts: true,
            events: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
