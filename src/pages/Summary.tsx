import { useEffect, useState } from "react";
import { Sparkles, RefreshCw, AlertCircle, Copy, Check } from "lucide-react";
import { getSummary } from "../services/ai";
import toast from "react-hot-toast";
interface SummaryViewProps {
  noteId: string | undefined;
  summaryProps: any;  
}

function Summary({ noteId , summaryProps}: SummaryViewProps ) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSummary(summaryProps?.summaryText || "");
  } , [summaryProps]);

  const handleGenerateSummary = async () => {
    if (!noteId) return;

    setLoading(true);
    setError("");
    setSummary("");
    
    try {
      // Backend request
      const res = await getSummary(noteId);
      setSummary(res.data.summary); 

    } catch (err) {
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy Function
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border border-purple-100 bg-purple-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 text-purple-600 bg-white rounded-lg shadow-sm">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Summary</h2>
            <p className="text-sm text-gray-500">Get a quick overview of your note.</p>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateSummary}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-purple-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} /> {summary ? "Regenerate" : "Generate Summary"}
            </>
          )}
        </button>
      </div>

      {/* --- CONTENT AREA --- */}
      
      {/* 1. Error State */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-700 border border-red-200 bg-red-50 rounded-xl">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Success State (Summary Display) */}
      {summary && (
        <div className="p-6 duration-500 bg-white border border-gray-200 shadow-sm rounded-2xl animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-gray-700">Key Points:</h3>
            <button 
                onClick={handleCopy}
                className="text-gray-400 transition hover:text-gray-600"
                title="Copy to clipboard"
            >
                {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>}
            </button>
          </div>

          {/* Summary Text */}
          <div className="leading-relaxed prose text-gray-600 whitespace-pre-line prose-purple max-w-none">
            {summary}
          </div>

        </div>
      )}

      {/* 3. Empty State (Initial) */}
      {!summary && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-gray-200 border-dashed rounded-2xl bg-gray-50/50">
          <Sparkles size={48} className="mb-3 opacity-20" />
          <p>Click "Generate Summary" to start</p>
        </div>
      )}

    </div>
  );
}

export default Summary;