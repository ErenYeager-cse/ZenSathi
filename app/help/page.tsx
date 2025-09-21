"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Phone,
  MessageCircle,
  Video,
  Clock,
  Star,
  MapPin,
  Shield,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"

interface Professional {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  experience: string
  location: string
  availability: "available" | "busy" | "offline"
  sessionTypes: ("video" | "phone" | "chat")[]
  price: string
  image: string
}

const professionals: Professional[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Mindfulness", "CBT"],
    rating: 4.9,
    experience: "8 years",
    location: "California, USA",
    availability: "available",
    sessionTypes: ["video", "phone"],
    price: "$120/session",
    image: "/professional-therapist-woman.png",
  },
  {
    id: "2",
    name: "Dr. Michael Rodriguez",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Stress Management", "Relationships", "Life Transitions"],
    rating: 4.8,
    experience: "12 years",
    location: "New York, USA",
    availability: "busy",
    sessionTypes: ["video", "phone", "chat"],
    price: "$100/session",
    image: "/professional-therapist-man.jpg",
  },
  {
    id: "3",
    name: "Dr. Emily Johnson",
    title: "Licensed Professional Counselor",
    specialties: ["Trauma", "PTSD", "Mindfulness", "Self-Esteem"],
    rating: 4.9,
    experience: "6 years",
    location: "Texas, USA",
    availability: "available",
    sessionTypes: ["video", "chat"],
    price: "$90/session",
    image: "/professional-counselor-woman.jpg",
  },
]

const crisisResources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 crisis support for people in suicidal crisis or emotional distress",
    website: "https://suicidepreventionlifeline.org",
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "24/7 crisis support via text message",
    website: "https://crisistextline.org",
  },
  {
    name: "NAMI Helpline",
    phone: "1-800-950-NAMI (6264)",
    description: "Information, referrals and support for mental health conditions",
    website: "https://nami.org",
  },
]

const availabilityColors = {
  available: "bg-green-100 text-green-800",
  busy: "bg-yellow-100 text-yellow-800",
  offline: "bg-gray-100 text-gray-800",
}

export default function HelpPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)

  const filteredProfessionals = professionals.filter((prof) =>
    selectedSpecialty !== "all"
      ? prof.specialties.some((spec) => spec.toLowerCase().includes(selectedSpecialty.toLowerCase()))
      : true,
  )

  const handleContactProfessional = (professional: Professional) => {
    setSelectedProfessional(professional)
    setShowContactForm(true)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-destructive" />
            Professional Support
          </h1>
          <p className="text-muted-foreground mb-6">
            Connect with licensed mental health professionals when you need additional support beyond daily wellness
            practices.
          </p>

          {/* Crisis Alert */}
          <Card className="mb-6 border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive mb-2">In Crisis? Get Immediate Help</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you're having thoughts of self-harm or suicide, please reach out for immediate support.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="destructive">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 988
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Text HOME to 741741
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Find the Right Professional</CardTitle>
              <CardDescription>Filter by specialty to find professionals who match your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a specialty (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="stress">Stress Management</SelectItem>
                  <SelectItem value="trauma">Trauma & PTSD</SelectItem>
                  <SelectItem value="relationships">Relationships</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="cbt">Cognitive Behavioral Therapy</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Professionals List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Available Professionals</h2>
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-8 h-8 text-muted-foreground" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{professional.name}</h3>
                          <p className="text-muted-foreground">{professional.title}</p>
                        </div>
                        <Badge className={availabilityColors[professional.availability]}>
                          {professional.availability}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {professional.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {professional.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {professional.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {professional.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-primary">{professional.price}</span>
                          <div className="flex gap-1">
                            {professional.sessionTypes.map((type) => (
                              <Badge key={type} variant="secondary" className="text-xs">
                                {type === "video" && <Video className="w-3 h-3 mr-1" />}
                                {type === "phone" && <Phone className="w-3 h-3 mr-1" />}
                                {type === "chat" && <MessageCircle className="w-3 h-3 mr-1" />}
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleContactProfessional(professional)}
                          disabled={professional.availability === "offline"}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crisis Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield className="w-5 h-5" />
                Crisis Resources
              </CardTitle>
              <CardDescription>24/7 support resources for immediate help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Phone className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold">{resource.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm bg-background px-2 py-1 rounded">{resource.phone}</span>
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Information Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Heart className="w-5 h-5" />
                You're Not Alone
              </CardTitle>
              <CardDescription>
                Seeking professional help is a sign of strength, not weakness. Our licensed professionals are here to
                support you on your mental health journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Licensed and verified professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Secure and confidential sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Flexible scheduling options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Multiple communication methods</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && selectedProfessional && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Contact {selectedProfessional.name}</CardTitle>
              <CardDescription>Send a message to schedule your first session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Your Name</label>
                <Input placeholder="Enter your full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Preferred Session Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProfessional.sessionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)} Session
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Tell the professional about what you'd like to work on..." rows={3} />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowContactForm(false)} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={() => setShowContactForm(false)} className="flex-1">
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
