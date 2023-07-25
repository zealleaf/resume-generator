import React from "react"

import { Button } from "../ui/button"

const FormFooter = ({
  atom_snapshot,
  add,
  remove,
  maxLimit,
}: {
  atom_snapshot: any
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
        disabled={atom_snapshot.list.length === maxLimit}
      >
        Add
      </Button>
      <Button
        type="button"
        variant={"destructive"}
        onClick={remove}
        disabled={atom_snapshot.list.length === 1}
      >
        Remove
      </Button>
    </div>
  )
}

export default React.memo(FormFooter)
