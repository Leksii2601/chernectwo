import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { amount, currency, orderReference, orderDate } = await req.json();

        const MERCHANT_ACCOUNT = 'www_chernectvo_com'; // From your screenshot
        const MERCHANT_SECRET_KEY = process.env.WAYFORPAY_SECRET_KEY || '8d36e4ef8ddadba9ae38669743ac384b233df3d9';
        const MERCHANT_DOMAIN = 'www.chernectvo.com';

        const productName = 'Пожертва';
        const productPrice = amount;
        const productCount = 1;

        // Signature string construction: 
        // merchantAccount;merchantDomainName;orderReference;orderDate;amount;currency;productName[0];productCount[0];productPrice[0]
        const signatureString = [
            MERCHANT_ACCOUNT,
            MERCHANT_DOMAIN,
            orderReference,
            orderDate,
            amount,
            currency,
            productName,
            productCount,
            productPrice
        ].join(';');

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
            amount,
            currency,
            productName,
            productPrice,
            productCount
        });
    } catch (error) {
        console.error('Signature generation error:', error);
        return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
    }
}
