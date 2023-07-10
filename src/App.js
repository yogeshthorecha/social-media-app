import {Routes,Route} from "react-router-dom"
import './App.css';
import {Toaster} from "react-hot-toast"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./components/Auth";
import BookmarksPage from "./pages/BookmarksPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import { SinglePostPage } from "./pages/SinglePostPage";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <AuthProvider><HomePage/></AuthProvider>
        }/>
        <Route path="/explore" element={<AuthProvider><ExplorePage/></AuthProvider>}/>
        <Route path="/bookmarks" element={<AuthProvider><BookmarksPage/></AuthProvider>} />
        <Route path="/profile/:usernameParam" element={<AuthProvider><ProfilePage /></AuthProvider>} />
        <Route path="/singlepost/:postId" element={<AuthProvider><SinglePostPage/></AuthProvider>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
      
      <Toaster />
    </div>
  );
}

export default App;
