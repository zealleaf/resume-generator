import { TRecord, TTemplate } from "../types"
import One from "./one"

interface IProps {
  template: TTemplate
  record: TRecord
}

const templateMap = {
  one: (props: TRecord) => {
    return <One {...props} />
  },
}

export default function Templates({ template, record }: IProps) {
  return <div className="select-none">{templateMap[template](record)}</div>
}
