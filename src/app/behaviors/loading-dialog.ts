import { OnChanges, SimpleChanges } from '@angular/core'
import { ErrorDialogComponent } from "../components/error-dialog/error-dialog.component";
import { MdDialog, MdDialogRef } from "@angular/material";
import { LoadingDialogComponent } from '../components/loading-dialog/loading-dialog.component';


export interface LoadingDialog {
  dialogFactory: MdDialog
  loadingDialogRef: MdDialogRef<any>
}
