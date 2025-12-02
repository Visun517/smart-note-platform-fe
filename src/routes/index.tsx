import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const WelCome = lazy(() => import("../pages/WelCome"));
const AiWorkSpace = lazy(() => import("../pages/AiWorkSpace"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const NoteEdit = lazy(() => import("../pages/NoteEdit"));
const NoteView = lazy(() => import("../pages/NoteView"));
const Profile = lazy(() => import("../pages/Profile"));
const SignUp = lazy(() => import("../pages/SingUp"));
const NoteList = lazy(() => import("../pages/NoteList"));
const CreateNote = lazy(() => import("../pages/CreateNote"));
const Explanation = lazy(() => import("../pages/Exaplanation"));
const Summary = lazy(() => import("../pages/Summary"));
const Quiz = lazy(() => import("../pages/Quiz"));
const FlashCard = lazy(() => import("../pages/FlashCards"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
import type { ReactNode } from "react";
import AppShell from "../commponents/AppShell"; // your sidebar + navbar layout
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

 
function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<WelCome />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="auth/signup" element={<SignUp />} />

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="notes">
              <Route index element={<NoteList />} />
              <Route path="new" element={<CreateNote />} />
              <Route path=":id">
                <Route index element={<NoteView />} />
                <Route path="edit" element={<NoteEdit />} />
              </Route>
            </Route>

            <Route path="ai">
              <Route path=":id" element={<AiWorkSpace />}>
                <Route path="summary" element={<Summary />} />
                <Route path="explanation" element={<Explanation />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="flashcards" element={<FlashCard />} />
              </Route>
            </Route>

            <Route path="profile" element={<Profile />} />
          </Route>  
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
