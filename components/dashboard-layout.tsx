"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { people } from "@/lib/people"
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  BarChart3,
  MessageSquare,
  FileText,
  Receipt,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Folder,
  LayoutTemplateIcon as Template,
  Import,
  CheckCircle,
  Users,
} from "lucide-react"

interface Project {
  id: string
  name: string
  color: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  projects: Project[]
  onAddProject: (project: Omit<Project, "id">) => void
}

export default function DashboardLayout({ children, projects, onAddProject }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectColor, setNewProjectColor] = useState("bg-blue-200")
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)

  // Get current user (John Doe - people_11)
  const currentUser = people.find((person) => person.id === "people_11") || people[11]

  const sidebarItems = [
    { name: "Dashboard", icon: BarChart3, path: "/dashboard" },
    { name: "Projects", icon: FileText, path: "/projects" },
    { name: "My Task", icon: CheckCircle, path: "/" },
    { name: "People", icon: Users, path: "/people" },
    { name: "Chats", icon: MessageSquare, path: "/chats" },
    { name: "Documents", icon: FileText, path: "/documents" },
    { name: "Receipts", icon: Receipt, path: "/receipts" },
  ]

  const colorOptions = [
    { name: "Blue", value: "bg-blue-200 dark:bg-blue-800" },
    { name: "Pink", value: "bg-pink-200 dark:bg-pink-800" },
    { name: "Green", value: "bg-green-200 dark:bg-green-800" },
    { name: "Yellow", value: "bg-yellow-200 dark:bg-yellow-800" },
    { name: "Purple", value: "bg-purple-200 dark:bg-purple-800" },
    { name: "Red", value: "bg-red-200 dark:bg-red-800" },
  ]

  const notifications = [
    {
      id: 1,
      title: "New task assigned",
      message: `${people[0].name} assigned you to 'Help DStudio get more customers'`,
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Meeting reminder",
      message: "Kickoff Meeting starts in 30 minutes",
      time: "28 minutes ago",
      unread: true,
    },
    {
      id: 3,
      title: "Task completed",
      message: `${people[2].name} completed 'Return a package'`,
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      title: "Comment added",
      message: `${people[1].name} commented on 'Plan a trip'`,
      time: "2 hours ago",
      unread: false,
    },
  ]

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject({
        name: newProjectName.trim(),
        color: newProjectColor,
      })
      setNewProjectName("")
      setNewProjectColor("bg-blue-200 dark:bg-blue-800")
      setIsProjectDialogOpen(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mondays</h1>
        </div>

        <nav className="flex-1 px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Projects</span>
              <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Add New Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-name" className="text-gray-700 dark:text-gray-300">
                        Project Name
                      </Label>
                      <Input
                        id="project-name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="Enter project name"
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">Project Color</Label>
                      <div className="flex space-x-2 mt-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setNewProjectColor(color.value)}
                            className={`w-8 h-8 rounded-full ${color.value} border-2 ${
                              newProjectColor === color.value
                                ? "border-gray-800 dark:border-gray-200"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddProject}>Add Project</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {projects.map((project) => (
              <div key={project.id} className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${project.color} mr-2`} />
                <span className="text-sm text-gray-600 dark:text-gray-300">{project.name}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <HelpCircle className="w-4 h-4 mr-3" />
              Help & Support
              <Badge
                variant="secondary"
                className="ml-auto bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
              >
                8
              </Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Search or type a command"
                  className="pl-10 w-80 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">⌘ F</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-r-none">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-l-none border-l border-blue-500 dark:border-blue-600 px-2">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <DropdownMenuItem className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Folder className="w-4 h-4 mr-2" />
                      New Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Template className="w-4 h-4 mr-2" />
                      From Template
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Import className="w-4 h-4 mr-2" />
                      Import Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <ThemeToggle />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  align="end"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                        Mark all as read
                      </Button>
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${
                            notification.unread ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.time}</p>
                            </div>
                            {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={currentUser.imageURL || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent
                  className="w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  align="end"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={currentUser.imageURL || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                          {currentUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{currentUser.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{currentUser.email}</p>
                      </div>
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help & Support
                      </Button>
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-700" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">{children}</div>
      </div>
    </div>
  )
}
