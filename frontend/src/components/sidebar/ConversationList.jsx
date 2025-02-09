import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

const ConversationList = () => {
  const { loading, conversations } = useGetConversations()

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {
        loading ? (
          <div className='flex justify-center items-center h-full'>
            <div className='spinner-border text-primary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {
              conversations.map((conversation) => (
                <Conversation key={conversation._id} conversation={conversation} lastIndex={conversations.length - 1} />
              ))
            }
          </>
        )
      }
    </div>
  )
}

export default ConversationList