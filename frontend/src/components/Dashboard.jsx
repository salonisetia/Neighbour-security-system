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
    
    // Auth guard
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    if (!token) return null;

    
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
                // 1. Fetch Alerts
                const alertResponse = await fetch("/api/get_alert");
                const alertData = await alertResponse.json();
                if (alertResponse.ok) setAlerts(alertData);

                // 2. Fetch Announcements (News)
                const newsResponse = await fetch("/api/get_announcements");
                const newsData = await newsResponse.json();
                if (newsResponse.ok) setAnnouncements(newsData);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    // NEW: Admin Post News Function
    const handlePostNews = async () => {
        if (!newsText.trim()) return;
        try {
            const response = await fetch("/api/post-announcement", {
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
            const response = await fetch(`/api/verify-alert/${alertId}`, {
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

                        {/* --- NEW SECTION: ADMIN BROADCAST BOX --- */}
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

                        {/* --- NEW SECTION: PUBLIC NEWS FEED --- */}
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
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Category</label>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <select 
                                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Status</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <select 
                                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="verified">Verified</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <input 
                                        type="date"
                                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setFilters({...filters, date: e.target.value})}
                                    />
                                </div>
                            </div>
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
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                alert.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {alert.status}
                                            </span>
                                            <Clock className="h-4 w-4 text-slate-400" />
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            {alert.category}
                                        </h3>
                                        <p className="text-slate-500 text-xs font-medium mb-3">{alert.title}</p>
                                        
                                        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                                            {alert.description}
                                        </p>
                                        
                                        {/* ADMIN ONLY: Verify Button */}
                                        {userRole === 'admin' && alert.status === 'pending' && (
                                            <button 
                                                onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    verifyAlert(alert._id); 
                                                }}
                                                className="mb-4 w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
                                            >
                                                Verify Alert
                                            </button>
                                        )}
                                        
                                        <div className="flex items-center gap-2 text-slate-400 text-[11px] border-t pt-4">
                                            <MapPin className="h-3 w-3" />
                                            {alert.location?.address || alert.location}
                                        </div>
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

                {/* Detailed Alert Modal */}
                {selectedAlert && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
                        <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-200">
                            <button 
                                onClick={() => setSelectedAlert(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl"
                            >✕</button>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2 rounded-xl ${selectedAlert.status === 'verified' ? 'bg-green-100' : 'bg-amber-100'}`}>
                                    {selectedAlert.status === 'verified' ? <ShieldCheck className="text-green-600" /> : <AlertCircle className="text-amber-600" />}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedAlert.category}</h2>
                                    <p className="text-xs text-slate-500">{selectedAlert.status === 'verified' ? 'Officially Verified' : 'Awaiting Verification'}</p>
                                </div>
                            </div>

                            <h4 className="font-bold text-slate-800 mb-2">{selectedAlert.title}</h4>
                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{selectedAlert.description}</p>
                            
                            <div className="space-y-3 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <MapPin className="h-4 w-4 text-blue-500" />
                                    {selectedAlert.location?.address || selectedAlert.location}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    {new Date(selectedAlert.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <PostAlertModal 
                    isOpen={isPostModalOpen} 
                    onClose={() => setIsPostModalOpen(false)} 
                />
            </div>
        </div>
    );
}

