import { io } from 'socket.io-client'
import useAuthStore from '../store/authStore'
import useChatStore from '../store/chatStore'

let socket = null

export const connectWebSocket = () => {
    const { accessToken } = useAuthStore.getState()

    if (socket?.connected) {
        return socket
    }

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'

    socket = io(wsUrl, {
        auth: {
            token: accessToken,
        },
        transports: ['websocket'],
    })

    socket.on('connect', () => {
        console.log('WebSocket connected')
        useChatStore.getState().setWsConnected(true)
    })

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected')
        useChatStore.getState().setWsConnected(false)
    })

    socket.on('message', (data) => {
        useChatStore.getState().addMessage(data)
    })

    socket.on('typing', (isTyping) => {
        useChatStore.getState().setTyping(isTyping)
    })

    socket.on('error', (error) => {
        console.error('WebSocket error:', error)
    })

    return socket
}

export const disconnectWebSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
        useChatStore.getState().setWsConnected(false)
    }
}

export const sendMessage = (message) => {
    if (socket?.connected) {
        socket.emit('message', message)
    } else {
        console.error('WebSocket not connected')
    }
}

export default {
    connect: connectWebSocket,
    disconnect: disconnectWebSocket,
    send: sendMessage,
}
