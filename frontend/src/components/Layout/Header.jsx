import { useLocation } from 'react-router-dom'
import { Search, Bell, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const pageTitles = {
    '/': 'Dashboard',
    '/chat': 'AI Chat',
    '/study': 'Study Mode',
    '/voice': 'Voice Assistant',
    '/reminders': 'Reminders',
    '/settings': 'Settings',
}

export default function Header() {
    const location = useLocation()
    const title = pageTitles[location.pathname] || 'NEURA AI'

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-16 glass-dark border-b border-white/10 px-6 flex items-center justify-between"
        >
            <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-64 glass rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <button className="relative p-2 glass rounded-xl hover:bg-white/10 transition-all">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                </button>

                <button className="p-2 glass rounded-xl hover:bg-white/10 transition-all">
                    <Settings className="w-5 h-5 text-gray-400" />
                </button>
            </div>
        </motion.header>
    )
}
