import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { revalidateShopifyCatalog } from '@/lib/shopifyRevalidate';

const HANDLED_TOPICS = new Set([
  'products/create',
  'products/update',
  'products/delete',
  'collections/update',
  'collection_listings/add',
  'collection_listings/remove',
]);

function verifyShopifyWebhook(rawBody: string, hmacHeader: string | null, secret: string): boolean {
  if (!hmacHeader) return false;

  const digest = createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64');

  try {
    const expected = Buffer.from(digest, 'utf8');
    const received = Buffer.from(hmacHeader, 'utf8');
    if (expected.length !== received.length) return false;
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

function parseProductHandle(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined;
  const handle = (payload as { handle?: unknown }).handle;
  return typeof handle === 'string' && handle.length > 0 ? handle : undefined;
}

export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET?.trim();

  if (!secret) {
    console.error('SHOPIFY_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 503 }
    );
  }

  const rawBody = await request.text();
  const hmac = request.headers.get('x-shopify-hmac-sha256');
  const topic = request.headers.get('x-shopify-topic') ?? 'unknown';

  if (!verifyShopifyWebhook(rawBody, hmac, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  if (!HANDLED_TOPICS.has(topic)) {
    return NextResponse.json({ ok: true, skipped: true, topic });
  }

  let payload: unknown = null;
  if (rawBody.length > 0) {
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
  }

  const handle = parseProductHandle(payload);
  revalidateShopifyCatalog(handle);

  return NextResponse.json({
    ok: true,
    revalidated: true,
    topic,
    handle: handle ?? null,
  });
}
