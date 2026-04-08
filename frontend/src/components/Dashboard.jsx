import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    Plus, Filter, MapPin, Clock, ShieldCheck, LifeBuoy,
    AlertCircle, Calendar, Megaphone, Send, LayoutDashboard, Bell 
} from "lucide-react";
import PostAlertModal from "./PostAlertModal";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    const [alerts, setAlerts] = useState([]);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    
    // ✅ Setup the API URL from environment variables
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Auth guard
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // NEW: Announcements States
    const [announcements, setAnnouncements] = useState([]);
    const [newsText, setNewsText] = useState("");
    const userRole = localStorage.getItem("userRole");
    
    // Filter States
    const [filters, setFilters] = useState({
        category: "All",
        status: "All",
        date: "" 
    });

    const categories = ["All", "Accident", "Theft", "Fire", "Medical", "Suspicious Activity"];

    // Fetch alerts and announcements from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Alerts - Updated with API_URL
                const alertResponse = await fetch(`${API_URL}/api/get_alert`);
                const alertData = await alertResponse.json();
                if (alertResponse.ok) setAlerts(alertData);

                // 2. Fetch Announcements (News) - Updated with API_URL
                const newsResponse = await fetch(`${API_URL}/api/get_announcements`);
                const newsData = await newsResponse.json();
                if (newsResponse.ok) setAnnouncements(newsData);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, [API_URL]);

    // NEW: Admin Post News Function
    const handlePostNews = async () => {
        if (!newsText.trim()) return;
        try {
            // ✅ Fixed route name to match backend/index.js (post_announcement)
            const response = await fetch(`${API_URL}/api/post_announcement`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: newsText })
            });
            if (response.ok) {
                const newMsg = await response.json();
                setAnnouncements([newMsg, ...announcements]); 
                setNewsText(""); 
                alert("Announcement posted to society!");
            }
        } catch (error) {
            console.error("Failed to post news", error);
        }
    };

    // Filtering Logic
    const filteredAlerts = alerts.filter(alert => {
        const categoryMatch = filters.category === "All" || alert.category === filters.category;
        const statusMatch = filters.status === "All" || alert.status === filters.status;
        const dateMatch = !filters.date || 
            new Date(alert.createdAt).toISOString().split('T')[0] === filters.date;
        return categoryMatch && statusMatch && dateMatch;
    });

    const verifyAlert = async (alertId) => {
        try {
            const response = await fetch(`${API_URL}/api/verify-alert/${alertId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                setAlerts(prev => prev.map(a => a._id === alertId ? { ...a, status: 'verified' } : a));
            }
        } catch (error) {
            console.error("Verification failed", error);
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-16">
            <div className="flex">
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 ml-64 p-6">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* Dashboard Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {userRole === 'admin' ? 'Admin Command Center' : 'Resident Dashboard'}
                                </h1>
                                <p className="text-slate-500 text-sm">Real-time safety updates for your neighborhood</p>
                            </div>
                            
                            <button 
                                onClick={() => setIsPostModalOpen(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                <Plus className="h-5 w-5" />
                                Post Alert
                            </button>
                        </div>

                        {/* ADMIN BROADCAST BOX */}
                        {userRole === 'admin' && (
                            <div className="mb-8 bg-blue-900 text-white p-6 rounded-3xl shadow-xl border border-blue-800">
                                <div className="flex items-center gap-2 mb-4">
                                    <Megaphone className="h-5 w-5 text-blue-300" />
                                    <h2 className="text-lg font-bold">Broadcast Society News</h2>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input 
                                        type="text"
                                        value={newsText}
                                        onChange={(e) => setNewsText(e.target.value)}
                                        placeholder="Alert residents about water cuts, meetings, or safety news..."
                                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <button 
                                        onClick={handlePostNews}
                                        className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send className="h-4 w-4" /> Broadcast
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PUBLIC NEWS FEED */}
                        {announcements.length > 0 ? (
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4 px-1">
                                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Announcements</h3>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {announcements.map((news) => (
                                        <div key={news._id} className="min-w-[320px] bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-200 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">OFFICIAL</span>
                                                <span className="text-[10px] text-slate-400">{new Date(news.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-slate-800 text-sm leading-relaxed">{news.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-3xl text-center shadow-sm">
                                <Megaphone className="h-12 w-12 text-blue-400 mx-auto mb-4 opacity-60" />
                                <h3 className="text-lg font-bold text-slate-900 mb-2">No Announcements Yet</h3>
                                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                                    Society news and official broadcasts will appear here. Check back soon!
                                </p>
                            </div>
                        )}

                        {/* Filters Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            {/* ... filter inputs remain the same ... */}
                        </div>

                        {/* Alerts Grid */}
                        {filteredAlerts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAlerts.map((alert) => (
                                    <div 
                                        key={alert._id}
                                        onClick={() => setSelectedAlert(alert)}
                                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                                    >
                                        {/* ... alert card content ... */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                <AlertCircle className="h-12 w-12 text-slate-300 mb-4 mx-auto" />
                                <h3 className="text-lg font-medium text-slate-900">No alerts found</h3>
                                <p className="text-slate-500 text-sm">Try adjusting your filters or post a new alert.</p>
                            </div>
                        )}
                    </div>
                </main>

                <PostAlertModal 
                    isOpen={isPostModalOpen} 
                    onClose={() => setIsPostModalOpen(false)} 
                />
            </div>
        </div>
    );
}