/**
 * External Links & Sitemap Interlinking Module
 * 
 * Fetches URLs from partner sitemaps and injects relevant external links
 * into AI-generated blog content to boost SEO and cross-site indexing.
 */

// Partner sitemaps to fetch and interlink with
const PARTNER_SITEMAPS = [
  'https://xylosai.vercel.app/sitemap.xml',
  'https://xeloria.vercel.app/sitemap.xml',
  'https://pulse-blog-ai.vercel.app/sitemap.xml',
];

// Cache for sitemap URLs (avoid re-fetching every time)
let cachedSitemapUrls: { urls: SitemapUrl[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export interface SitemapUrl {
  loc: string;
  site: string; // domain like 'xylosai.vercel.app'
  slug: string; // extracted slug for keyword matching
  keywords: string[]; // keywords extracted from slug
}

/**
 * Extracts meaningful keywords from a URL slug
 */
function extractKeywordsFromSlug(slug: string): string[] {
  return slug
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(w => w.toLowerCase().trim())
    .filter(w => w.length > 3) // skip tiny words
    .filter(w => !['http', 'https', 'www', 'vercel', 'app', 'blog', 'the', 'and', 'for', 'with', 'from', 'this', 'that', 'what', 'how', 'why', 'are', 'was', 'were', 'been', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'about', 'into', 'your', 'their', 'more', 'some', 'than', 'them', 'these', 'those', 'then', 'when', 'where', 'which', 'each', 'every', 'does', 'didn', 'isn', 'won', 'don'].includes(w));
}

/**
 * Parse sitemap XML to extract <loc> URLs (only blog/content pages)
 */
function parseSitemapXml(xml: string, siteUrl: string): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const locRegex = /<loc>(.*?)<\/loc>/gi;
  let match;

  const domain = new URL(siteUrl).hostname;

  while ((match = locRegex.exec(xml)) !== null) {
    const loc = match[1].trim();
    
    // Only include blog/content pages, skip root, auth, privacy, terms, profile pages
    try {
      const parsedUrl = new URL(loc);
      const path = parsedUrl.pathname;
      
      // Skip non-content pages
      if (
        path === '/' || 
        path === '/blog' ||
        path === '/about' ||
        path === '/privacy' ||
        path === '/terms' ||
        path === '/contact' ||
        path === '/sign-in' ||
        path === '/sign-up' ||
        path.startsWith('/p/@') // profile pages
      ) {
        continue;
      }

      // Get the slug (last part of path)
      const slug = path.split('/').filter(Boolean).pop() || '';
      const keywords = extractKeywordsFromSlug(slug);

      if (keywords.length > 0) {
        urls.push({ loc, site: domain, slug, keywords });
      }
    } catch {
      // Skip invalid URLs
    }
  }

  return urls;
}

/**
 * Fetch all partner sitemap URLs with caching
 */
export async function fetchAllSitemapUrls(): Promise<SitemapUrl[]> {
  // Return cached if still valid
  if (cachedSitemapUrls && (Date.now() - cachedSitemapUrls.fetchedAt) < CACHE_TTL_MS) {
    console.log(`📋 Using cached sitemap URLs (${cachedSitemapUrls.urls.length} URLs)`);
    return cachedSitemapUrls.urls;
  }

  console.log('🔄 Fetching partner sitemaps...');
  const allUrls: SitemapUrl[] = [];

  for (const sitemapUrl of PARTNER_SITEMAPS) {
    try {
      const response = await fetch(sitemapUrl, {
        signal: AbortSignal.timeout(15000),
        cache: 'no-store',
      });
      
      if (!response.ok) {
        console.log(`⚠️ Failed to fetch ${sitemapUrl}: HTTP ${response.status}`);
        continue;
      }

      const xml = await response.text();
      const urls = parseSitemapXml(xml, sitemapUrl);
      allUrls.push(...urls);
      console.log(`✅ Fetched ${urls.length} URLs from ${new URL(sitemapUrl).hostname}`);
    } catch (err: any) {
      console.log(`⚠️ Error fetching ${sitemapUrl}: ${err.message}`);
    }
  }

  // Cache the result
  cachedSitemapUrls = { urls: allUrls, fetchedAt: Date.now() };
  console.log(`📋 Total partner URLs cached: ${allUrls.length}`);
  return allUrls;
}

/**
 * Find the most relevant external URLs for a given blog topic
 * Uses keyword matching between the topic and sitemap URL slugs
 */
export function findRelevantLinks(topic: string, sitemapUrls: SitemapUrl[], count: number = 6): SitemapUrl[] {
  const topicKeywords = extractKeywordsFromSlug(topic.toLowerCase().replace(/[^a-z0-9\s-]/g, ''));
  
  if (topicKeywords.length === 0) {
    // Fallback: return random links from each site
    return getRandomLinksPerSite(sitemapUrls, count);
  }

  // Score each URL based on keyword overlap
  const scored = sitemapUrls.map(url => {
    let score = 0;
    for (const topicKw of topicKeywords) {
      for (const urlKw of url.keywords) {
        if (urlKw === topicKw) {
          score += 3; // exact match
        } else if (urlKw.includes(topicKw) || topicKw.includes(urlKw)) {
          score += 1; // partial match
        }
      }
    }
    return { url, score };
  });

  // Sort by score (descending), then shuffle ties for variety
  scored.sort((a, b) => b.score - a.score || Math.random() - 0.5);

  // Take top matches, ensuring diversity across sites
  const selected: SitemapUrl[] = [];
  const perSiteCount: Record<string, number> = {};
  const maxPerSite = Math.ceil(count / PARTNER_SITEMAPS.length) + 1;

  for (const item of scored) {
    if (selected.length >= count) break;
    const site = item.url.site;
    perSiteCount[site] = (perSiteCount[site] || 0);
    if (perSiteCount[site] < maxPerSite) {
      selected.push(item.url);
      perSiteCount[site]++;
    }
  }

  // If not enough relevant matches, pad with random links
  if (selected.length < count) {
    const remaining = sitemapUrls.filter(u => !selected.includes(u));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    for (const url of shuffled) {
      if (selected.length >= count) break;
      const site = url.site;
      perSiteCount[site] = (perSiteCount[site] || 0);
      if (perSiteCount[site] < maxPerSite) {
        selected.push(url);
        perSiteCount[site]++;
      }
    }
  }

  return selected;
}

/**
 * Get random links spread across sites
 */
function getRandomLinksPerSite(urls: SitemapUrl[], count: number): SitemapUrl[] {
  const bySite: Record<string, SitemapUrl[]> = {};
  for (const url of urls) {
    if (!bySite[url.site]) bySite[url.site] = [];
    bySite[url.site].push(url);
  }

  const result: SitemapUrl[] = [];
  const sites = Object.keys(bySite);
  const perSite = Math.ceil(count / sites.length);

  for (const site of sites) {
    const shuffled = [...bySite[site]].sort(() => Math.random() - 0.5);
    result.push(...shuffled.slice(0, perSite));
  }

  return result.slice(0, count);
}

/**
 * Build a "Related Resources" HTML section with the external links
 */
export function buildExternalLinksSection(links: SitemapUrl[]): string {
  if (links.length === 0) return '';

  const linkItems = links.map(link => {
    // Generate a clean readable title from the slug
    const title = link.slug
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .replace(/\s+\w{1,5}$/i, '') // trim trailing hash-like suffixes
      .substring(0, 80);

    return `<li><a href="${link.loc}" target="_blank" rel="noopener">${title}</a></li>`;
  }).join('\n          ');

  return `
        <h3>Recommended Reading & Resources</h3>
        <p>Explore these related articles and resources to deepen your understanding of this topic:</p>
        <ul>
          ${linkItems}
        </ul>`;
}

/**
 * Inject external links into the blog content HTML.
 * Adds links naturally in the middle and a "Resources" section at the end.
 */
export function injectExternalLinks(content: string, links: SitemapUrl[]): string {
  if (links.length === 0) return content;

  // Split links: some for inline insertion, rest for the resources section
  const inlineLinks = links.slice(0, 2);
  const sectionLinks = links.slice(2);

  let updatedContent = content;

  // 1. Try to insert inline links within existing paragraphs
  for (const link of inlineLinks) {
    const title = link.slug
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .substring(0, 60);

    const inlineHtml = ` For more insights, you may also find this resource helpful: <a href="${link.loc}" target="_blank" rel="noopener">${title}</a>.`;

    // Find a good </p> insertion point (roughly in the middle of the content)
    const paragraphEnds = [...updatedContent.matchAll(/<\/p>/gi)];
    if (paragraphEnds.length >= 4) {
      // Insert after the paragraph roughly 40-60% through the content
      const insertIdx = Math.floor(paragraphEnds.length * (0.3 + Math.random() * 0.3));
      const insertPoint = paragraphEnds[insertIdx];
      if (insertPoint && insertPoint.index !== undefined) {
        updatedContent =
          updatedContent.slice(0, insertPoint.index) +
          inlineHtml +
          updatedContent.slice(insertPoint.index);
      }
    }
  }

  // 2. Append "Recommended Reading" section at the end  
  if (sectionLinks.length > 0) {
    const resourcesSection = buildExternalLinksSection(sectionLinks);
    updatedContent += resourcesSection;
  }

  return updatedContent;
}

/**
 * Main function: fetch sitemaps, find relevant links, and inject into blog content
 */
export async function enrichBlogWithExternalLinks(
  content: string, 
  topic: string
): Promise<string> {
  try {
    const sitemapUrls = await fetchAllSitemapUrls();
    
    if (sitemapUrls.length === 0) {
      console.log('⚠️ No sitemap URLs available for external linking');
      return content;
    }

    const relevantLinks = findRelevantLinks(topic, sitemapUrls, 6);
    console.log(`🔗 Found ${relevantLinks.length} relevant external links for "${topic}"`);

    const enrichedContent = injectExternalLinks(content, relevantLinks);
    return enrichedContent;
  } catch (err: any) {
    console.error('❌ Failed to enrich blog with external links:', err.message);
    return content; // Return original content if enrichment fails
  }
}
