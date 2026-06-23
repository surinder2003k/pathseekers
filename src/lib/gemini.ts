export interface GeneratedBlog {
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: string;
  author?: string;
}

const FALLBACK_BLOGS: Record<string, GeneratedBlog[]> = {
  education: [
    {
      title: "Empowering Students: The Future of Personalized Learning",
      excerpt: "Explore how adaptive technology and structured mentoring are reshaping individual learning paths for modern students.",
      content: `
        <h2>The Shift to Personalized Education</h2>
        <p>In traditional classrooms, a one-size-fits-all approach was the standard. Today, we stand on the brink of an educational revolution led by personalized learning frameworks. By focusing on each student's unique strengths, interests, and learning pace, educators can nurture deeper understanding and long-term retention.</p>
        
        <h3>Why Personalization Matters</h3>
        <p>Every child is unique. Research shows that when learning is tailored, student engagement increases by over 40%. Adaptive software can suggest exercises matching the student's current proficiency, while teachers act as facilitators rather than simple lecturers.</p>
        
        <h3>Implementing Dynamic Classrooms</h3>
        <ul>
          <li><strong>Differentiated Instruction:</strong> Adjusting content delivery based on auditory, visual, or kinesthetic learning preferences.</li>
          <li><strong>Flexible Pacing:</strong> Letting students spend more time on complex concepts (like advanced mathematics) and fly through familiar ground.</li>
          <li><strong>Continuous Feedback Loops:</strong> Replacing high-stakes exams with continuous micro-assessments to measure daily progress.</li>
        </ul>
        <p>Pathseekers has been at the forefront of this shift, integrating individualized learning trajectories into our CBSE curriculum to help every child find their path and create their future.</p>
      `,
      metaTitle: "The Future of Personalized Learning | Pathseekers Education Blog",
      metaDescription: "Discover how personalized learning, adaptive technology, and structured mentoring improve student engagement and academic outcomes.",
      keywords: "Personalized learning, Pathseekers, modern pedagogy, student engagement, adaptive learning",
      category: "Education"
    },
    {
      title: "Building Critical Thinking Skills in Early Childhood Education",
      excerpt: "How questioning techniques and discovery-based learning in early years lay the groundwork for intellectual growth.",
      content: `
        <h2>Fostering Inquiry from Day One</h2>
        <p>Young children are natural scientists. They touch, taste, and ask 'why' constantly. Early childhood education should focus on capturing this curiosity and turning it into structured critical thinking and problem-solving skills.</p>
        
        <h3>The Power of Open-Ended Questions</h3>
        <p>Instead of giving direct answers, teachers at Pathseekers use questioning strategies. Asking 'What do you think will happen if we add water to this sand?' encourages hypotheses and discovery.</p>
        
        <h3>Practical Strategies for Parents</h3>
        <ul>
          <li><strong>Encourage Safe Risk-Taking:</strong> Allow children to build tall blocks and figure out why they fall.</li>
          <li><strong>Read Together Active:</strong> Ask what characters might do next in storybooks.</li>
          <li><strong>Reflective Journaling:</strong> Encourage children to draw what they observed during a nature walk.</li>
        </ul>
      `,
      metaTitle: "Critical Thinking in Early Childhood | Pathseekers",
      metaDescription: "Learn how to build critical thinking and problem-solving in early childhood through play and open-ended questioning techniques.",
      keywords: "early childhood, critical thinking, problem solving, active learning, Pathseekers Beas",
      category: "Education"
    }
  ],
  achievements: [
    {
      title: "Pathseekers Students Dominate Regional Science and Innovation Fair",
      excerpt: "Our young innovators secure top ranks with projects addressing sustainable water filtration and automated agricultural systems.",
      content: `
        <h2>Shining Stars of Innovation</h2>
        <p>We are thrilled to celebrate the success of our students at the Punjab Regional Science and Innovation Fair. Competing against 50 other schools, Pathseekers projects received the 'Best Innovation Award' and 'Outstanding Eco-Solution' prizes.</p>
        
        <h3>Award-Winning Projects</h3>
        <p>Our students presented practical solutions to local problems:</p>
        <ul>
          <li><strong>Eco-Filter:</strong> A low-cost, bio-sand water filter designed for rural communities.</li>
          <li><strong>Agro-Bot:</strong> An automated smart sprinkler system that senses soil moisture levels using Arduino sensors.</li>
        </ul>
        <p>These victories represent the strength of our STEM lab facilities and hands-on teaching pedagogy.</p>
      `,
      metaTitle: "Pathseekers Science Fair Winners | Achievements",
      metaDescription: "Pathseekers school students win top honors at the Regional Science & Innovation Fair with eco-filter and agro-bot projects.",
      keywords: "Science fair, Pathseekers achievements, STEM Punjab, student innovators",
      category: "Achievements"
    }
  ]
};

export async function generateBlogWithAI(topic: string, category: string = "Education"): Promise<GeneratedBlog> {
  const prompt = `You are a professional educational blog writer for "Pathseekers School", a top CBSE school in Beas, Punjab. Your task is to write a LONG, DETAILED, COMPLETE blog post.

Topic: "${topic}"
Category: "${category}"

STRICT REQUIREMENTS — DO NOT VIOLATE:
1. The "content" field MUST be at LEAST 2000 words of actual written text (not counting HTML tags).
2. Write in very simple, clear, and easy-to-understand words. Avoid complex educational jargon or difficult vocabulary so that any average parent or student can easily read and understand the entire article.
3. Write EXACTLY 10 sections. Each section MUST have an <h2> or <h3> heading.
4. Each section MUST have at LEAST 3 full paragraphs. Each paragraph MUST be 80-120 words long.
5. DO NOT stop early. DO NOT summarize. Write the FULL article from start to finish.
6. Include specific examples, real scenarios, CBSE curriculum references, and mention Pathseekers School naturally.
7. Use proper HTML: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>.

IMPORTANT: If your response is under 2000 words, it is WRONG and INCOMPLETE. Write MORE.

Return ONLY a valid JSON object (no markdown, no backticks, no extra text):
{
  "title": "Clear, professional, simple, SEO-friendly title (50-70 characters)",
  "excerpt": "2-sentence simple summary that hooks the reader (under 200 characters)",
  "content": "FULL HTML article body. MUST BE 2000+ WORDS in simple language. Write 10 detailed sections.",
  "metaTitle": "SEO meta title (under 60 characters)",
  "metaDescription": "SEO meta description (under 160 characters)",
  "keywords": "comma, separated, 8-10, relevant, keywords",
  "author": "Academic Excellence Team"
}`;

  const cleanJSON = (str: string) => {
    let clean = str.trim();
    
    // Strip <think>...</think> tags (reasoning tokens) if present
    clean = clean.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    
    if (clean.startsWith('```json')) clean = clean.replace(/^```json/, '');
    if (clean.startsWith('```')) clean = clean.replace(/^```/, '');
    if (clean.endsWith('```')) clean = clean.replace(/```$/, '');
    clean = clean.trim();
    
    // Find the first '{' and the last '}' to extract JSON block safely
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }
    
    return JSON.parse(clean);
  };

  // Gemini provider (may hit quota limits)
  const tryGemini = async () => {
    if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini key");
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-latest"];
    let lastError = null;
    for (const model of models) {
      try {
        console.log(`Trying Gemini model: ${model}...`);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { 
              responseMimeType: "application/json",
              maxOutputTokens: 8192,
              temperature: 0.7
            }
          }),
          signal: AbortSignal.timeout(90000),
          cache: "no-store"
        });
        if (!response.ok) {
          const errMsg = await response.text();
          throw new Error(`Failed with status ${response.status}: ${errMsg.substring(0, 200)}`);
        }
        const json = await response.json();
        return cleanJSON(json.candidates[0].content.parts[0].text);
      } catch (e: any) {
        console.log(`Gemini model ${model} failed:`, e.message?.substring(0, 150));
        lastError = e;
      }
    }
    throw lastError || new Error("Gemini failed");
  };

  // OpenAI-compatible provider (Nvidia NIM, OpenRouter, OpenAI, xAI, Groq)
  const tryOpenAIFormat = async (url: string, key: string, model: string, providerName: string) => {
    if (!key) throw new Error(`No key for ${providerName}`);
    const body: any = {
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8192,
      temperature: 0.7
    };

    // Enable JSON mode for non-Nvidia providers to ensure valid JSON output with escaped control characters
    if (!url.includes('integrate.api.nvidia.com')) {
      body.response_format = { type: "json_object" };
    }
    
    const headers: any = { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${key}` 
    };
    
    // OpenRouter needs extra headers
    if (url.includes('openrouter.ai')) {
      headers["HTTP-Referer"] = "https://pathseekers.school";
      headers["X-Title"] = "Pathseekers Blog Generator";
    }
    
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(90000),
      cache: "no-store"
    });
    
    if (!response.ok) {
      const errText = await response.text().catch(() => response.statusText);
      throw new Error(`${providerName} (${model}) failed [${response.status}]: ${errText.substring(0, 200)}`);
    }
    
    const json = await response.json();
    return cleanJSON(json.choices[0].message.content);
  };

  // Ordered by reliability — working providers first
  const providers = [
    // 1. Gemini (using active working key)
    { 
      name: 'Gemini', 
      fn: tryGemini 
    },
    // 2. Groq (using new active key)
    { 
      name: 'Groq Llama 3.3', 
      fn: () => tryOpenAIFormat(
        'https://api.groq.com/openai/v1/chat/completions', 
        process.env.GROQ_API_KEY || '', 
        'llama-3.3-70b-versatile',
        'Groq Llama 3.3'
      ) 
    },
    // 3. OpenRouter (using active working key trying multiple models)
    { 
      name: 'OpenRouter', 
      fn: async () => {
        const key = process.env.OPENROUTER_API_KEY;
        if (!key) throw new Error("No OpenRouter key");
        const models = ["google/gemini-2.5-flash", "google/gemini-2.0-flash-lite:free", "meta-llama/llama-3.3-70b-instruct"];
        let lastError = null;
        for (const model of models) {
          try {
            console.log(`Trying OpenRouter model: ${model}...`);
            const blog = await tryOpenAIFormat(
              'https://openrouter.ai/api/v1/chat/completions',
              key,
              model,
              'OpenRouter'
            );
            return blog;
          } catch (e: any) {
            console.log(`OpenRouter model ${model} failed:`, e.message?.substring(0, 150));
            lastError = e;
          }
        }
        throw lastError || new Error("OpenRouter failed");
      }
    },
    // 4. Nvidia NIM (DeepSeek V4 Flash)
    { 
      name: 'Nvidia DeepSeek V4 Flash', 
      fn: () => tryOpenAIFormat(
        'https://integrate.api.nvidia.com/v1/chat/completions', 
        process.env.NVIDIA_API_KEY || '', 
        'deepseek-ai/deepseek-v4-flash',
        'Nvidia DeepSeek V4 Flash'
      ) 
    },
    // 5. Nvidia NIM (Llama 3.3 70B)
    { 
      name: 'Nvidia Llama 3.3 70B', 
      fn: () => tryOpenAIFormat(
        'https://integrate.api.nvidia.com/v1/chat/completions', 
        process.env.NVIDIA_API_KEY || '', 
        'meta/llama-3.3-70b-instruct',
        'Nvidia Llama 3.3 70B'
      ) 
    },
  ];

  for (const provider of providers) {
    try {
      console.log(`Trying AI provider: ${provider.name}...`);
      const blog = await provider.fn();
      if (blog && blog.title && blog.content) {
        blog.category = category;
        if (!blog.author) blog.author = "Academic Editorial Team";
        console.log(`✅ Successfully generated using ${provider.name} — content length: ${blog.content.length} chars`);
        return blog as GeneratedBlog;
      }
    } catch (e: any) {
      console.log(`❌ Provider ${provider.name} failed:`, e.message?.substring(0, 200));
    }
  }

  console.log("⚠️ All AI providers failed. Using fallback content.");
  const cat = category.toLowerCase();
  const list = FALLBACK_BLOGS[cat] || FALLBACK_BLOGS.education;
  const matched = list.find(b => b.title.toLowerCase().includes(topic.toLowerCase()) || b.excerpt.toLowerCase().includes(topic.toLowerCase())) || list[Math.floor(Math.random() * list.length)];
  return { ...matched, author: "Academic Editorial Team", title: matched.title + ` (Inspired by: ${topic})`, category };
}

export async function generateTopicsForCategory(category: string): Promise<string[]> {
  const prompt = `You are an SEO expert and educational copywriter for "Pathseekers School", a top CBSE school in Beas, Punjab.
Generate a list of exactly 8 engaging, unique, high-SEO-value blog post topic ideas/titles under the category "${category}".
Write simple, clear, catchy titles that parents and students in India/Punjab would search for (e.g., including terms like CBSE, Beas, Punjab, parenting, education, school activities).
The titles must be in plain English and easy to understand.

Return ONLY a valid JSON array of strings containing the titles. Do NOT return markdown, do NOT return backticks, do NOT return any introductory or concluding text.
Example response format:
[
  "First topic idea here",
  "Second topic idea here"
]`;

  const cleanJSON = (str: string) => {
    let clean = str.trim();
    clean = clean.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    if (clean.startsWith('```json')) clean = clean.replace(/^```json/, '');
    if (clean.startsWith('```')) clean = clean.replace(/^```/, '');
    if (clean.endsWith('```')) clean = clean.replace(/```$/, '');
    clean = clean.trim();
    const firstBrace = clean.indexOf('[');
    const lastBrace = clean.lastIndexOf(']');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(clean);
  };

  const tryGemini = async () => {
    if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini key");
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError = null;
    for (const model of models) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { 
              responseMimeType: "application/json",
              maxOutputTokens: 2000,
              temperature: 0.7
            }
          }),
          signal: AbortSignal.timeout(30000),
          cache: "no-store"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        return cleanJSON(json.candidates[0].content.parts[0].text);
      } catch (e: any) {
        lastError = e;
      }
    }
    throw lastError || new Error("Gemini failed");
  };

  const tryOpenAIFormat = async (url: string, key: string, model: string, providerName: string) => {
    if (!key) throw new Error(`No key for ${providerName}`);
    const body: any = {
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7
    };
    if (!url.includes('integrate.api.nvidia.com')) {
      body.response_format = { type: "json_object" };
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    return cleanJSON(json.choices[0].message.content);
  };

  const providers = [
    { name: 'Gemini', fn: tryGemini },
    { 
      name: 'Groq Llama 3.3', 
      fn: () => tryOpenAIFormat('https://api.groq.com/openai/v1/chat/completions', process.env.GROQ_API_KEY || '', 'llama-3.3-70b-versatile', 'Groq') 
    },
    {
      name: 'OpenRouter',
      fn: async () => {
        const key = process.env.OPENROUTER_API_KEY;
        if (!key) throw new Error("No OpenRouter key");
        return tryOpenAIFormat('https://openrouter.ai/api/v1/chat/completions', key, 'google/gemini-2.0-flash-lite:free', 'OpenRouter');
      }
    }
  ];

  for (const provider of providers) {
    try {
      console.log(`Generating topics with ${provider.name}...`);
      const topics = await provider.fn();
      if (Array.isArray(topics) && topics.length > 0) {
        return topics.map(t => String(t).trim());
      }
    } catch (e: any) {
      console.log(`❌ Topic generation failed for ${provider.name}:`, e.message);
    }
  }

  // Final fallback topics if everything fails
  return [
    `How Pathseekers School Excels in ${category}`,
    `Tips for Excellence in ${category} at CBSE level`,
    `Fostering Growth and Development in ${category}`,
    `The Importance of ${category} in Modern Schooling`
  ];
}

