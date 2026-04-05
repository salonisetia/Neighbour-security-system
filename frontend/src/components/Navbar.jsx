import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { UserCircle, LogOut } from "lucide-react"; // Added LogOut icon
import ProfileModal from "./ProfileModal";

export default function Navbar() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate(); // Hook to redirect user after logout
    
    // Check if the user is logged in by looking for the token
    const token = localStorage.getItem("userToken");

    const handleProfileClick = () => {
        if (!token) {
            alert("Please login or signup first to edit profile.");
            return;
        }
        setIsProfileModalOpen(true);
    };

    // New Function: Handles removing the token and updating the UI
    const handleLogout = () => {
        localStorage.removeItem("userToken"); // Remove the session token
        navigate("/login"); // Redirect user to the login page
        // Note: If you aren't using a global state (like Context or Redux), 
        // a simple page reload ensures the Navbar updates immediately.
        window.location.reload(); 
    };

    return (
        <>
            <nav className="fixed top-0 w-full h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-3">
                    <UserCircle 
                        onClick={handleProfileClick}
                        className={`w-8 h-8 cursor-pointer transition ${token ? 'text-blue-600 hover:text-blue-700 hover:scale-105' : 'text-slate-400 hover:text-slate-500'}`} 
                    />
                    <span className="text-xl font-bold text-slate-900 tracking-tight">SafeNeighbor</span>
                </div>
                
                <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    
                    {/* CONDITIONAL RENDERING: Check if token exists */}
                    {token ? (
                        <>
                            
                            {/* Logout replaces Login/Signup when token is present */}
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-grey-600 hover:text-blue-700 transition cursor-pointer"
                            >
                                
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
                            <Link to="/signup" className="hover:text-blue-600 transition">Sign Up</Link>
                        </>
                    )}
                    
                    <Link to="/about" className="hover:text-blue-600 transition">About</Link>
                </div>
            </nav>
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        </>
    );
}