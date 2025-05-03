import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Parse the request body as JSON

        // Process the data (e.g., save to database, call external API)
        console.log('Adding email:', data);

        return NextResponse.json({ message: 'Added to the mailing list!' }, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Failed to add to mailing list' }, { status: 500 });
    }
}