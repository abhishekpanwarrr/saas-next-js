import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isRoute = createRouteMatcher(["/", "/site"])
const isPublicRoute = createRouteMatcher(['/agency/sign-in(.*)', '/agency/sign-up(.*)', "/site", "/api/uploadthing"])
import { NextResponse } from 'next/server'

export default clerkMiddleware((auth, request) => {
    const url = request.nextUrl
    const searchParams = url.searchParams.toString()
    let hostname = request.headers
    //if subdomain exists
    const customSubDomain = hostname
        .get('host')
        ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
        .filter(Boolean)[0];
    if (isRoute(request)) {
        const url = request.nextUrl
        const searchParams = url.searchParams.toString()
        let hostname = request.headers

        const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

        //if subdomain exists
        // const customSubDomain = hostname
        //     .get('host')
        //     ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
        //     .filter(Boolean)[0]

        // if (customSubDomain) {
        //     return NextResponse.rewrite(
        //         new URL(`/${customSubDomain}${pathWithSearchParams}`, request.nextUrl)
        //     )
        // }

        // if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        //     return NextResponse.redirect(new URL(`/agency/sign-in`, request.nextUrl))
        // }

        if (
            url.pathname === '/' ||
            (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
        ) {
            return NextResponse.rewrite(new URL('/site', request.nextUrl))
        }

        if (
            url.pathname.startsWith('/agency') ||
            url.pathname.startsWith('/subaccount')
        ) {
            return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, request.nextUrl))
        }

    }
    if (!isPublicRoute(request)) {
        auth().protect()
    }
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
