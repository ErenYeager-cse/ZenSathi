"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Target, Sparkles, Calendar, CheckCircle2, Circle } from "lucide-react"
import { AddGoalDialog } from "@/components/add-goal-dialog"

interface Goal {
  id: string
  title: string
  category: "meditation" | "exercise" | "nutrition" | "sleep" | "mindfulness" | "social"
  points: number
  completed: boolean
  streak: number
}

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "10-minute morning meditation",
    category: "meditation",
    points: 50,
    completed: true,
    streak: 7,
  },
  {
    id: "2",
    title: "30-minute walk or exercise",
    category: "exercise",
    points: 75,
    completed: true,
    streak: 5,
  },
  {
    id: "3",
    title: "Drink 8 glasses of water",
    category: "nutrition",
    points: 25,
    completed: false,
    streak: 3,
  },
  {
    id: "4",
    title: "Evening gratitude journal",
    category: "mindfulness",
    points: 40,
    completed: false,
    streak: 4,
  },
  {
    id: "5",
    title: "Get 8 hours of sleep",
    category: "sleep",
    points: 60,
    completed: false,
    streak: 2,
  },
]

const categoryColors = {
  meditation: "bg-purple-100 text-purple-800",
  exercise: "bg-green-100 text-green-800",
  nutrition: "bg-blue-100 text-blue-800",
  sleep: "bg-indigo-100 text-indigo-800",
  mindfulness: "bg-yellow-100 text-yellow-800",
  social: "bg-pink-100 text-pink-800",
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const toggleGoal = (goalId: string) => {
    setGoals(goals.map((goal) => (goal.id === goalId ? { ...goal, completed: !goal.completed } : goal)))
  }

  const completedGoals = goals.filter((goal) => goal.completed)
  const totalPoints = completedGoals.reduce((sum, goal) => sum + goal.points, 0)
  const progressPercentage = (completedGoals.length / goals.length) * 100

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Target className="w-8 h-8 text-primary" />
                Daily Goals
              </h1>
              <p className="text-muted-foreground">Track your wellness journey and earn points</p>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Progress</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-2">
                  {completedGoals.length}/{goals.length}
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">Today's Points</span>
                </div>
                <div className="text-2xl font-bold text-secondary">{totalPoints}</div>
                <p className="text-sm text-muted-foreground">Keep going!</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Best Streak</span>
                </div>
                <div className="text-2xl font-bold text-accent">{Math.max(...goals.map((g) => g.streak))} days</div>
                <p className="text-sm text-muted-foreground">Amazing consistency!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className={`transition-all duration-200 ${
                  goal.completed ? "bg-muted/50 border-primary/20" : "hover:shadow-md"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={goal.completed}
                      onCheckedChange={() => toggleGoal(goal.id)}
                      className="w-5 h-5"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className={`font-semibold ${
                            goal.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {goal.title}
                        </h3>
                        <Badge className={categoryColors[goal.category]}>{goal.category}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          {goal.points} points
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {goal.streak} day streak
                        </span>
                      </div>
                    </div>

                    {goal.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Motivational Message */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                You're doing great!
              </CardTitle>
              <CardDescription>
                {completedGoals.length === goals.length
                  ? "Congratulations! You've completed all your goals for today. You're building amazing habits!"
                  : `You've completed ${completedGoals.length} out of ${goals.length} goals. Keep up the momentum!`}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <AddGoalDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddGoal={(newGoal) => {
          setGoals([...goals, { ...newGoal, id: Date.now().toString(), completed: false, streak: 0 }])
        }}
      />
    </div>
  )
}
