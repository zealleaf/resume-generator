import CommandController from "@/components/command-controller"
import { Resume } from "@/components/resume"
import TerminalConsole from "@/components/terminal"

export default function IndexPage() {
  return (
    <div className="lg:flex lg:space-x-6">
      <div className="mb-3 text-xs transition-all duration-700 md:text-base xl:w-[38%]">
        <TerminalConsole />
      </div>
      <div className="grow overflow-hidden">
        <Resume.Display>
          <Resume.Core />
        </Resume.Display>
      </div>
      <div className="absolute">
        <CommandController />
      </div>
    </div>
  )
}
