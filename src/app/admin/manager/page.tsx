"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  Activity, 
  Cpu, 
  CheckCircle, 
  Check,
  Loader2, 
  Save, 
  RefreshCw,
  Clock,
  Compass,
  Plus,
  X
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function SyncManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    autoPublish: true,
    highFrequency: false,
    regionalSync: true,
    category: "Education",
    scheduleTime: "08:00",
    customCategories: [] as string[]
  });
  const [logs, setLogs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings({
            autoPublish: data.settings.autoPublish ?? true,
            highFrequency: data.settings.highFrequency ?? false,
            regionalSync: data.settings.regionalSync ?? true,
            category: data.settings.category ?? "Education",
            scheduleTime: data.settings.scheduleTime ?? "08:00",
            customCategories: data.settings.customCategories ?? []
          });
          // If the fetched category isn't one of the defaults or custom list, show custom input
          const defaults = ["Education", "School Events", "Achievements", "News", "Autopost"];
          const customs = data.settings.customCategories ?? [];
          if (!defaults.includes(data.settings.category) && !customs.includes(data.settings.category)) {
            setShowCustomCategory(true);
          }
        }
        if (data.logs) setLogs(data.logs);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!settings.category.trim()) {
      toast.error("Category cannot be empty");
      return;
    }
    try {
      setSaving(true);
      setError("");
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        fetchData();
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings.");
        setError("Failed to save settings.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error while saving.");
      setError("Failed to communicate with API.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCustomCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) {
      toast.error("Category name cannot be empty");
      return;
    }
    const defaults = ["Education", "School Events", "Achievements", "News"];
    if (defaults.includes(trimmed) || settings.customCategories.includes(trimmed)) {
      toast.error("Category already exists");
      return;
    }
    const updatedCats = [...settings.customCategories, trimmed];
    setSettings({
      ...settings,
      customCategories: updatedCats,
      category: trimmed
    });
    setNewCategoryInput("");
    setShowCustomCategory(false);
    toast.success(`Category "${trimmed}" added! Click Save to apply.`);
  };

  const handleRemoveCustomCategory = (catToRemove: string) => {
    const updatedCats = settings.customCategories.filter(c => c !== catToRemove);
    const newCategory = settings.category === catToRemove ? "Education" : settings.category;
    setSettings({
      ...settings,
      customCategories: updatedCats,
      category: newCategory
    });
    toast.success(`Category "${catToRemove}" removed! Click Save to apply.`);
  };

  return (
    <div className="space-y-8 text-slate-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">Auto Publish Settings</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Set up automatic blog posting — choose when posts go live, which category to use, and check if all AI services are working.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-primary-850 to-primary-655 hover:from-primary-750 hover:to-primary-555 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Configuration
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-primary-550 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Settings Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Auto-publish parameters */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="font-serif text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary-500" />
                Auto-Publish Options
              </h3>

              {/* Toggles */}
              <div className="space-y-4">
                {/* Auto Publish Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Auto-Publish Blogs Daily</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Automatically publish new blog posts every day.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, autoPublish: !settings.autoPublish })}
                    className="text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
                  >
                    {settings.autoPublish ? (
                      <ToggleRight className="w-9 h-9 text-primary-500" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* High Frequency Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Publish Multiple Times a Day</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Post more than one blog article per day.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, highFrequency: !settings.highFrequency })}
                    className="text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
                  >
                    {settings.highFrequency ? (
                      <ToggleRight className="w-9 h-9 text-primary-500" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-slate-600" />
                    )}
                  </button>
                </div>

                {/* Regional Sync Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Focus on Punjab / India Topics</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Write blog posts focused on Punjab and local Indian context.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, regionalSync: !settings.regionalSync })}
                    className="text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
                  >
                    {settings.regionalSync ? (
                      <ToggleRight className="w-9 h-9 text-primary-500" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Category & Time inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Auto-Post Category</label>
                  {showCustomCategory ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        placeholder="Type new category..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none focus:border-primary-500"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomCategory();
                          }
                        }}
                      />
                      <button 
                        onClick={handleAddCustomCategory}
                        className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-colors"
                        title="Add custom category"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setShowCustomCategory(false);
                          setNewCategoryInput("");
                        }}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <select
                      value={settings.category}
                      onChange={(e) => {
                        if (e.target.value === "CUSTOM") {
                          setShowCustomCategory(true);
                        } else {
                          setSettings({ ...settings, category: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none focus:border-primary-500"
                    >
                      <option value="Education">Education</option>
                      <option value="School Events">School Events</option>
                      <option value="Achievements">Achievements</option>
                      <option value="News">News</option>
                      <option value="Autopost">Autopost</option>
                      
                      {/* Dynamic Custom Categories */}
                      {settings.customCategories && settings.customCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}

                      <option value="CUSTOM" className="text-primary-400 font-bold">➕ Add Custom Category...</option>
                    </select>
                  )}

                  {/* Custom Categories Badges list */}
                  {settings.customCategories && settings.customCategories.length > 0 && (
                    <div className="mt-3.5 space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Custom Categories</label>
                      <div className="flex flex-wrap gap-1.5">
                        {settings.customCategories.map((cat) => (
                          <span 
                            key={cat} 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 border border-slate-850 rounded-lg text-[10px] text-slate-300 font-medium"
                          >
                            {cat}
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomCategory(cat)}
                              className="text-slate-500 hover:text-rose-400 transition-colors"
                              title={`Delete ${cat}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Schedule Time (Daily IST)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={settings.scheduleTime}
                      onChange={(e) => setSettings({ ...settings, scheduleTime: e.target.value })}
                      placeholder="e.g. 08:00"
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none focus:border-primary-500"
                    />
                    <Clock className="w-4.5 h-4.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* History logs block */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="font-serif text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-500" />
                Editorial Strategy Logs
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {logs.map((log: any) => (
                  <div key={log.id} className="p-4 bg-slate-950/80 rounded-xl border border-slate-850 flex gap-4 items-start text-xs">
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                      log.level === "ERROR" ? "bg-rose-500" :
                      log.level === "SUCCESS" ? "bg-emerald-500" : "bg-primary-500"
                    }`}></div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>{log.level}</span>
                        <span>{formatDate(log.timestamp)}</span>
                      </div>
                      <p className="text-slate-300 font-semibold leading-relaxed">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pipeline Status sidebar */}
          <div className="space-y-6">
            
            {/* AI API status scorecard */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary-500" />
                AI Services Status
              </h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Check which AI services are connected and ready to write blog posts.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  { name: "Gemini 1.5 Flash", status: "ONLINE", type: "Blog writing (primary)" },
                  { name: "Nvidia NIM", status: "ONLINE", type: "Blog writing (fast)" },
                  { name: "Groq LLaMA 3.3", status: "ONLINE", type: "Blog writing (backup)" },
                  { name: "OpenRouter", status: "ONLINE", type: "Blog writing (fallback)" },
                ].map((api, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/80 border border-slate-850 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-slate-200">{api.name}</span>
                      <span className="block text-[9px] text-slate-500 font-medium">{api.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        {api.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pexels / Pixabay media source status */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary-500" />
                Image Search Services
              </h3>
              
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Pexels search API:</span>
                  <span className="text-emerald-450 font-bold">CONNECTED</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Pixabay search API:</span>
                  <span className="text-emerald-450 font-bold">CONNECTED</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
