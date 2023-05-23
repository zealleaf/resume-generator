import ResumePreview from "@/components/resume-preview"
import TerminalConsole from "@/components/terminal-console"

export default function IndexPage() {
  return (
    <div className="md:flex md:space-x-6">
      <div className="mb-3 transition-all duration-500 md:w-[42%] lg:w-1/3">
        <TerminalConsole />
      </div>
      <div className="grow">
        <ResumePreview />
      </div>
    </div>
  )
}
