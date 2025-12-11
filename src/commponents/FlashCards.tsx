import { useEffect, useState } from "react";
import { Layers, RefreshCw, AlertCircle, RotateCw } from "lucide-react";
import { getFlasCards } from "../services/ai"; // Service import

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
      } 
      else if (typeof flashcardProps === 'object') {
        setCards([flashcardProps]); 
      }
    }  }, [flashcardProps]);

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
      console.error(err);
      setError("Failed to generate flashcards. Please try again.");
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
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl border border-orange-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
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
        <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Success State (Cards Grid) */}
      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const isFlipped = flippedCards[card._id];

            return (
              <div
                key={card._id}
                onClick={() => handleFlip(card._id)}
                className="group h-64 perspective-1000 cursor-pointer"
              >
                {/* Inner Container (Rotation Logic) */}
                <div
                  className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-sm group-hover:shadow-md rounded-2xl
                    ${isFlipped ? "rotate-y-180" : ""}
                  `}
                >
                  {/* --- FRONT SIDE (Question) --- */}
                  <div className="absolute w-full h-full backface-hidden bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded uppercase">
                        Question
                      </span>
                      <RotateCw size={16} className="text-gray-300" />
                    </div>
                    <p className="text-lg font-semibold text-gray-800 text-center">
                      {card.front}
                    </p>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Click to flip
                    </p>
                  </div>

                  {/* --- BACK SIDE (Answer) --- */}
                  <div className="absolute w-full h-full backface-hidden bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col justify-between rotate-y-180">
                    <div className="flex justify-between items-start">
                      <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded uppercase">
                        Answer
                      </span>
                      <RotateCw size={16} className="text-orange-300" />
                    </div>
                    <p className="text-base text-gray-700 text-center leading-relaxed">
                      {card.back}
                    </p>
                    <p className="text-xs text-orange-400 text-center mt-2">
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
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 bg-gray-50/50">
          <Layers size={48} className="mb-3 opacity-20" />
          <p>Click "Generate Cards" to create flashcards from your note.</p>
        </div>
      )}
    </div>
  );
}

export default FlashCards;
