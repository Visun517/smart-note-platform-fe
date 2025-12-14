import { useEffect, useState } from "react";
import { getTrashedNotes, restoreNote, deleteNotePermanently } from "../services/note";
import { 
  RefreshCcw, 
  Trash2, 
  AlertTriangle, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Clock
} from "lucide-react";
import toast from "react-hot-toast";

const TrashBin = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrash = async (page: number) => {
    setLoading(true);
    try {
      const res = await getTrashedNotes(page, 9); 
      setNotes(res.data.notes);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.currentPage);
    } catch (error) {
      toast.error("Failed to fetch trash");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash(currentPage);
  }, [currentPage]);

  const handleRestore = async (id: string) => {
    try {
      await restoreNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      
      if (notes.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      toast.error("Failed to restore note");
    }
  };

  const handleDeleteForever = async (id: string) => {
    if (confirm("Are you sure? This note will be gone forever! ⚠️")) {
      try {
        await deleteNotePermanently(id);
        setNotes((prev) => prev.filter((n) => n._id !== id));
        
        if (notes.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        toast.error("Failed to delete note");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8 p-6 bg-red-50 rounded-2xl border border-red-100">
        <div className="p-3 bg-white rounded-full text-red-500 shadow-sm">
          <Trash2 size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trash Bin</h1>
          <p className="text-sm text-gray-500">Items in trash can be restored or permanently deleted.</p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : notes.length === 0 ? (
        
        /* Empty State */
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Trash2 size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600">Trash is Empty</h3>
          <p className="text-gray-400 text-sm">No deleted notes found.</p>
        </div>

      ) : (
        <>
          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div 
                key={note._id} 
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
              >
                {/* Red Stripe on left (to indicate Danger) */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400/80"></div>

                <div className="pl-3">
                    {/* Title */}
                    <div className="flex items-start gap-3 mb-2">
                        <FileText className="text-gray-400 mt-1 min-w-[20px]" size={20} />
                        <h3 className="font-bold text-gray-800 line-clamp-1 text-lg">{note.title}</h3>
                    </div>

                    {/* Meta Data */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 pl-8">
                        <Clock size={12} />
                        <span>Deleted: {new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => handleRestore(note._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                        >
                            <RefreshCcw size={16} /> Restore
                        </button>
                        
                        <button 
                            onClick={() => handleDeleteForever(note._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                        >
                            <AlertTriangle size={16} /> Delete
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <ChevronLeft size={20} className="text-gray-600" />
                </button>
                
                <span className="text-sm font-medium text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <ChevronRight size={20} className="text-gray-600" />
                </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrashBin;