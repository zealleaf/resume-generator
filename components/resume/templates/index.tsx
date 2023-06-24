import { TTemplate, TUserData } from "../type"
import One from "./one"

interface ITemplates {
  template: TTemplate
  userData: TUserData
}

const templateMap = {
  one: (props: TUserData) => {
    return <One {...props} />
  },
}

export default function Templates({ template, userData }: ITemplates) {
  return <>{templateMap[template](userData)}</>
}
