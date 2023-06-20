import { TTemplate, TUserData } from "@/types/resume-core"

import One from "./one"

interface IResumeTemplates {
  template: TTemplate
  userData: TUserData
}

const templateMap = {
  one: (props: TUserData) => {
    return <One {...props} />
  },
}

export default function ResumeTemplates({
  template,
  userData,
}: IResumeTemplates) {
  return <>{templateMap[template](userData)}</>
}
