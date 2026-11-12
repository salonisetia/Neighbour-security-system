import { useState } from "react";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, MapPin } from "lucide-react";

export default function Signup() {
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "", 
        role: "resident"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            setPasswordError("");
        }
    };

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
        setStep(2);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, location, role } = formData;
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/signup`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, location, role }) 
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userToken", data.token);
                window.location.href ="/dashboard";
            } else {
                alert("Signup failed: " + data.error);
            }
        } catch (error) {
            console.error("Connection error:", error);
            alert("Network error. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-slate-900 p-10 rounded-2xl shadow-2xl border border-slate-800">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30">
                        <ShieldCheck className="text-white h-8 w-8" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white">Create Account</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Join your local community security network
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 text-sm">
                    <span className={step === 1 ? "font-semibold text-blue-400" : "text-slate-500"}>
                        1. Account details
                    </span>
                    <span className="text-slate-600">—</span>
                    <span className={step === 2 ? "font-semibold text-blue-400" : "text-slate-500"}>
                        2. Neighborhood
                    </span>
                </div>

                {step === 1 ? (
                    <form className="mt-6 space-y-6" onSubmit={handleAccountSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-700 placeholder-slate-500 text-slate-100 bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-700 placeholder-slate-500 text-slate-100 bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-700 placeholder-slate-500 text-slate-100 bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3 top-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                                </button>
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    aria-invalid={Boolean(passwordError)}
                                    aria-describedby={passwordError ? "password-error" : undefined}
                                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-700 placeholder-slate-500 text-slate-100 bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {passwordError && (
                                <p id="password-error" className="text-sm text-red-400" role="alert">
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-900/30"
                        >
                            Continue
                        </button>
                    </form>
                ) : (
                    <form className="mt-6 space-y-6" onSubmit={handleProfileSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    name="location"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-950/70 text-slate-100 placeholder-slate-500"
                                    placeholder="Neighborhood / Street Address"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <ShieldCheck className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                <select
                                    name="role"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-slate-950/70 text-slate-200"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="resident">Resident</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-1/3 flex justify-center py-3 px-4 border border-slate-700 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-900/30"
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="text-center text-sm">
                            <span className="text-slate-400">Already have an account? </span>
                            <a href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                                Log in
                            </a>
                        </div>
                    </form>
                )}

                {step === 1 && (
                    <div className="mt-6 text-center text-sm">
                        <span className="text-slate-400">Already have an account? </span>
                        <a href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                            Log in
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

