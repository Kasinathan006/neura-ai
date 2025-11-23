import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Chat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = { role: 'user', content: input, created_at: new Date().toISOString() }
        setMessages([...messages, userMessage])
        setInput('')
        setIsTyping(true)

        setTimeout(() => {
            const aiMessage = { role: 'assistant', content: 'This is a demo response from NEURA AI. Connect to backend for real AI responses!', created_at: new Date().toISOString() }
            setMessages(prev => [...prev, aiMessage])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="h-full flex flex-col">
            <div className="glass rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between">
                    <select className="glass px-4 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="chat">Chat Mode</option>
                        <option value="study">Study Mode</option>
                        <option value="coding">Coding Mode</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-400">Ready</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 glass rounded-2xl p-6 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Start a Conversation</h3>
                            <p className="text-gray-400">Ask me anything! I'm here to help.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' : 'glass text-gray-100'}`}>
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                <div className="glass rounded-2xl p-4">
                                    <div className="typing-indicator flex gap-1">
                                        <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                                        <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                                        <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            <div className="mt-4 glass rounded-2xl p-4">
                <div className="flex items-end gap-3">
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder="Type your message..." rows={1} className="flex-1 input-field resize-none" style={{ minHeight: '48px', maxHeight: '200px' }} />
                    <button onClick={handleSend} disabled={!input.trim()} className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
