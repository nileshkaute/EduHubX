import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Bell
} from 'lucide-react'

const AdminLayout = ({ children }) => {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">EduHub Control</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-900/20 transition-all">
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/admin/notes" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <FileText className="w-5 h-5" />
            Manage Notes
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <Users className="w-5 h-5" />
            Manage Users
          </Link>
          <div className="pt-8 pb-4">
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Website</p>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
            <ExternalLink className="w-5 h-5" />
            View Website
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <h2 className="text-gray-900 font-bold">Admin Console</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{currentUser?.name}</p>
                <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Super Administrator</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold overflow-hidden shadow-sm">
                {currentUser?.photo ? <img src={currentUser.photo} className="w-full h-full object-cover" /> : currentUser?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
