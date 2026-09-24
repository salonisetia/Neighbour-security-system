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
            <nav className="fixed top-0 w-full h-16 border-b border-slate-700/70 bg-slate-950/65 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,6,23,0.35)] z-50">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,0.2)]">
                            <UserCircle 
                                onClick={handleProfileClick}
                                className={`h-5 w-5 cursor-pointer transition ${token ? 'text-blue-300 hover:text-blue-200 hover:scale-105' : 'text-slate-300 hover:text-slate-100'}`} 
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold tracking-tight text-white">SafeNeighbour</span>
                            <span className="hidden rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200 sm:inline-block">
                                Security
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
                        <Link to="/" className="transition hover:text-blue-300">Home</Link>
                        {token ? (
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 transition hover:text-blue-300 cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="transition hover:text-blue-300">Login</Link>
                                <Link to="/signup" className="transition hover:text-blue-300">Sign Up</Link>
                            </>
                        )}
                        <Link to="/about" className="transition hover:text-blue-300">About</Link>
                    </div>
                </div>
            </nav>
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        </>
    );
}