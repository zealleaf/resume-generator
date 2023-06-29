export type TTemplate = "one"

export interface TUserData {
  profile: profile
  experience: experience[]
  projects: project[]
  awards: award[]
  skills: skill[]
  education: education[]
}

interface profile {
  name: string
  email: string
  phone?: string
  location?: string
  link?: string
}

interface experience {
  _id: string
  section_heading: string
  company_name: string
  job_title: string
  job_location: string
  start_date: string
  end_date: string
  job_responsibilities: string
}

interface project {
  _id: string
}

interface award {
  _id: string
}

interface skill {
  _id: string
  skill_kind: string
  skill_content: string
}

interface education {
  _id: string
}
