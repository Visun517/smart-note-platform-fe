import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, BookOpen, BrainCircuit, Layers } from "lucide-react";

import SummaryView from "../commponents/Summary";
import ExplanationView from "../commponents/Exaplanation";
import QuizView from "../commponents/Quiz";
import FlashcardsView from "../commponents/FlashCards";
import { getNoteById } from "../services/note";

const AiWorkspace = () => {
  const { noteId } = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    fetchNoteById(noteId)
  }, [noteId]);

  const fetchNoteById = async (id: string | undefined) => {
      const note = await getNoteById(id);
      setNoteData(note.data.note);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* --- 1. Tab Navigation Bar --- */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">AI Study Workspace 🤖</h1>
        
        <div className="flex gap-4 border-b border-gray-100">
          <TabButton 
            isActive={activeTab === 'summary'} 
            onClick={() => setActiveTab('summary')} 
            icon={<FileText size={18}/>} 
            label="Summary" 
          />
          <TabButton 
            isActive={activeTab === 'explanation'} 
            onClick={() => setActiveTab('explanation')} 
            icon={<BookOpen size={18}/>} 
            label="Explanation" 
          />
          <TabButton 
            isActive={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')} 
            icon={<BrainCircuit size={18}/>} 
            label="Quiz" 
          />
          <TabButton 
            isActive={activeTab === 'flashcards'} 
            onClick={() => setActiveTab('flashcards')} 
            icon={<Layers size={18}/>} 
            label="Flashcards" 
          />
        </div>
      </div>

      {/* --- 2. Dynamic Content Area --- */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'summary' && <SummaryView noteId={noteId} />}
        {activeTab === 'explanation' && <ExplanationView noteId={noteId} />}
        {activeTab === 'quiz' && <QuizView noteId={noteId} />}
        {activeTab === 'flashcards' && <FlashcardsView noteId={noteId} />}
      </div>

    </div>
  );
};  

const TabButton = ({ isActive, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 
      ${isActive 
        ? "border-blue-600 text-blue-600 bg-blue-50/50" 
        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default AiWorkspace;