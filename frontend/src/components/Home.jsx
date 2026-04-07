import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, UserCircle, LayoutDashboard, Bell, Settings, ArrowRight, LifeBuoy } from "lucide-react";  

export default function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            
            {/* 1. TOP NAVIGATION BAR 
            <nav className="fixed top-0 w-full h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-3">
                    <UserCircle className="text-slate-400 w-8 h-8 cursor-pointer hover:text-blue-600 transition" />
                    <span className="text-xl font-bold text-slate-900 tracking-tight">SafeNeighbor</span>
                </div>
                
                <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
                    <Link to="/signup" className="hover:text-blue-600 transition">Sign Up</Link>
                    <Link to="/myalerts" className="hover:text-blue-600 transition">My Alerts</Link>
                </div>
            </nav>*/}

            <div className="flex flex-1 pt-16">
                

                {/* 3. HERO SECTION */}
                <main className="flex-1 flex flex-col items-center justify-center p-12 w-full">
                    <div className="text-center space-y-6 max-w-2xl">
                        {/* Website Logo */}
                        <div className="flex justify-center">
                            <div className="p-5 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-200">
                                <ShieldCheck className="text-white w-16 h-16" />
                            </div>
                        </div>

                        {/* Quotation */}
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                                Stay Informed, Stay Safe.
                            </h1>
                            <p className="text-slate-500 text-lg">    
                                Empowering neighbors to protect one another through real-time updates and collective vigilance.
                            </p>
                        </div>

                        {/* Get Started Button - Horizontally Centered */}
                        <div className="flex justify-center pt-4">
                            <Link to="/signup">
                                <button className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                                    Get Started
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
