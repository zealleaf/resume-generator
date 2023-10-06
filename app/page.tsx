import CommandController from "@/components/command-controller"
import Confetti from "@/components/confetti"
import { Resume } from "@/components/resume"
import { Terminal } from "@/components/terminal"
import VariousForms from "@/components/various-forms"

export default function IndexPage() {
  return (
    <div className="xl:flex xl:space-x-6">
      <section className="mb-3 text-xs transition-all duration-700 md:text-base xl:w-[30%] 2xl:w-[37%]">
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
      <VariousForms />
      <Confetti />
    </div>
  )
}
