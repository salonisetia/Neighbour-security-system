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

    const highlights = [
        "Live alerts",
        "Community response",
        "Smart safety updates",
    ];

    const metrics = [
        { value: "24/7", label: "Local monitoring" },
        { value: "12k+", label: "Neighborhood updates" },
        { value: "99.9%", label: "Response uptime" },
    ];

    return (
        <div className="min-h-screen text-slate-100 font-sans">
            <div className="flex flex-1 pt-24">
                <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-10 md:px-10 lg:pt-16">
                    <div className="w-full max-w-5xl text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-slate-900/60 px-4 py-2 shadow-[0_0_30px_rgba(59,130,246,0.18)] backdrop-blur-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium tracking-[0.18em] text-blue-100 uppercase">Trusted neighborhood security</span>
                            </div>
                        </div>

                        <div className="mx-auto max-w-4xl space-y-8">
                            <h1 className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                                Stay informed.
                                <span className="block bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    Stay protected.
                                </span>
                            </h1>

                            <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
                                Empowering communities to share real-time safety alerts, coordinate rapid response, and build stronger, more resilient neighborhoods.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
                                <Link to="/signup">
                                    <button className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.55)]">
                                        Get Started
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </Link>
                                <Link to="/about">
                                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-8 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm transition hover:border-blue-400/60 hover:text-white">
                                        Learn More
                                    </button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                {highlights.map((item) => (
                                    <div key={item} className="rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-200">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-14 grid gap-4 sm:grid-cols-3">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="rounded-3xl border border-slate-700/80 bg-slate-900/50 p-6 shadow-[0_10px_30px_rgba(2,6,23,0.45)] backdrop-blur-md">
                                    <div className="text-3xl font-black text-white">{metric.value}</div>
                                    <div className="mt-2 text-sm text-slate-300">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
