// File: src/pages/AdminContactForms.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminContactForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin_token");
  const API_URL = "https://clutchautosales-production.up.railway.app";

  const fetchForms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/forms/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForms(res.data);
    } catch (err) {
      console.error("Failed to fetch contact forms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/forms/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForms((prev) => prev.filter((form) => form.id !== id));
    } catch (err) {
      console.error("Failed to delete form:", err);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL messages?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/forms/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForms([]);
    } catch (err) {
      console.error("Failed to delete all contact forms:", err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading contact forms...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-500">
          Contact Form Submissions
        </h1>
        {forms.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Delete All
          </button>
        )}
      </div>

      {forms.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Phone</th>
                <th className="text-left p-3 font-medium">Message</th>
                <th className="text-left p-3 font-medium">Submitted</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id} className="border-t align-top">
                  <td className="p-3">
                    {form.firstName} {form.lastName}
                  </td>
                  <td className="p-3">{form.email}</td>
                  <td className="p-3">{form.phone || "-"}</td>
                  <td className="p-3 whitespace-pre-wrap break-words max-w-sm">
                    {form.message || "-"}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(form.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
