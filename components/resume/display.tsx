export const Display = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="max-h-[469px] overflow-hidden  bg-[#31333e] p-2 sm:max-h-[80vh] sm:overflow-y-auto">
      {children}
    </div>
  )
}
