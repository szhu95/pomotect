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
    return Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0}).format(number);
}

export function formatDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.toLocaleString('default', { month: 'long' });
    var yyyy = today.getFullYear();
    let lastUpdatedDate = mm + ' ' + dd + ', ' + yyyy;
    return lastUpdatedDate
}