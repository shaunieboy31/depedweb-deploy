import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@1234', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'ICT-Shaun' },
    update: {},
    create: {
      username: 'ICT-Shaun',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Seed successful! Admin account created:')
  console.log(admin)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
