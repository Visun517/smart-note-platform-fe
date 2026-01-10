import { useEffect, useState } from "react";
import {
  BookOpen,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  Lightbulb,
} from "lucide-react";
import { getExplanation } from "../services/ai";
import toast from "react-hot-toast";
interface ExplanationViewProps {
  noteId: string | undefined;
  explanationProps: any;
}

function Explanation({ noteId, explanationProps }: ExplanationViewProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setExplanation(explanationProps?.explanation || '');
  }, [explanationProps]);

  const handleGenerate = async () => {
    if (!noteId) return;

    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const res = await getExplanation(noteId);
      setExplanation(res.data.explanation);
    } catch (err) {
      toast.error("Failed to generate explanation. Please try again.");
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
      <div className="flex items-center justify-between p-4 border border-blue-100 bg-blue-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 text-blue-600 bg-white rounded-lg shadow-sm">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Deep Explanation
            </h2>
            <p className="text-sm text-gray-500">
              Understand complex concepts in detail.
            </p>
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
              <Lightbulb size={18} />{" "}
              {explanation ? "Regenerate" : "Explain Note"}
            </>
          )}
        </button>
      </div>

      {/* --- Content Area --- */}

      {/* 1. Error State */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-700 border border-red-200 bg-red-50 rounded-xl">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Success State (Content) */}
      {explanation && (
        <div className="p-6 duration-500 bg-white border border-gray-200 shadow-sm rounded-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between mb-4">
            <h3 className="flex items-center gap-2 font-bold text-gray-700">
              Detailed Breakdown:
            </h3>
            <button
              onClick={handleCopy}
              className="text-gray-400 transition hover:text-gray-600"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>

          {/* Explanation Text */}
          <div className="leading-relaxed prose text-gray-700 whitespace-pre-line prose-blue max-w-none">
            {explanation}
          </div>
        </div>
      )}

      {/* 3. Empty State */}
      {!explanation && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-gray-200 border-dashed rounded-2xl bg-gray-50/50">
          <BookOpen size={48} className="mb-3 opacity-20" />
          <p>Click "Explain Note" to get a detailed breakdown.</p>
        </div>
      )}
    </div>
  );
}

export default Explanation;
