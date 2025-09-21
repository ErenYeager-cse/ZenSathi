"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, Sparkles, Target, Heart } from "lucide-react"
import { ARSession } from "@/components/ar-session"

interface ARActivity {
  id: string
  title: string
  description: string
  duration: string
  category: "meditation" | "exercise" | "breathing" | "posture"
  difficulty: "beginner" | "intermediate" | "advanced"
  points: number
}

const arActivities: ARActivity[] = [
  {
    id: "1",
    title: "Guided Breathing",
    description: "Follow the visual breathing guide with your camera for a calming session",
    duration: "5 min",
    category: "breathing",
    difficulty: "beginner",
    points: 25,
  },
  {
    id: "2",
    title: "Posture Check",
    description: "Use AR to check and improve your sitting or standing posture",
    duration: "3 min",
    category: "posture",
    difficulty: "beginner",
    points: 20,
  },
  {
    id: "3",
    title: "Mindful Movement",
    description: "Gentle stretching and movement exercises with AR guidance",
    duration: "10 min",
    category: "exercise",
    difficulty: "beginner",
    points: 50,
  },
  {
    id: "4",
    title: "Focus Meditation",
    description: "AR-assisted meditation with visual focus points and ambient guidance",
    duration: "15 min",
    category: "meditation",
    difficulty: "intermediate",
    points: 75,
  },
  {
    id: "5",
    title: "Desk Yoga",
    description: "Quick yoga poses perfect for your workspace, guided by AR",
    duration: "8 min",
    category: "exercise",
    difficulty: "beginner",
    points: 40,
  },
  {
    id: "6",
    title: "Energy Boost",
    description: "Energizing breathing and movement exercises to revitalize your day",
    duration: "7 min",
    category: "breathing",
    difficulty: "intermediate",
    points: 35,
  },
]

const categoryColors = {
  meditation: "bg-purple-100 text-purple-800",
  exercise: "bg-green-100 text-green-800",
  breathing: "bg-blue-100 text-blue-800",
  posture: "bg-yellow-100 text-yellow-800",
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
}

export default function ARPage() {
  const [selectedActivity, setSelectedActivity] = useState<ARActivity | null>(null)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "prompt">("prompt")

  useEffect(() => {
    // Check camera permission status
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" as PermissionName }).then((result) => {
        setCameraPermission(result.state as "granted" | "denied" | "prompt")
      })
    }
  }, [])

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraPermission("granted")
      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      setCameraPermission("denied")
    }
  }

  const startARSession = (activity: ARActivity) => {
    setSelectedActivity(activity)
    setIsSessionActive(true)
  }

  const endARSession = () => {
    setIsSessionActive(false)
    setSelectedActivity(null)
  }

  if (isSessionActive && selectedActivity) {
    return <ARSession activity={selectedActivity} onEnd={endARSession} />
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-4">
            <Camera className="w-8 h-8 text-primary" />
            AR Wellness
          </h1>
          <p className="text-muted-foreground mb-6">
            Use your camera for guided wellness activities with augmented reality
          </p>

          {/* Camera Permission Status */}
          {cameraPermission === "denied" && (
            <Card className="mb-6 border-destructive/20 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-destructive" />
                  <div>
                    <h3 className="font-semibold text-destructive">Camera Access Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Please enable camera access in your browser settings to use AR features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {cameraPermission === "prompt" && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Camera Access Needed</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow camera access to start your AR wellness journey.
                      </p>
                    </div>
                  </div>
                  <Button onClick={requestCameraPermission}>Enable Camera</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* AR Activities */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {arActivities.map((activity) => (
              <Card
                key={activity.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => cameraPermission === "granted" && startARSession(activity)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{activity.title}</CardTitle>
                      <CardDescription className="mb-3">{activity.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={categoryColors[activity.category]}>{activity.category}</Badge>
                        <Badge className={difficultyColors[activity.difficulty]}>{activity.difficulty}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {activity.points} pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span>{activity.duration}</span>
                    </div>
                    <Button
                      disabled={cameraPermission !== "granted"}
                      className="group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start AR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Heart className="w-5 h-5" />
                AR Wellness Benefits
              </CardTitle>
              <CardDescription>
                Our AR features help you maintain proper form, stay focused, and create an immersive wellness experience
                wherever you are.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Real-time posture guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Interactive breathing exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Immersive meditation environments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
