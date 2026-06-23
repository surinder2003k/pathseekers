"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import PromptModal from "@/components/admin/PromptModal";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImagePlus,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Loader2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  onWordCountChange?: (count: number) => void;
  insertHTML?: string;
  onInsertHTMLDone?: () => void;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your article...",
  minHeight = "420px",
  onWordCountChange,
  insertHTML,
  onInsertHTMLDone,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInternalUpdate = useRef(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [promptOpen, setPromptOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Sync external value → editor DOM (only when value changes from outside)
  useEffect(() => {
    if (!editorRef.current) return;
    const currentHTML = editorRef.current.innerHTML;
    if (currentHTML !== value && !isInternalUpdate.current) {
      editorRef.current.innerHTML = value || "";
      updateCounts();
    }
    isInternalUpdate.current = false;
  }, [value]);

  const updateCounts = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || "";
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(text.length);
    if (onWordCountChange) onWordCountChange(words);
  }, [onWordCountChange]);

  useEffect(() => {
    if (insertHTML && editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertHTML", false, insertHTML);
      isInternalUpdate.current = true;
      onChange(editorRef.current.innerHTML || "");
      if (onInsertHTMLDone) onInsertHTMLDone();
    }
  }, [insertHTML, onChange, onInsertHTMLDone]);

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    if (document.queryCommandState("strikeThrough")) formats.add("strikeThrough");
    setActiveFormats(formats);
  }, []);

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isInternalUpdate.current = true;
    const html = editorRef.current.innerHTML;
    onChange(html === "<br>" ? "" : html);
    updateCounts();
  }, [onChange, updateCounts]);

  const exec = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    isInternalUpdate.current = true;
    onChange(editorRef.current?.innerHTML || "");
    updateCounts();
    updateActiveFormats();
  }, [onChange, updateCounts, updateActiveFormats]);

  const insertHeading = useCallback((tag: "h2" | "h3" | "h4") => {
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
    isInternalUpdate.current = true;
    onChange(editorRef.current?.innerHTML || "");
    updateActiveFormats();
  }, [onChange, updateActiveFormats]);

  const insertLink = useCallback(() => {
    setPromptOpen(true);
  }, []);

  const insertHR = useCallback(() => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, "<hr style='border:none;border-top:1px solid #e5e7eb;margin:1.5em 0;'/><p><br/></p>");
    isInternalUpdate.current = true;
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const insertBlockquote = useCallback(() => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    const selectedText = sel?.toString() || "Quote text here...";
    document.execCommand(
      "insertHTML",
      false,
      `<blockquote style="border-left:4px solid #6366f1;padding:0.75em 1em;margin:1em 0;color:#4b5563;font-style:italic;">${selectedText}</blockquote><p><br/></p>`
    );
    isInternalUpdate.current = true;
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset file input so same file can be re-selected
    e.target.value = "";

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to upload image");
        return;
      }

      const { url } = await res.json();

      editorRef.current?.focus();
      document.execCommand(
        "insertHTML",
        false,
        `<figure class="editor-img-figure" contenteditable="false" style="margin:1.5em 0;text-align:center;"><img src="${url}" alt="${file.name}" style="max-width:100%;height:auto;border-radius:12px;display:inline-block;" /><figcaption contenteditable="true" style="text-align:center;font-size:0.8em;color:#64748b;margin-top:0.4em;outline:none;">Add caption...</figcaption></figure><p><br/></p>`
      );
      isInternalUpdate.current = true;
      onChange(editorRef.current?.innerHTML || "");
      updateCounts();
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setImageUploading(false);
    }
  }, [onChange, updateCounts]);

  const triggerImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  type ToolItem =
    | { type: "btn"; icon: React.ElementType; cmd?: string; action?: () => void; title: string; format?: string }
    | { type: "sep" };

  const tools: ToolItem[] = [
    { type: "btn", icon: Bold, cmd: "bold", title: "Bold (Ctrl+B)", format: "bold" },
    { type: "btn", icon: Italic, cmd: "italic", title: "Italic (Ctrl+I)", format: "italic" },
    { type: "btn", icon: Underline, cmd: "underline", title: "Underline (Ctrl+U)", format: "underline" },
    { type: "btn", icon: Strikethrough, cmd: "strikeThrough", title: "Strikethrough", format: "strikeThrough" },
    { type: "sep" },
    { type: "btn", icon: Heading1, action: () => insertHeading("h2"), title: "Heading 1" },
    { type: "btn", icon: Heading2, action: () => insertHeading("h3"), title: "Heading 2" },
    { type: "btn", icon: Heading3, action: () => insertHeading("h4"), title: "Heading 3" },
    { type: "sep" },
    { type: "btn", icon: AlignLeft, cmd: "justifyLeft", title: "Align Left" },
    { type: "btn", icon: AlignCenter, cmd: "justifyCenter", title: "Align Center" },
    { type: "btn", icon: AlignRight, cmd: "justifyRight", title: "Align Right" },
    { type: "sep" },
    { type: "btn", icon: List, cmd: "insertUnorderedList", title: "Bullet List" },
    { type: "btn", icon: ListOrdered, cmd: "insertOrderedList", title: "Numbered List" },
    { type: "btn", icon: Quote, action: insertBlockquote, title: "Blockquote" },
    { type: "btn", icon: Minus, action: insertHR, title: "Divider" },
    { type: "sep" },
    { type: "btn", icon: LinkIcon, action: insertLink, title: "Insert Link" },
    { type: "btn", icon: ImagePlus, action: triggerImageUpload, title: "Insert Image" },
    { type: "sep" },
    { type: "btn", icon: Undo, cmd: "undo", title: "Undo (Ctrl+Z)" },
    { type: "btn", icon: Redo, cmd: "redo", title: "Redo (Ctrl+Y)" },
  ];

  return (
    <div className="rich-editor-wrap border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/45 shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-slate-800 bg-[#0f172a]/60">
        {tools.map((tool, i) => {
          if (tool.type === "sep") {
            return <div key={i} className="w-px h-5 bg-slate-800 mx-1" />;
          }
          const isActive = tool.format ? activeFormats.has(tool.format) : false;
          const Icon = tool.icon;
          return (
            <button
              key={i}
              type="button"
              title={tool.title}
              disabled={imageUploading}
              onMouseDown={(e) => {
                e.preventDefault();
                if (tool.action) {
                  tool.action();
                } else if (tool.cmd) {
                  exec(tool.cmd);
                }
              }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isActive
                  ? "bg-primary-700 text-white shadow-sm shadow-primary-950/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              } ${imageUploading ? "opacity-50" : ""}`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
        {imageUploading && (
          <div className="flex items-center gap-1.5 ml-2 text-xs text-primary-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        data-placeholder={placeholder}
        className="rich-editor-body outline-none px-7 py-5 text-slate-200 text-[15px] leading-relaxed"
        style={{ minHeight }}
      />

      {/* Stats bar */}
      <div className="flex items-center gap-6 px-5 py-2 border-t border-slate-800/80 bg-slate-900/10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
        <span>
          <span className={`font-bold ${wordCount >= 2000 ? "text-emerald-400" : wordCount >= 500 ? "text-amber-400" : "text-slate-500"}`}>
            {wordCount.toLocaleString()}
          </span>{" "}
          WORDS
        </span>
        <span>{charCount.toLocaleString()} CHARS</span>
        <span>EST. {readingTime} MIN READING TIME</span>
        {wordCount < 2000 && (
          <span className="text-amber-400 font-medium">
            {(2000 - wordCount).toLocaleString()} words to reach 2000+ target
          </span>
        )}
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          LIVE SYNC ACTIVE
        </span>
      </div>

      {/* Styles injected globally for editor */}
      <style jsx global>{`
        .rich-editor-body:empty:before {
          content: attr(data-placeholder);
          color: #4b5563;
          pointer-events: none;
        }
        .rich-editor-body h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25em 0 0.5em; color: #f8fafc; }
        .rich-editor-body h3 { font-size: 1.25rem; font-weight: 700; margin: 1em 0 0.4em; color: #f1f5f9; }
        .rich-editor-body h4 { font-size: 1.1rem; font-weight: 600; margin: 0.8em 0 0.4em; color: #e2e8f0; }
        .rich-editor-body p { margin: 0 0 1em; color: #cbd5e1; }
        .rich-editor-body ul { list-style: disc; padding-left: 1.5em; margin: 0.75em 0 1em; }
        .rich-editor-body ol { list-style: decimal; padding-left: 1.5em; margin: 0.75em 0 1em; }
        .rich-editor-body li { margin-bottom: 0.35em; color: #cbd5e1; }
        .rich-editor-body blockquote { border-left: 4px solid #055cc5; padding: 0.75em 1.2em; margin: 1.25em 0; color: #94a3b8; font-style: italic; background: rgba(5, 92, 197, 0.08); border-radius: 0 8px 8px 0; }
        .rich-editor-body a { color: #3b82f6; text-decoration: underline; }
        .rich-editor-body strong { font-weight: 700; color: #f8fafc; }
        .rich-editor-body em { font-style: italic; }
        .rich-editor-body hr { border: none; border-top: 1px solid #1e293b; margin: 1.5em 0; }
        .rich-editor-body figure { margin: 1.5em 0; }
        .rich-editor-body figure img { max-width: 100%; border-radius: 12px; cursor: default; }
        .rich-editor-body figure figcaption { text-align: center; font-size: 0.8em; color: #64748b; margin-top: 0.4em; }
        .rich-editor-body .editor-img-figure { position: relative; }
        .rich-editor-body .editor-img-figure:hover { outline: 2px solid #3b82f6; outline-offset: 4px; border-radius: 12px; }
      `}</style>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={handleImageUpload}
        className="hidden"
      />
      <PromptModal
        isOpen={promptOpen}
        title="Insert Link"
        message="Enter the URL for the link:"
        placeholder="https://example.com"
        onConfirm={(url) => {
          if (url) exec("createLink", url);
        }}
        onClose={() => setPromptOpen(false)}
      />
    </div>
  );
}
