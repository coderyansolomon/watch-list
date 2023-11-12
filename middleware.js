import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server'

export async function middleware(req){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res})

    const {data: {user}} = await supabase.auth.getUser();

    if (user && req.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/watch-list', req.url))
    }

    if (!user && req.nextUrl.pathname !== '/'){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res;
}

export const config = {
    matcher: ['/', '/watch-list']
}