import React from "react"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useDisplay } from "./hooks"
import { IDisplayProps } from "./types"

const DisplayTabs = ({
  atom,
  form,
  dataKey,
  dialogTitle,
  tabTitle,
}: Omit<IDisplayProps, "accordionTitle">) => {
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

        <Tabs
          value={atom_snapshot.activeItem}
          onValueChange={(value) => {
            atom.activeItem = value
          }}
        >
          <TabsList className="my-4 flex items-center justify-start">
            {atom_snapshot.list.map((values: any) => {
              return (
                <div>
                  <TabsTrigger
                    key={values._id}
                    value={values._id || "Untitled"}
                  >
                    <div className="w-8 justify-start truncate text-xs font-bold sm:w-16">
                      {values[tabTitle || ""] || "Untitled"}
                    </div>
                  </TabsTrigger>
                </div>
              )
            })}
          </TabsList>

          {atom_snapshot.list.map((values: any) => {
            return (
              <TabsContent key={values._id} value={values._id || "Untitled"}>
                {typeof form === "function" ? form(values) : null}
              </TabsContent>
            )
          })}
        </Tabs>

        <DialogFooter>
          <Button className="mt-4 grow" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(DisplayTabs)
