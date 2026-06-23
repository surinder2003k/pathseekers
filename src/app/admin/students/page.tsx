"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X, 
  ArrowDownWideNarrow, 
  Loader2, 
  Eye, 
  FolderDown, 
  UserSquare, 
  Database,
  UserPlus
} from "lucide-react";

export default function StudentDatabase() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const [activeStudent, setActiveStudent] = useState<any | null>(null); // For view modal
  const [isEditing, setIsEditing] = useState(false); // Edit or Create form toggle
  const [form, setForm] = useState({
    id: "",
    name: "",
    class: "XII-Science",
    rollNo: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    attendance: "100.0",
    academicRecord: "{}"
  });

  const [csvFileContent, setCsvFileContent] = useState("");
  const [csvStatus, setCsvStatus] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({
    isOpen: false,
    id: ""
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const url = selectedClass !== "All" ? `/api/admin/students?class=${selectedClass}` : "/api/admin/students";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  const handleCreateNew = () => {
    setForm({
      id: "",
      name: "",
      class: "XII-Science",
      rollNo: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      attendance: "100.0",
      academicRecord: '{"Math": 90, "Science": 88}'
    });
    setIsEditing(true);
  };

  const handleEditStart = (student: any) => {
    setForm({
      id: student.id,
      name: student.name,
      class: student.class,
      rollNo: student.rollNo,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
      attendance: String(student.attendance),
      academicRecord: student.academicRecord || "{}"
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isNew = !form.id;
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isNew ? "create" : "update",
          ...form
        })
      });
      if (res.ok) {
        setIsEditing(false);
        fetchStudents();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async (id: string) => {
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          id
        })
      });
      if (res.ok) {
        fetchStudents();
        if (activeStudent?.id === id) setActiveStudent(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // CSV Bulk Import Parsing
  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvStatus("Parsing...");
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        // Parse CSV lines
        const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        
        // Assume Header: name,class,rollNo,parentName,parentPhone,parentEmail,attendance
        const headers = lines[0].toLowerCase().split(",");
        
        const bulkData = lines.slice(1).map(line => {
          const cells = line.split(",");
          const record: Record<string, string> = {};
          headers.forEach((h, idx) => {
            record[h.trim()] = cells[idx] ? cells[idx].trim() : "";
          });
          return record;
        });

        // Send to backend
        const res = await fetch("/api/admin/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "import",
            bulkData
          })
        });

        if (res.ok) {
          setCsvStatus("Success!");
          fetchStudents();
        } else {
          setCsvStatus("Failed to save.");
        }
      } catch (err) {
        console.error("CSV Parse error", err);
        setCsvStatus("Format error.");
      }
    };
    reader.readAsText(file);
  };

  const filteredStudents = students.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.parentName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 text-slate-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">Student Database</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Perform full student registrations, verify grades, track attendance parameters, or bulk upload lists.
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {/* CSV File Input */}
          <label className="flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-250 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
            <Upload className="w-4 h-4" />
            {csvStatus || "CSV Bulk Import"}
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-primary-850 to-primary-655 hover:from-primary-750 hover:to-primary-555 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Register Student
          </button>
        </div>
      </div>

      {/* Editor Modal/Panel */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 max-w-3xl">
          <h3 className="font-serif text-base font-bold text-white mb-2">
            {form.id ? "Edit Student Profile" : "Register Student Record"}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Student Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Gurpreet Singh"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Class / Stream</label>
              <input
                type="text"
                required
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
                placeholder="e.g. XII-Medical"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Roll Number (Optional)</label>
              <input
                type="text"
                value={form.rollNo}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                placeholder="Auto-generated if left blank"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Parent / Guardian Name</label>
              <input
                type="text"
                value={form.parentName}
                onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                placeholder="e.g. Harbhajan Singh"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Parent Phone</label>
              <input
                type="tel"
                value={form.parentPhone}
                onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Parent Email</label>
              <input
                type="email"
                value={form.parentEmail}
                onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                placeholder="e.g. parent@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Attendance Percentage</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={form.attendance}
                onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Academic Record (JSON format)</label>
              <input
                type="text"
                value={form.academicRecord}
                onChange={(e) => setForm({ ...form, academicRecord: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4.5 py-2 rounded-xl text-xs font-bold bg-primary-850 hover:bg-primary-750 text-white"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* Main Grid Database */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Table Listing */}
        <div className="lg:col-span-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-250 focus:outline-none w-full sm:w-44"
            >
              <option value="All">All Classes</option>
              <option value="XII-Science">XII-Science</option>
              <option value="XII-Medical">XII-Medical</option>
              <option value="XII-Non-Medical">XII-Non-Medical</option>
              <option value="XII-Commerce">XII-Commerce</option>
              <option value="X-A">Class X-A</option>
              <option value="X-B">Class X-B</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-primary-550 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto border-t border-slate-800/60 pt-4">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-850 pb-2">
                    <th className="pb-3 px-2">Student</th>
                    <th className="pb-3 px-2">Roll No</th>
                    <th className="pb-3 px-2">Class</th>
                    <th className="pb-3 px-2">Parent</th>
                    <th className="pb-3 px-2">Attendance</th>
                    <th className="pb-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="py-3.5 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-primary-900/30 text-primary-350 font-bold flex items-center justify-center">
                            {std.name[0]}
                          </div>
                          <span className="font-bold text-white">{std.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-2 text-slate-350 font-semibold">{std.rollNo}</td>
                      <td className="py-3.5 px-2 text-slate-400 font-semibold">{std.class}</td>
                      <td className="py-3.5 px-2">
                        <span className="block text-slate-200 font-bold">{std.parentName}</span>
                        <span className="block text-[10px] text-slate-400">{std.parentPhone}</span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`font-bold ${std.attendance >= 90 ? "text-emerald-500" : "text-amber-500"}`}>
                          {std.attendance}%
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setActiveStudent(std)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-750"
                            title="View Records"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleEditStart(std)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-750"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(std.id)}
                            className="p-1 rounded bg-rose-950/80 text-rose-350 hover:bg-rose-900"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-slate-500 font-semibold">
                        No student records found in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View Modal / Quick stats card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 h-fit space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <UserSquare className="w-5 h-5 text-primary-500" />
            <h3 className="font-serif text-base font-bold text-white">Academic Card</h3>
          </div>

          {activeStudent ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Student</span>
                <h4 className="font-serif text-lg font-bold text-white mt-1">{activeStudent.name}</h4>
                <p className="text-[10px] text-primary-450 uppercase tracking-widest font-semibold mt-0.5">
                  Roll: {activeStudent.rollNo} • Class: {activeStudent.class}
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-850 space-y-3.5">
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block pb-2 border-b border-slate-850/60">
                  Grade Sheet
                </span>
                
                {(() => {
                  try {
                    const record = JSON.parse(activeStudent.academicRecord || "{}");
                    return Object.entries(record).map(([sub, score]: any) => (
                      <div key={sub} className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">{sub}</span>
                        <span className="text-white">{score} / 100</span>
                      </div>
                    ));
                  } catch (e) {
                    return <p className="text-xs text-slate-500">Record not in format</p>;
                  }
                })()}
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-slate-400 font-semibold">Attendance</span>
                  <span className="text-emerald-500 font-bold">{activeStudent.attendance}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-slate-400 font-semibold">Guardian</span>
                  <span className="text-white font-bold">{activeStudent.parentName}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-400 font-semibold">Parent Phone</span>
                  <span className="text-white font-bold">{activeStudent.parentPhone}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <Database className="w-10 h-10 text-slate-800 mx-auto" />
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Select a student's eye icon to view details, grades, and parent profiles.
              </p>
            </div>
          )}
        </div>

      </div>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Student Record"
        message="Are you sure you want to delete this student record? This action cannot be undone."
        onConfirm={async () => {
          if (deleteConfirm.id) {
            await executeDelete(deleteConfirm.id);
          }
        }}
        onClose={() => setDeleteConfirm({ isOpen: false, id: "" })}
      />
    </div>
  );
}
