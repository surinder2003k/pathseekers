export interface ImageSearchResult {
  id: string;
  url: string;
  thumbnail: string;
  photographer: string;
  source: "Pexels" | "Pixabay" | "Unsplash" | "Curated";
}

const CURATED_IMAGES = [
  {
    id: "cur-1",
    url: "/school/8.jpg",
    thumbnail: "/school/chemistry1.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-2",
    url: "/school/robotics1.jpg",
    thumbnail: "/school/chemistry1.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-3",
    url: "/school/robotics1.jpg",
    thumbnail: "/school/robotics2.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-4",
    url: "/school/physics1.jpg",
    thumbnail: "/school/special_education.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-5",
    url: "/school/8.jpg",
    thumbnail: "/school/3.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-6",
    url: "/school/6.jpg",
    thumbnail: "/school/6.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-7",
    url: "/school/8.jpg",
    thumbnail: "/school/chemistry1.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  },
  {
    id: "cur-8",
    url: "/school/robotics1.jpg",
    thumbnail: "/school/chemistry1.jpg",
    photographer: "Unsplash Contributor",
    source: "Curated" as const
  }
];

export async function searchImages(query: string): Promise<ImageSearchResult[]> {
  const pexelsKey = process.env.PEXELS_API_KEY;
  const pixabayKey = process.env.PIXABAY_API_KEY;

  const results: ImageSearchResult[] = [];

  // Pexels API
  if (pexelsKey && query) {
    try {
      const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`, {
        headers: {
          Authorization: pexelsKey
        }
      });
      if (pexelsRes.ok) {
        const data = await pexelsRes.json();
        const pexelsItems: ImageSearchResult[] = (data.photos || []).map((photo: any) => ({
          id: `pex-${photo.id}`,
          url: photo.src.large2x || photo.src.large || photo.src.original,
          thumbnail: photo.src.medium || photo.src.small,
          photographer: photo.photographer,
          source: "Pexels"
        }));
        results.push(...pexelsItems);
      }
    } catch (e) {
      console.error("Error fetching from Pexels API:", e);
    }
  }

  if (pixabayKey && query && results.length < 10) {
    try {
      const pixabayRes = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(query)}&per_page=10&image_type=photo`);
      if (pixabayRes.ok) {
        const data = await pixabayRes.json();
        const pixabayItems: ImageSearchResult[] = (data.hits || []).map((hit: any) => ({
          id: `pix-${hit.id}`,
          url: hit.largeImageURL || hit.webformatURL,
          thumbnail: hit.previewURL || hit.webformatURL,
          photographer: hit.user,
          source: "Pixabay" as const
        }));
        results.push(...pixabayItems);
      }
    } catch (e) {
      console.error("Error fetching from Pixabay API:", e);
    }
  }

  // If no external APIs succeeded, return curated list filtered by query matches, or general list
  if (results.length === 0) {
    console.log("No active image API keys, returning local curated images.");
    const q = query.toLowerCase();
    const filtered = CURATED_IMAGES.filter(img => 
      img.url.toLowerCase().includes(q) || 
      q.includes("school") || 
      q.includes("education") || 
      q.includes("classroom") || 
      q.includes("student")
    );
    return filtered.length > 0 ? filtered : CURATED_IMAGES;
  }

  // Select unique images (no duplicates based on URL or thumbnail)
  const uniqueMap = new Map<string, ImageSearchResult>();
  results.forEach(item => {
    if (!uniqueMap.has(item.url)) {
      uniqueMap.set(item.url, item);
    }
  });

  return Array.from(uniqueMap.values());
}
