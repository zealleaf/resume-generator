import CommandController from "@/components/command-controller"
import { Resume } from "@/components/resume"
import { Terminal } from "@/components/terminal"
import VariousForms from "@/components/various-forms"

export default function IndexPage() {
  return (
    <div className="lg:flex lg:space-x-6">
      <section className="mb-3 text-xs transition-all duration-700 md:text-base lg:w-[28%] xl:w-[38%]">
        <CommandController />
        <Terminal.Display>
          <Terminal.Core commandMap={Terminal.commandMap} />
        </Terminal.Display>
      </section>
      <section className="grow overflow-hidden">
        <Resume.Display>
          <Resume.Core />
        </Resume.Display>
      </section>
      <section>
        <VariousForms />
      </section>
    </div>
  )
}
