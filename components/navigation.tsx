"use client"

import { Button } from "@/components/ui/button"
import { Home, MessageCircle, Target, User, History, Camera, Heart } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/goals", icon: Target, label: "Goals" },
  { href: "/dashboard", icon: User, label: "Profile" },
  { href: "/history", icon: History, label: "History" },
  { href: "/ar", icon: Camera, label: "AR" },
  { href: "/help", icon: Heart, label: "Help" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-card border-t border-border md:border-t-0 md:border-r md:w-64 md:h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-primary mb-6 hidden md:block">Zen Wellness</h1>

        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`flex items-center gap-3 w-full justify-start min-w-fit md:min-w-full ${
                    isActive ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
