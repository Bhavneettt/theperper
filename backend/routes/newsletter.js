const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');
const prisma = new PrismaClient();

// Subscribe to newsletter
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existing) {
      if (existing.active) {
        return res.status(400).json({ message: 'Email already subscribed' });
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email },
          data: { active: true }
        });
        return res.json({ message: 'Successfully resubscribed' });
      }
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: { email }
    });

    // TODO: Send welcome email
    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unsubscribe
router.post('/unsubscribe', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    await prisma.newsletter.update({
      where: { email },
      data: { active: false }
    });

    res.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
