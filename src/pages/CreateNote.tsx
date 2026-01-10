import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Save, Edit2 } from "lucide-react"; 
import SubjectSelector from "./createSubject";
import NotePad from "./NotePad";
import { createNnote, updateNoteById, getNoteById } from "../services/note";
import toast from "react-hot-toast";

function CreateNote() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const isEditMode = Boolean(id); 

  const [selectedSubject, setSelectedSubject] = useState("");
  const [title, setTitle] = useState("");
  const [htmlContent, setHtmlContent] = useState(""); 
  const [jsonContent, setJsonContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const loadNote = async () => {
        try {
          const res = await getNoteById(id);
          const note = res.data.note;
          
          setTitle(note.title);
          setSelectedSubject(note.subjectId);
          setHtmlContent(note.html);
          setJsonContent(note.json);
        } catch (error) {
          console.error("Failed to load note");
        }
      };
      loadNote();
    }
  }, [id, isEditMode]);

  // --- HANDLE SAVE / UPDATE ---
  const handleSaveOrUpdate = async () => {
    if (!title || !selectedSubject) {
      alert("Please add a title and select a subject");
      return;
    }

    setLoading(true);

    const noteData = {
      title,
      subjectId: selectedSubject,
      html: htmlContent, 
      json: jsonContent,
    };

    try {
      if (isEditMode && id) {
        await updateNoteById(id, noteData);
        navigate(`/app/notes/${id}`);
      } else {
        await createNnote(noteData);
        navigate("/app/notes");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Note" : "Create New Note"}
        </h1>
        
        <button 
          onClick={handleSaveOrUpdate}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-50"
        >
          {/* Button Icon & Text Change */}
          {isEditMode ? <Edit2 size={18} /> : <Save size={18} />}
          {loading ? "Processing..." : (isEditMode ? "Update Note" : "Save Note")}
        </button>
      </div>

      {/* ... Title Input ... */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">Title</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Enter note title..."
        />
      </div>

      {/* ... Subject Selector ... */}
      <SubjectSelector
        selectedSubjectId={selectedSubject}
        onSelect={(id) => setSelectedSubject(id)}
      />

      {/* ... Editor Area ... */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Note Content
        </label>
        <NotePad 
          content={htmlContent} 
          setContent={setHtmlContent} 
          setJson={setJsonContent} 
        />
      </div>

    </div>
  );
}

export default CreateNote;