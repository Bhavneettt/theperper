const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all events
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const eventType = req.query.type;
    const upcoming = req.query.upcoming === 'true';

    const where = {
      ...(category && { category: { slug: category } }),
      ...(eventType && { eventType: eventType.toUpperCase().replace(/-/g, '_') }),
      ...(upcoming && { startDate: { gte: new Date() } })
    };

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          category: true,
          tags: true
        },
        orderBy: { startDate: 'asc' },
        skip,
        take: limit
      }),
      prisma.event.count({ where })
    ]);

    res.json({
      events,
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

// Get single event
router.get('/:slug', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        tags: true
      }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
