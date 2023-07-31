import { useCallback } from "react"
import { proxy, subscribe, useSnapshot } from "valtio"

import {
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

import { TUserData } from "./resume"

type THandleList = (params: {
  option: "add" | "delete" | "update"
  data?: TUserData
}) => void

const initial_state = {
  show: false,
  list: [],
  handle_list: (() => {}) as THandleList,
}

export const user_data_select_pannel_store = proxy(
  handleLocalStorageForValtioGetItem({
    key: "user_data_record",
    data: initial_state,
  })
)

subscribe(user_data_select_pannel_store, () => {
  handleLocalStorageForValtioSetItem({
    key: "user_data_record",
    data: user_data_select_pannel_store,
  })
})

export default function TemplateSelectPannel() {
  const user_data_select_pannel_store_snapshot = useSnapshot(
    user_data_select_pannel_store
  )

  user_data_select_pannel_store.handle_list = useCallback((params) => {
    if (params.option === "add") {
      user_data_select_pannel_store.list.push()
    }

    if (params.option === "delete") {
    }

    if (params.option === "update") {
    }
  }, [])

  if (!user_data_select_pannel_store_snapshot.show) return null

  return <div>UserDataSelectPannel</div>
}
