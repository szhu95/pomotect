import { NextResponse } from 'next/server';

export async function GET() {
    const calendarContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Postmodern Tectonics//Musical Furniture Event//EN',
        'BEGIN:VEVENT',
        'UID:musical-furniture-2025@postmodern-tectonics.com',
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        'DTSTART;TZID=America/Los_Angeles:20250621T170000',
        'DTEND;TZID=America/Los_Angeles:20250621T210000',
        'SUMMARY:Postmodern Tectonics & Casa Ysasi: Musical Furniture - [Case Study-01]',
        'LOCATION:5104 W Adams Blvd, Los Angeles, CA 90016',
        'DESCRIPTION:Join us at Casa Ysasi for a listening session — an afternoon and evening of wide-ranging vinyl-only programming — to celebrate the release of Musical Furniture [Case Study-01]',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Convert to UTF-8 with proper encoding
    const icsContent = Buffer.from(calendarContent, 'utf8');

    // Return the calendar file with proper headers
    return new NextResponse(icsContent, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': 'attachment; filename="musical-furniture-event.ics"',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
} 