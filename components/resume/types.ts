export type TTemplate = "one"

export interface TRecord {
  _id: string
  profile?: profile
  experience?: experience[]
  projects?: project[]
  awards?: award[]
  skills?: skill[]
  education?: education[]
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
  company_name: string
  start_date: string
  end_date: string
  job_title: string
  job_location: string
  job_responsibilities: string
}

interface skill {
  _id: string
  skill_kind: string
  skill_content: string
}

interface project {
  _id: string
  project_name: string
  project_description: string
  link: string
  tools_used: string
}

interface education {
  _id: string
  school_name: string
  degree: string
  major: string
  start_date: string
  end_date: string
  additional_information: string
}

interface award {
  _id: string
  award_name: string
  more_info: string
}
