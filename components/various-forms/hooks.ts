import { useCallback, useEffect, useMemo } from "react"
import { useSnapshot } from "valtio"

import { Resume } from "../resume"
import { IDisplayProps } from "./types"

export const useDisplay = ({
  $Atom,
  dataKey,
}: Omit<IDisplayProps, "form" | "dialogTitle" | "tabTitle">) => {
  const $Atom_ = useSnapshot($Atom)
  const Resume$Core_ = useSnapshot(Resume.$Core)

  const callbackDialogClose = useCallback(() => {
    $Atom.show = false
  }, [$Atom])

  const onSubmit = useCallback(() => {
    Resume.$Core.userData[dataKey] = [...$Atom_.list] as any
    callbackDialogClose()
  }, [$Atom_.list, dataKey, callbackDialogClose])

  useEffect(() => {
    $Atom.activeItem = $Atom_.newItemId
  }, [$Atom, $Atom_.newItemId])

  useEffect(() => {
    $Atom.list = [...Resume$Core_.userData[dataKey]]
    $Atom.activeItem = Resume$Core_.userData[dataKey][0]?._id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(() => {
    return {
      $Atom_,
      onSubmit,
      callbackDialogClose,
    }
  }, [$Atom_, onSubmit, callbackDialogClose])
}
