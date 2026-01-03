import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://portfolio-2-8gtz.onrender.com';

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathString = path.join('/');
  const searchParams = req.nextUrl.search;
  const url = `${API_BASE_URL}/api/${pathString}${searchParams}`;

  try {
    // Prepare body for mutation requests
    let body = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      try {
        body = await req.text();
      } catch (e) {
        // Body might be empty
      }
    }

    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Spoof the Origin to match production frontend so backend accepts it
        'Origin': 'https://protfolio-venu.vercel.app',
      },
      body,
    });

    // Handle non-JSON responses or errors
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
      try {
        data = JSON.parse(data);
      } catch (e) {
        // keep as text if not json
      }
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow local frontend to receive response
      },
    });
  } catch (error: any) {
    console.error('Proxy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Proxy failed' }, 
      { status: 500 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
