import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const {
            amount,
            currency,
            orderReference,
            orderDate,
            regularMode,
            regularAmount,
            regularCount,
            regularOn,
            regularPeriod
        } = await req.json();

        const MERCHANT_ACCOUNT = process.env.WAYFORPAY_MERCHANT_ACCOUNT || 'www_chernectvo_com';
        const MERCHANT_SECRET_KEY = process.env.WAYFORPAY_SECRET_KEY || '8d36e4ef8ddadba9ae38669743ac384b233df3d9';
        const MERCHANT_DOMAIN = process.env.WAYFORPAY_MERCHANT_DOMAIN || 'www.chernectvo.com';

        const productName = 'Donation';
        const formattedAmount = Number(amount).toFixed(2);
        const productPrice = formattedAmount;
        const productCount = 1;

        // Base fields for signature
        const fields = [
            MERCHANT_ACCOUNT,
            MERCHANT_DOMAIN,
            orderReference,
            orderDate.toString(),
            formattedAmount,
            currency,
            productName,
            productCount.toString(),
            productPrice
        ];

        // Add regular payment fields if it's a subscription
        if (regularOn === 'Y') {
            const formattedRegularAmount = Number(regularAmount).toFixed(2);
            fields.push(regularMode, formattedRegularAmount, regularCount.toString(), regularOn, regularPeriod);
        }

        const signatureString = fields.join(';');

        const merchantSignature = crypto
            .createHmac('md5', MERCHANT_SECRET_KEY)
            .update(signatureString)
            .digest('hex');

        return NextResponse.json({
            merchantAccount: MERCHANT_ACCOUNT,
            merchantDomainName: MERCHANT_DOMAIN,
            merchantSignature,
            orderReference,
            orderDate,
            amount: formattedAmount,
            currency,
            productName,
            productPrice,
            productCount,
            // Return regular fields if subscription
            ...(regularOn === 'Y' ? {
                regularMode,
                regularAmount: Number(regularAmount).toFixed(2),
                regularCount,
                regularOn,
                regularPeriod
            } : {})
        });
    } catch (error) {
        console.error('Signature generation error:', error);
        return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
    }
}
