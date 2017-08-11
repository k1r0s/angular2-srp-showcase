import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material"
import { ResourceContainerBehavior, ResourceContainer } from "../../behaviors/resource-container"
import { catchXenophoby } from "../../behaviors/handle-user-error"
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
  public forbiddenCity = 'South Elvis'

  constructor(public service: UserRepository, public dialogFactory: MdDialog) {}

  public ngOnInit() {
    this.resourceLoad()
  }

  @ResourceContainerBehavior
  public resourceLoad(data?: User[]) {
    this.userList = data
  }

  @catchXenophoby
  @OpenDialogBehavior(UserDialogComponent)
  public selectUser(user: User): User {

    if(user.address.city === this.forbiddenCity) {
      throw new Error(`We don't like people from ${user.address.city} >.<'`)
    }

    return user
  }

  public onDialogClose(): void {
    console.log(`closed`)
  }
}
