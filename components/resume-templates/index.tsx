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
        "box-border bg-white p-4 text-black transition-all duration-500",
        "ml-[calc(-516px/2+100vw/2-24px)] mt-[-135px] h-[730px] w-[516px] scale-[0.6]",
        "sm:m-auto sm:scale-[0.95]",
        "md:scale-[0.85]",
        "lg:scale-[1]"
      )}
    >
      {templateMap[template](userData)}
    </section>
  )
}
