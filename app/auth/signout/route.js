import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const {data: {session}} = await supabase.auth.getSession();

    if (session){
        await supabase.auth.signOut()
    }

    return NextResponse.redirect(new URL('/', req.url), {status: 302})
}