import { useCallback, useRef, useState, useEffect } from "react"; // useEffect එකතු කළා
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  PenTool,
  X,
  Check,
  Eraser,
  Trash2,
  Table as TableIcon,
  MinusSquare,
  PlusSquare,
} from "lucide-react";
import { uploadImage, uploadPdf } from "../services/cloudinary";
import { convertPdfToImages } from "../utils/pdfUtils";

// Props Interface
interface NotePadProps {
  content: string;
  setContent: (html: string) => void;
  setJson: (json: any) => void;
}

interface DrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageSrc: string) => void;
}

const DrawingModal = ({ isOpen, onClose, onInsert }: DrawingModalProps) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(4);

  if (!isOpen) return null;

  const handleInsert = async () => {
    if (canvasRef.current) {
      const dataUrl = await canvasRef.current.exportImage("png");
      onInsert(dataUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <PenTool size={20} className="text-blue-600" /> Draw Something
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
            <X size={24} />
          </button>
        </div>

        <div className="h-[400px] bg-white relative">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            canvasColor="transparent"
            style={{ border: "none" }}
          />
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["black", "red", "blue", "green", "#eab308"].map((color) => (
                <button
                  key={color}
                  onClick={() => setStrokeColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    strokeColor === color
                      ? "border-gray-600 scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <button onClick={() => canvasRef.current?.eraseMode(true)} className="text-gray-600 hover:text-blue-600 tooltip" title="Eraser">
              <Eraser size={20} />
            </button>
            <button onClick={() => canvasRef.current?.eraseMode(false)} className="text-gray-600 hover:text-blue-600 font-bold text-sm border border-gray-300 px-2 py-0.5 rounded">
              Pen
            </button>
            <button onClick={() => canvasRef.current?.clearCanvas()} className="text-red-500 hover:bg-red-50 p-1 rounded" title="Clear All">
              <Trash2 size={20} />
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={() => canvasRef.current?.undo()} className="text-gray-500 hover:text-gray-800 text-sm font-medium">
              Undo
            </button>
            <button onClick={handleInsert} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium transition shadow-lg shadow-blue-200">
              <Check size={18} /> Insert Drawing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuBar = ({ editor, onOpenDrawing }: { editor: any; onOpenDrawing: () => void; }) => {
  if (!editor) return null;

  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const btnClass = (isActive: boolean) =>
    `p-2 rounded-lg transition-colors ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    }`;

  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formdata = new FormData();
    if (file) {
      try {
        formdata.append("file", file!);
        const res = await uploadImage(formdata);
        editor.chain().focus().setImage({ src: res.data.imageUrl }).run();
      } catch (error) {
        console.log(error);
        alert("Image upload failed");
      }
    }
  };

  const addPdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 1. Pages Display
        const images = await convertPdfToImages(file);
        images.forEach((imgSrc) => {
          editor.chain().focus().setImage({ src: imgSrc }).run();
          editor.chain().focus().insertContent('<p></p>').run(); 
        });

        // 2. Link Display
        const formdata = new FormData();
        formdata.append("file", file!);
        const res = await uploadPdf(formdata);
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: res.data.imageUrl })
          .insertContent(` 📄 ${file.name} `)
          .run();
      } catch (error) {
        console.log(error);
        alert("PDF upload failed");
      }
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50/50 p-2 flex flex-wrap gap-1 sticky top-0 z-20 backdrop-blur-sm rounded-t-xl items-center">
      <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={addImage} />
      <input type="file" accept=".pdf" ref={pdfInputRef} className="hidden" onChange={addPdf} />

      <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}><Bold size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}><Italic size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive("underline"))}><UnderlineIcon size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive("strike"))}><Strikethrough size={18} /></button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive("heading", { level: 1 }))}><Heading1 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}><Heading2 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}><List size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}><ListOrdered size={18} /></button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={btnClass(editor.isActive({ textAlign: "left" }))}><AlignLeft size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={btnClass(editor.isActive({ textAlign: "center" }))}><AlignCenter size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={btnClass(editor.isActive({ textAlign: "right" }))}><AlignRight size={18} /></button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button onClick={insertTable} className={btnClass(editor.isActive('table'))} title="Insert Table"><TableIcon size={18} /></button>

      {editor.isActive('table') && (
        <div className="flex gap-1 bg-white border border-gray-200 rounded-lg px-2 ml-2 animate-in fade-in">
           <button onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-1 hover:text-blue-600"><PlusSquare size={16} className="rotate-90"/></button>
           <button onClick={() => editor.chain().focus().deleteColumn().run()} className="p-1 hover:text-red-500"><MinusSquare size={16} className="rotate-90"/></button>
           <div className="w-px h-4 bg-gray-300 self-center"></div>
           <button onClick={() => editor.chain().focus().addRowAfter().run()} className="p-1 hover:text-blue-600"><PlusSquare size={16} /></button>
           <button onClick={() => editor.chain().focus().deleteRow().run()} className="p-1 hover:text-red-500"><MinusSquare size={16} /></button>
           <div className="w-px h-4 bg-gray-300 self-center"></div>
           <button onClick={() => editor.chain().focus().deleteTable().run()} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
        </div>
      )}

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button onClick={setLink} className={btnClass(editor.isActive("link"))}><LinkIcon size={18} /></button>
      <button onClick={onOpenDrawing} className={`${btnClass(false)} text-purple-600 hover:bg-purple-50`}><PenTool size={18} /></button>
      <button onClick={() => imageInputRef.current?.click()} className={btnClass(false)}><ImageIcon size={18} /></button>
      <button onClick={() => pdfInputRef.current?.click()} className={btnClass(false)}><FileText size={18} /></button>

      <div className="flex-grow"></div>

      <button onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)}><Undo size={18} /></button>
      <button onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)}><Redo size={18} /></button>
    </div>
  );
};

// --- MAIN NOTEPAD COMPONENT ---
const NotePad = ({ content, setContent, setJson }: NotePadProps) => {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Type something amazing..." }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: true, autolink: true }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content, 
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none m-5 focus:outline-none min-h-[400px] text-gray-800",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      setJson(editor.getJSON());
    },
  });


  useEffect(() => {
    if (editor && content) {
      if (editor.getHTML() !== content) {
         editor.commands.setContent(content);
      }
    }
  }, [content, editor]);


  const handleInsertDrawing = (imageSrc: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: imageSrc }).run();
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px] flex flex-col">
        <MenuBar editor={editor} onOpenDrawing={() => setIsDrawingOpen(true)} />
        <div
          className="flex-1 cursor-text"
          onClick={() => editor?.chain().focus().run()}
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <DrawingModal
        isOpen={isDrawingOpen}
        onClose={() => setIsDrawingOpen(false)}
        onInsert={handleInsertDrawing}
      />
    </>
  );
};

export default NotePad;