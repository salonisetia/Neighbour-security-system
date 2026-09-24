import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import { UserCircle, LogOut } from "lucide-react"; // Added LogOut icon
import ProfileModal from "./ProfileModal";

export default function Navbar() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");

    const handleProfileClick = () => {
        if (!token) {
            alert("Please login or signup first to edit profile.");
            return;
        }
        setIsProfileModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        navigate("/login");
        window.location.reload();
    };

    return (
        <>
            <nav className="fixed top-0 w-full h-16 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-3">
                    <UserCircle 
                        onClick={handleProfileClick}
                        className={`w-8 h-8 cursor-pointer transition ${token ? 'text-blue-400 hover:text-blue-300 hover:scale-105' : 'text-slate-400 hover:text-slate-300'}`} 
                    />
                    <span className="text-xl font-bold text-white tracking-tight">SafeNeighbor</span>
                </div>
                
                <div className="flex items-center gap-8 text-sm font-semibold text-slate-300">
                    <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                    {token ? (
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
                            <Link to="/signup" className="hover:text-blue-400 transition">Sign Up</Link>
                        </>
                    )}
                    <Link to="/about" className="hover:text-blue-400 transition">About</Link>
                </div>
            </nav>
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        </>
    );
}