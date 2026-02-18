import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_API;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, await params);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, await params);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, await params);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, await params);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, await params);
}

async function handleRequest(request: Request, params: { path: string[] }) {
  try {
    // Skip if this is an auth route (handled by separate proxy)
    if (params.path[0] === "auth") {
      return new Response("Auth routes handled separately", { status: 404 });
    }

    const url = new URL(request.url);
    const path = params.path.join("/");
    const targetUrl = `${BACKEND_URL}/api/${path}${url.search}`;

    console.log("Proxying API request to:", targetUrl);

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

    // Copy other headers from the original request (excluding ones we already set)
    const originalHeaders = request.headers;
    const skipRequestHeaders = [
      "host",
      "connection",
      "content-length",
      "content-type", // Already set above
      "cookie", // Already set above
    ];

    originalHeaders.forEach((value, key) => {
      if (!skipRequestHeaders.includes(key.toLowerCase())) {
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
        console.log("Request body being sent:", body);
      }
    }

    console.log("Request headers being sent:", headers);

    // Make the request to the backend
    const response = await fetch(targetUrl, options);

    console.log("Backend response status:", response.status);

    // Get response data
    const data = await response.text();

    console.log("Backend response data:", data);

    // Create the response with appropriate headers (excluding compression headers)
    const responseHeaders = new Headers();
    const skipResponseHeaders = [
      "set-cookie",
      "content-encoding",
      "content-length",
      "transfer-encoding",
    ];
    response.headers.forEach((value, key) => {
      if (!skipResponseHeaders.includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    return new Response(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("API Proxy error:", error);
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
