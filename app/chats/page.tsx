"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { people } from "@/lib/people"
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Users,
  ImageIcon,
  Check,
  CheckCheck,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  type: "text" | "image"
  timestamp: string
  status: "sent" | "delivered" | "read"
}

interface Chat {
  id: string
  type: "individual" | "group"
  name: string
  participants: string[]
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  avatar?: string
  messages: Message[]
  isOnline?: boolean
}

export default function ChatsPage() {
  const [selectedChatId, setSelectedChatId] = useState<string>("chat_1")
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")

  // Mock chat data
  const [chats] = useState<Chat[]>([
    {
      id: "chat_1",
      type: "individual",
      name: "Lily Grace",
      participants: ["people_0"],
      lastMessage: "The new design mockups look amazing! 🎨",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      avatar: people[0].imageURL,
      isOnline: true,
      messages: [
        {
          id: "msg_1",
          senderId: "people_0",
          content: "Hey! I've finished the landing page designs. Want to take a look?",
          type: "text",
          timestamp: "10:30 AM",
          status: "read",
        },
        {
          id: "msg_2",
          senderId: "people_11", // Current user
          content: "Send them over.",
          type: "text",
          timestamp: "10:32 AM",
          status: "read",
        },
        {
          id: "msg_3",
          senderId: "people_0",
          content: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/4_qvrdhf.jpg",
          type: "image",
          timestamp: "10:35 AM",
          status: "read",
        },
        {
          id: "msg_4",
          senderId: "people_0",
          content: "The new design mockups look amazing! 🎨",
          type: "text",
          timestamp: "10:36 AM",
          status: "delivered",
        },
        {
          id: "msg_5",
          senderId: "people_0",
          content: "I've incorporated the feedback from last week's review.",
          type: "text",
          timestamp: "10:37 AM",
          status: "sent",
        },
      ],
    },
    {
      id: "chat_2",
      type: "group",
      name: "Development Team",
      participants: ["people_1", "people_6", "people_8", "people_14"],
      lastMessage: "Adam: The API integration is complete ✅",
      lastMessageTime: "15 min ago",
      unreadCount: 0,
      messages: [
        {
          id: "msg_6",
          senderId: "people_1",
          content: "Morning everyone! Ready for the sprint review?",
          type: "text",
          timestamp: "9:00 AM",
          status: "read",
        },
        {
          id: "msg_7",
          senderId: "people_6",
          content: "Yes! I've got the performance metrics ready to share.",
          type: "text",
          timestamp: "9:02 AM",
          status: "read",
        },
        {
          id: "msg_8",
          senderId: "people_8",
          content: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/1_wtodgu.jpg",
          type: "image",
          timestamp: "9:05 AM",
          status: "read",
        },
        {
          id: "msg_9",
          senderId: "people_14",
          content: "Great work team! The load times have improved by 40%",
          type: "text",
          timestamp: "9:10 AM",
          status: "read",
        },
        {
          id: "msg_10",
          senderId: "people_1",
          content: "The API integration is complete ✅",
          type: "text",
          timestamp: "10:15 AM",
          status: "read",
        },
      ],
    },
    {
      id: "chat_3",
      type: "individual",
      name: "Owen Scott",
      participants: ["people_2"],
      lastMessage: "Found a few bugs in the checkout flow",
      lastMessageTime: "1 hour ago",
      unreadCount: 1,
      avatar: people[2].imageURL,
      isOnline: false,
      messages: [
        {
          id: "msg_11",
          senderId: "people_2",
          content: "Hi! I've been testing the new checkout flow.",
          type: "text",
          timestamp: "Yesterday 4:30 PM",
          status: "read",
        },
        {
          id: "msg_12",
          senderId: "people_2",
          content: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/2_tnkblo.jpg",
          type: "image",
          timestamp: "Yesterday 4:32 PM",
          status: "read",
        },
        {
          id: "msg_13",
          senderId: "people_11",
          content: "Thanks for catching that! I'll fix it right away.",
          type: "text",
          timestamp: "Yesterday 4:35 PM",
          status: "read",
        },
        {
          id: "msg_14",
          senderId: "people_2",
          content: "Found a few bugs in the checkout flow",
          type: "text",
          timestamp: "9:00 AM",
          status: "sent",
        },
      ],
    },
    {
      id: "chat_4",
      type: "group",
      name: "Design Review",
      participants: ["people_0", "people_3", "people_9"],
      lastMessage: "Mia: Let's schedule the design review for tomorrow",
      lastMessageTime: "2 hours ago",
      unreadCount: 0,
      messages: [
        {
          id: "msg_15",
          senderId: "people_3",
          content: "Hey team! Ready to review the new brand guidelines?",
          type: "text",
          timestamp: "8:00 AM",
          status: "read",
        },
        {
          id: "msg_16",
          senderId: "people_0",
          content: "Yes! I've prepared the color palette variations.",
          type: "text",
          timestamp: "8:05 AM",
          status: "read",
        },
        {
          id: "msg_17",
          senderId: "people_9",
          content: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/3_dkb7tc.jpg",
          type: "image",
          timestamp: "8:10 AM",
          status: "read",
        },
        {
          id: "msg_18",
          senderId: "people_3",
          content: "Let's schedule the design review for tomorrow",
          type: "text",
          timestamp: "8:15 AM",
          status: "read",
        },
      ],
    },
    {
      id: "chat_5",
      type: "individual",
      name: "Maya Lynn",
      participants: ["people_12"],
      lastMessage: "The campaign metrics look fantastic! 📈",
      lastMessageTime: "3 hours ago",
      unreadCount: 0,
      avatar: people[12].imageURL,
      isOnline: true,
      messages: [
        {
          id: "msg_19",
          senderId: "people_12",
          content: "Hi! The Q1 marketing campaign results are in.",
          type: "text",
          timestamp: "7:00 AM",
          status: "read",
        },
        {
          id: "msg_20",
          senderId: "people_12",
          content: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698765/mock/0_ewyfdz.jpg",
          type: "image",
          timestamp: "7:02 AM",
          status: "read",
        },
        {
          id: "msg_21",
          senderId: "people_11",
          content: "Wow! These numbers are impressive. Great work!",
          type: "text",
          timestamp: "7:05 AM",
          status: "read",
        },
        {
          id: "msg_22",
          senderId: "people_12",
          content: "The campaign metrics look fantastic! 📈",
          type: "text",
          timestamp: "7:10 AM",
          status: "read",
        },
      ],
    },
    {
      id: "chat_6",
      type: "group",
      name: "Project Kickoff",
      participants: ["people_4", "people_10", "people_11"],
      lastMessage: "You: Sounds great! Let's get started 🚀",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      messages: [
        {
          id: "msg_23",
          senderId: "people_4",
          content: "Welcome to the new project! Excited to work with you all.",
          type: "text",
          timestamp: "Yesterday 2:00 PM",
          status: "read",
        },
        {
          id: "msg_24",
          senderId: "people_10",
          content: "Thanks Zoe! I've prepared the project roadmap.",
          type: "text",
          timestamp: "Yesterday 2:05 PM",
          status: "read",
        },
        {
          id: "msg_25",
          senderId: "people_10",
          content: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/4_qvrdhf.jpg",
          type: "image",
          timestamp: "Yesterday 2:10 PM",
          status: "read",
        },
        {
          id: "msg_26",
          senderId: "people_11",
          content: "Sounds great! Let's get started 🚀",
          type: "text",
          timestamp: "Yesterday 2:15 PM",
          status: "read",
        },
      ],
    },
  ])

  // Filter chats based on search query
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedChat = chats.find((chat) => chat.id === selectedChatId)
  const currentUser = people.find((person) => person.id === "people_11") || people[11]

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const getParticipantAvatars = (participantIds: string[]) => {
    return participantIds.slice(0, 3).map((id) => {
      const person = people.find((p) => p.id === id)
      return person ? person.imageURL : "/placeholder.svg"
    })
  }

  const getMessageStatus = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chats</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedChatId === chat.id ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  {chat.type === "individual" ? (
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="relative w-12 h-12">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  {chat.type === "individual" && chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{chat.lastMessageTime}</span>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">{chat.lastMessage}</p>
                  {chat.type === "group" && (
                    <div className="flex items-center mt-2">
                      <div className="flex -space-x-1">
                        {getParticipantAvatars(chat.participants).map((avatar, index) => (
                          <Avatar key={index} className="w-5 h-5 border border-white dark:border-gray-800">
                            <AvatarImage src={avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-xs">
                              {index + 1}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {chat.participants.length} members
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {selectedChat.type === "individual" ? (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                          {selectedChat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {selectedChat.type === "individual" && selectedChat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedChat.type === "individual"
                        ? selectedChat.isOnline
                          ? "Online"
                          : "Last seen recently"
                        : `${selectedChat.participants.length} members`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedChat.type === "individual" && (
                    <>
                      <Button variant="ghost" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon">
                    <Info className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => {
                const sender = people.find((p) => p.id === message.senderId)
                const isCurrentUser = message.senderId === currentUser.id
                const senderName = sender?.name || "Unknown"

                return (
                  <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md`}>
                      {!isCurrentUser && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={sender?.imageURL || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white text-xs">
                            {senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                        {!isCurrentUser && selectedChat.type === "group" && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-3">{senderName}</span>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isCurrentUser
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          {message.type === "text" ? (
                            <p className="text-sm">{message.content}</p>
                          ) : (
                            <div className="rounded-lg overflow-hidden">
                              <img
                                src={message.content || "/placeholder.svg"}
                                alt="Shared image"
                                className="max-w-full h-auto rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={`flex items-center space-x-1 mt-1 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                          {isCurrentUser && getMessageStatus(message.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a conversation</h3>
              <p className="text-gray-600 dark:text-gray-400">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
