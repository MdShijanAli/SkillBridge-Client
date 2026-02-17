import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_API;

export async function GET(request: Request) {
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}

export async function PUT(request: Request) {
  return handleRequest(request);
}

export async function DELETE(request: Request) {
  return handleRequest(request);
}

export async function PATCH(request: Request) {
  return handleRequest(request);
}

async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    // Extract the path after /api/auth
    const path = url.pathname.replace("/api/auth", "");
    const targetUrl = `${BACKEND_URL}/api/auth${path}${url.search}`;

    console.log("Proxying request to:", targetUrl);

    // Get cookies from the request
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }

    // Copy other headers from the original request
    const originalHeaders = request.headers;
    originalHeaders.forEach((value, key) => {
      if (
        !["host", "connection", "content-length"].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    });

    // Prepare request options
    const options: RequestInit = {
      method: request.method,
      headers,
      credentials: "include",
      cache: "no-store",
    };

    // Add body for POST, PUT, PATCH requests
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    // Make the request to the backend
    const response = await fetch(targetUrl, options);

    // Get response data
    const data = await response.text();

    // Create response headers (excluding compression headers but keeping set-cookie)
    const responseHeaders = new Headers();
    const skipHeaders = [
      "content-encoding",
      "content-length",
      "transfer-encoding",
    ];

    response.headers.forEach((value, key) => {
      if (!skipHeaders.includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Forward Set-Cookie headers from backend to client
    const backendCookies = response.headers.getSetCookie();
    if (backendCookies.length > 0) {
      console.log("Setting cookies from backend:", backendCookies);
      backendCookies.forEach((cookie) => {
        responseHeaders.append("Set-Cookie", cookie);
      });
    }

    return new Response(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
