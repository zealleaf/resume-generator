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
  store,
  formCpn,
  dataKey,
  dialogTitle,
  tabTitle,
}: Omit<IDisplayProps, "accordionTitle">) => {
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

        <Tabs
          className="min-h-[360px]"
          value={store_snapshot.active_item}
          onValueChange={(value) => {
            store.active_item = value
          }}
        >
          <TabsList className="my-4 flex items-center justify-start">
            {store_snapshot.list.map((values: any) => {
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

          {store_snapshot.list.map((values: any) => {
            return (
              <TabsContent key={values._id} value={values._id || "Untitled"}>
                {typeof formCpn === "function" ? formCpn(values) : null}
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
