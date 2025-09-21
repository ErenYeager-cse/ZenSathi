"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, RotateCcw, Sparkles } from "lucide-react"

interface ARActivity {
  id: string
  title: string
  description: string
  duration: string
  category: "meditation" | "exercise" | "breathing" | "posture"
  difficulty: "beginner" | "intermediate" | "advanced"
  points: number
}

interface ARSessionProps {
  activity: ARActivity
  onEnd: () => void
}

export function ARSession({ activity, onEnd }: ARSessionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [sessionPhase, setSessionPhase] = useState<"setup" | "active" | "complete">("setup")

  // Convert duration string to seconds for progress calculation
  const totalDuration = Number.parseInt(activity.duration) * 60 // assuming duration is in minutes

  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && sessionPhase === "active") {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            setSessionPhase("complete")
            return totalDuration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, sessionPhase, totalDuration])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const startSession = () => {
    setSessionPhase("active")
    setIsPlaying(true)
  }

  const pauseSession = () => {
    setIsPlaying(!isPlaying)
  }

  const resetSession = () => {
    setCurrentTime(0)
    setIsPlaying(false)
    setSessionPhase("setup")
  }

  const endSession = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    onEnd()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getSessionInstructions = () => {
    switch (activity.category) {
      case "breathing":
        return "Follow the breathing circle. Inhale as it expands, exhale as it contracts."
      case "posture":
        return "Sit up straight and align your shoulders with the guide lines."
      case "meditation":
        return "Focus on the center point and let your thoughts flow naturally."
      case "exercise":
        return "Follow the movement guides and maintain proper form."
      default:
        return "Follow the on-screen guidance for your wellness session."
    }
  }

  const progress = (currentTime / totalDuration) * 100

  return (
    <div className="flex flex-col h-full bg-black">
      {/* AR Camera View */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }} // Mirror the video
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* AR Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {sessionPhase === "active" && (
            <>
              {activity.category === "breathing" && (
                <div
                  className="w-32 h-32 rounded-full border-4 border-primary bg-primary/20 animate-pulse"
                  style={{
                    animation: "breathe 4s ease-in-out infinite",
                  }}
                />
              )}
              {activity.category === "meditation" && <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />}
              {activity.category === "posture" && (
                <div className="space-y-4">
                  <div className="w-48 h-1 bg-primary/50" />
                  <div className="w-48 h-1 bg-primary/50" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Session Info Overlay */}
        <div className="absolute top-4 left-4 right-4">
          <Card className="bg-black/50 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-white mb-2">
                <h2 className="font-semibold">{activity.title}</h2>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">{activity.points} pts</span>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-3">{getSessionInstructions()}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/80">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Complete Overlay */}
        {sessionPhase === "complete" && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <Card className="max-w-md mx-4">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Session Complete!</h3>
                <p className="text-muted-foreground mb-4">
                  Great job! You've earned {activity.points} wellness points.
                </p>
                <div className="flex gap-2">
                  <Button onClick={resetSession} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart
                  </Button>
                  <Button onClick={endSession} className="flex-1">
                    Finish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black/90 p-4">
        <div className="flex items-center justify-center gap-4">
          {sessionPhase === "setup" && (
            <Button onClick={startSession} size="lg" className="bg-primary hover:bg-primary/90">
              <Play className="w-5 h-5 mr-2" />
              Start Session
            </Button>
          )}

          {sessionPhase === "active" && (
            <>
              <Button onClick={pauseSession} variant="outline" size="lg">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button onClick={resetSession} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button onClick={endSession} variant="destructive" size="lg">
                <Square className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
