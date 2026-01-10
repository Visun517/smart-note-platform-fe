import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Download,
  Clock,
} from "lucide-react";
import { getNoteById, deleteNoteId, noteConvertToPdf } from "../services/note"; // Service functions
import toast from "react-hot-toast";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        if (!id) return;
        const res = await getNoteById(id);
        setNote(res.data.note);
      } catch (error) {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteData();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this note? This action cannot be undone."
      )
    ) {
      try {
        if (id) await deleteNoteId(id);
        alert("Note deleted successfully.");
        navigate("/app/notes");
      } catch (error) {
        toast.error("Failed to delete note");
      }
    }
  };

  // 3. PDF Download Function
  const handleDownloadPdf = async () => {
    if (!id) return;
    setPdfLoading(true);
    try {
      const res = await noteConvertToPdf(id);
      console.log(res);
      if (res.data.pdfUrl) {
        window.open(res.data.pdfUrl, "_blank");
      } else {
        toast.error("Failed to generate PDF.");
      }
    } catch (error) {
      toast.error("Failed to generate PDF.");
    } finally {
      setPdfLoading(false);
    }
  };

  // --- Helper: Date Formatter ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (!note) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Note not found 😕</h2>
        <Link
          to="/app/notes"
          className="block mt-4 text-blue-600 hover:underline"
        >
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl pb-20 mx-auto">
      {/* --- TOP BAR (Back Button & Actions) --- */}
      <div className="sticky top-0 z-10 flex items-center justify-between py-4 mb-8 bg-gray-50/90 backdrop-blur-sm">
        <button
          onClick={() => navigate("/app/notes")}
          className="flex items-center gap-2 font-medium text-gray-500 transition hover:text-gray-800"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex gap-3">
          {/* PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50"
          >
            <Download size={18} />
            {pdfLoading ? "Generating..." : "Export PDF"}
          </button>

          {/* Edit Button */}
          <button
            onClick={() => navigate(`/app/notes/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
          >
            <Edit size={18} /> Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 transition rounded-lg hover:bg-red-50"
            title="Delete Note"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* --- NOTE CONTENT --- */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 min-h-[60vh]">
        {/* Header Info */}
        <div className="pb-6 mb-8 border-b border-gray-100">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Created: {formatDate(note.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Last Updated: {formatDate(note.updatedAt)}</span>
            </div>
          </div>
        </div>

        <div
          className="prose prose-lg text-gray-700 max-w-none prose-headings:text-gray-800 prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      </div>
    </div>
  );
};

export default NoteView;
