export type ChatMessageType = {
    userName: string,
    message: string,
    photo: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type EventNamesType = 'message-received' | 'status-changed' 

const subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}
    


let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('Close WS')
    notifySubsribersAboutStatus('pending')
    setTimeout(createChannel, 5000)
}

const notifySubsribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}



function createChannel() {
    cleanup()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubsribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => {
        s(newMessages)
    })
}

const openHandler = () => {
    notifySubsribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubsribersAboutStatus('error')
    console.log('Error, restart page')
}

const cleanup = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanup()
        ws?.close()
    },
    subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }

}