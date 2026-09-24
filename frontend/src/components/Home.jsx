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
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <div className="flex flex-1 pt-16 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_30%)]">
                <main className="flex-1 flex flex-col items-center justify-center p-12 w-full">
                    <div className="text-center space-y-6 max-w-2xl">
                        <div className="flex justify-center">
                            <div className="p-5 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-900/40">
                                <ShieldCheck className="text-white w-16 h-16" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-white tracking-tight">
                                Stay Informed, Stay Safe.
                            </h1>
                            <p className="text-slate-300 text-lg">
                                Empowering neighbors to protect one another through real-time updates and collective vigilance.
                            </p>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Link to="/signup">
                                <button className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 active:scale-95">
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
