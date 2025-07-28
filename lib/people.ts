export interface Person {
  id: string
  name: string
  imageURL: string
  email: string
  workingHours: {
    start: string // 24-hour format like "09:00"
    end: string // 24-hour format like "17:00"
    timezone: string
  }
  team: string
}

export const teams = [
  { id: "dev", name: "Development", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  { id: "qa", name: "Quality Assurance", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  { id: "design", name: "Design", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  { id: "product", name: "Product", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  { id: "marketing", name: "Marketing", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
]

export const people: Person[] = [
  {
    id: "people_0",
    name: "Lily Grace",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690876/people/0_riwhwx.jpg",
    email: "lily.grace@company.com",
    workingHours: { start: "09:00", end: "17:00", timezone: "UTC" },
    team: "design",
  },
  {
    id: "people_1",
    name: "Adam Reid",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690877/people/1_ndgrxc.jpg",
    email: "adam.reid@company.com",
    workingHours: { start: "08:00", end: "16:00", timezone: "UTC" },
    team: "dev",
  },
  {
    id: "people_2",
    name: "Owen Scott",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690877/people/2_qz3dx8.jpg",
    email: "owen.scott@company.com",
    workingHours: { start: "10:00", end: "18:00", timezone: "UTC" },
    team: "qa",
  },
  {
    id: "people_3",
    name: "Mia Belle",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690878/people/3_kfxcej.jpg",
    email: "mia.belle@company.com",
    workingHours: { start: "09:30", end: "17:30", timezone: "UTC" },
    team: "design",
  },
  {
    id: "people_4",
    name: "Zoe Jane",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690877/people/4_ci0ymm.jpg",
    email: "zoe.jane@company.com",
    workingHours: { start: "07:00", end: "15:00", timezone: "UTC" },
    team: "product",
  },
  {
    id: "people_5",
    name: "Ella Rae",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690880/people/5_piun9q.jpg",
    email: "ella.rae@company.com",
    workingHours: { start: "09:00", end: "17:00", timezone: "UTC" },
    team: "marketing",
  },
  {
    id: "people_6",
    name: "Miles Parker",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690879/people/6_fyrri9.jpg",
    email: "miles.parker@company.com",
    workingHours: { start: "08:30", end: "16:30", timezone: "UTC" },
    team: "dev",
  },
  {
    id: "people_7",
    name: "Nora Quinn",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690880/people/7_jhk8k6.jpg",
    email: "nora.quinn@company.com",
    workingHours: { start: "10:00", end: "18:00", timezone: "UTC" },
    team: "qa",
  },
  {
    id: "people_8",
    name: "Caleb Knox",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690880/people/8_y7nrrp.jpg",
    email: "caleb.knox@company.com",
    workingHours: { start: "09:00", end: "17:00", timezone: "UTC" },
    team: "dev",
  },
  {
    id: "people_9",
    name: "Isla Brooke",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690881/people/9_oyi177.jpg",
    email: "isla.brooke@company.com",
    workingHours: { start: "08:00", end: "16:00", timezone: "UTC" },
    team: "design",
  },
  {
    id: "people_10",
    name: "Cole Bennett",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690881/people/10_ah36jq.jpg",
    email: "cole.bennett@company.com",
    workingHours: { start: "11:00", end: "19:00", timezone: "UTC" },
    team: "product",
  },
  {
    id: "people_11",
    name: "Lucy Pearl",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690876/people/11_jjng4x.jpg",
    email: "lucy.pearl@company.com",
    workingHours: { start: "09:00", end: "17:00", timezone: "UTC" },
    team: "product",
  },
  {
    id: "people_12",
    name: "Maya Lynn",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690876/people/12_egrkib.jpg",
    email: "maya.lynn@company.com",
    workingHours: { start: "08:30", end: "16:30", timezone: "UTC" },
    team: "marketing",
  },
  {
    id: "people_13",
    name: "Anna Leigh",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690878/people/13_mjcvdj.jpg",
    email: "anna.leigh@company.com",
    workingHours: { start: "10:30", end: "18:30", timezone: "UTC" },
    team: "qa",
  },
  {
    id: "people_14",
    name: "Sadie Jo",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690880/people/14_breddm.jpg",
    email: "sadie.jo@company.com",
    workingHours: { start: "07:30", end: "15:30", timezone: "UTC" },
    team: "dev",
  },
  {
    id: "people_15",
    name: "Jack Ryan",
    imageURL: "https://res.cloudinary.com/ds574fco0/image/upload/v1753690879/people/15_h5rxq3.jpg",
    email: "jack.ryan@company.com",
    workingHours: { start: "09:30", end: "17:30", timezone: "UTC" },
    team: "marketing",
  },
]

// Utility function to check if person is currently working
export const isPersonWorking = (person: Person): boolean => {
  const now = new Date()
  const currentTime = now.toTimeString().slice(0, 5) // Get HH:MM format

  return currentTime >= person.workingHours.start && currentTime <= person.workingHours.end
}

// Utility function to get team by id
export const getTeamById = (teamId: string) => {
  return teams.find((team) => team.id === teamId)
}
