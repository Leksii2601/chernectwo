
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('--- SEEDING PRAYER REQUESTS ---')

  const notes = []
  for (let i = 1; i <= 20; i++) {
    const isHealth = i % 2 !== 0; // Odd = Health (Red), Even = Repose (Black)
    const type: 'health' | 'repose' = isHealth ? 'health' : 'repose';
    
    // Create random names
    const namesCount = Math.floor(Math.random() * 5) + 5; // 5 to 10 names
    const names = [];
    for(let j=1; j<=namesCount; j++) {
        names.push({ name: `Ім'я ${i}-${j}` });
    }

    notes.push({
      type,
      service: 'Сорокоуст',
      email: `user${i}@test.com`,
      amount: 50 * i,
      status: 'paid',
      names: names
    })
  }

  for (const note of notes) {
      try {
        await payload.create({
            collection: 'prayer-requests',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: note as any, 
        })
        console.log(`Created ${note.type} note with ${note.names.length} names.`)
      } catch (err) {
        console.error(`Error creating note:`, err)
      }
  }
  
  console.log('Seeding complete.')
  process.exit(0)
}

seed()
