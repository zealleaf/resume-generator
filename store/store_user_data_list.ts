import { proxy } from "valtio"

import { resetValtioState } from "@/lib/utils"

const initObj = {
  value: [],
}

export const store_user_data_list = proxy(initObj)

export function resetStoreUserDataList() {
  resetValtioState(store_user_data_list, initObj)
}
