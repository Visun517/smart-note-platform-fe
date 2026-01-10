import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, BookOpen, BrainCircuit, Layers } from "lucide-react";

import SummaryView from "./Summary";
import ExplanationView from "./Exaplanation";
import QuizView from "./Quiz";
import FlashcardsView from "./FlashCards";
import { getNoteById } from "../services/note";
import { getAigeneratedContent } from "../services/aigeneratedContent";
import TabButton from "../commponents/TabButton";

const AiWorkspace = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const [noteData, setNoteData] = useState(null);
  const [aigeneratedContent, setAigeneratedContent] = useState<any>(null);

  useEffect(() => {
    fetchNoteById(id);
    fetchAigeneratedContent(id);
  }, [id]);

  const fetchAigeneratedContent = async (id: string | undefined) => {
    const aigeneratedContent = await getAigeneratedContent(id);
    // console.log(aigeneratedContent.data)
    setAigeneratedContent(aigeneratedContent.data);
  };
  const fetchNoteById = async (id: string | undefined) => {
    const note = await getNoteById(id);
    setNoteData(note.data.note);
    console.log(noteData)
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* --- 1. Tab Navigation Bar --- */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="mb-4 text-xl font-bold text-gray-800">
          AI Study Workspace 🤖
        </h1>

        <div className="flex gap-4 border-b border-gray-100">
          <TabButton
            isActive={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
            icon={<FileText size={18} />}
            label="Summary"
          />
          <TabButton
            isActive={activeTab === "explanation"}
            onClick={() => setActiveTab("explanation")}
            icon={<BookOpen size={18} />}
            label="Explanation"
          />
          <TabButton
            isActive={activeTab === "quiz"}
            onClick={() => setActiveTab("quiz")}
            icon={<BrainCircuit size={18} />}
            label="Quiz"
          />
          <TabButton
            isActive={activeTab === "flashcards"}
            onClick={() => setActiveTab("flashcards")}
            icon={<Layers size={18} />}
            label="Flashcards"
          />
        </div>
      </div>

      {/* --- 2. Dynamic Content Area --- */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "summary" && (
          <SummaryView noteId={id} summaryProps={aigeneratedContent?.summary} />
        )}
        {activeTab === "explanation" && (
          <ExplanationView noteId={id} explanationProps={aigeneratedContent?.explanation}  />
          )}
        {activeTab === "quiz" &&(
           <QuizView noteId={id} quizProps={aigeneratedContent?.quiz} />
           )}
        {activeTab === "flashcards" && (
          <FlashcardsView noteId={id} flashcardProps={aigeneratedContent?.flashcard} />
          )}
      </div>
    </div>
  );
};

export default AiWorkspace;
