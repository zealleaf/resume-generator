import { jsPDF } from "jspdf"

export function generatePDF(cb?: () => void) {
  const pdf = new jsPDF("p", "px", "a4")

  const resumeCoreDOM = document.querySelector(".resume-core")

  pdf.html(resumeCoreDOM as HTMLElement, {
    callback: (doc) => {
      doc.save()

      if (cb) {
        cb()
      }
    },
  })
}
