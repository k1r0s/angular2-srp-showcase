import { MdDialog, MdDialogRef } from '@angular/material';
import { afterMethod } from 'kaop-ts';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

export interface DialogHolder {
  dialogFactory: MdDialog;
  dialogRef: MdDialogRef<any>;
  onDialogClose?(result?: any): void;
}

export const OpenDialogBehavior = (dialogComponent, errorDialogComponent = ErrorDialogComponent) => {
  return afterMethod<DialogHolder>(function(meta) {

    meta.scope.dialogRef = meta.scope.dialogFactory.open(
      meta.exception ? errorDialogComponent : dialogComponent,
      { data: meta.result }
    );

    if (typeof meta.scope.onDialogClose === 'function') {
      meta.scope.dialogRef.afterClosed()
      .subscribe(meta.scope.onDialogClose.bind(meta.scope));
    }
  });
};

export const CloseDialogBehavior = () => {
  return afterMethod<DialogHolder>(function(meta) {
    meta.scope.dialogRef.close(meta.result);
  });
};
