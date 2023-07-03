import React from "react"

import { Button } from "../ui/button"

const FormFooter = ({
  $Atom_,
  add,
  remove,
  maxLimit,
}: {
  $Atom_: any
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
        disabled={$Atom_.list.length === maxLimit}
      >
        Add
      </Button>
      <Button
        type="button"
        variant={"destructive"}
        onClick={remove}
        disabled={$Atom_.list.length === 1}
      >
        Remove
      </Button>
    </div>
  )
}

export default React.memo(FormFooter)
