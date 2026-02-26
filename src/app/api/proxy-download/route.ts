import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300; // 5 minutes for large downloads
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const filename = searchParams.get('filename');

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    console.log('[Proxy] Streaming file:', filename);
    console.log('[Proxy] URL length:', url.length);

    // Get range header if present (for resumable downloads)
    const range = request.headers.get('range');
    
    if (range) {
      console.log('[Proxy] Range request:', range);
    }
    
    const fetchHeaders: HeadersInit = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.youtube.com/',
      'Accept': '*/*',
      'Accept-Encoding': 'identity',
      'Connection': 'keep-alive',
    };

    // Add range header if present
    if (range) {
      fetchHeaders['Range'] = range;
    }

    // Fetch the file from the direct URL
    const response = await fetch(url, {
      headers: fetchHeaders,
      // Don't wait for entire response, start streaming immediately
    });

    if (!response.ok && response.status !== 206) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    // Get the content type and length
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');
    const acceptRanges = response.headers.get('accept-ranges');

    console.log('[Proxy] Response status:', response.status);
    console.log('[Proxy] Content-Type:', contentType);
    console.log('[Proxy] Content-Length:', contentLength);
    console.log('[Proxy] Accept-Ranges:', acceptRanges);

    // Create headers for the response
    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename || 'download'}"`,
      'Cache-Control': 'no-cache',
      'Accept-Ranges': acceptRanges || 'bytes',
    });

    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    if (contentRange) {
      headers.set('Content-Range', contentRange);
    }

    // Return appropriate status code
    const status = response.status === 206 ? 206 : 200;

    // Stream the response directly
    return new NextResponse(response.body, {
      status,
      headers,
    });

  } catch (error: unknown) {
    console.error("[Proxy] Error:", error);
    return NextResponse.json(
      { error: "Failed to stream file" },
      { status: 500 }
    );
  }
}
