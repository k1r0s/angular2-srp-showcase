import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material"
import { ResourceContainerBehavior, ResourceContainer } from "../../behaviors/resource-container"
import { DialogHolder, OpenDialogBehavior } from "../../behaviors/dialog-holder"
import { UserDialogComponent } from "../user-dialog/user-dialog.component"
import { UserRepository } from "../../services/user-repository.service"
import { User } from "../../models/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, ResourceContainer, DialogHolder {
  public userList: User[] = []
  public dialogRef: MdDialogRef<UserDialogComponent>

  constructor(public service: UserRepository, public dialogFactory: MdDialog) {}

  public ngOnInit() {
    this.resourceLoad()
  }

  @ResourceContainerBehavior
  public resourceLoad(data?: User[]) {
    this.userList = data
  }

  @OpenDialogBehavior(UserDialogComponent)
  public selectUser(user: User): User {
    return user
  }

  public onDialogClose(): void {
    console.log(`closed`)
  }
}
