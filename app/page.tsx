import ResumePreview from "@/components/resume-preview"
import TerminalConsole from "@/components/terminal-console"

export default function IndexPage() {
  return (
    <div className="md:flex md:space-x-6">
      <div className="mb-3 text-xs transition-all duration-500 md:w-[42%] md:text-sm xl:w-1/3 xl:text-base">
        <TerminalConsole />
      </div>
      <div className="grow overflow-hidden">
        <ResumePreview />
      </div>
    </div>
  )
}
