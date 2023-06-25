export const Display = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="rounded-sm bg-[#31333e] py-3">
      <div className="max-h-[469px] overflow-hidden px-3 sm:max-h-[80vh] sm:overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
