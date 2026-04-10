export async function searchPexels(query: string) {
  try {
    const randomPage = Math.floor(Math.random() * 50) + 1;
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_PEXELS_API_KEY");
    }

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${randomPage}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
        next: { revalidate: 120 }, // ISR cache (1 min)
      }
    );

    if (!res.ok) {
      throw new Error(`Pexels API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Pexels fetch error:", error);
    throw error;
  }
}