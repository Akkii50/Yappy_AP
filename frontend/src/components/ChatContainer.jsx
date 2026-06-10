import { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, hasMoreMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [page, setPage] = useState(1);
  const messagesContainerRef = useRef(null);
  const loadingOlderRef = useRef(false);

  const loadOlderMessages = async () => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;

    // Save current scroll height before loading
    const previousScrollHeight = container.scrollHeight;
    const previousScrollTop = container.scrollTop;
    loadingOlderRef.current = {
      previousScrollHeight,
      previousScrollTop,
    };

    const nextPage = page + 1;
    await getMessages(selectedUser._id, nextPage);

    setPage(nextPage);

    // Wait for DOM update
    requestAnimationFrame(() => {
      const newScrollHeight = container.scrollHeight;

      container.scrollTop =
        newScrollHeight - previousScrollHeight + container.scrollTop;
    });
  };
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id, 1);
      setPage(1);
    }
  }, [selectedUser]);

  useEffect(() => {

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    const container = messagesContainerRef.current;

    // Loading older messages
    if (
      loadingOlderRef.current &&
      typeof loadingOlderRef.current === "object"
    ) {
      const { previousScrollHeight, previousScrollTop } =
        loadingOlderRef.current;

      const newScrollHeight = container.scrollHeight;

      container.scrollTop =
        previousScrollTop +
        (newScrollHeight - previousScrollHeight);

      loadingOlderRef.current = false;
      return;
    }

    // New incoming message -> scroll to bottom
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (isMessagesLoading) return (
    <div className='flex-1 flex flex-col over'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />

    </div>
  )


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div ref={messagesContainerRef} className='flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/30'>
        {hasMoreMessages && (
          <button
            className="btn btn-secondary btn-sm mb-2"
            onClick={loadOlderMessages}
          >
            Load Older Messages
          </button>
        )}
        {messages.map((message) => (
          <div key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                  alt="profile pic" />

              </div>

            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>

            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img src={message.image}
                  alt="Attachment"
                  className='sm:max-w-[200px] rounded-md mb-2' />
              )}
              {message.text && <p>{message.text}</p>}
            </div>

          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
