import { useState } from "react";
import { BookOpen, RefreshCw, AlertCircle, Copy, Check, Lightbulb } from "lucide-react";
import { getExplanation } from "../services/ai"; 
interface ExplanationViewProps {
  noteId: string | undefined;
}

function Explanation({ noteId }: ExplanationViewProps) {
  
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!noteId) return;

    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const res = await getExplanation(noteId);
      console.log(res)
      setExplanation(res.data.explanation); 
    } catch (err) {
      console.error(err);
      setError("Failed to generate explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* --- Header Section (Blue Theme) --- */}
      <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Deep Explanation</h2>
            <p className="text-sm text-gray-500">Understand complex concepts in detail.</p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Lightbulb size={18} /> {explanation ? "Regenerate" : "Explain Note"}
            </>
          )}
        </button>
      </div>

      {/* --- Content Area --- */}

      {/* 1. Error State */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Success State (Content) */}
      {explanation && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
                Detailed Breakdown:
            </h3>
            <button 
                onClick={handleCopy}
                className="text-gray-400 hover:text-gray-600 transition"
                title="Copy to clipboard"
            >
                {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>}
            </button>
          </div>

          {/* Explanation Text */}
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {explanation}
          </div>

        </div>
      )}

      {/* 3. Empty State */}
      {!explanation && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 bg-gray-50/50">
          <BookOpen size={48} className="mb-3 opacity-20" />
          <p>Click "Explain Note" to get a detailed breakdown.</p>
        </div>
      )}

    </div>
  );
}

export default Explanation;