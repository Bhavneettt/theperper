const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology & Innovation',
        slug: 'technology',
        description: 'Where ideas meet impact',
        color: '#137fec'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'leadership' },
      update: {},
      create: {
        name: 'Business & Leadership',
        slug: 'leadership',
        description: 'Beyond boardrooms and balance sheets',
        color: '#137fec'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'sustainability' },
      update: {},
      create: {
        name: 'Sustainability & Purpose',
        slug: 'sustainability',
        description: 'The business of doing good',
        color: '#137fec'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'culture' },
      update: {},
      create: {
        name: 'Work & Culture',
        slug: 'culture',
        description: 'Inside the evolving workplace',
        color: '#137fec'
      }
    })
  ])

  console.log('Created categories:', categories.length)

  // Create a sample user/contributor
  const user = await prisma.user.upsert({
    where: { email: 'contributor@theperspective.com' },
    update: {},
    create: {
      email: 'contributor@theperspective.com',
      name: 'David Chen',
      role: 'CONTRIBUTOR',
      bio: 'CTO and thought leader in technology innovation'
    }
  })

  console.log('Created user:', user.email)

  // Create sample articles
  const article = await prisma.article.create({
    data: {
      title: 'The Silent Crisis of Middle Management Burnout',
      slug: 'silent-crisis-middle-management-burnout',
      excerpt: 'As organizations flatten, middle managers are absorbing more pressure than ever. Here\'s why the glue of your company might be coming undone, and how to fix it before they leave.',
      content: 'Full article content here...',
      featured: true,
      published: true,
      publishedAt: new Date(),
      readTime: 8,
      authorId: user.id,
      categoryId: categories[3].id
    }
  })

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
