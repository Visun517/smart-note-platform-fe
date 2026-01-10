import { useState, useEffect } from "react";
import { Plus, FolderOpen, X, Check, Folder } from "lucide-react";
import { getAll, saveSubject, deleteSubject } from "../services/subject";
import toast from "react-hot-toast";

// Props types
interface SubjectSelectorProps {
  selectedSubjectId: string;
  onSelect: (id: string) => void;
}

const SubjectSelector = ({
  selectedSubjectId,
  onSelect,
}: SubjectSelectorProps) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Load Subjects
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const res = await getAll();
      setSubjects(res.data.data);
    } catch (error) {
      toast.error("Failed to load subjects");
    }
  };

  // 2. Handle Create Subject
  const handleCreate = async () => {
    if (!newSubjectName.trim()) return;
    setLoading(true);

    try {
      const res = await saveSubject(newSubjectName);
      const newSub = res.data.data;

      setSubjects([...subjects, newSub]);
      onSelect(newSub._id);

      // Reset Modal
      setIsModalOpen(false);
      setNewSubjectName("");
    } catch (error) {
      toast.error("Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Delete Subject
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this folder?")) return;

    try {
      await deleteSubject(id);
      setSubjects(subjects.filter((sub) => sub._id !== id));
      if (selectedSubjectId === id) onSelect("");
    } catch (error) {
      toast.error("Failed to delete subject");
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-600">
        Select Subject (Folder)
      </label>

      {/* --- FOLDER LIST (Clickable Chips) --- */}
      <div className="flex flex-wrap gap-2">
        {/* Subjects Mapping */}
        {subjects.map((sub) => {
          const isSelected = selectedSubjectId === sub._id;

          return (
            <div
              key={sub._id}
              onClick={() => onSelect(sub._id)}
              className={`
                    cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all duration-200 select-none
                    ${
                      isSelected
                        ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold shadow-sm" // Active Style
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300" // Inactive Style
                    }
                `}
            >
              {isSelected ? (
                <Check size={14} strokeWidth={3} />
              ) : (
                <Folder size={14} />
              )}

              <span>{sub.name}</span>

              <button
                onClick={(e) => handleDelete(sub._id, e)}
                className={`ml-1 p-0.5 rounded-full hover:bg-red-100 hover:text-red-500 transition 
                        ${isSelected ? "text-blue-400" : "text-gray-300"}`}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}

        {/* --- ADD NEW BUTTON --- */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-blue-300 text-blue-600 text-sm hover:bg-blue-50 transition font-medium"
        >
          <Plus size={14} /> New Folder
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 transition-all transform bg-white shadow-2xl rounded-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <FolderOpen className="text-blue-500" size={20} />
                New Folder
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 transition hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="Folder Name (e.g. Mathematics)"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="w-full px-4 py-3 mb-6 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-500 transition rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="px-6 py-2 text-sm font-bold text-white transition bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;
