"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Sparkles, Target, Calendar, Award, Edit3, Trophy, Flame } from "lucide-react"
import { EditProfileDialog } from "@/components/edit-profile-dialog"

interface UserProfile {
  name: string
  email: string
  joinDate: string
  avatar: string
  bio: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
}

const initialProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "2024-01-15",
  avatar: "/friendly-person-avatar.png",
  bio: "On a journey to better wellness and mindfulness. Love meditation and morning walks!",
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first daily goal",
    icon: "👣",
    earned: true,
    earnedDate: "2024-01-16",
  },
  {
    id: "2",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-22",
  },
  {
    id: "3",
    title: "Meditation Master",
    description: "Complete 30 meditation sessions",
    icon: "🧘",
    earned: true,
    earnedDate: "2024-02-15",
  },
  {
    id: "4",
    title: "Point Collector",
    description: "Earn 1000 wellness points",
    icon: "⭐",
    earned: true,
    earnedDate: "2024-02-20",
  },
  {
    id: "5",
    title: "Consistency King",
    description: "Maintain a 30-day streak",
    icon: "👑",
    earned: false,
  },
  {
    id: "6",
    title: "Wellness Guru",
    description: "Complete 100 goals total",
    icon: "🏆",
    earned: false,
  },
]

const weeklyData = [
  { day: "Mon", completed: 4, total: 5 },
  { day: "Tue", completed: 5, total: 5 },
  { day: "Wed", completed: 3, total: 5 },
  { day: "Thu", completed: 5, total: 5 },
  { day: "Fri", completed: 4, total: 5 },
  { day: "Sat", completed: 5, total: 5 },
  { day: "Sun", completed: 4, total: 5 },
]

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const totalPoints = 1250
  const currentStreak = 7
  const longestStreak = 12
  const totalGoalsCompleted = 85
  const earnedAchievements = achievements.filter((a) => a.earned)

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                <p className="text-muted-foreground">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowEditDialog(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {profile.bio && <p className="mt-4 text-muted-foreground max-w-2xl">{profile.bio}</p>}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      <span className="font-semibold text-sm">Total Points</span>
                    </div>
                    <div className="text-2xl font-bold text-secondary">{totalPoints}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-sm">Current Streak</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-500">{currentStreak} days</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold text-sm">Best Streak</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-500">{longestStreak} days</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-sm">Goals Done</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{totalGoalsCompleted}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    This Week's Progress
                  </CardTitle>
                  <CardDescription>Your daily goal completion this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {weeklyData.map((day) => (
                      <div key={day.day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">
                            {day.completed}/{day.total}
                          </div>
                          <Progress value={(day.completed / day.total) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest wellness milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {earnedAchievements.slice(-3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge variant="secondary">
                          {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={achievement.earned ? "border-primary/20 bg-primary/5" : "opacity-60"}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {achievement.earned && achievement.earnedDate && (
                            <Badge variant="secondary" className="mt-2">
                              Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                        {achievement.earned && <Trophy className="w-5 h-5 text-primary" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wellness Journey</CardTitle>
                    <CardDescription>Your progress over time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Goals Completed</span>
                      <span className="font-bold">{totalGoalsCompleted}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Points Earned</span>
                      <span className="font-bold">{totalPoints}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Days Active</span>
                      <span className="font-bold">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Achievements Unlocked</span>
                      <span className="font-bold">
                        {earnedAchievements.length}/{achievements.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                    <CardDescription>Your focus areas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Meditation</span>
                          <span>25 goals</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Exercise</span>
                          <span>20 goals</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Mindfulness</span>
                          <span>18 goals</span>
                        </div>
                        <Progress value={55} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Nutrition</span>
                          <span>15 goals</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EditProfileDialog open={showEditDialog} onOpenChange={setShowEditDialog} profile={profile} onSave={setProfile} />
    </div>
  )
}
