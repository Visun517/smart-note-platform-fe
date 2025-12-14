# 🎓 SmartNotes - AI-Powered Study Companion (Frontend)

![Project Banner](public/logo.png)

**SmartNotes** is a modern, full-stack web application designed to revolutionize the way students learn. It combines a powerful rich-text editor with **Google Gemini AI** to automatically generate study materials like summaries, quizzes, and flashcards directly from your lecture notes.

---

## 🌟 Key Features

### 🔐 Authentication & User Management
* **Secure Login/Signup:** Robust Email & Password authentication using JWT.
* **Google OAuth:** Seamless one-click sign-in using Google accounts.
* **Profile Management:** Update user details and profile picture with **Cloudinary** integration.

### 📝 Advanced Note Editor (Tiptap)
* **Rich Text Formatting:** Support for **Bold**, *Italic*, Headings, Lists, Code Blocks, and Quotes.
* **Table Support:** Insert and manage tables dynamically within notes.
* **Multimedia Integration:**
    * Upload and embed Images effortlessly.
    * **PDF Handling:** Convert PDF pages into images and embed them directly into notes for easy annotation.
* **Drawing Tool:** Built-in sketching canvas (`react-sketch-canvas`) to draw diagrams and insert them as images.

### 🤖 AI Workspace (Powered by Gemini 1.5 Flash)
* **Instant Summaries:** Generate concise summaries of long lecture notes in seconds.
* **Deep Explanations:** Get detailed AI-driven breakdowns for complex topics.
* **Interactive Quizzes:** Auto-generate MCQs based on your notes, take quizzes, and get instant scoring/feedback.
* **Flashcards:** AI-generated flashcards with an interactive 3D flip animation for active recall study.

### 📂 Organization & Productivity
* **Dashboard:** Visual analytics of your study progress (Total notes, Quiz stats) using **Recharts**.
* **Subject Folders:** Organize notes into specific subject folders for better structure.
* **Global Search:** Real-time search functionality to find notes instantly.
* **Trash Bin:** Soft delete notes with options to **Restore** or **Delete Forever**.

### 🎨 UI/UX
* **Responsive Design:** Fully responsive layout optimized for both Desktop and Mobile devices.
* **Theme Support:** Toggle between **Light** and **Dark** modes based on preference.
* **Modern Components:** Built with **Tailwind CSS** and **Lucide React** icons for a clean, modern look.
* **Notifications:** Beautiful toast notifications using `react-hot-toast`.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Editor** | [Tiptap](https://tiptap.dev/) |
| **Drawing** | [React Sketch Canvas](https://github.com/vinothpandian/react-sketch-canvas) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Routing** | [React Router DOM](https://reactrouter.com/) |
| **API Client** | [Axios](https://axios-http.com/) |
| **Auth** | [React OAuth/Google](https://github.com/MomenSherif/react-oauth) |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/smart-note-platform.git](https://github.com/your-username/smart-note-platform.git)
cd smart-note-platform/front-end
