

export async function storefront(query, variables = {}) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    })

    return response.json();
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

export async function getPosts() {
    const response = await fetch("https://postmodern-tectonics.ghost.io/ghost/api/content/posts?key=f1de9b4fe6cc50d8f26494934e&include=authors,tags", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Version': 'v5.0',
        },
    })

    return response.json();
}

export async function getPost(slug) {
    const slugId = slug;
    const response = await fetch(`https://postmodern-tectonics.ghost.io/ghost/api/content/posts/slug/${slugId}?key=f1de9b4fe6cc50d8f26494934e&include=authors,tags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Version': 'v5.0',
        },
    })

    return response.json();
}

export function createMarkup(description) {
    return { __html: description };
}