import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FileText,
  Trash2,
  Edit,
  Eye,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { getAllNotes, deleteNoteId, searchNotes } from "../services/note";
import toast from "react-hot-toast";

const NoteList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 9;

  useEffect(() => {
    fetchData();
  }, [page, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;

      if (searchQuery) {
        console.log("Searching:", searchQuery);
        res = await searchNotes(searchQuery);
        setNotes(res.data.notes);
        setTotalPages(1);
      } else {
        // B. Normal Fetch
        res = await getAllNotes(page, LIMIT);
        setNotes(res.data.notes);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to fetch notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  // --- 2.  Delete ---
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNoteId(id);
        fetchData();
      } catch (error) {
        toast.error("Failed to delete note");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // --- 3. Open AI Workspace ---
  const handleOpenAIWorkspace = (id: string) => {
    navigate(`/app/ai-workspace/${id}`);
  };

  return (
    <div className="max-w-6xl pb-10 mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
            {searchQuery ? `Search Results: "${searchQuery}"` : "My Notes 📚"}
          </h1>
          <p className="mt-1 text-gray-500">
            {searchQuery
              ? `Found ${notes.length} notes`
              : "Manage and organize your study materials."}
          </p>
        </div>

        {/* Clear Search Button */}
        {searchQuery ? (
          <button
            onClick={() => navigate("/app/notes")}
            className="px-8 py-3 font-bold text-white transition transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:shadow-blue-200 active:scale-95"
          >
            Clear Search
          </button>
        ) : (
          <Link
            to="/app/notes/new"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
          >
            <Plus size={20} /> Create Note
          </Link>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      {loading ? (
        // Loading Spinner
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : notes.length === 0 ? (
        // Empty State
        <div className="py-20 text-center bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-blue-50">
            <FileText size={32} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-700">No notes found</h3>
          <p className="mt-2 mb-6 text-gray-500">
            Start by creating your first note to see it here.
          </p>
          <Link
            to="/app/create-note"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Note &rarr;
          </Link>
        </div>
      ) : (
        // Notes Grid
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex flex-col justify-between p-5 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md group"
            >
              <div>
                {/* Note Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 text-blue-600 rounded-lg bg-blue-50">
                    <FileText size={20} />
                  </div>
                </div>

                {/* Title & Date */}
                <h3 className="mb-1 text-lg font-bold text-gray-800 transition-colors line-clamp-1 group-hover:text-blue-600">
                  {note.title}
                </h3>
                <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                {/* AI Studio Button */}
                <button
                  onClick={() => handleOpenAIWorkspace(note._id)}
                  className="flex items-center gap-1.5 text-sm font-bold text-black-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
                >
                  <Sparkles size={16} /> AI Studio
                </button>

                {/* View Button */}
                <button
                  onClick={() => navigate(`/app/notes/${note._id}`)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-blue-600"
                >
                  <Eye size={16} /> View
                </button>

                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/app/notes/${note._id}/edit`)}
                    className="p-2 text-gray-400 transition rounded-lg hover:bg-blue-50 hover:text-blue-600"
                    title="Edit Note"
                  >
                    <Edit size={16} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(note._id, e)}
                    className="p-2 text-gray-400 transition rounded-lg hover:bg-red-50 hover:text-red-500"
                    title="Delete Note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- PAGINATION CONTROLS --- */}
      {notes.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span className="text-sm font-medium text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteList;
