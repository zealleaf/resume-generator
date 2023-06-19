import ResumeCore from "./resume-core"

export default function ResumePreview() {
  return (
    <div className="max-h-[80vh] overflow-hidden bg-[#31333e] p-2 sm:overflow-y-auto">
      <ResumeCore />
    </div>
  )
}
