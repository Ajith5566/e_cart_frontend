"use client";

import "quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import {
  addPageApi,
  deletePageApi,
  getAllPagesApi,
  togglePageApi,
  updatePageApi,
} from "@/app/services/allApi";

import { Modules } from "./quillmodules";

/* -------------------- TYPES -------------------- */

type PageType = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
};

type GetPagesResponse = PageType[];

/* -------------------- QUILL -------------------- */

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

/* -------------------- COMPONENT -------------------- */

export default function PageEditor() {
  /* ---------- STATE ---------- */

  const [pages, setPages] = useState<PageType[]>([]);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [editingPage, setEditingPage] = useState<PageType | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- TOKEN ---------- */

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken ?? "");
  }, []);

  /* ---------- FETCH PAGES ---------- */

  const fetchPages = useCallback(async () => {
    if (!token) return;

    try {
      const res = (await getAllPagesApi(
        token
      )) as AxiosResponse<GetPagesResponse>;

      setPages(res.data);
    } catch {
      toast.error("Failed to fetch pages");
    }
  }, [token]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  /* ---------- ADD / UPDATE ---------- */

  const handleSubmit = async () => {
    if (!title.trim() || !shortDesc.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (editingPage) {
        // UPDATE
        await updatePageApi(
          editingPage._id,
          {
            title: title.trim(),
            shortDescription: shortDesc.trim(),
            description,
          },
          token
        );

        toast.success("Page updated");
      } else {
        // ADD
        await addPageApi(
          {
            title: title.trim(),
            shortDescription: shortDesc.trim(),
            description,
          },
          token
        );

        toast.success("Page added");
      }

      // Reset form
      setTitle("");
      setShortDesc("");
      setDescription("");
      setEditingPage(null);

      fetchPages();
    } catch {
      toast.error("Action failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- EDIT ---------- */

  const handleEdit = (page: PageType) => {
    setEditingPage(page);
    setTitle(page.title);
    setShortDesc(page.shortDescription);
    setDescription(page.description);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- CANCEL EDIT ---------- */

  const cancelEdit = () => {
    setEditingPage(null);
    setTitle("");
    setShortDesc("");
    setDescription("");
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="container p-4">
      <h2 className="mb-4 fw-bold">Manage Pages</h2>

      {/* ---------- ADD / EDIT FORM ---------- */}
      <div className="card p-4 mb-4">
        <input
          className="form-control mb-3"
          placeholder="Page title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Short description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />

        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
          modules={Modules}
        />

        <div className="mt-3 d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editingPage
              ? "Update Page"
              : "Add Page"}
          </button>

          {editingPage && (
            <button className="btn btn-secondary" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* ---------- PAGE LIST ---------- */}
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th style={{ width: "200px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {pages.length > 0 ? (
            pages.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.slug}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={p.isActive}
                    onChange={() =>
                      togglePageApi(p._id, token).then(fetchPages)
                    }
                  />
                </td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      deletePageApi(p._id, token).then(fetchPages)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No pages found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
