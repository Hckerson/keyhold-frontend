'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  sender: string
  senderRole: 'user' | 'agent'
  content: string
  timestamp: string
  avatar: string
}

interface Conversation {
  id: string
  agent: string
  agentTitle: string
  agentAvatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
}

const conversations: Conversation[] = [
  {
    id: '1',
    agent: 'Sarah Chen',
    agentTitle: 'Senior Real Estate Agent',
    agentAvatar: 'SC',
    lastMessage: 'I can arrange the viewing for tomorrow at 2 PM if that works for you',
    lastMessageTime: '2 hours ago',
    unread: 1,
  },
  {
    id: '2',
    agent: 'Michael Rodriguez',
    agentTitle: 'Real Estate Concierge',
    agentAvatar: 'MR',
    lastMessage: 'Your offer has been accepted! Congratulations!',
    lastMessageTime: '5 hours ago',
    unread: 0,
  },
  {
    id: '3',
    agent: 'Jennifer Martinez',
    agentTitle: 'Property Manager',
    agentAvatar: 'JM',
    lastMessage: 'Here are the updated inspection reports...',
    lastMessageTime: '1 day ago',
    unread: 0,
  },
]

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Chen',
    senderRole: 'agent',
    content: 'Hello! I saw your interest in 456 Oak Avenue. Would you like to schedule a viewing?',
    timestamp: '10:30 AM',
    avatar: 'SC',
  },
  {
    id: '2',
    sender: 'You',
    senderRole: 'user',
    content: 'Yes, I would love to see it! What times are available?',
    timestamp: '10:45 AM',
    avatar: 'JD',
  },
  {
    id: '3',
    sender: 'Sarah Chen',
    senderRole: 'agent',
    content: 'I can arrange the viewing for tomorrow at 2 PM if that works for you. The property is absolutely stunning!',
    timestamp: '2 hours ago',
    avatar: 'SC',
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>('1')
  const [messageText, setMessageText] = useState('')

  const selected = conversations.find((c) => c.id === selectedConversation)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      setMessageText('')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-display font-light text-text">Messages</h1>
        <p className="text-text-secondary mt-2">Chat with your real estate agents and concierge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <Card className="lg:col-span-1 flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="border-b border-border p-4">
              <h2 className="text-sm font-medium text-text">Conversations</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full text-left px-4 py-4 border-b border-border hover:bg-primary-dark transition-colors ${
                    selectedConversation === conversation.id ? 'bg-primary-dark border-l-2 border-l-accent' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-text text-sm">{conversation.agent}</p>
                    {conversation.unread > 0 && (
                      <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mb-2">{conversation.agentTitle}</p>
                  <p className="text-xs text-text-secondary line-clamp-2">{conversation.lastMessage}</p>
                  <p className="text-xs text-text-secondary/50 mt-2">{conversation.lastMessageTime}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          {selected ? (
            <>
              <div className="border-b border-border p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-text">{selected.agent}</h2>
                  <p className="text-xs text-text-secondary mt-1">{selected.agentTitle}</p>
                </div>
                <Button variant="secondary" className="text-xs h-8">
                  Call
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {sampleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.senderRole === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-xs font-medium text-accent">
                      {message.avatar}
                    </div>
                    <div
                      className={`flex flex-col gap-1 max-w-xs ${
                        message.senderRole === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg text-sm ${
                          message.senderRole === 'user'
                            ? 'bg-accent text-white'
                            : 'bg-primary-dark border border-border text-text'
                        }`}
                      >
                        {message.content}
                      </div>
                      <span className="text-xs text-text-secondary">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="primary" type="submit" className="text-xs h-10 px-4">
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <p className="text-text-secondary">Select a conversation to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
