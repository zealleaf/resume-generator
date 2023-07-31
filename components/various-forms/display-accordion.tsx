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
  store,
  form,
  dataKey,
  dialogTitle,
  accordionTitle,
}: Omit<IDisplayProps, "tabTitle">) => {
  const { store_snapshot, onSubmit, callbackDialogClose } = useDisplay({
    store,
    dataKey,
  })

  return (
    <Dialog open={store_snapshot.show} onOpenChange={callbackDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <Accordion
          type="single"
          collapsible
          className="min-h-[360px]"
          value={store_snapshot.active_item}
          onValueChange={(value) => {
            store.active_item = value
          }}
        >
          {store_snapshot.list.map((values: any) => {
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
