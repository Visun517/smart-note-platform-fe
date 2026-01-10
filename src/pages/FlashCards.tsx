import { useEffect, useState } from "react";
import { Layers, RefreshCw, AlertCircle, RotateCw } from "lucide-react";
import { getFlasCards } from "../services/ai"; // Service import
import toast from "react-hot-toast";

interface FlashCardsViewProps {
  noteId: string | undefined;
  flashcardProps: any;
}

interface IFlashcard {
  _id: string;
  front: string;
  back: string;
  noteId: string;
}

function FlashCards({ noteId, flashcardProps }: FlashCardsViewProps) {
  console.log(flashcardProps);

  const [cards, setCards] = useState<IFlashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (flashcardProps) {
      if (Array.isArray(flashcardProps)) {
        setCards(flashcardProps);
      } else if (typeof flashcardProps === "object") {
        setCards([flashcardProps]);
      }
    }
  }, [flashcardProps]);

  // Generate Function
  const handleGenerate = async () => {
    if (!noteId) return;

    setLoading(true);
    setError("");
    setCards([]);

    try {
      const res = await getFlasCards(noteId);
      setCards(res.data.flashcards);
    } catch (err) {
      toast.error("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-6xl pb-10 mx-auto space-y-8">
      {/* --- Header Section --- */}
      <div className="flex items-center justify-between p-4 border border-orange-100 bg-orange-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 text-orange-600 bg-white rounded-lg shadow-sm">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Flashcards</h2>
            <p className="text-sm text-gray-500">
              Test your knowledge with active recall.
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Layers size={18} />{" "}
              {cards.length > 0 ? "Regenerate Cards" : "Generate Cards"}
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

      {/* 2. Success State (Cards Grid) */}
      {cards.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const isFlipped = flippedCards[card._id];

            return (
              <div
                key={card._id}
                onClick={() => handleFlip(card._id)}
                className="h-64 cursor-pointer group perspective-1000"
              >
                {/* Inner Container (Rotation Logic) */}
                <div
                  className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-sm group-hover:shadow-md rounded-2xl
                    ${isFlipped ? "rotate-y-180" : ""}
                  `}
                >
                  {/* --- FRONT SIDE (Question) --- */}
                  <div className="absolute flex flex-col justify-between w-full h-full p-6 bg-white border border-gray-200 backface-hidden rounded-2xl">
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-1 text-xs font-bold text-orange-600 uppercase bg-orange-100 rounded">
                        Question
                      </span>
                      <RotateCw size={16} className="text-gray-300" />
                    </div>
                    <p className="text-lg font-semibold text-center text-gray-800">
                      {card.front}
                    </p>
                    <p className="mt-2 text-xs text-center text-gray-400">
                      Click to flip
                    </p>
                  </div>

                  {/* --- BACK SIDE (Answer) --- */}
                  <div className="absolute flex flex-col justify-between w-full h-full p-6 border border-orange-200 backface-hidden bg-orange-50 rounded-2xl rotate-y-180">
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-1 text-xs font-bold text-green-600 uppercase bg-green-100 rounded">
                        Answer
                      </span>
                      <RotateCw size={16} className="text-orange-300" />
                    </div>
                    <p className="text-base leading-relaxed text-center text-gray-700">
                      {card.back}
                    </p>
                    <p className="mt-2 text-xs text-center text-orange-400">
                      Click to flip back
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Empty State */}
      {!cards.length && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-gray-200 border-dashed rounded-2xl bg-gray-50/50">
          <Layers size={48} className="mb-3 opacity-20" />
          <p>Click "Generate Cards" to create flashcards from your note.</p>
        </div>
      )}
    </div>
  );
}

export default FlashCards;
