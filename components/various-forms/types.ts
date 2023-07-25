import { Resume } from "../resume"

export interface IDisplayProps {
  atom: any
  form: (params: any) => JSX.Element
  dataKey: keyof Omit<typeof Resume.store.userData, "profile">
  dialogTitle: string
  tabTitle?: string
  accordionTitle?: string
}
