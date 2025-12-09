import { useState } from "react";
import { Sparkles, RefreshCw, AlertCircle, Copy, Check } from "lucide-react";
import { getSummary } from "../services/ai"; // Service එක import කරන්න

interface SummaryViewProps {
  noteId: string | undefined;
}

// ⚠️ නිවැරදි කිරීම: props ගන්නකොට { noteId } ලෙස destructure කරන්න ඕන.
function Summary({ noteId }: SummaryViewProps) {
  
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Summary Generate කරන Function එක
  const handleGenerateSummary = async () => {
    if (!noteId) return;

    setLoading(true);
    setError("");
    setSummary("");
    
    try {
      // Backend request
      const res = await getSummary(noteId);
      
      // Backend එකෙන් එන response structure එක අනුව මෙය වෙනස් කරන්න
      // උදා: res.data.summary හෝ res.data.data
      setSummary(res.data.summary); 

    } catch (err) {
      console.error(err);
      setError("Failed to generate summary. Please try again.");
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
      <div className="flex justify-between items-center bg-purple-50 p-4 rounded-xl border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
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
        <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Success State (Summary Display) */}
      {summary && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-gray-700">Key Points:</h3>
            <button 
                onClick={handleCopy}
                className="text-gray-400 hover:text-gray-600 transition"
                title="Copy to clipboard"
            >
                {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>}
            </button>
          </div>

          {/* Summary Text */}
          <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
            {summary}
          </div>

        </div>
      )}

      {/* 3. Empty State (Initial) */}
      {!summary && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 bg-gray-50/50">
          <Sparkles size={48} className="mb-3 opacity-20" />
          <p>Click "Generate Summary" to start</p>
        </div>
      )}

    </div>
  );
}

export default Summary;