"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FileText, Plus, Edit, Trash2 } from "lucide-react"

interface Note {
  id: string
  title: string
  description: string
  completed: boolean
}

interface NotesSectionProps {
  notes: Note[]
  onAddNote: (note: Omit<Note, "id">) => void
  onUpdateNote: (id: string, updates: Partial<Note>) => void
  onDeleteNote: (id: string) => void
}

export default function NotesSection({ notes, onAddNote, onUpdateNote, onDeleteNote }: NotesSectionProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({ title: "", description: "" })

  const handleAddNote = () => {
    if (newNote.title.trim()) {
      onAddNote({
        title: newNote.title.trim(),
        description: newNote.description.trim(),
        completed: false,
      })
      setNewNote({ title: "", description: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditNote = () => {
    if (editingNote && editingNote.title.trim()) {
      onUpdateNote(editingNote.id, {
        title: editingNote.title.trim(),
        description: editingNote.description.trim(),
      })
      setEditingNote(null)
    }
  }

  const handleToggleComplete = (id: string, completed: boolean) => {
    onUpdateNote(id, { completed })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-gray-900 dark:text-white">
            <FileText className="w-5 h-5 mr-2" />
            Notes
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Add New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="note-title" className="text-gray-700 dark:text-gray-300">
                    Title
                  </Label>
                  <Input
                    id="note-title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Enter note title"
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="note-description" className="text-gray-700 dark:text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="note-description"
                    value={newNote.description}
                    onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                    placeholder="Enter note description"
                    rows={3}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddNote}>Add Note</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notes yet. Add your first note!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="flex items-start space-x-3 group">
                <Checkbox
                  checked={note.completed}
                  onCheckedChange={(checked) => handleToggleComplete(note.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      note.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {note.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{note.description}</p>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog open={editingNote?.id === note.id} onOpenChange={(open) => !open && setEditingNote(null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setEditingNote(note)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">Edit Note</DialogTitle>
                      </DialogHeader>
                      {editingNote && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-title" className="text-gray-700 dark:text-gray-300">
                              Title
                            </Label>
                            <Input
                              id="edit-title"
                              value={editingNote.title}
                              onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                              placeholder="Enter note title"
                              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description" className="text-gray-700 dark:text-gray-300">
                              Description
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={editingNote.description}
                              onChange={(e) => setEditingNote({ ...editingNote, description: e.target.value })}
                              placeholder="Enter note description"
                              rows={3}
                              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setEditingNote(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditNote}>Save Changes</Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    onClick={() => onDeleteNote(note.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
