import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //const allUsers = await prisma.ticket.findMany()
    //console.log(allUsers)
    
    await prisma.ticket.create({
        data: {
          name: 'EThWarsaw',
          price: 49.99,
          quantity: 500,
            worldCoin: false,
            soulBound: false
        },
      })
    
      const allUsers = await prisma.ticket.findMany({
      })
      console.log(allUsers)
  
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