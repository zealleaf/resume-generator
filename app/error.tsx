"use client"

import { useEffect } from "react"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className="btn-error btn mt-2"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            // Conditions that can cause errors
            // localStorage
            // specified
            localStorage.removeItem("current_resume")
            // other
            localStorage.clear()

            // reload
            location.reload()
          }
        }
      >
        Try again
      </button>
    </div>
  )
}
