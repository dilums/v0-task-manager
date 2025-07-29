"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { documents, documentTypes, formatFileSize, formatDate, type Document } from "@/lib/documents"
import { people } from "@/lib/people"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Upload,
  FolderPlus,
  ChevronDown,
  Star,
  StarOff,
  Download,
  Share,
  Trash2,
  Edit,
  Copy,
  Move,
  Eye,
  FileText,
  Tag,
  MoreHorizontal,
} from "lucide-react"

type SortBy = "name" | "date" | "size" | "type" | "owner"
type GroupBy = "none" | "type" | "date" | "owner" | "folder"
type ViewMode = "grid" | "list"

interface ContextMenuPosition {
  x: number
  y: number
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortBy>("date")
  const [groupBy, setGroupBy] = useState<GroupBy>("none")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ document: Document; position: ContextMenuPosition } | null>(null)
  const [documentsData, setDocumentsData] = useState(documents)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter documents based on search query
  const filteredDocuments = documentsData.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.folder?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "date":
        return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
      case "size":
        return b.size - a.size
      case "type":
        return a.type.localeCompare(b.type)
      case "owner":
        const ownerA = people.find((p) => p.id === a.ownerId)?.name || ""
        const ownerB = people.find((p) => p.id === b.ownerId)?.name || ""
        return ownerA.localeCompare(ownerB)
      default:
        return 0
    }
  })

  // Group documents
  const groupedDocuments = () => {
    if (groupBy === "none") {
      return { "All Documents": sortedDocuments }
    }

    const groups: Record<string, Document[]> = {}

    sortedDocuments.forEach((doc) => {
      let groupKey = ""

      switch (groupBy) {
        case "type":
          groupKey = doc.type.toUpperCase()
          break
        case "date":
          const date = new Date(doc.modifiedAt)
          const today = new Date()
          const diffTime = Math.abs(today.getTime() - date.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays <= 1) groupKey = "Today"
          else if (diffDays <= 7) groupKey = "This Week"
          else if (diffDays <= 30) groupKey = "This Month"
          else groupKey = "Older"
          break
        case "owner":
          const owner = people.find((p) => p.id === doc.ownerId)
          groupKey = owner?.name || "Unknown"
          break
        case "folder":
          groupKey = doc.folder || "No Folder"
          break
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(doc)
    })

    return groups
  }

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc)
    setIsDrawerOpen(true)
  }

  const handleContextMenu = (e: React.MouseEvent, doc: Document) => {
    e.preventDefault()
    setContextMenu({
      document: doc,
      position: { x: e.clientX, y: e.clientY },
    })
  }

  const handleStarToggle = (docId: string) => {
    setDocumentsData((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc)))
  }

  const handleDeleteDocument = (docId: string) => {
    setDocumentsData((prev) => prev.filter((doc) => doc.id !== docId))
    setContextMenu(null)
  }

  const DocumentCard = ({ doc }: { doc: Document }) => {
    const owner = people.find((p) => p.id === doc.ownerId)
    const docType = documentTypes[doc.type]

    return (
      <Card
        className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
        onDoubleClick={() => handleDocumentClick(doc)}
        onContextMenu={(e) => handleContextMenu(e, doc)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 rounded-lg ${docType.bgColor} flex items-center justify-center text-2xl`}>
              {doc.thumbnail ? (
                <img
                  src={doc.thumbnail || "/placeholder.svg"}
                  alt={doc.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span>{docType.icon}</span>
              )}
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  handleStarToggle(doc.id)
                }}
              >
                {doc.isStarred ? (
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                ) : (
                  <StarOff className="w-3 h-3 text-gray-400" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleContextMenu(e, doc)}>
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate" title={doc.name}>
              {doc.name}
            </h3>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatFileSize(doc.size)}</span>
              <span>{formatDate(doc.modifiedAt)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Avatar className="w-5 h-5">
                <AvatarImage src={owner?.imageURL || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white text-xs">
                  {owner?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{owner?.name || "Unknown"}</span>
            </div>

            {doc.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {doc.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
                {doc.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    +{doc.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const DocumentListItem = ({ doc }: { doc: Document }) => {
    const owner = people.find((p) => p.id === doc.ownerId)
    const docType = documentTypes[doc.type]

    return (
      <div
        className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer group"
        onDoubleClick={() => handleDocumentClick(doc)}
        onContextMenu={(e) => handleContextMenu(e, doc)}
      >
        <div className={`w-10 h-10 rounded-lg ${docType.bgColor} flex items-center justify-center flex-shrink-0`}>
          {doc.thumbnail ? (
            <img
              src={doc.thumbnail || "/placeholder.svg"}
              alt={doc.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-lg">{docType.icon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">{doc.name}</h3>
            {doc.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>{formatFileSize(doc.size)}</span>
            <span>{formatDate(doc.modifiedAt)}</span>
            <span>{doc.folder}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={owner?.imageURL || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white text-xs">
                {owner?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{owner?.name || "Unknown"}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => handleContextMenu(e, doc)}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  const groups = groupedDocuments()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Documents</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and organize your project files</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search documents, tags, or folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Sort By */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              >
                Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem
                onClick={() => setSortBy("name")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("date")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Date Modified
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("size")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Size
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("type")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Type
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("owner")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Owner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Group By */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Group: {groupBy === "none" ? "None" : groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem
                onClick={() => setGroupBy("none")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                None
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setGroupBy("type")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Type
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setGroupBy("date")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Date
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setGroupBy("owner")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Owner
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setGroupBy("folder")}
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-white dark:bg-gray-800">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>

          <Button
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredDocuments.length} of {documentsData.length} documents
        </p>
      </div>

      {/* Document Groups */}
      <div className="space-y-8">
        {Object.entries(groups).map(([groupName, groupDocs]) => (
          <div key={groupName}>
            {groupBy !== "none" && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                {groupName}
                <Badge variant="secondary" className="ml-2">
                  {groupDocs.length}
                </Badge>
              </h2>
            )}

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupDocs.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {groupDocs.map((doc) => (
                  <DocumentListItem key={doc.id} doc={doc} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[160px]"
          style={{
            left: contextMenu.position.x,
            top: contextMenu.position.y,
          }}
        >
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              handleDocumentClick(contextMenu.document)
              setContextMenu(null)
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Open
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              console.log("Download", contextMenu.document.name)
              setContextMenu(null)
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              console.log("Share", contextMenu.document.name)
              setContextMenu(null)
            }}
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              handleStarToggle(contextMenu.document.id)
              setContextMenu(null)
            }}
          >
            {contextMenu.document.isStarred ? (
              <>
                <StarOff className="w-4 h-4 mr-2" />
                Remove Star
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-2" />
                Add Star
              </>
            )}
          </button>
          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              console.log("Rename", contextMenu.document.name)
              setContextMenu(null)
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Rename
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              console.log("Copy", contextMenu.document.name)
              setContextMenu(null)
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Make a Copy
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            onClick={() => {
              console.log("Move", contextMenu.document.name)
              setContextMenu(null)
            }}
          >
            <Move className="w-4 h-4 mr-2" />
            Move to Folder
          </button>
          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
          <button
            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
            onClick={() => handleDeleteDocument(contextMenu.document.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}

      {/* Document Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <SheetHeader>
            <SheetTitle className="text-gray-900 dark:text-white">Document Details</SheetTitle>
          </SheetHeader>

          {selectedDocument && (
            <div className="mt-6 space-y-6">
              {/* Preview */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Preview</h3>
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {selectedDocument.thumbnail ? (
                    <img
                      src={selectedDocument.thumbnail || "/placeholder.svg"}
                      alt={selectedDocument.name}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">{documentTypes[selectedDocument.type].icon}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">No preview available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* File Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">File Information</h3>

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Name</span>
                    <span className="text-sm text-gray-900 dark:text-white font-medium text-right max-w-[250px] break-words">
                      {selectedDocument.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                    <Badge className={`${documentTypes[selectedDocument.type].color} bg-transparent border`}>
                      {selectedDocument.type.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Size</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatFileSize(selectedDocument.size)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Folder</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedDocument.folder || "No Folder"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Owner */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Owner</h3>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={people.find((p) => p.id === selectedDocument.ownerId)?.imageURL || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                      {people
                        .find((p) => p.id === selectedDocument.ownerId)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {people.find((p) => p.id === selectedDocument.ownerId)?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {people.find((p) => p.id === selectedDocument.ownerId)?.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dates</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Created</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatDate(selectedDocument.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Modified</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatDate(selectedDocument.modifiedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {selectedDocument.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedDocument.description && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Description</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedDocument.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Rename
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleStarToggle(selectedDocument.id)}
                  >
                    {selectedDocument.isStarred ? (
                      <>
                        <StarOff className="w-4 h-4 mr-2" />
                        Unstar
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Star
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
