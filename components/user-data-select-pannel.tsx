import { proxy, subscribe, useSnapshot } from "valtio"

import {
  handleLocalStorageForValtioGetItem,
  handleLocalStorageForValtioSetItem,
} from "@/lib/utils"

const initial_state = {
  show: false,
  list: [],
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

  if (!user_data_select_pannel_store_snapshot.show) return null

  return <div>UserDataSelectPannel</div>
}
