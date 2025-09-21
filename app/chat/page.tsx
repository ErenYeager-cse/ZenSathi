import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-4">
        <h1 className="text-2xl font-bold text-foreground">Chat with Zen</h1>
        <p className="text-muted-foreground">Your wholesome AI wellness companion</p>
      </div>
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  )
}
