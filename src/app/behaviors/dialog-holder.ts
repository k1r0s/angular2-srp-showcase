import { MdDialog, MdDialogRef } from "@angular/material"
import { ErrorDialogComponent } from "../components/error-dialog/error-dialog.component"

export interface DialogHolder {
  dialogFactory: MdDialog
  dialogRef: MdDialogRef<any>
  onDialogClose?(result?: any): void
}

