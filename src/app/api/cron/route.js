// src/app/api/cron/route.js
import { NextResponse } from 'next/server';
import { getPrisma } from '../../../lib/prisma'; // Import the lazy getter
import { getTrendingAnime } from '../../../lib/anilist';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // 1. Security Check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Safely initialize Prisma ONLY when the API route actually runs
    const prisma = getPrisma();

    // 3. Extract
    const trendingData = await getTrendingAnime();

    if (!trendingData || trendingData.length === 0) {
      return NextResponse.json({ error: 'Failed to fetch AniList data' }, { status: 500 });
    }

    // 4. Transform
    const snapshotsToInsert = trendingData.map((anime) => ({
      animeId: anime.id,
      title: anime.title?.english || anime.title?.romaji || 'Unknown Title',
      coverImage: anime.coverImage?.large || null,
      format: anime.format || 'UNKNOWN',
      popularity: anime.popularity || 0,
      score: anime.averageScore || 0,
    }));

    // 5. Load
    await prisma.animeSnapshot.createMany({
      data: snapshotsToInsert,
    });

    return NextResponse.json({ success: true, message: 'Daily snapshots recorded successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Cron Job Failed:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}