import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useDisplay } from "./hooks"
import { IDisplayProps } from "./types"

const DisplayAccordion = ({
  atom,
  form,
  dataKey,
  dialogTitle,
  accordionTitle,
}: Omit<IDisplayProps, "tabTitle">) => {
  const { atom_snapshot, onSubmit, callbackDialogClose } = useDisplay({
    atom,
    dataKey,
  })

  return (
    <Dialog open={atom_snapshot.show} onOpenChange={callbackDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <Accordion
          type="single"
          collapsible
          className="min-h-[360px]"
          value={atom_snapshot.activeItem}
          onValueChange={(value) => {
            atom.activeItem = value
          }}
        >
          {atom_snapshot.list.map((values: any) => {
            return (
              <AccordionItem key={values._id} value={values._id || "Untitled"}>
                <AccordionTrigger className="px-1 font-bold">
                  {values[accordionTitle || ""] || "Untitled"}
                </AccordionTrigger>
                <AccordionContent className="px-1">
                  {typeof form === "function" ? form(values) : null}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <DialogFooter>
          <Button className="mt-4 grow" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(DisplayAccordion)
