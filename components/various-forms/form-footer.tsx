import React from "react"

import { Button } from "../ui/button"

const FormFooter = ({
  store_snapshot,
  add,
  remove,
  maxLimit,
}: {
  store_snapshot: any
  add: () => void
  remove: () => void
  maxLimit: number
}) => {
  return (
    <div className="space-x-2">
      <Button type="submit" variant={"outline"}>
        Save
      </Button>
      <Button
        type="submit"
        variant={"outline"}
        onClick={add}
        disabled={store_snapshot.list.length === maxLimit}
      >
        Add
      </Button>
      <Button
        type="button"
        variant={"destructive"}
        onClick={remove}
        disabled={store_snapshot.list.length === 1}
      >
        Remove
      </Button>
    </div>
  )
}

export default React.memo(FormFooter)
