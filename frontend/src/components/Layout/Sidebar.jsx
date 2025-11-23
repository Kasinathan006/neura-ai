import { NavLink } from 'react-router-dom'
import {
    MessageSquare,
    BookOpen,
    Mic,
    Bell,
    Settings,
    LayoutDashboard,
    Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: BookOpen, label: 'Study', path: '/study' },
    { icon: Mic, label: 'Voice', path: '/voice' },
    { icon: Bell, label: 'Reminders', path: '/reminders' },
    { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-72 glass-dark border-r border-white/10 flex flex-col"
        >
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold gradient-text">NEURA AI</h1>
                        <p className="text-xs text-gray-400">v1.0.0</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
                                <span className="font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="glass rounded-xl p-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">User</p>
                            <p className="text-xs text-gray-400 truncate">user@neura.ai</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.aside>
    )
}
