// File: src/pages/AdminFinancingRequests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFinancingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin_token");
  const API_URL = "https://clutch-auto-sales.onrender.com";

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/forms/financing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch financing requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/forms/financing/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete financing request:", err);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL financing requests?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/forms/financing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests([]);
    } catch (err) {
      console.error("Failed to delete all financing requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading financing requests...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-600">Financing Requests</h1>
        {requests.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Delete All
          </button>
        )}
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests found.</p>
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
              {requests.map((r) => (
                <tr key={r.id} className="border-t align-top">
                  <td className="p-3">
                    {r.firstName} {r.lastName}
                  </td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.phone || "-"}</td>
                  <td className="p-3 whitespace-pre-wrap break-words max-w-sm">
                    {r.message || "-"}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(r.id)}
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
