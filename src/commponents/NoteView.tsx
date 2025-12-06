import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  Download, 
  Clock 
} from "lucide-react";
import { getNoteById, deleteNoteId, noteConvertToPdf } from "../services/note"; // Service functions

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
        console.log(id)
        const res = await getNoteById(id);
        setNote(res.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
      try {
        if (id) await deleteNoteId(id);
        alert("Note deleted successfully.");
        navigate("/app/notes");
      } catch (error) {
        alert("Failed to delete note.");
      }
    }
  };

  // 3. PDF Download Function
  const handleDownloadPdf = async () => {
    if (!id) return;
    setPdfLoading(true);
    try {
      const res = await noteConvertToPdf(id);
      console.log(res)
      if (res.data.pdfUrl) {
        window.open(res.data.pdfUrl, "_blank");
      } else {
        alert("PDF generated but no URL returned.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF.");
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (!note) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">Note not found 😕</h2>
        <Link to="/app/notes" className="text-blue-600 hover:underline mt-4 block">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* --- TOP BAR (Back Button & Actions) --- */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50/90 backdrop-blur-sm py-4 z-10">
        <button 
          onClick={() => navigate("/app/notes")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition font-medium"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex gap-3">
          {/* PDF Button */}
          <button 
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition shadow-sm disabled:opacity-50"
          >
            <Download size={18} /> 
            {pdfLoading ? "Generating..." : "Export PDF"}
          </button>

          {/* Edit Button */}
          <button 
            onClick={() => navigate(`/app/notes/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <Edit size={18} /> Edit
          </button>

          {/* Delete Button */}
          <button 
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Delete Note"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* --- NOTE CONTENT --- */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 min-h-[60vh]">
        
        {/* Header Info */}
        <div className="border-b border-gray-100 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
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
          className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-800 prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />

      </div>

    </div>
  );
};

export default NoteView;