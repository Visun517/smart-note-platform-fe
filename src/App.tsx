import { AuthProvider } from "./Context/authContext";
import Router from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("Google Client ID:", clientId);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
            <Router />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
