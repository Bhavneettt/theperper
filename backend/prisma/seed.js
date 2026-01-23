const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create all 8 industry beats
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technology-innovation' },
      update: { beat: 'TECHNOLOGY_INNOVATION' },
      create: {
        name: 'Technology & Innovation',
        slug: 'technology-innovation',
        description: 'Where ideas meet impact. Explores how emerging technologies are reshaping industries, work, and human behavior.',
        color: '#137fec',
        beat: 'TECHNOLOGY_INNOVATION'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'business-leadership' },
      update: { beat: 'BUSINESS_LEADERSHIP' },
      create: {
        name: 'Business & Leadership',
        slug: 'business-leadership',
        description: 'Beyond boardrooms and balance sheets. Reflections on leadership in a volatile world.',
        color: '#8b5cf6',
        beat: 'BUSINESS_LEADERSHIP'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'sustainability-purpose' },
      update: { beat: 'SUSTAINABILITY_PURPOSE' },
      create: {
        name: 'Sustainability & Purpose',
        slug: 'sustainability-purpose',
        description: 'The business of doing good — and doing it right. ESG perspectives and purpose-led innovation.',
        color: '#10b981',
        beat: 'SUSTAINABILITY_PURPOSE'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'work-culture' },
      update: { beat: 'WORK_CULTURE' },
      create: {
        name: 'Work & Culture',
        slug: 'work-culture',
        description: 'Inside the evolving workplace. Changing employee expectations, hybrid work, and leadership empathy.',
        color: '#f59e0b',
        beat: 'WORK_CULTURE'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'consumer-lifestyle' },
      update: { beat: 'CONSUMER_LIFESTYLE' },
      create: {
        name: 'Consumer & Lifestyle Trends',
        slug: 'consumer-lifestyle',
        description: 'From insight to instinct. How brands, consumers, and creators shape trends across retail, food, beauty, and entertainment.',
        color: '#ec4899',
        beat: 'CONSUMER_LIFESTYLE'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'policy-public-discourse' },
      update: { beat: 'POLICY_PUBLIC_DISCOURSE' },
      create: {
        name: 'Policy & Public Discourse',
        slug: 'policy-public-discourse',
        description: 'Where industry meets society. How government policies and regulation influence innovation and business.',
        color: '#6366f1',
        beat: 'POLICY_PUBLIC_DISCOURSE'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'education-future-skills' },
      update: { beat: 'EDUCATION_FUTURE_SKILLS' },
      create: {
        name: 'Education & Future Skills',
        slug: 'education-future-skills',
        description: 'Learning redefined. Evolving education systems, skill gaps, and academia-industry collaboration.',
        color: '#06b6d4',
        beat: 'EDUCATION_FUTURE_SKILLS'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'health-wellbeing' },
      update: { beat: 'HEALTH_WELLBEING' },
      create: {
        name: 'Health & Wellbeing',
        slug: 'health-wellbeing',
        description: 'A human-first lens on healthcare. Insights on healthcare ecosystem, mental health, and wellness innovation.',
        color: '#ef4444',
        beat: 'HEALTH_WELLBEING'
      }
    })
  ])

  console.log('Created categories:', categories.length)

  // Create sample users/contributors with enhanced profiles
  const user1 = await prisma.user.upsert({
    where: { email: 'contributor@theperspective.com' },
    update: {
      title: 'Chief Technology Officer',
      company: 'TechVision Inc.',
      industry: 'Technology',
      credentials: '20+ years in tech innovation'
    },
    create: {
      email: 'contributor@theperspective.com',
      name: 'David Chen',
      role: 'CONTRIBUTOR',
      bio: 'CTO and thought leader in technology innovation',
      title: 'Chief Technology Officer',
      company: 'TechVision Inc.',
      industry: 'Technology',
      credentials: '20+ years in tech innovation'
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'sarah.jenkins@theperspective.com' },
    update: {},
    create: {
      email: 'sarah.jenkins@theperspective.com',
      name: 'Sarah Jenkins',
      role: 'CONTRIBUTOR',
      bio: 'VP of People Operations, expert in workplace culture and employee experience',
      title: 'VP of People Operations',
      company: 'Global Dynamics',
      industry: 'HR & Culture',
      credentials: '15+ years transforming workplace culture'
    }
  })

  const user = user1

  console.log('Created user:', user.email)

  // Create sample articles with content types
  const article1 = await prisma.article.create({
    data: {
      title: 'The Silent Crisis of Middle Management Burnout',
      slug: 'silent-crisis-middle-management-burnout',
      excerpt: 'As organizations flatten, middle managers are absorbing more pressure than ever. Here\'s why the glue of your company might be coming undone, and how to fix it before they leave.',
      content: 'Full article content here...',
      featured: true,
      published: true,
      publishedAt: new Date(),
      readTime: 8,
      contentType: 'FEATURED_PERSPECTIVE',
      editorNote: 'This piece cuts through the noise to reveal a systemic issue affecting organizations globally. David brings decades of leadership experience to this critical conversation.',
      authorId: user.id,
      categoryId: categories[3].id // Work & Culture
    }
  })

  const article2 = await prisma.article.create({
    data: {
      title: 'Remote Work: The Productivity Paradox',
      slug: 'remote-work-productivity-paradox',
      excerpt: 'After three years of remote-first operations, the data tells a surprising story about what actually drives productivity.',
      content: 'Full article content here...',
      featured: true,
      published: true,
      publishedAt: new Date(Date.now() - 86400000), // Yesterday
      readTime: 6,
      contentType: 'INSIDER_VIEW',
      authorId: user2.id,
      categoryId: categories[3].id // Work & Culture
    }
  })

  const article = article1

  console.log('Created article:', article.title)

  // Create sample poll
  const poll = await prisma.poll.create({
    data: {
      question: 'Is AI currently increasing or decreasing your team\'s productivity?',
      active: true,
      options: {
        create: [
          { text: 'Increasing significantly' },
          { text: 'No noticeable change' },
          { text: 'Decreasing (Learning curve)' }
        ]
      }
    }
  })

  console.log('Created poll:', poll.question)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
