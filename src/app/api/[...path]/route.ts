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

    // Create the response with appropriate headers (excluding compression headers)
    const responseHeaders = new Headers();
    const skipHeaders = [
      "set-cookie",
      "content-encoding",
      "content-length",
      "transfer-encoding",
    ];
    response.headers.forEach((value, key) => {
      if (!skipHeaders.includes(key.toLowerCase())) {
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
