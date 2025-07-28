"use client"

import { useState } from "react"
import NotesSection from "@/components/notes-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { people } from "@/lib/people"
import {
  Share,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  BarChart3,
  Calendar,
  MessageSquare,
  Plus,
  MoreHorizontal,
  Edit3,
  Users,
  Zap,
} from "lucide-react"

interface Note {
  id: string
  title: string
  description: string
  completed: boolean
}

interface Task {
  id: number
  name: string
  comments: number
  likes: number
  assigneeId: string
  status: string
  statusColor: string
}

interface ScheduleItem {
  title: string
  time: string
  attendeeIds: string[]
}

export default function MyTaskPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Landing Page For Website",
      description: "To get started on a landing page, could you provide a bit more detail about its purpose?",
      completed: false,
    },
    {
      id: "2",
      title: "Fixing icons with dark backgrounds",
      description:
        "Use icons that are easily recognizable and straightforward. Avoid overly complex designs that might confuse users",
      completed: false,
    },
    {
      id: "3",
      title: "Discussion regarding userflow improvement",
      description: "What's the main goal of the landing page? (e.g., lead generation, product)",
      completed: true,
    },
  ])

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("This Week")
  const [selectedDate, setSelectedDate] = useState(17)
  const [currentWeekStart, setCurrentWeekStart] = useState(15)

  const [tasks, setTasks] = useState<Task[]>({
    "This Week": [
      {
        id: 1,
        name: "Help DStudio get more customers",
        comments: 7,
        likes: 2,
        assigneeId: "people_0",
        status: "In Progress",
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      },
      {
        id: 2,
        name: "Plan a trip",
        comments: 10,
        likes: 3,
        assigneeId: "people_1",
        status: "Pending",
        statusColor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      },
      {
        id: 3,
        name: "Return a package",
        comments: 5,
        likes: 8,
        assigneeId: "people_2",
        status: "Completed",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
    ],
    "Last Week": [
      {
        id: 4,
        name: "Design new landing page",
        comments: 12,
        likes: 5,
        assigneeId: "people_3",
        status: "Completed",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
      {
        id: 5,
        name: "Update user documentation",
        comments: 3,
        likes: 1,
        assigneeId: "people_4",
        status: "Completed",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
      {
        id: 6,
        name: "Fix mobile responsive issues",
        comments: 8,
        likes: 4,
        assigneeId: "people_5",
        status: "Completed",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
    ],
    "This Month": [
      {
        id: 7,
        name: "Q1 Marketing Campaign",
        comments: 25,
        likes: 12,
        assigneeId: "people_6",
        status: "In Progress",
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      },
      {
        id: 8,
        name: "Database optimization",
        comments: 15,
        likes: 7,
        assigneeId: "people_7",
        status: "In Progress",
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      },
      {
        id: 9,
        name: "User feedback analysis",
        comments: 18,
        likes: 9,
        assigneeId: "people_8",
        status: "Pending",
        statusColor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      },
      {
        id: 10,
        name: "Security audit",
        comments: 6,
        likes: 3,
        assigneeId: "people_9",
        status: "Completed",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      },
    ],
  })

  const [scheduleData, setScheduleData] = useState<Record<number, ScheduleItem[]>>({
    15: [
      {
        title: "Team Standup",
        time: "09:00 AM to 09:30 AM",
        attendeeIds: ["people_0", "people_1"],
      },
    ],
    16: [
      {
        title: "Client Review Meeting",
        time: "02:00 PM to 03:00 PM",
        attendeeIds: ["people_2", "people_3"],
      },
    ],
    17: [
      {
        title: "Kickoff Meeting",
        time: "01:00 PM to 02:30 PM",
        attendeeIds: ["people_4", "people_5"],
      },
      {
        title: "Create Wordpress website for event Registration",
        time: "04:00 PM to 02:30 PM",
        attendeeIds: ["people_6", "people_7"],
      },
      {
        title: "Create User flow for hotel booking",
        time: "05:00 PM to 02:30 PM",
        attendeeIds: ["people_8", "people_9"],
      },
    ],
    18: [
      {
        title: "Design Review",
        time: "10:00 AM to 11:00 AM",
        attendeeIds: ["people_10"],
      },
    ],
    19: [
      {
        title: "Sprint Planning",
        time: "03:00 PM to 04:30 PM",
        attendeeIds: ["people_11", "people_12", "people_13"],
      },
    ],
    20: [
      {
        title: "Weekly Demo",
        time: "11:00 AM to 12:00 PM",
        attendeeIds: ["people_14", "people_15"],
      },
    ],
    21: [],
  })

  const handleAddNote = (note: Omit<Note, "id">) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
    }
    setNotes([...notes, newNote])
  }

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updates } : note)))
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleChangeAssignee = (taskId: number, newAssigneeId: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedTimePeriod]: prevTasks[selectedTimePeriod].map((task) =>
        task.id === taskId ? { ...task, assigneeId: newAssigneeId } : task,
      ),
    }))
  }

  const handleChangeScheduleAttendees = (date: number, itemIndex: number, newAttendeeIds: string[]) => {
    setScheduleData((prevData) => ({
      ...prevData,
      [date]: prevData[date].map((item, index) =>
        index === itemIndex ? { ...item, attendeeIds: newAttendeeIds } : item,
      ),
    }))
  }

  const getCurrentWeekDays = () => {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    return days.map((day, index) => ({
      day,
      date: currentWeekStart + index,
    }))
  }

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeekStart((prev) => (direction === "next" ? prev + 7 : prev - 7))
  }

  const currentTasks = tasks[selectedTimePeriod as keyof typeof tasks] || []
  const currentScheduleItems = scheduleData[selectedDate] || []

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Thursday, 20th February</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Good Evening! John,</h2>

        <div className="flex items-center space-x-6 mb-6">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8 mb-8">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-white">12hrs</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">Time Saved</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-white">24</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">Projects Completed</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-white">7</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">Projects In-progress</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-6">
        {/* My Projects - Full Width */}
        <div className="lg:col-span-3">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  My Projects
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
                      >
                        {selectedTimePeriod}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <DropdownMenuItem
                        onClick={() => setSelectedTimePeriod("This Week")}
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        This Week
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelectedTimePeriod("Last Week")}
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Last Week
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelectedTimePeriod("This Month")}
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        This Month
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                    See All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div className="col-span-6 flex items-center">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Task Name
                  </div>
                  <div className="col-span-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Assign
                  </div>
                  <div className="col-span-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Status
                  </div>
                </div>

                {/* Task Rows */}
                {currentTasks.map((task) => {
                  const assignee = people.find((p) => p.id === task.assigneeId) || people[0]
                  return (
                    <div
                      key={task.id}
                      className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="col-span-6">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{task.name}</span>
                          <div className="flex items-center ml-4 space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {task.comments}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              ♥ {task.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded p-1">
                              <Avatar className="w-6 h-6 mr-2">
                                <AvatarImage src={assignee.imageURL || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                                  {assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{assignee.name}</span>
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            {people.map((person) => (
                              <DropdownMenuItem
                                key={person.id}
                                onClick={() => handleChangeAssignee(task.id, person.id)}
                                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Avatar className="w-5 h-5 mr-2">
                                  <AvatarImage src={person.imageURL || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                                    {person.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="text-sm">{person.name}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{person.email}</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="col-span-3">
                        <Badge className={task.statusColor}>{task.status}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Schedule */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Week View with Navigation */}
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={() => navigateWeek("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-7 gap-1 text-center text-xs flex-1 mx-2">
                  {getCurrentWeekDays().map(({ day, date }, index) => (
                    <div key={day} className="py-2">
                      <div className="text-gray-500 dark:text-gray-400">{day}</div>
                      <button
                        onClick={() => setSelectedDate(date)}
                        className={`mt-1 w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs transition-colors ${
                          selectedDate === date
                            ? "bg-purple-500 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {date}
                      </button>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigateWeek("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Schedule Items */}
              <div className="space-y-3 min-h-[192px]">
                {currentScheduleItems.length > 0 ? (
                  currentScheduleItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="flex -space-x-1 cursor-pointer">
                            {item.attendeeIds.map((attendeeId) => {
                              const attendee = people.find((p) => p.id === attendeeId) || people[0]
                              return (
                                <Avatar key={attendeeId} className="w-5 h-5 border border-white dark:border-gray-800">
                                  <AvatarImage src={attendee.imageURL || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                                    {attendee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              )
                            })}
                            <div className="w-5 h-5 border border-white dark:border-gray-800 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <ChevronDown className="w-2 h-2" />
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          {people.map((person) => (
                            <DropdownMenuItem
                              key={person.id}
                              onClick={() => {
                                const currentAttendees = item.attendeeIds
                                const newAttendees = currentAttendees.includes(person.id)
                                  ? currentAttendees.filter((id) => id !== person.id)
                                  : [...currentAttendees, person.id]
                                handleChangeScheduleAttendees(selectedDate, index, newAttendees)
                              }}
                              className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Avatar className="w-5 h-5 mr-2">
                                <AvatarImage src={person.imageURL || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                                  {person.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col flex-1">
                                <span className="text-sm">{person.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{person.email}</span>
                              </div>
                              {item.attendeeIds.includes(person.id) && (
                                <CheckCircle className="w-4 h-4 ml-auto text-green-600 dark:text-green-400" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No events scheduled for this day</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <NotesSection
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </div>
    </div>
  )
}
