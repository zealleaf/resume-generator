export type TTemplate = "one"

export interface TUserData {
  profile: profile
  projects: project[]
  works: work[]
  awards: award[]
  skills: skill[]
  education: education[]
}

interface profile {
  name: string
  email: string
  phone: string
  location: string
  link: string
}

interface project {}

interface work {}

interface award {}

interface skill {}

interface education {}
