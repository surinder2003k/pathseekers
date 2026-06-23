import { NextResponse } from "next/server";

// Simple IP-based in-memory rate limiter
const loginAttempts = new Map<string, number[]>();
const LIMIT = 5; // Max 5 attempts
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes window

export async function POST(req: Request) {
  try {
    // Extract client IP address
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
               req.headers.get("x-real-ip") || 
               "127.0.0.1";

    const now = Date.now();
    const attempts = loginAttempts.get(ip) || [];

    // Filter out attempts older than WINDOW_MS
    const activeAttempts = attempts.filter(timestamp => now - timestamp < WINDOW_MS);

    if (activeAttempts.length >= LIMIT) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again after 5 minutes." },
        { status: 429 }
      );
    }

    // Record new attempt (clean up old ones at the same time to prevent leak)
    activeAttempts.push(now);
    loginAttempts.set(ip, activeAttempts);

    // Limit overall size of the map to prevent memory growth
    if (loginAttempts.size > 2000) {
      for (const [key, val] of loginAttempts.entries()) {
        const filtered = val.filter(t => now - t < WINDOW_MS);
        if (filtered.length === 0) {
          loginAttempts.delete(key);
        } else {
          loginAttempts.set(key, filtered);
        }
      }
    }

    const { username, password } = await req.json();

    if (username === "sunny" && password === "3424") {
      const response = NextResponse.json({ success: true });
      
      // Set secure HTTP-only cookie
      response.cookies.set("admin_session", "true", {
        httpOnly: false, // Accessible from client to check cross-tab logout (we'll set a localstorage key instead to handle cross-tab)
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      
      return response;
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
