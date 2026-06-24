"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  Trash2, 
  Edit3, 
  Plus, 
  Check, 
  X, 
  ShieldAlert, 
  UserPlus,
  Loader2
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminDirectory() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", role: "ADMIN", status: "ACTIVE" });
  
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({ email: "", name: "", role: "ADMIN", status: "ACTIVE" });
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({
    isOpen: false,
    id: ""
  });

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (e) {
      console.error("Failed to load admins", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEditStart = (user: any) => {
    setEditingId(user.id);
    setEditForm({
      name: user.name || "",
      role: user.role,
      status: user.status
    });
  };

  const handleEditSave = async (id: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id,
          ...editForm
        })
      });
      if (res.ok) {
        setEditingId(null);
        fetchAdmins();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update admin");
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
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          id
        })
      });
      if (res.ok) {
        fetchAdmins();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to delete admin");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          ...newForm
        })
      });
      if (res.ok) {
        setIsAdding(false);
        setNewForm({ email: "", name: "", role: "ADMIN", status: "ACTIVE" });
        fetchAdmins();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to create admin");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">Neural Directory</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Manage administrative user roles, access control levels, and view last active sessions.
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-primary-850 to-primary-650 hover:from-primary-750 hover:to-primary-550 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Add Administrator
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Add Administrator Form */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 max-w-2xl">
          <h3 className="font-serif text-base font-bold text-white mb-2">New Administrator Profile</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={newForm.email}
                onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                placeholder="e.g. name@pathseekers.education"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-550 focus:border-primary-550 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={newForm.name}
                onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                placeholder="e.g. Jaspreet Kaur"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-550 focus:border-primary-550 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Authorization Role</label>
              <select
                value={newForm.role}
                onChange={(e) => setNewForm({ ...newForm, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-550 transition-all"
              >
                <option value="ADMIN">ADMIN (Publisher)</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN (Owner)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Account Status</label>
              <select
                value={newForm.status}
                onChange={(e) => setNewForm({ ...newForm, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-550 transition-all"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="SUSPENDED">SUSPENDED</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4.5 py-2 rounded-xl text-xs font-bold bg-primary-800 hover:bg-primary-750 text-white"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* Directory Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-primary-550 animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-850">
                  <th className="px-6 py-4">Administrator</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Seen</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {admins.map((user) => {
                  const isEditing = editingId === user.id;
                  return (
                    <tr key={user.id} className="hover:bg-slate-850/30 transition-colors">
                      {/* Name / Initials */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-900/40 text-primary-355 font-serif font-bold text-xs flex items-center justify-center">
                            {user.name ? user.name.split(" ").map((n: string) => n[0]).join("") : "U"}
                          </div>
                          <div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="px-2 py-1 rounded bg-slate-950 border border-slate-850 text-xs w-40 text-slate-100 focus:outline-none"
                              />
                            ) : (
                              <span className="font-bold text-white block">{user.name || "Unnamed Administrator"}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-450 font-medium">{user.email}</td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editForm.role}
                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                            className="px-2 py-1 rounded bg-slate-950 border border-slate-850 text-xs focus:outline-none text-slate-100"
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                          </select>
                        ) : (
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                            user.role === "SUPER_ADMIN" ? "bg-purple-900/40 text-purple-300 border border-purple-800/40" : "bg-slate-800 text-slate-350"
                          }`}>
                            {user.role}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                            className="px-2 py-1 rounded bg-slate-950 border border-slate-850 text-xs focus:outline-none text-slate-100"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                          </select>
                        ) : (
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            user.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500"
                          }`}></span>
                        )}
                      </td>

                      {/* Last Seen */}
                      <td className="px-6 py-4 text-slate-400 font-semibold">{formatDate(user.lastSeen)}</td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleEditSave(user.id)}
                                className="p-1 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-900"
                                title="Save"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-750"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditStart(user)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300"
                                title="Edit"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-350"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Admin User"
        message="Are you sure you want to delete this admin user? They will lose access to the admin panel."
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
