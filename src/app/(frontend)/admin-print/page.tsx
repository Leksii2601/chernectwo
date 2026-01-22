import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminPrintClient } from './AdminPrintClient'

// Force dynamic rendering to ensure stats are fresh and headers are available
export const dynamic = 'force-dynamic'

export default async function AdminPrintPage() {
    const payload = await getPayload({ config: configPromise })
    const headersList = await headers()
    
    // Auth check
    const { user } = await payload.auth({ headers: headersList })
    if (!user) {
        redirect('/admin/login')
    }

    // Initialize counts with 0 to be safe
    let counts = {
        total: 0,
        health: 0,
        repose: 0
    }

    try {
        /*
          We need to filter counts to show ONLY 'pending' or 'paid' requests that match the logic in the print API.
          The previous logic was just counting ALL docs, but now we have 'printed' status.
          
          Assuming valid print candidates are:
          - status = 'paid'
          - printedAt does not exist OR is null
        */
        
        const baseWhere = {
             and: [
                { status: { equals: 'paid' } },
                { status: { not_equals: 'printed' } }
             ]
        }

        const total = await payload.count({ 
            collection: 'prayer-requests',
            where: baseWhere
        })
        
        const health = await payload.count({ 
            collection: 'prayer-requests', 
            where: {
                and: [
                    ...baseWhere.and,
                    { type: { equals: 'health' } }
                ]
            } 
        })
        
        const repose = await payload.count({ 
            collection: 'prayer-requests', 
            where: {
                and: [
                    ...baseWhere.and,
                    { type: { equals: 'repose' } }
                ]
            } 
        })

        counts = {
            total: total.totalDocs,
            health: health.totalDocs,
            repose: repose.totalDocs
        }
    } catch (e) {
        console.error("Error fetching stats:", e);
        // We continue rendering even if stats fail, showing 0s
    }

    return (
        <div className="p-4 md:p-10 flex flex-col items-center justify-center min-h-screen bg-gray-50">
           <AdminPrintClient counts={counts} />
        </div>
    )
}
