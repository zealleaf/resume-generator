import { TTemplate, TUserData } from "../types"
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
  console.log(template, userData)
  return <div className="select-none">{templateMap[template](userData)}</div>
}
