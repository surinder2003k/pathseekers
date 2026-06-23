import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (e) {
    console.warn("Failed to initialize Supabase client", e);
  }
}

// Initial Mock Data (used as fallback when Supabase is offline, tables don't exist, or credentials missing)
const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "Pathseekers Secures 100% Pass Rate in CBSE Class X & XII Exams",
    slug: "pathseekers-cbse-results-2026",
    excerpt: "We are proud to announce that Pathseekers students have achieved outstanding results in the CBSE Board Examinations, continuing our legacy of academic excellence.",
    content: `
      <h2>Academic Excellence Unleashed</h2>
      <p>Pathseekers, Beas, has once again achieved a stellar 100% success rate in the CBSE Class X and Class XII Board Examinations. Our students have shown remarkable performance with multiple subject centums and high overall aggregates, reflecting their dedication and the tireless efforts of our faculty.</p>
      
      <h3>Key Highlights</h3>
      <ul>
        <li><strong>Class XII Topper:</strong> Arshpreet Kaur (98.4% - Science)</li>
        <li><strong>Class X Topper:</strong> Gurpreet Singh (97.8%)</li>
        <li><strong>Over 85% Students</strong> scored Distinction (above 75%).</li>
        <li><strong>100% Pass Rate</strong> across all streams: Science, Commerce, and Humanities.</li>
      </ul>

      <p>Speaking on the achievement, the Principal congratulated the students, stating, "Our students' achievements are a testament to our holistic curriculum that merges academic rigor with personal growth. We thank our parents and staff for their unwavering support in making this victory possible."</p>
      
      <p>Pathseekers remains committed to nurture intellectual capability and critical thinking, preparing students to get admission into top universities across India and the globe.</p>
    `,
    featuredImage: "/school/8.jpg",
    status: "PUBLISHED",
    author: "Principal's Office",
    category: "Achievements",
    views: 1240,
    metaTitle: "Pathseekers CBSE Results 2026 - 100% Pass Rate Achieved",
    metaDescription: "Pathseekers school in Beas, Punjab achieves 100% pass rate in CBSE Class X & XII exams. Check topper details and outstanding statistics.",
    keywords: "Pathseekers CBSE Results, Pathseekers Beas, Best CBSE School Punjab, School Board Results",
    scheduledAt: null,
    publishedAt: new Date("2026-05-20T08:00:00Z").toISOString(),
    createdAt: new Date("2026-05-20T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-05-20T08:00:00Z").toISOString(),
  },
  {
    id: "blog-2",
    title: "Nurturing Young Minds: The Foundational Literacy & Numeracy (FLN) Initiative",
    slug: "foundational-literacy-numeracy-fln-pathseekers",
    excerpt: "Exploring how Pathseekers implements the national FLN framework to secure early-grade learning outcomes through play-based and active methodologies.",
    content: `
      <h2>Building Strong Foundations for Life</h2>
      <p>At Pathseekers, we believe that the early years of education form the bedrock of all future learning. In alignment with the National Education Policy (NEP) 2020, our Foundational Literacy and Numeracy (FLN) initiative focuses on ensuring that every child in Classes I to III achieves proficiency in reading, writing, and basic mathematics.</p>

      <h3>Interactive Pedagogical Approaches</h3>
      <p>Our teachers use diverse, creative, and play-way methods to make concepts intuitive:</p>
      <ul>
        <li><strong>Interactive Math Labs:</strong> Using concrete objects like blocks, beads, and abacuses to teach addition, subtraction, and patterns.</li>
        <li><strong>Phonics & Storytelling:</strong> Daily reading sessions using graded reading cards to build strong vocabulary and comprehension skills.</li>
        <li><strong>Digital Classrooms:</strong> Interactive whiteboards displaying visual narratives and engaging games.</li>
      </ul>
    `,
    featuredImage: "/school/3.jpg",
    status: "PUBLISHED",
    author: "Primary Wing Head",
    category: "Education",
    views: 852,
    metaTitle: "FLN (Foundational Literacy & Numeracy) Initiative | Pathseekers School",
    metaDescription: "Learn how Pathseekers Beas implements the FLN framework for Classes I-III. Play-based learning, interactive math labs, and phonics.",
    keywords: "FLN, Foundational Literacy, Numeracy, NEP 2020, Pathseekers Primary School, Early Education",
    scheduledAt: null,
    publishedAt: new Date("2026-06-10T08:00:00Z").toISOString(),
    createdAt: new Date("2026-06-10T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-06-10T08:00:00Z").toISOString(),
  },
  {
    id: "blog-3",
    title: "Why 'DEAR' (Drop Everything And Read) is a Student Favorite at Pathseekers",
    slug: "dear-drop-everything-and-read-pathseekers",
    excerpt: "Twice a week, the entire school pauses for 20 minutes to read. Discover how the DEAR initiative is cultivating a lifelong love for books.",
    content: `
      <h2>The Silent Revolution: Drop Everything And Read</h2>
      <p>Every Tuesday and Friday morning, a unique silence falls over the Pathseekers campus. At the ring of a special bell, students, teachers, administrative staff, and even visitors pause whatever they are doing, open a book of their choice, and immerse themselves in reading. This is our **DEAR (Drop Everything And Read)** initiative.</p>
    `,
    featuredImage: "/school/6.jpg",
    status: "PUBLISHED",
    author: "School Librarian",
    category: "School Events",
    views: 940,
    metaTitle: "DEAR (Drop Everything And Read) Program | Pathseekers Beas",
    metaDescription: "Discover how Pathseekers cultivates reading habits via the Drop Everything And Read (DEAR) initiative. Supporting literacy and focus.",
    keywords: "DEAR program, Drop Everything and Read, Pathseekers Library, School reading initiatives",
    scheduledAt: null,
    publishedAt: new Date("2026-06-15T08:00:00Z").toISOString(),
    createdAt: new Date("2026-06-15T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-06-15T08:00:00Z").toISOString(),
  }
];

const INITIAL_STUDENTS = [
  { id: "std-1", name: "Amrinder Singh", class: "XII-Medical", rollNo: "1201", parentName: "Balwinder Singh", parentPhone: "9876543210", parentEmail: "balwinder@gmail.com", photo: null, academicRecord: JSON.stringify({ English: 92, Physics: 88, Chemistry: 85, Biology: 91 }), attendance: 96.5 },
  { id: "std-2", name: "Karanveer Kaur", class: "XII-Non-Medical", rollNo: "1202", parentName: "Harbhajan Singh", parentPhone: "9876543211", parentEmail: "harbhajan@gmail.com", photo: null, academicRecord: JSON.stringify({ English: 95, Physics: 94, Chemistry: 92, Mathematics: 98 }), attendance: 98.2 },
  { id: "std-3", name: "Navreet Sandhu", class: "X-A", rollNo: "1001", parentName: "Jaswinder Singh", parentPhone: "9876543212", parentEmail: "jaswinder@gmail.com", photo: null, academicRecord: JSON.stringify({ English: 90, Science: 89, Math: 91, Social: 93 }), attendance: 95.0 },
  { id: "std-4", name: "Prabhjot Singh", class: "X-B", rollNo: "1025", parentName: "Gurdev Singh", parentPhone: "9876543213", parentEmail: "gurdev@gmail.com", photo: null, academicRecord: JSON.stringify({ English: 88, Science: 86, Math: 82, Social: 88 }), attendance: 92.4 },
  { id: "std-5", name: "Gurbaksh Singh", class: "XII-Commerce", rollNo: "1251", parentName: "Satnam Singh", parentPhone: "9876543214", parentEmail: "satnam@gmail.com", photo: null, academicRecord: JSON.stringify({ English: 85, Accountancy: 91, BusinessStudies: 89, Economics: 90 }), attendance: 94.8 }
];

const INITIAL_ADMINS = [
  { id: "adm-1", email: "xxx.patron@pathseekers.edu.in", name: "Gurvinder Singh Dhillon", role: "SUPER_ADMIN", status: "ACTIVE", clerkId: "user_patron", lastSeen: new Date().toISOString() },
  { id: "adm-2", email: "xxx.principal@pathseekers.edu.in", name: "Dr. Suneeta Jasrai", role: "ADMIN", status: "ACTIVE", clerkId: "user_principal", lastSeen: new Date().toISOString() },
  { id: "adm-3", email: "admin@pathseekers.edu.in", name: "Directing Design", role: "ADMIN", status: "ACTIVE", clerkId: "user_design", lastSeen: new Date().toISOString() },
  { id: "adm-4", email: "xxx.admin@pathseekers.edu.in", name: "System Admin", role: "SUPER_ADMIN", status: "ACTIVE", clerkId: "user_admin", lastSeen: new Date().toISOString() },
  { id: "adm-5", email: "xyzg135@gmail.com", name: "Sunny", role: "SUPER_ADMIN", status: "ACTIVE", clerkId: "user_xyz", lastSeen: new Date().toISOString() }
];

const INITIAL_SETTINGS = {
  id: "singleton",
  autoPublish: true,
  highFrequency: false,
  regionalSync: true,
  category: "Education",
  scheduleTime: "08:00",
  lastExecutedAt: new Date("2026-06-21T08:00:00Z").toISOString(),
  updatedAt: new Date().toISOString(),
  customCategories: ""
};

const INITIAL_LOGS = [
  { id: "log-1", timestamp: new Date("2026-06-21T08:00:00Z").toISOString(), level: "INFO", message: "Auto-publish process triggered at 08:00 AM IST." },
  { id: "log-2", timestamp: new Date("2026-06-21T08:00:02Z").toISOString(), level: "INFO", message: "AI Engine generated 2 articles under Category 'Education'." },
  { id: "log-3", timestamp: new Date("2026-06-21T08:00:05Z").toISOString(), level: "INFO", message: "Pexels API synced images for stories successfully." },
  { id: "log-4", timestamp: new Date("2026-06-21T08:00:08Z").toISOString(), level: "INFO", message: "Published articles: 'Unlocking Academic Potential' and 'The Art of Early Play'." }
];

// Global Memory Cache for local mock databases
interface MockStore {
  blogs: any[];
  students: any[];
  admins: any[];
  settings: any;
  logs: any[];
}
const globalForMock = global as unknown as { mockDbStore?: MockStore };
if (!globalForMock.mockDbStore) {
  globalForMock.mockDbStore = {
    blogs: [...INITIAL_BLOGS],
    students: [...INITIAL_STUDENTS],
    admins: [...INITIAL_ADMINS],
    settings: { ...INITIAL_SETTINGS },
    logs: [...INITIAL_LOGS]
  };
}
const mock = globalForMock.mockDbStore;

// Custom unified Database Wrapper supporting live Supabase and local mock storage
export const db = {
  blogPost: {
    findMany: async (args?: any) => {
      if (supabase) {
        try {
          let query = supabase.from("BlogPost").select("*");
          if (args?.where?.status) query = query.eq("status", args.where.status);
          if (args?.where?.slug) query = query.eq("slug", args.where.slug);
          if (args?.where?.category) query = query.eq("category", args.where.category);
          
          if (args?.orderBy) {
            const field = Object.keys(args.orderBy)[0];
            const ascending = args.orderBy[field] === "asc";
            query = query.order(field, { ascending });
          }
          
          const { data, error } = await query;
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase error in blogPost.findMany, using mock fallback", e);
        }
      }
      
      // Fallback
      let list = [...mock.blogs];
      if (args?.where?.status) list = list.filter(b => b.status === args.where.status);
      if (args?.where?.slug) list = list.filter(b => b.slug === args.where.slug);
      if (args?.where?.category) list = list.filter(b => b.category === args.where.category);
      if (args?.orderBy) {
        const field = Object.keys(args.orderBy)[0];
        const dir = args.orderBy[field];
        list.sort((a, b) => {
          if (a[field] < b[field]) return dir === "desc" ? 1 : -1;
          if (a[field] > b[field]) return dir === "desc" ? -1 : 1;
          return 0;
        });
      }
      return list;
    },
    findUnique: async (args: any) => {
      if (supabase) {
        try {
          let query = supabase.from("BlogPost").select("*");
          if (args.where?.id) query = query.eq("id", args.where.id);
          if (args.where?.slug) query = query.eq("slug", args.where.slug);
          const { data, error } = await query.single();
          if (!error && data) return data;
        } catch (e) {
          console.warn("Supabase error in blogPost.findUnique", e);
        }
      }
      if (args.where?.id) return mock.blogs.find(b => b.id === args.where.id) || null;
      if (args.where?.slug) return mock.blogs.find(b => b.slug === args.where.slug) || null;
      return null;
    },
    create: async (args: any) => {
      const data = args.data;
      const newBlog = {
        id: data.id || `blog-${Date.now()}`,
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: data.excerpt || "",
        content: data.content || "",
        featuredImage: data.featuredImage || "/school/6.jpg",
        status: data.status || "DRAFT",
        author: data.author || "AI Assistant",
        category: data.category || "Education",
        views: 0,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt || "",
        keywords: data.keywords || "",
        scheduledAt: data.scheduledAt || null,
        publishedAt: data.status === "PUBLISHED" ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("BlogPost").insert([newBlog]).select().single();
          if (!error && dbData) return dbData;
          console.error("Supabase insert error", error);
        } catch (e) {
          console.warn("Supabase insert crash, using mock fallback", e);
        }
      }
      
      mock.blogs.unshift(newBlog);
      return newBlog;
    },
    update: async (args: any) => {
      const id = args.where.id;
      const updateData = {
        ...args.data,
        updatedAt: new Date().toISOString()
      };
      
      // Clean undefined keys to support partial updates
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("BlogPost").update(updateData).eq("id", id).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase update crash, using mock fallback", e);
        }
      }
      
      const index = mock.blogs.findIndex(b => b.id === id);
      if (index !== -1) {
        const updated = { ...mock.blogs[index], ...updateData };
        mock.blogs[index] = updated;
        return updated;
      }
      throw new Error(`BlogPost not found with id ${id}`);
    },
    delete: async (args: any) => {
      const id = args.where.id;
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("BlogPost").delete().eq("id", id).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase delete crash, using mock fallback", e);
        }
      }
      
      const index = mock.blogs.findIndex(b => b.id === id);
      if (index !== -1) {
        const deleted = mock.blogs[index];
        mock.blogs.splice(index, 1);
        return deleted;
      }
      throw new Error(`BlogPost not found with id ${id}`);
    },
    count: async () => {
      if (supabase) {
        try {
          const { count, error } = await supabase.from("BlogPost").select("*", { count: "exact", head: true });
          if (!error && count !== null) return count;
        } catch (e) {
          console.warn("Supabase count error", e);
        }
      }
      return mock.blogs.length;
    }
  },
  student: {
    findMany: async (args?: any) => {
      if (supabase) {
        try {
          let query = supabase.from("Student").select("*");
          if (args?.where?.class) query = query.eq("class", args.where.class);
          const { data, error } = await query;
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase error in student.findMany", e);
        }
      }
      let list = [...mock.students];
      if (args?.where?.class) list = list.filter(s => s.class === args.where.class);
      return list;
    },
    findUnique: async (args: any) => {
      const id = args.where.id;
      if (supabase) {
        try {
          const { data, error } = await supabase.from("Student").select("*").eq("id", id).single();
          if (!error && data) return data;
        } catch (e) {
          console.warn("Supabase student.findUnique error", e);
        }
      }
      return mock.students.find(s => s.id === id) || null;
    },
    create: async (args: any) => {
      const newStudent = {
        id: `std-${Date.now()}`,
        name: args.data.name,
        class: args.data.class,
        rollNo: args.data.rollNo,
        parentName: args.data.parentName,
        parentPhone: args.data.parentPhone,
        parentEmail: args.data.parentEmail,
        photo: args.data.photo || null,
        academicRecord: args.data.academicRecord || "{}",
        attendance: args.data.attendance || 100.0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("Student").insert([newStudent]).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase student.create error", e);
        }
      }
      
      mock.students.push(newStudent);
      return newStudent;
    },
    update: async (args: any) => {
      const id = args.where.id;
      const updateData = { ...args.data, updatedAt: new Date().toISOString() };
      
      // Clean undefined keys to support partial updates
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("Student").update(updateData).eq("id", id).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase student.update error", e);
        }
      }
      
      const index = mock.students.findIndex(s => s.id === id);
      if (index !== -1) {
        const updated = { ...mock.students[index], ...updateData };
        mock.students[index] = updated;
        return updated;
      }
      throw new Error(`Student not found with id ${id}`);
    },
    delete: async (args: any) => {
      const id = args.where.id;
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("Student").delete().eq("id", id).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase student.delete error", e);
        }
      }
      
      const index = mock.students.findIndex(s => s.id === id);
      if (index !== -1) {
        const deleted = mock.students[index];
        mock.students.splice(index, 1);
        return deleted;
      }
      throw new Error(`Student not found with id ${id}`);
    },
    createMany: async (args: { data: any[] }) => {
      const added = args.data.map((item, idx) => ({
        id: `std-${Date.now()}-${idx}`,
        name: item.name,
        class: item.class,
        rollNo: item.rollNo,
        parentName: item.parentName,
        parentPhone: item.parentPhone,
        parentEmail: item.parentEmail,
        photo: item.photo || null,
        academicRecord: item.academicRecord || "{}",
        attendance: item.attendance || 100.0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      if (supabase) {
        try {
          const { data, error } = await supabase.from("Student").insert(added).select();
          if (!error && data) return { count: data.length };
        } catch (e) {
          console.warn("Supabase student.createMany error", e);
        }
      }
      
      mock.students.push(...added);
      return { count: added.length };
    },
    count: async () => {
      if (supabase) {
        try {
          const { count, error } = await supabase.from("Student").select("*", { count: "exact", head: true });
          if (!error && count !== null) return count;
        } catch (e) {
          console.warn("Supabase count error", e);
        }
      }
      return mock.students.length;
    }
  },
  adminUser: {
    findMany: async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("AdminUser").select("*");
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase adminUser.findMany error", e);
        }
      }
      return mock.admins;
    },
    findUnique: async (args: any) => {
      if (supabase) {
        try {
          let query = supabase.from("AdminUser").select("*");
          if (args.where?.email) query = query.eq("email", args.where.email);
          if (args.where?.clerkId) query = query.eq("clerkId", args.where.clerkId);
          if (args.where?.id) query = query.eq("id", args.where.id);
          const { data, error } = await query.single();
          if (!error && data) return data;
        } catch (e) {
          console.warn("Supabase adminUser.findUnique error", e);
        }
      }
      if (args.where?.email) return mock.admins.find(a => a.email === args.where.email) || null;
      if (args.where?.clerkId) return mock.admins.find(a => a.clerkId === args.where.clerkId) || null;
      if (args.where?.id) return mock.admins.find(a => a.id === args.where.id) || null;
      return null;
    },
    create: async (args: any) => {
      const data = args.data;
      const newAdmin = {
        id: data.id || `adm-${Date.now()}`,
        email: data.email,
        name: data.name || null,
        role: data.role || "ADMIN",
        status: data.status || "ACTIVE",
        clerkId: data.clerkId,
        lastSeen: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("AdminUser").insert([newAdmin]).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase admin.create error", e);
        }
      }
      
      mock.admins.push(newAdmin);
      return newAdmin;
    },
    update: async (args: any) => {
      const id = args.where.id;
      const updateData = { ...args.data, updatedAt: new Date().toISOString() };
      
      // Clean undefined keys to support partial updates
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("AdminUser").update(updateData).eq("id", id).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase admin.update error", e);
        }
      }
      
      const index = mock.admins.findIndex(a => a.id === id);
      if (index !== -1) {
        const updated = { ...mock.admins[index], ...updateData };
        mock.admins[index] = updated;
        return updated;
      }
      throw new Error(`AdminUser not found with id ${id}`);
    },
    delete: async (args: any) => {
      const id = args.where.id;
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("AdminUser").delete().eq("id", id).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase admin.delete error", e);
        }
      }
      
      const index = mock.admins.findIndex(a => a.id === id);
      if (index !== -1) {
        const deleted = mock.admins[index];
        mock.admins.splice(index, 1);
        return deleted;
      }
      throw new Error(`AdminUser not found with id ${id}`);
    },
    count: async () => {
      if (supabase) {
        try {
          const { count, error } = await supabase.from("AdminUser").select("*", { count: "exact", head: true });
          if (!error && count !== null) return count;
        } catch (e) {
          console.warn("Supabase count error", e);
        }
      }
      return mock.admins.length;
    }
  },
  syncSettings: {
    findFirst: async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("SyncSettings").select("*").eq("id", "singleton").single();
          if (!error && data) return data;
        } catch (e) {
          console.warn("Supabase syncSettings.findFirst error", e);
        }
      }
      return mock.settings;
    },
    update: async (args: any) => {
      const updateData = { ...args.data, updatedAt: new Date().toISOString() };
      
      // Clean undefined keys to support partial updates
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("SyncSettings").update(updateData).eq("id", "singleton").select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase syncSettings.update error", e);
        }
      }
      mock.settings = { ...mock.settings, ...updateData };
      return mock.settings;
    }
  },
  editorialLog: {
    findMany: async (args?: any) => {
      if (supabase) {
        try {
          const limit = args?.take || 20;
          const { data, error } = await supabase.from("EditorialLog").select("*").order("timestamp", { ascending: false }).limit(limit);
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase editorialLog.findMany error", e);
        }
      }
      let list = [...mock.logs];
      list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      if (args?.take) list = list.slice(0, args.take);
      return list;
    },
    create: async (args: any) => {
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        level: args.data.level || "INFO",
        message: args.data.message
      };
      
      if (supabase) {
        try {
          const { data: dbData, error } = await supabase.from("EditorialLog").insert([newLog]).select().single();
          if (!error && dbData) return dbData;
        } catch (e) {
          console.warn("Supabase editorialLog.create error", e);
        }
      }
      
      mock.logs.unshift(newLog);
      return newLog;
    }
  }
};
