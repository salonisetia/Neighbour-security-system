import { ShieldCheck, Users, MapPin, AlertCircle, Phone, Mail } from "lucide-react";
import Navbar from "./Navbar";

export default function About() {
    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-slate-950 py-20 px-6 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm px-6 py-4 rounded-3xl shadow-xl border border-slate-800 mb-8">
                        <ShieldCheck className="w-12 h-12 text-blue-400" />
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                                SafeNeighbor
                            </h1>
                            <p className="text-xl text-slate-300 mt-2 font-medium">Your Neighborhood Safety Network</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8">Real-time Safety Alerts</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 hover:shadow-xl">
                                <AlertCircle className="w-10 h-10 text-orange-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-2">Instant Notifications</h3>
                                    <p className="text-slate-300 leading-relaxed">Receive immediate alerts about safety incidents in your immediate neighborhood.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 hover:shadow-xl">
                                <MapPin className="w-10 h-10 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-2">Geo-Localized</h3>
                                    <p className="text-slate-300 leading-relaxed">Only relevant alerts for your specific location - no spam.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-8">Community Powered</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 hover:shadow-xl">
                                <Users className="w-10 h-10 text-blue-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-2">Verified Reports</h3>
                                    <p className="text-slate-300 leading-relaxed">Community verification system for alert accuracy and reliability.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 hover:shadow-xl">
                                <ShieldCheck className="w-10 h-10 text-purple-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-white mb-2">Secure & Private</h3>
                                    <p className="text-slate-300 leading-relaxed">JWT authentication with privacy-first design.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-12 shadow-2xl border border-slate-800 text-center">
                    <h2 className="text-3xl font-bold text-white mb-12">Stay Connected</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="space-y-3 p-6 rounded-2xl hover:bg-slate-800 transition">
                            <Phone className="w-12 h-12 text-blue-400 mx-auto" />
                            <p className="text-white font-bold text-lg">Emergency</p>
                            <p className="text-sm text-slate-300">+1 (555) 123-SAFE</p>
                        </div>
                        <div className="space-y-3 p-6 rounded-2xl hover:bg-slate-800 transition">
                            <Mail className="w-12 h-12 text-emerald-400 mx-auto" />
                            <p className="text-white font-bold text-lg">Support</p>
                            <p className="text-sm text-slate-300">hello@safeneighbor.com</p>
                        </div>
                        <div className="space-y-3 p-6 rounded-2xl hover:bg-slate-800 transition">
                            <Users className="w-12 h-12 text-purple-400 mx-auto" />
                            <p className="text-white font-bold text-lg">Community</p>
                            <p className="text-sm text-slate-300">25+ Neighborhoods</p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-slate-400 mt-16">
                    © 2024 SafeNeighbor. Building safer communities.
                </p>
            </div>
        </div>
        </>
    );
}
