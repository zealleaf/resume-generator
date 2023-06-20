import ResumeCore from "./resume-core"

export default function ResumePreview() {
  return (
    <div className="max-h-[469px] overflow-hidden  bg-[#31333e] p-2 sm:max-h-[80vh] sm:overflow-y-auto">
      <ResumeCore />
    </div>
  )
}
