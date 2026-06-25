/**
 * External Links & Sitemap Interlinking Module
 * 
 * Fetches URLs from partner sitemaps and injects relevant external links
 * into AI-generated blog content to boost SEO and cross-site indexing.
 * 
 * STRATEGY: Inject as many natural external links as possible for maximum
 * SEO benefit — both inline contextual links and a resources section.
 */

// Partner sitemaps to fetch and interlink with
const PARTNER_SITEMAPS = [
  'https://xylosai.vercel.app/sitemap.xml',
  'https://xeloria.vercel.app/sitemap.xml',
  'https://pulse-blog-ai.vercel.app/sitemap.xml',
];

// High-value SEO anchor text keywords for education/school niche
const SEO_ANCHOR_PHRASES: Record<string, string[]> = {
  'education': ['modern education', 'quality education', 'education trends', 'learning methods', 'educational resources'],
  'learning': ['effective learning', 'learning strategies', 'learning techniques', 'student learning', 'online learning'],
  'school': ['top school', 'school excellence', 'school activities', 'school management', 'school community'],
  'student': ['student success', 'student development', 'student growth', 'student life', 'student achievement'],
  'teacher': ['teacher training', 'teacher development', 'teaching methods', 'teacher resources', 'skilled teachers'],
  'cbse': ['CBSE curriculum', 'CBSE board', 'CBSE syllabus', 'CBSE exam preparation', 'CBSE standards'],
  'parent': ['parenting tips', 'parent involvement', 'parent guide', 'parenting strategies', 'parent-teacher collaboration'],
  'technology': ['educational technology', 'tech in schools', 'digital learning', 'smart classrooms', 'AI in education'],
  'skill': ['skill development', 'life skills', 'soft skills', 'critical skills', '21st century skills'],
  'career': ['career guidance', 'career planning', 'career counseling', 'future careers', 'career readiness'],
  'health': ['student health', 'mental health', 'physical fitness', 'healthy habits', 'wellness programs'],
  'science': ['science education', 'STEM learning', 'science projects', 'scientific thinking', 'science labs'],
  'math': ['mathematics skills', 'math learning', 'math fundamentals', 'mathematical thinking', 'math practice'],
  'reading': ['reading habits', 'reading skills', 'literacy development', 'love for reading', 'reading programs'],
  'sport': ['sports training', 'athletics program', 'physical education', 'sports achievements', 'sportsmanship'],
  'art': ['art education', 'creative arts', 'performing arts', 'art and culture', 'artistic expression'],
  'exam': ['exam preparation', 'exam tips', 'exam strategy', 'board exams', 'competitive exams'],
  'development': ['child development', 'holistic development', 'personality development', 'cognitive development', 'overall development'],
  'innovation': ['innovative teaching', 'innovation in education', 'creative innovation', 'innovative methods', 'innovative approach'],
  'community': ['school community', 'community building', 'community outreach', 'community engagement', 'community service'],
};

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
 * Now returns up to 20 links for maximum SEO interlinking
 */
export function findRelevantLinks(topic: string, sitemapUrls: SitemapUrl[], count: number = 20): SitemapUrl[] {
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
  const maxPerSite = Math.ceil(count / PARTNER_SITEMAPS.length) + 2;

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
 * Generate natural anchor text for a link based on its slug and topic context
 */
function generateAnchorText(link: SitemapUrl, topicKeywords: string[]): string {
  // Try to find a matching SEO phrase
  for (const kw of link.keywords) {
    if (SEO_ANCHOR_PHRASES[kw]) {
      const phrases = SEO_ANCHOR_PHRASES[kw];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }
  }
  
  // Check topic keywords for matching phrases
  for (const kw of topicKeywords) {
    if (SEO_ANCHOR_PHRASES[kw]) {
      const phrases = SEO_ANCHOR_PHRASES[kw];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }
  }

  // Fallback: generate a readable title from slug
  return link.slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .substring(0, 60);
}

/**
 * Build a "Related Resources" HTML section with the external links
 */
export function buildExternalLinksSection(links: SitemapUrl[], topic: string): string {
  if (links.length === 0) return '';

  const topicKeywords = extractKeywordsFromSlug(topic.toLowerCase());

  const linkItems = links.map(link => {
    const title = generateAnchorText(link, topicKeywords);
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
 * Contextual phrases for inline link insertion — varied and natural sounding
 */
const INLINE_PHRASES = [
  (anchor: string, url: string) => `You might also enjoy reading about <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  (anchor: string, url: string) => `For deeper insights, explore this helpful resource on <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  (anchor: string, url: string) => `Learn more about <a href="${url}" target="_blank" rel="noopener">${anchor}</a> to expand your understanding.`,
  (anchor: string, url: string) => `This connects closely with <a href="${url}" target="_blank" rel="noopener">${anchor}</a>, which is worth exploring.`,
  (anchor: string, url: string) => `A related topic worth checking out is <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  (anchor: string, url: string) => `Parents and students may find <a href="${url}" target="_blank" rel="noopener">${anchor}</a> particularly useful.`,
  (anchor: string, url: string) => `For practical tips, see this guide on <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  (anchor: string, url: string) => `Discover more about <a href="${url}" target="_blank" rel="noopener">${anchor}</a> through this curated resource.`,
  (anchor: string, url: string) => `If this interests you, also read about <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
  (anchor: string, url: string) => `A comprehensive guide on <a href="${url}" target="_blank" rel="noopener">${anchor}</a> can offer additional perspective.`,
  (anchor: string, url: string) => `This is closely related to <a href="${url}" target="_blank" rel="noopener">${anchor}</a> — a must-read for parents.`,
  (anchor: string, url: string) => `Educators recommend reading more about <a href="${url}" target="_blank" rel="noopener">${anchor}</a>.`,
];

/**
 * Inject external links into the blog content HTML.
 * Adds MANY links naturally throughout — both inline contextual and a "Resources" section.
 * Target: 8-10 inline links + 8-10 in resources section = 15-20 total links
 */
export function injectExternalLinks(content: string, links: SitemapUrl[], topic: string): string {
  if (links.length === 0) return content;

  const topicKeywords = extractKeywordsFromSlug(topic.toLowerCase().replace(/[^a-z0-9\s-]/g, ''));

  // Split links: half for inline, half for resources section
  const inlineCount = Math.min(Math.ceil(links.length * 0.5), 10);
  const inlineLinks = links.slice(0, inlineCount);
  const sectionLinks = links.slice(inlineCount);

  let updatedContent = content;

  // 1. Insert inline links throughout paragraphs
  const paragraphEnds = [...updatedContent.matchAll(/<\/p>/gi)];
  
  if (paragraphEnds.length >= 3) {
    // Distribute inline links evenly across the content
    let insertedCount = 0;
    let offset = 0; // track cumulative offset from insertions

    for (let i = 0; i < inlineLinks.length && insertedCount < inlineCount; i++) {
      const link = inlineLinks[i];
      const anchor = generateAnchorText(link, topicKeywords);
      
      // Pick a varied phrase template
      const phraseTemplate = INLINE_PHRASES[(i + insertedCount) % INLINE_PHRASES.length];
      const inlineHtml = ` ${phraseTemplate(anchor, link.loc)}`;

      // Calculate which paragraph to insert after (spread evenly, skip first and last)
      const targetParagraphIdx = Math.floor(((i + 1) / (inlineLinks.length + 1)) * paragraphEnds.length);
      const clampedIdx = Math.max(1, Math.min(targetParagraphIdx, paragraphEnds.length - 2));
      
      const match = paragraphEnds[clampedIdx];
      if (match && match.index !== undefined) {
        const insertPos = match.index + offset;
        updatedContent =
          updatedContent.slice(0, insertPos) +
          inlineHtml +
          updatedContent.slice(insertPos);
        offset += inlineHtml.length;
        insertedCount++;
      }
    }
    
    console.log(`🔗 Injected ${insertedCount} inline external links`);
  }

  // 2. Append "Recommended Reading" section at the end  
  if (sectionLinks.length > 0) {
    const resourcesSection = buildExternalLinksSection(sectionLinks, topic);
    updatedContent += resourcesSection;
    console.log(`📚 Added ${sectionLinks.length} links in resources section`);
  }

  return updatedContent;
}

/**
 * Main function: fetch sitemaps, find relevant links, and inject into blog content
 * Now targets 15-20 external links per blog for maximum SEO juice
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

    // Request up to 20 links for heavy interlinking
    const relevantLinks = findRelevantLinks(topic, sitemapUrls, 20);
    console.log(`🔗 Found ${relevantLinks.length} relevant external links for "${topic}"`);

    const enrichedContent = injectExternalLinks(content, relevantLinks, topic);
    return enrichedContent;
  } catch (err: any) {
    console.error('❌ Failed to enrich blog with external links:', err.message);
    return content; // Return original content if enrichment fails
  }
}
