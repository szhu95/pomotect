export async function storefront(query, variables = {}, retries = 3) {
    const timeout = 15000; // 15 seconds timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN,
                },
                body: JSON.stringify({ query, variables }),
                signal: controller.signal,
                // Add keepalive to maintain connection
                keepalive: true,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.errors) {
                throw new Error(data.errors.map(err => err.message).join(', '));
            }

            return data;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            
            // If it's the last retry, throw the error
            if (i === retries - 1) {
                throw new Error(`Failed to fetch after ${retries} attempts: ${error.message}`);
            }

            // Clear the timeout before waiting
            clearTimeout(timeoutId);
            
            // Exponential backoff with jitter
            const backoffMs = Math.min(1000 * Math.pow(2, i) + Math.random() * 1000, 10000);
            console.log(`Retrying in ${backoffMs}ms...`);
            await new Promise(res => setTimeout(res, backoffMs));
        }
    }
}

export function formatPrice(number) {
    return Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(number);
}

export function formatDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.toLocaleString('default', { month: 'long' });
    var yyyy = today.getFullYear();
    let lastUpdatedDate = mm + ' ' + dd + ', ' + yyyy;
    return lastUpdatedDate
}

export function formatUpdatedDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = date.toLocaleString('default', { month: 'long' });
    var yyyy = date.getFullYear();
    let lastUpdatedDate = mm + ' ' + dd + ', ' + yyyy;
    return lastUpdatedDate
}

const GHOST_API_BASE =
    process.env.GHOST_API_URL || 'https://postmodern-tectonics.ghost.io';

function getGhostContentApiKey() {
    return (
        process.env.GHOST_CONTENT_API_KEY ||
        process.env.GHOST_API_KEY ||
        ''
    );
}

function buildGhostContentUrl(path, searchParams = '') {
    const key = getGhostContentApiKey();
    if (!key) return null;
    const qs = searchParams ? `&${searchParams}` : '';
    return `${GHOST_API_BASE}/ghost/api/content${path}?key=${encodeURIComponent(key)}${qs}`;
}

const EMPTY_POSTS = { posts: [] };

/** Thrown on HTTP 429 so callers do not cache empty results as a successful response. */
export class GhostRateLimitError extends Error {
    constructor() {
        super('Ghost Content API rate limited (429)');
        this.name = 'GhostRateLimitError';
    }
}

/** After a 429, skip Ghost requests so dev hot-reload does not hammer the API. */
let ghostCooldownUntil = 0;
/** Dedupe concurrent identical fetches in the same process. */
let ghostInflight = null;

export async function getPosts(limit = 50, isClient = false) {
    if (Date.now() < ghostCooldownUntil) {
        throw new GhostRateLimitError();
    }

    const inflightKey = `posts-${limit}-${isClient}`;
    if (ghostInflight?.key === inflightKey) {
        return ghostInflight.promise;
    }

    const promise = fetchGhostPosts(limit, isClient).finally(() => {
        if (ghostInflight?.key === inflightKey) {
            ghostInflight = null;
        }
    });

    ghostInflight = { key: inflightKey, promise };
    return promise;
}

async function fetchGhostPosts(limit = 50, isClient = false) {
    const url = buildGhostContentUrl(
        '/posts',
        `include=authors,tags&limit=${limit}`
    );

    if (!url) {
        console.warn(
            'getPosts: missing GHOST_CONTENT_API_KEY or GHOST_API_KEY — returning empty list'
        );
        return EMPTY_POSTS;
    }

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Version': 'v5.0',
        },
    };

    if (!isClient) {
        fetchOptions.next = { revalidate: 3600 };
    }

    try {
        const response = await fetch(url, fetchOptions);

        if (response.status === 429) {
            ghostCooldownUntil = Date.now() + 5 * 60_000;
            console.warn(
                'Ghost API rate limited (429). Pausing Ghost requests for 5 minutes (not an API breaking change).'
            );
            throw new GhostRateLimitError();
        }

        if (!response.ok) {
            console.warn(`getPosts: Ghost API responded with status ${response.status}`);
            return EMPTY_POSTS;
        }

        const data = await response.json();

        if (!data?.posts) {
            console.warn('getPosts: invalid Ghost API response shape');
            return EMPTY_POSTS;
        }

        return data;
    } catch (error) {
        console.warn('getPosts fetch failed:', error.message);
        return EMPTY_POSTS;
    }
}

export async function getPost(slug) {
    const url = buildGhostContentUrl(
        `/posts/slug/${encodeURIComponent(slug)}`,
        'include=authors,tags'
    );

    if (!url) {
        console.warn('getPost: missing Ghost API key');
        return null;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version': 'v5.0',
            },
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            console.warn(`getPost: Ghost API responded with status ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.warn('getPost fetch failed:', error.message);
        return null;
    }
}

export function createMarkup(description) {
    return { __html: description };
}