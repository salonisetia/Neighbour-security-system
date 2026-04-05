import { useState, useEffect } from "react";
import { User, Mail, Home, Lock, Shield, Save, Camera, X } from "lucide-react";

export default function ProfileModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        houseNumber: "",
        password: "",
        profilePic: ""
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Fetch current user data on open
    useEffect(() => {
        if (!isOpen) return;
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    onClose();
                    return;
                }
                const response = await fetch("/api/user-profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData({
                        username: data.username || "",
                        email: data.email || "",
                        houseNumber: data.houseNumber || "",
                        password: data.phoneNumber || "",
                        profilePic: data.profilePic || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchUserData();
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: "", text: "" });

        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                setMessage({ type: "error", text: "Please login again." });
                return;
            }
            const response = await fetch("/api/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: {
                    ...formData,
                    phoneNumber: formData.password  // Map password field to backend phoneNumber
                }
            });

            if (response.ok) {
                setMessage({ type: "success", text: "Profile updated successfully!" });
            } else {
                setMessage({ type: "error", text: "Failed to update profile." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error. Try again." });
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in zoom-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <X className="h-6 w-6 text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Avatar Section */}
                    <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                        <div className="relative group">
                            <div className="h-24 w-24 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                                {formData.profilePic ? (
                                    <img src={formData.profilePic} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-12 w-12" />
                                )}
                            </div>
                            <button type="button" className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-100 hover:text-blue-600 transition-colors">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                            <p className="text-sm text-slate-500">Update your photo and details below.</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <User className="h-4 w-4 text-slate-400" /> Username
                            </label>
                            <input 
                                type="text" name="username" value={formData.username} onChange={handleChange}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-400" /> Email Address
                            </label>
                            <input 
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Home className="h-4 w-4 text-slate-400" /> House/Flat Number
                            </label>
                            <input 
                                type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Lock className="h-4 w-4 text-slate-400" /> Password
                            </label>
                            <input 
                                type="password" name="password" value={formData.password} onChange={handleChange}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Status Messages */}
                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="h-5 w-5" />
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
