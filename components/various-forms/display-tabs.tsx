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
  $Atom,
  form,
  dataKey,
  dialogTitle,
  tabTitle,
}: Omit<IDisplayProps, "accordionTitle">) => {
  const { $Atom_, onSubmit, callbackDialogClose } = useDisplay({
    $Atom,
    dataKey,
  })

  return (
    <Dialog open={$Atom_.show} onOpenChange={callbackDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <Tabs
          value={$Atom_.activeItem}
          onValueChange={(value) => {
            $Atom.activeItem = value
          }}
        >
          <TabsList className="my-4 flex items-center justify-start">
            {$Atom_.list.map((values: any) => {
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

          {$Atom_.list.map((values: any) => {
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
