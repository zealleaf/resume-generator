import { Resume } from "../resume"

export interface IDisplayProps {
  $Atom: any
  form: (params: any) => JSX.Element
  dataKey: keyof Omit<typeof Resume.$Core.userData, "profile">
  dialogTitle: string
  tabTitle: string
}
