import { getFrontendApi } from "@/lib/ory/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    // Extract session cookie
    const sessionCookie = req.cookies.get("ory_kratos_session");
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Fetch user session
    const kratos = await getFrontendApi();
    const { data: session } = await kratos.toSession({
      cookie: `ory_kratos_session=${sessionCookie.value}`,
    });

    console.log("Authenticated User:", session?.identity);
    return NextResponse.next(); // Allow request to proceed
  } catch (error) {
    console.error("Session validation failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/home/:path*"], // Protect these routes
};
