import { Resume } from "../resume"

export interface IDisplayProps {
  store: any
  formCpn: (params: any) => JSX.Element
  dataKey: keyof Omit<typeof Resume.store.record, "profile">
  dialogTitle: string
  tabTitle?: string
  accordionTitle?: string
}
