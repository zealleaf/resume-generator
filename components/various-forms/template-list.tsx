"use client"

import { delay } from "lodash"
import { proxy, subscribe, useSnapshot } from "valtio"

import {
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

import { TTemplate } from "../resume"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

const initial_state = {
  active: "" as TTemplate,
  list: ["one"],
}

// TODO
const templateImgMap = {
  one: "",
}

export const template_list_store = proxy({
  ...handleLocalStorageForValtioGetItem({
    key: "template_list",
    data: initial_state,
  }),
  show: false,
})

subscribe(template_list_store, () => {
  const { active, list } = template_list_store

  handleLocalStorageForValtioSetItem({
    key: "template_list",
    data: { active, list },
  })
})

export function TemplateList() {
  const template_list_store_snapshot = useSnapshot(template_list_store)

  if (!template_list_store_snapshot.show) return null

  return (
    <Dialog
      open={template_list_store_snapshot.show}
      onOpenChange={() => {
        template_list_store.show = false
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Template List</DialogTitle>
        </DialogHeader>

        <div className="min-h-[300px]">
          {/* Temporary writing */}
          {template_list_store_snapshot.list.map((item) => {
            switch (item) {
              case "one":
                return (
                  <Button
                    variant={
                      template_list_store_snapshot.active === item
                        ? "default"
                        : "outline"
                    }
                    style={{
                      fontWeight:
                        template_list_store_snapshot.active === item
                          ? "bolder"
                          : "lighter",
                    }}
                    onClick={() => {
                      template_list_store.active = item
                      delay(() => {
                        template_list_store.show = false
                      }, 334)
                    }}
                  >
                    {item}
                  </Button>
                )
              default:
                return null
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
