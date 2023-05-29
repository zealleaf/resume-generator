import { template, userData } from "../resume-core"
import One from "./one"

interface IResumeTemplates {
  template: template
  userData: userData
}

const templateMap = {
  one: (props: userData) => {
    return <One {...props} />
  },
}

export default function ResumeTemplates({
  template,
  userData,
}: IResumeTemplates) {
  return <div>{templateMap[template](userData)}</div>
}
