import { MdDialog, MdDialogRef } from "@angular/material"
import { afterMethod } from "kaop-ts"

export interface DialogHolder {
  dialogFactory: MdDialog
  dialogRef: MdDialogRef<any>
  onDialogClose?(): void
}

export const OpenDialogBehavior = (dialogComponent) => {
  return afterMethod<DialogHolder>((meta) => {
    meta.scope.dialogRef = meta.scope.dialogFactory.open(dialogComponent)
    if (typeof meta.scope.onDialogClose === "function") {
      meta.scope.dialogRef.afterClosed()
      .subscribe(meta.scope.onDialogClose.bind(meta.scope))
    }
  })
}

export const CloseDialogBehavior = () => {
  return afterMethod<DialogHolder>((meta) => {
    meta.scope.dialogRef.close(meta.result)
  })
}
