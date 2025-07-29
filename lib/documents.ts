export interface Document {
  id: string
  name: string
  type: "pdf" | "docx" | "xlsx" | "pptx" | "txt" | "jpg" | "png" | "mp4" | "zip" | "figma"
  size: number // in bytes
  ownerId: string
  createdAt: string
  modifiedAt: string
  folder?: string
  tags: string[]
  isStarred: boolean
  thumbnail?: string
  description?: string
}

export const documentTypes = {
  pdf: { icon: "📄", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-50 dark:bg-red-900/20" },
  docx: { icon: "📝", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  xlsx: { icon: "📊", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-900/20" },
  pptx: { icon: "📋", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  txt: { icon: "📃", color: "text-gray-600 dark:text-gray-400", bgColor: "bg-gray-50 dark:bg-gray-900/20" },
  jpg: { icon: "🖼️", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  png: { icon: "🖼️", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  mp4: { icon: "🎥", color: "text-pink-600 dark:text-pink-400", bgColor: "bg-pink-50 dark:bg-pink-900/20" },
  zip: { icon: "🗜️", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-900/20" },
  figma: { icon: "🎨", color: "text-indigo-600 dark:text-indigo-400", bgColor: "bg-indigo-50 dark:bg-indigo-900/20" },
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Today"
  if (diffDays === 2) return "Yesterday"
  if (diffDays <= 7) return `${diffDays - 1} days ago`

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const documents: Document[] = [
  {
    id: "doc_1",
    name: "Project Requirements.pdf",
    type: "pdf",
    size: 2456789,
    ownerId: "people_0",
    createdAt: "2024-01-15T10:30:00Z",
    modifiedAt: "2024-01-16T14:20:00Z",
    folder: "Project Planning",
    tags: ["requirements", "planning", "important"],
    isStarred: true,
    description: "Detailed project requirements and specifications for the Q1 initiative.",
  },
  {
    id: "doc_2",
    name: "Design System Guidelines.figma",
    type: "figma",
    size: 15678234,
    ownerId: "people_3",
    createdAt: "2024-01-14T09:15:00Z",
    modifiedAt: "2024-01-17T11:45:00Z",
    folder: "Design",
    tags: ["design", "guidelines", "ui"],
    isStarred: false,
    thumbnail: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/4_qvrdhf.jpg",
    description: "Complete design system with components, colors, and typography guidelines.",
  },
  {
    id: "doc_3",
    name: "Q1 Budget Analysis.xlsx",
    type: "xlsx",
    size: 987654,
    ownerId: "people_12",
    createdAt: "2024-01-13T16:20:00Z",
    modifiedAt: "2024-01-18T08:30:00Z",
    folder: "Finance",
    tags: ["budget", "analysis", "q1"],
    isStarred: true,
    description: "Comprehensive budget analysis and projections for Q1 2024.",
  },
  {
    id: "doc_4",
    name: "Team Presentation.pptx",
    type: "pptx",
    size: 5432109,
    ownerId: "people_1",
    createdAt: "2024-01-12T13:45:00Z",
    modifiedAt: "2024-01-15T10:15:00Z",
    folder: "Presentations",
    tags: ["presentation", "team", "meeting"],
    isStarred: false,
    description: "Monthly team presentation covering progress and upcoming milestones.",
  },
  {
    id: "doc_5",
    name: "API Documentation.docx",
    type: "docx",
    size: 1234567,
    ownerId: "people_6",
    createdAt: "2024-01-11T11:30:00Z",
    modifiedAt: "2024-01-19T15:20:00Z",
    folder: "Development",
    tags: ["api", "documentation", "technical"],
    isStarred: false,
    description: "Complete API documentation with endpoints, parameters, and examples.",
  },
  {
    id: "doc_6",
    name: "User Research Findings.pdf",
    type: "pdf",
    size: 3456789,
    ownerId: "people_9",
    createdAt: "2024-01-10T14:00:00Z",
    modifiedAt: "2024-01-12T09:45:00Z",
    folder: "Research",
    tags: ["research", "users", "insights"],
    isStarred: true,
    description: "Key findings from user research sessions and usability testing.",
  },
  {
    id: "doc_7",
    name: "Product Demo Video.mp4",
    type: "mp4",
    size: 45678901,
    ownerId: "people_4",
    createdAt: "2024-01-09T12:15:00Z",
    modifiedAt: "2024-01-09T12:15:00Z",
    folder: "Marketing",
    tags: ["demo", "video", "product"],
    isStarred: false,
    thumbnail: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/1_wtodgu.jpg",
    description: "Product demonstration video showcasing key features and benefits.",
  },
  {
    id: "doc_8",
    name: "Brand Assets.zip",
    type: "zip",
    size: 23456789,
    ownerId: "people_0",
    createdAt: "2024-01-08T10:45:00Z",
    modifiedAt: "2024-01-08T10:45:00Z",
    folder: "Design",
    tags: ["brand", "assets", "logos"],
    isStarred: false,
    description: "Complete brand asset package including logos, fonts, and guidelines.",
  },
  {
    id: "doc_9",
    name: "Meeting Notes.txt",
    type: "txt",
    size: 12345,
    ownerId: "people_11",
    createdAt: "2024-01-20T09:00:00Z",
    modifiedAt: "2024-01-20T09:30:00Z",
    folder: "Meetings",
    tags: ["notes", "meeting", "action-items"],
    isStarred: false,
    description: "Notes from the weekly team meeting with action items and decisions.",
  },
  {
    id: "doc_10",
    name: "UI Mockups.png",
    type: "png",
    size: 2345678,
    ownerId: "people_3",
    createdAt: "2024-01-07T15:30:00Z",
    modifiedAt: "2024-01-14T12:00:00Z",
    folder: "Design",
    tags: ["mockups", "ui", "wireframes"],
    isStarred: true,
    thumbnail: "https://res.cloudinary.com/ds574fco0/image/upload/v1753698766/mock/3_dkb7tc.jpg",
    description: "High-fidelity UI mockups for the new dashboard interface.",
  },
  {
    id: "doc_11",
    name: "Performance Report.pdf",
    type: "pdf",
    size: 1876543,
    ownerId: "people_8",
    createdAt: "2024-01-06T08:20:00Z",
    modifiedAt: "2024-01-18T16:40:00Z",
    folder: "Reports",
    tags: ["performance", "metrics", "analysis"],
    isStarred: false,
    description: "Monthly performance report with key metrics and recommendations.",
  },
  {
    id: "doc_12",
    name: "Client Feedback.docx",
    type: "docx",
    size: 567890,
    ownerId: "people_2",
    createdAt: "2024-01-05T13:10:00Z",
    modifiedAt: "2024-01-16T11:25:00Z",
    folder: "Client Work",
    tags: ["feedback", "client", "review"],
    isStarred: false,
    description: "Compiled client feedback from recent project deliverables.",
  },
]
