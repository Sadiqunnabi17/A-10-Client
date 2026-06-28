"use client";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id, role) => {
    try {
      await axiosInstance.patch(`/admin/users/${id}/role`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6"
        style={{ fontFamily: "Georgia, serif" }}>
        Manage Users
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-400">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:border-secondary"
                      >
                        <option value="user">User</option>
                        <option value="writer">Writer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}