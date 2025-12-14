import { AuthProvider } from "./Context/authContext";
import Router from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'react-hot-toast';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("Google Client ID:", clientId);

function App() {
  return (
    <>
     <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
         
          style: {
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#ecfdf5', 
              color: '#047857',   
              border: '1px solid #a7f3d0',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ecfdf5',
            },
          },
          error: {
            style: {
              background: '#fef2f2', 
              color: '#b91c1c',      
              border: '1px solid #fecaca',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },
        }}
      />
      
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
            <Router />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
