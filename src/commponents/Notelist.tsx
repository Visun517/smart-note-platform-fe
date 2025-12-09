import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getAllNotes, deleteNoteId } from "../services/note";

const NoteList = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 9;

  useEffect(() => {
    fetchNotes();
  }, [page]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await getAllNotes(page, LIMIT);

      setNotes(res.data.notes);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch notes", error);
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
        fetchNotes();
      } catch (error) {
        alert("Failed to delete note.");
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
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Notes 📚</h1>
          <p className="text-gray-500 mt-1">
            Manage and organize your study materials.
          </p>
        </div>
        <Link
          to="/app/notes/new"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
        >
          <Plus size={20} /> Create Note
        </Link>
      </div>

      {/* --- CONTENT AREA --- */}
      {loading ? (
        // Loading Spinner
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : notes.length === 0 ? (
        // Empty State
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-700">No notes found</h3>
          <p className="text-gray-500 mt-2 mb-6">
            Start by creating your first note to see it here.
          </p>
          <Link
            to="/app/create-note"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Note &rarr;
          </Link>
        </div>
      ) : (
        // Notes Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Note Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <FileText size={20} />
                  </div>
                </div>

                {/* Title & Date */}
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {note.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
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
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  <Eye size={16} /> View
                </button>

                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/app/notes/${note._id}/edit`)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition"
                    title="Edit Note"
                  >
                    <Edit size={16} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(note._id, e)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
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
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span className="text-sm font-medium text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteList;
