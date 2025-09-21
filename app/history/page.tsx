"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { History, MessageCircle, Search, Calendar, Bot, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ChatSession {
  id: string
  title: string
  date: string
  messageCount: number
  topics: string[]
  preview: string
  mood: "positive" | "neutral" | "supportive"
}

const chatHistory: ChatSession[] = [
  {
    id: "1",
    title: "Morning Motivation Chat",
    date: "2024-03-21",
    messageCount: 12,
    topics: ["meditation", "goals", "motivation"],
    preview: "I'm feeling a bit overwhelmed with my goals today. Can you help me prioritize?",
    mood: "supportive",
  },
  {
    id: "2",
    title: "Exercise Planning Session",
    date: "2024-03-20",
    messageCount: 8,
    topics: ["exercise", "planning", "routine"],
    preview: "What's a good beginner workout routine I can start with?",
    mood: "positive",
  },
  {
    id: "3",
    title: "Mindfulness Discussion",
    date: "2024-03-19",
    messageCount: 15,
    topics: ["mindfulness", "stress", "breathing"],
    preview: "I've been feeling stressed lately. Can you guide me through some breathing exercises?",
    mood: "supportive",
  },
  {
    id: "4",
    title: "Sleep Improvement Tips",
    date: "2024-03-18",
    messageCount: 10,
    topics: ["sleep", "routine", "wellness"],
    preview: "I'm having trouble falling asleep. What are some natural ways to improve my sleep?",
    mood: "neutral",
  },
  {
    id: "5",
    title: "Nutrition Guidance",
    date: "2024-03-17",
    messageCount: 7,
    topics: ["nutrition", "healthy eating", "energy"],
    preview: "Can you suggest some healthy snacks that will give me sustained energy?",
    mood: "positive",
  },
  {
    id: "6",
    title: "Gratitude Practice",
    date: "2024-03-16",
    messageCount: 6,
    topics: ["gratitude", "journaling", "positivity"],
    preview: "How can I make gratitude journaling a consistent habit?",
    mood: "positive",
  },
]

const moodColors = {
  positive: "bg-green-100 text-green-800 border-green-200",
  neutral: "bg-blue-100 text-blue-800 border-blue-200",
  supportive: "bg-purple-100 text-purple-800 border-purple-200",
}

const topicColors = {
  meditation: "bg-purple-100 text-purple-700",
  exercise: "bg-green-100 text-green-700",
  goals: "bg-blue-100 text-blue-700",
  motivation: "bg-yellow-100 text-yellow-700",
  planning: "bg-indigo-100 text-indigo-700",
  routine: "bg-pink-100 text-pink-700",
  mindfulness: "bg-teal-100 text-teal-700",
  stress: "bg-red-100 text-red-700",
  breathing: "bg-cyan-100 text-cyan-700",
  sleep: "bg-indigo-100 text-indigo-700",
  wellness: "bg-green-100 text-green-700",
  nutrition: "bg-orange-100 text-orange-700",
  "healthy eating": "bg-lime-100 text-lime-700",
  energy: "bg-yellow-100 text-yellow-700",
  gratitude: "bg-pink-100 text-pink-700",
  journaling: "bg-purple-100 text-purple-700",
  positivity: "bg-yellow-100 text-yellow-700",
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const filteredHistory = chatHistory.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
      session.preview.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMood = !selectedMood || session.mood === selectedMood

    return matchesSearch && matchesMood
  })

  const handleDeleteSession = (sessionId: string) => {
    // In a real app, this would delete from the backend
    console.log("Delete session:", sessionId)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <History className="w-8 h-8 text-primary" />
                Chat History
              </h1>
              <p className="text-muted-foreground">Review your previous conversations with Zen</p>
            </div>
            <Link href="/chat">
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations, topics, or messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedMood === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood(null)}
              >
                All
              </Button>
              <Button
                variant={selectedMood === "positive" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood("positive")}
              >
                Positive
              </Button>
              <Button
                variant={selectedMood === "supportive" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood("supportive")}
              >
                Supportive
              </Button>
              <Button
                variant={selectedMood === "neutral" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood("neutral")}
              >
                Neutral
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History List */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {filteredHistory.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Start your first conversation with Zen!"}
                </p>
                <Link href="/chat">
                  <Button>Start Chatting</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <Badge className={moodColors[session.mood]}>{session.mood}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {session.messageCount} messages
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {session.topics.map((topic) => (
                            <Badge
                              key={topic}
                              variant="outline"
                              className={topicColors[topic as keyof typeof topicColors] || "bg-gray-100 text-gray-700"}
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link href={`/chat?session=${session.id}`}>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteSession(session.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground italic">"{session.preview}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {filteredHistory.length > 0 && (
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <History className="w-5 h-5" />
                  Your Wellness Journey
                </CardTitle>
                <CardDescription>
                  You've had {chatHistory.length} meaningful conversations with Zen, covering{" "}
                  {Array.from(new Set(chatHistory.flatMap((s) => s.topics))).length} different wellness topics. Keep up
                  the great work on your journey to better mental health!
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
