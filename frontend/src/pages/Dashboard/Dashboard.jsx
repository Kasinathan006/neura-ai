import { motion } from 'framer-motion'
import { MessageSquare, BookOpen, Mic, Brain, TrendingUp, Clock } from 'lucide-react'

const stats = [
    { icon: MessageSquare, label: 'Conversations', value: '24', color: 'from-blue-500 to-blue-600' },
    { icon: BookOpen, label: 'Flashcards', value: '156', color: 'from-purple-500 to-purple-600' },
    { icon: Brain, label: 'Study Hours', value: '42', color: 'from-green-500 to-green-600' },
    { icon: Clock, label: 'Reminders', value: '8', color: 'from-orange-500 to-orange-600' },
]

const quickActions = [
    { icon: MessageSquare, label: 'New Chat', path: '/chat', color: 'primary' },
    { icon: BookOpen, label: 'Study Mode', path: '/study', color: 'purple' },
    { icon: Mic, label: 'Voice Chat', path: '/voice', color: 'green' },
]

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass rounded-2xl p-8">
                <h1 className="text-4xl font-bold text-white mb-2">Welcome back, User! 👋</h1>
                <p className="text-gray-400 text-lg">Ready to boost your productivity with NEURA AI?</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div key={stat.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="card">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action) => (
                        <button key={action.label} className="card hover:scale-105 transition-transform cursor-pointer text-left">
                            <action.icon className="w-8 h-8 text-primary-400 mb-3" />
                            <h3 className="text-xl font-semibold text-white">{action.label}</h3>
                            <p className="text-gray-400 text-sm mt-1">Start a new session</p>
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 glass rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">Chat Session</p>
                                <p className="text-gray-400 text-sm">2 hours ago</p>
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
