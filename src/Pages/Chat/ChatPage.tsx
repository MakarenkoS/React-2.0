import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { AppStateType } from '../../redux/redux-store'

type ChatMessageType = {
    userName: string,
    message: string,
    photo: string,
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Error occured. Please refresh page</div>}
            <Messages />
            <AddMessagesForm />
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null) 
    const [autoScrollIsActive, setAutoScroll] = useState(true)

    useEffect( ()=> {
        if (autoScrollIsActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    } , 
    [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) 
        {
            console.log('scrolled')
            !autoScrollIsActive && setAutoScroll(true)
        } else {
            autoScrollIsActive && setAutoScroll(false)
        }

    }
  
    return <div style={{ height: '400px', overflowY: 'auto' }} onScroll = {scrollHandler}>
        <h1>Messages</h1>
        {messages.map((m: any, index) => {
            return <Message message={m} key={m.id} />
        })}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const AddMessagesForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }

        dispatch(sendMessage(message))
        setMessage('')
    }
    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </>
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {

    return <div>
        <img src={message.photo} alt="" />
        <b>{message.userName}</b>
        <p>{message.message}</p>
        <hr />
    </div>
})


export default ChatPage