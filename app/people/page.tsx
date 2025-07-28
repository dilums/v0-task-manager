"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { people, teams, isPersonWorking, getTeamById, type Person } from "@/lib/people"
import { Search, Users, Grid3X3, List, Filter, Mail, Clock, Moon, ChevronDown } from "lucide-react"

type ViewMode = "list" | "grid" | "teams"

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")

  // Filter people based on search query and selected team
  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTeam = selectedTeam === "all" || person.team === selectedTeam
    return matchesSearch && matchesTeam
  })

  // Group people by teams for team view
  const peopleByTeams = teams.reduce(
    (acc, team) => {
      acc[team.id] = filteredPeople.filter((person) => person.team === team.id)
      return acc
    },
    {} as Record<string, Person[]>,
  )

  const PersonCard = ({ person, compact = false }: { person: Person; compact?: boolean }) => {
    const team = getTeamById(person.team)
    const isWorking = isPersonWorking(person)

    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <CardContent className={`${compact ? "p-4" : "p-6"}`}>
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className={`${compact ? "w-10 h-10" : "w-12 h-12"}`}>
                <AvatarImage src={person.imageURL || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {!isWorking && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <Moon className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3
                  className={`${compact ? "text-sm" : "text-base"} font-semibold text-gray-900 dark:text-white truncate`}
                >
                  {person.name}
                </h3>
                {team && <Badge className={`${team.color} text-xs`}>{team.name}</Badge>}
              </div>
              <div className="mt-1 space-y-1">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Mail className="w-3 h-3 mr-1" />
                  <span className="truncate">{person.email}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>
                    {person.workingHours.start} - {person.workingHours.end} {person.workingHours.timezone}
                  </span>
                  {isWorking ? (
                    <span className="ml-2 text-green-600 dark:text-green-400">• Online</span>
                  ) : (
                    <span className="ml-2 text-gray-400 dark:text-gray-500">• Offline</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ListView = () => (
    <div className="space-y-4">
      {filteredPeople.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPeople.map((person) => (
        <PersonCard key={person.id} person={person} compact />
      ))}
    </div>
  )

  const TeamsView = () => (
    <div className="space-y-6">
      {teams.map((team) => {
        const teamPeople = peopleByTeams[team.id]
        if (teamPeople.length === 0) return null

        return (
          <div key={team.id}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                <Badge className={team.color}>
                  {teamPeople.length} member{teamPeople.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamPeople.map((person) => (
                <PersonCard key={person.id} person={person} compact />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">People</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your team members and view their availability</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search people by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Team Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                {selectedTeam === "all" ? "All Teams" : getTeamById(selectedTeam)?.name}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem
                onClick={() => setSelectedTeam("all")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                All Teams
              </DropdownMenuItem>
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {team.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-white dark:bg-gray-800">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "teams" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("teams")}
              className="h-8 px-3"
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPeople.length} of {people.length} people
          {selectedTeam !== "all" && ` in ${getTeamById(selectedTeam)?.name}`}
        </p>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {filteredPeople.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No people found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            {viewMode === "list" && <ListView />}
            {viewMode === "grid" && <GridView />}
            {viewMode === "teams" && <TeamsView />}
          </>
        )}
      </div>
    </div>
  )
}
