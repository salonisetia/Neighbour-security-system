import { useState } from "react";
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [formData, setformData] = useState({
        email: "",
        password: "",
    });
const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            // Save the token exactly how your Dashboard/PostAlertModal expects it
localStorage.setItem("userToken", data.token);
localStorage.setItem("userRole", data.role || 'resident');
console.log('LOGIN DEBUG - stored role:', data.role, 'localStorage:', localStorage.getItem("userRole"));
alert(data.message || "Login successful");
            navigate("/dashboard");
        } else {
            alert(data.error || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Server connection failed");
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                {/* Brand Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <ShieldCheck className="text-white h-8 w-8" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Log in to monitor your neighborhood activity.
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3.5"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-slate-600">
                            <input type="checkbox" className="mr-2 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            Remember me
                        </label>
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md active:scale-[0.98]"
                    >
                        Secure Login
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}