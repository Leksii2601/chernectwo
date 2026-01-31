import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ua', 'en'];
const defaultLocale = 'ua';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip paths that should not be localized
    // We can also double check here although matcher handles most
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') || // PayloadCMS
        pathname.startsWith('/media') || // Static assets
        pathname.includes('.') // Files
    ) {
        return;
    }

    // Check if path has locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect to default locale if missing
    // Ideally we would inspect 'Accept-Language' header here but for now hardcode default
    const locale = defaultLocale;

    // Preserve query parameters
    const searchParams = request.nextUrl.search;

    const newUrl = new URL(`/${locale}${pathname}${searchParams}`, request.url);

    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - admin (PayloadCMS)
         * - favicon.ico (favicon file)
         * - media (static media folder if applicable)
         */
        '/((?!api|_next/static|_next/image|admin|media|favicon.ico).*)',
    ],
};
