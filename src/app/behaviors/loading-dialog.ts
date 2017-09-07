import { OnChanges, SimpleChanges } from '@angular/core';
import { beforeMethod } from 'kaop-ts';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoadingDialogComponent } from '../components/loading-dialog/loading-dialog.component';


export interface LoadingDialog {
  dialogFactory: MdDialog;
  loadingDialogRef: MdDialogRef<any>;
}

export const ShowLoading = beforeMethod<LoadingDialog>(function(meta) {

  // avoid ExpressionChangedAfterItHasBeenCheckedError
  setTimeout(() => {
    meta.scope.loadingDialogRef = meta.scope.dialogFactory.open(
      LoadingDialogComponent, { disableClose: true }
    );
  });
});

export const HideLoading = beforeMethod<LoadingDialog>(function(meta) {
  meta.scope.loadingDialogRef.close();
});
