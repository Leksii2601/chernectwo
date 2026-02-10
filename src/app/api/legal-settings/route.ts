import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const payload = await getPayload({ config });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await payload.findGlobal({ slug: 'legal-settings' as any });

        // Fetch dynamic documents
        const docs = await payload.find({
            collection: 'legal-documents' as any,
            limit: 100,
        });

        // Format the date for display
        const lastUpdatedDate = data.lastUpdatedDate
            ? new Date(data.lastUpdatedDate).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            : '';

        const lastUpdatedDateEN = data.lastUpdatedDate
            ? new Date(data.lastUpdatedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            : '';

        // Map documents by slug for easier lookup
        const documents: any = {};
        docs.docs.forEach((doc: any) => {
            documents[doc.slug] = {
                titleUA: doc.titleUA,
                titleEN: doc.titleEN,
                subtitleUA: doc.subtitleUA,
                subtitleEN: doc.subtitleEN,
                sectionsUA: doc.sectionsUA,
                sectionsEN: doc.sectionsEN,
                updatedAt: doc.updatedAt,
            };
        });

        return NextResponse.json({
            organization: {
                legalEntityName: data.companyData?.legalEntityName || '',
                edrpouCode: data.companyData?.edrpouCode || '',
                legalAddress: data.companyData?.legalAddress || '',
            },
            contacts: {
                contactEmail: data.contactDetails?.contactEmail || '',
            },
            providers: {
                paymentProvider: data.technicalProviders?.paymentProvider || '',
                hostingProvider: data.technicalProviders?.hostingProvider || '',
                analyticsServices: data.technicalProviders?.analyticsServices || '',
            },
            refund: {
                maxRefundDays: data.refundParameters?.maxRefundDays || 14,
                refundProcessingDays: data.refundParameters?.refundProcessingDays || 10,
            },
            // Dynamic documents from collection
            documents,
            // Keep keys for backward compatibility or simple lookup
            ...documents,
            lastUpdatedDate,
            lastUpdatedDateEN,
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch legal settings' },
            { status: 500 }
        );
    }
}
