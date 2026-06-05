// src/app/api/cron/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getTrendingAnime } from '../../../lib/anilist';
export const dynamic = 'force-dynamic';

// Vercel Cron Jobs strictly use GET requests
export async function GET(request) {
  try {
    // 1. Security Check: Prevent random people on the internet from triggering your database
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Extract: Fetch the live data from our existing AniList pipeline
    const trendingData = await getTrendingAnime();

    if (!trendingData || trendingData.length === 0) {
      return NextResponse.json({ error: 'Failed to fetch AniList data' }, { status: 500 });
    }

    // 3. Transform: Map the AniList JSON into our Prisma database structure
    const snapshotsToInsert = trendingData.map((anime) => ({
            animeId: anime.id,
          title: anime.title.english || anime.title.romaji,
             coverImage: anime.coverImage?.large || null, // <-- Capturing the media URL safely
             format: anime.format || 'UNKNOWN',
                 popularity: anime.popularity,
             score: anime.averageScore || 0,
          }));

    // 4. Load: Bulk insert all 10 records into the Neon database at once
    await prisma.animeSnapshot.createMany({
      data: snapshotsToInsert,
    });

    return NextResponse.json({ success: true, message: 'Daily snapshots recorded successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Cron Job Failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}