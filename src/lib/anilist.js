// src/lib/anilist.js
const ANILIST_API_URL = 'https://graphql.anilist.co';

export async function getTrendingAnime() {
  // GraphQL allows us to ask for the exact fields we defined in our Prisma schema
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title {
            english
            romaji
          } coverImage {
               large
          }
          format
          popularity
          averageScore
        }
      }
    }
  `;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query })
  };

  try {
    // Here is your Next.js ISR (Incremental Static Regeneration) in action!
    // This tells Vercel's edge network to cache this fetch for exactly 60 seconds.
    const response = await fetch(ANILIST_API_URL, {
      ...options,
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error(`AniList API responded with status: ${response.status}`);
    }

    const json = await response.json();
    return json.data.Page.media;
    
  } catch (error) {
    console.error("Error fetching from AniList:", error);
    return []; // Return an empty array as a fallback so the UI doesn't crash
  }
}