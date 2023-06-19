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
    <section
      className={cn(
        "m-auto box-border h-[424px] w-[300px] bg-red-700 p-4 transition-all duration-500",
        "sm:h-[730px] sm:w-[516px] sm:scale-[0.95]",
        "md:scale-[0.85] lg:scale-[1]"
      )}
    >
      {templateMap[template](userData)}
    </section>
  )
}
