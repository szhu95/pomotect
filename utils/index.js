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

export async function getPosts(limit = 50, isClient = false) {
    try {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version': 'v5.0',
            },
        };

        // Only add Next.js caching options for server-side requests
        if (!isClient) {
            fetchOptions.next = { revalidate: 300 }; // Revalidate every 5 minutes
        }

        const response = await fetch(`https://postmodern-tectonics.ghost.io/ghost/api/content/posts?key=f1de9b4fe6cc50d8f26494934e&include=authors,tags&limit=${limit}`, fetchOptions);
        
        if (!response.ok) {
            console.error(`Ghost API responded with status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.posts) {
            console.error('Invalid response from Ghost API:', data);
            throw new Error('Invalid response format from Ghost API');
        }
        
        return data;
    } catch (error) {
        console.error('getPosts fetch failed:', error);
        return null;
    }
}

export async function getPost(slug) {
    const slugId = slug;
    try {
        const response = await fetch(`https://postmodern-tectonics.ghost.io/ghost/api/content/posts/slug/${slugId}?key=f1de9b4fe6cc50d8f26494934e&include=authors,tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Version': 'v5.0',
            },
            // Add caching for better performance
            next: { revalidate: 300 }, // Revalidate every 5 minutes
        });
        return await response.json();
    } catch (error) {
        console.error('getPost fetch failed:', error);
        return null;
    }
}

export function createMarkup(description) {
    return { __html: description };
}