import ResumePreview from "@/components/resume-preview"
import TerminalConsole from "@/components/terminal-console"

export default function IndexPage() {
  return (
    <div className="lg:flex lg:space-x-6">
      <div className="mb-3 text-xs transition-all duration-700 md:text-base xl:w-[38%]">
        <TerminalConsole />
      </div>
      <div className="grow overflow-hidden">
        <ResumePreview />
      </div>
    </div>
  )
}
