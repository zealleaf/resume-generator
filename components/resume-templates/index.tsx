import { TTemplate, TUserData } from "@/types/resume-core"
import { cn } from "@/lib/utils"

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
  return (
    <div
      className={cn(
        "absolute",
        "p-8",
        "bg-white  text-black",
        "h-[1169px] w-[827px]",
        "left-[-73%] top-[-67%] scale-[0.39]",
        "md:left-[-40%] md:top-[-40%] md:scale-50",
        "lg:left-[-25%] lg:top-[-25%] lg:scale-[0.65]",
        "2xl:left-auto 2xl:top-auto 2xl:scale-100"
      )}
    >
      {templateMap[template](userData)}
    </div>
  )
}
