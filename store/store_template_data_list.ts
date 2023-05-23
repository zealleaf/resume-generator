import { proxy } from "valtio"

import { resetValtioState } from "@/lib/utils"

const initObj = {
  value: [],
}

export const store_template_data_list = proxy(initObj)

export function reset_store_template_data_list() {
  resetValtioState(store_template_data_list, initObj)
}
