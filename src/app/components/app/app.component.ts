import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material"
import { ResourceContainerBehavior, InitResourceContainer } from "../../behaviors/resource-container"
import { ReturnException } from "../../behaviors/return-exception"
import { ResourceParserBehavior } from "../../behaviors/resource-parser"
import { CacheContainer, CacheReader, CacheWriter } from "../../behaviors/cache-holder"
import { DialogHolder, OpenDialogBehavior } from "../../behaviors/dialog-holder"
import { UserDialogComponent } from "../user-dialog/user-dialog.component"
import { UserRepository } from "../../services/user-repository.service"
import { CommonCache } from "../../services/common-cache.service"
import { User } from "../../models/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements InitResourceContainer, CacheContainer, DialogHolder {
  public userList: User[] = []
  public dialogRef: MdDialogRef<UserDialogComponent>
  public forbiddenCity = 'South Elvis'

  private static CACHE_KEY = '123123'
  constructor(
    public service: UserRepository, 
    public cacheSrv: CommonCache, 
    public dialogFactory: MdDialog
  ) {}

  @CacheReader(AppComponent.CACHE_KEY)
  @ResourceContainerBehavior
  @ResourceParserBehavior(AppComponent.mapper)
  @CacheWriter(AppComponent.CACHE_KEY)
  public ngOnInit(data: User[]) {
    this.userList = data
  }

  private static mapper = (user: User) => {
    delete user.username
    delete user.company
    delete user.email
    return user
  }

  @ReturnException
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
