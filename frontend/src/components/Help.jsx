import { NavLink, Link } from "react-router-dom"; // CHANGED: Added NavLink to handle active link states
import { LifeBuoy, CheckCircle, AlertCircle, ShieldCheck, Mail, Bell, LayoutDashboard } from "lucide-react"; // CHANGED: Added LayoutDashboard and Bell to prevent ReferenceErrors

export default function Help() {  
  const getLinkStyle = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition border ${
      isActive 
        ? "bg-white text-blue-600 shadow-sm border-slate-100" 
        : "text-slate-600 hover:bg-white hover:text-blue-600 border-transparent hover:border-slate-100" // Style when URL doesn't match (Inactive = Black/Slate)
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      <div className="flex">


        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <LifeBuoy className="w-24 h-24 text-blue-600 mx-auto mb-6 opacity-80" />
              <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Help Center
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Find quick solutions to common issues. Can't find what you need? Use the sidebar menu.
              </p>
            </div>

            <div className="space-y-12">
              {/* Login/Signup Section */}
              <section id="login">
                <div className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100">
                  <div className="flex items-start gap-6 mb-8">
                    <ShieldCheck className="w-16 h-16 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-3">Login & Signup Issues</h2>
                      <p className="text-slate-600 text-lg leading-relaxed">Trouble getting started?</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Can't Login?</h3>
                      <ul className="space-y-4 text-slate-700">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Clear Browser Data:</strong> Ctrl+Shift+R (hard refresh) or clear localStorage.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Forgot Password:</strong> Use Signup with new credentials (email-based).
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Backend Down:</strong> Ensure MongoDB Atlas connected and server running on port 5000.
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Signup Not Working</h3>
                      <ul className="space-y-4 text-slate-700">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Email Taken:</strong> Try different email. Check backend console.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Token Error:</strong> Refresh page after signup redirects to dashboard.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dashboard Section */}
              <section id="dashboard">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-10 shadow-2xl border border-emerald-200">
                  <div className="flex items-start gap-6 mb-8">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-3">Dashboard Access</h2>
                      <p className="text-slate-600 text-lg leading-relaxed">Protected area troubleshooting.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Redirected to Login?</h3>
                      <p className="text-slate-700 leading-relaxed mb-6">
                        Dashboard requires authentication. Login/Signup first. Token stored in localStorage as "userToken".
                      </p>
                      <div className="bg-slate-900/5 border border-slate-200 rounded-xl p-6">
                        <strong>Dev Tip:</strong> <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">localStorage.setItem("userToken", "fake-token")</code> for testing.
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">No Alerts Showing</h3>
                      <p className="text-slate-700 leading-relaxed">
                        Check backend /api/get_alert. Post an alert as admin/resident. Filters applied - reset to "All".
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Alerts Section */}
              <section id="alerts">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-10 shadow-2xl border border-orange-200">
                  <div className="flex items-start gap-6 mb-8">
                    <AlertCircle className="w-16 h-16 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-3">Posting & Viewing Alerts</h2>
                      <p className="text-slate-600 text-lg leading-relaxed">Alert workflow issues.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Can't Post Alert</h3>
                      <ul className="space-y-3 text-slate-700">
                        <li>• Login first (token required)</li>
                        <li>• Check PostAlertModal network tab</li>
                        <li>• Backend /api/post_alert must be running</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Admin Verification</h3>
                      <ul className="space-y-3 text-slate-700">
                        <li>• Only admins see "Verify Alert" btn</li>
                        <li>• Login as admin role via backend</li>
                        <li>• Click verify → status changes instantly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Profile Section */}
              <section id="profile">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-10 shadow-2xl border border-purple-200">
                  <div className="flex items-start gap-6 mb-8">
                    <Mail className="w-16 h-16 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-3">Profile & Support</h2>
                      <p className="text-slate-600 text-lg leading-relaxed">Account management and contact.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Profile Modal</h3>
                      <p className="text-slate-700 leading-relaxed">
                        Click user icon (top-left). Updates via /api/update_profile. Token required.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Need More Help?</h3>
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-2xl">
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

            <div className="text-center mt-20 pt-12 border-t border-slate-200">
              <p className="text-slate-500 text-lg">Still stuck? The sidebar has categorized solutions. Happy to help!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}