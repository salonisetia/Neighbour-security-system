import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LifeBuoy, CheckCircle, AlertCircle, ShieldCheck, Mail, Bell, LayoutDashboard } from "lucide-react";

export default function Help() {  
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-8 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <LifeBuoy className="w-24 h-24 text-blue-400 mx-auto mb-6 opacity-80" />
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                Help Center
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Find quick solutions to common issues. Can't find what you need? Use the sidebar menu.
              </p>
            </div>

            <div className="space-y-12"> 
              <section id="login">
                <div className="bg-slate-900 rounded-3xl p-10 shadow-2xl border border-slate-800">
                  <div className="flex items-start gap-6 mb-8">
                    <ShieldCheck className="w-16 h-16 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-3">Login & Signup Issues</h2>
                      <p className="text-slate-300 text-lg leading-relaxed">Trouble getting started?</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">Can't Login?</h3>
                      <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Clear Browser Data:</strong> Ctrl+Shift+R (hard refresh) or clear localStorage.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Forgot Password:</strong> Use Signup with new credentials (email-based).
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Backend Down:</strong> Ensure MongoDB Atlas connected and server running on port 5000.
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">Signup Not Working</h3>
                      <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Email Taken:</strong> Try different email. Check backend console.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Token Error:</strong> Refresh page after signup redirects to dashboard.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="dashboard">
                <div className="bg-slate-900 rounded-3xl p-10 shadow-2xl border border-slate-800">
                  <div className="flex items-start gap-6 mb-8">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-3">Dashboard Access</h2>
                      <p className="text-slate-300 text-lg leading-relaxed">Protected area troubleshooting.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <h3 className="text-2xl font-bold text-white mb-4">Redirected to Login?</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        Dashboard requires authentication. Login/Signup first. Token stored in localStorage as "userToken".
                      </p>
                      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-slate-200">
                        <strong>Dev Tip:</strong> <code className="bg-slate-800 px-2 py-1 rounded text-sm font-mono text-slate-100">localStorage.setItem("userToken", "fake-token")</code> for testing.
                      </div>
                    </div>
                    <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <h3 className="text-2xl font-bold text-white mb-4">No Alerts Showing</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Check backend /api/get_alert. Post an alert as admin/resident. Filters applied - reset to "All".
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="alerts">
                <div className="bg-slate-900 rounded-3xl p-10 shadow-2xl border border-slate-800">
                  <div className="flex items-start gap-6 mb-8">
                    <AlertCircle className="w-16 h-16 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-3">Posting & Viewing Alerts</h2>
                      <p className="text-slate-300 text-lg leading-relaxed">Alert workflow issues.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <h3 className="text-xl font-bold text-white mb-4">Can't Post Alert</h3>
                      <ul className="space-y-3 text-slate-300">
                        <li>• Login first (token required)</li>
                        <li>• Check PostAlertModal network tab</li>
                        <li>• Backend /api/post_alert must be running</li>
                      </ul>
                    </div>
                    <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <h3 className="text-xl font-bold text-white mb-4">Admin Verification</h3>
                      <ul className="space-y-3 text-slate-300">
                        <li>• Only admins see "Verify Alert" btn</li>
                        <li>• Login as admin role via backend</li>
                        <li>• Click verify → status changes instantly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="profile">
                <div className="bg-slate-900 rounded-3xl p-10 shadow-2xl border border-slate-800">
                  <div className="flex items-start gap-6 mb-8">
                    <Mail className="w-16 h-16 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-3">Profile & Support</h2>
                      <p className="text-slate-300 text-lg leading-relaxed">Account management and contact.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Profile Modal</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Click user icon (top-left). Updates via /api/update_profile. Token required.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Need More Help?</h3>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-2xl">
                        <p className="text-lg mb-4">Contact the developer:</p>
                        <ul className="space-y-2 text-blue-100">
                          <li>• Check browser Console/Network tabs</li>
                          <li>• Backend server logs (terminal)</li>
                          <li>• MongoDB Atlas dashboard for DB issues</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-center mt-20 pt-12 border-t border-slate-800">
              <p className="text-slate-400 text-lg">Still stuck? The sidebar has categorized solutions. Happy to help!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}