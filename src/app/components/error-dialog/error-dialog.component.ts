import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
    public errorTitle = 'There was an error in our app';
    constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
