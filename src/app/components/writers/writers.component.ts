import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MdDialog, MdDialogRef } from "@angular/material"
import { InitResourceContainer } from "../../behaviors/resource-container"
import { CacheContainer } from "../../behaviors/cache-holder"
import { DialogHolder } from "../../behaviors/dialog-holder"
import { UserDialogComponent } from "../user-dialog/user-dialog.component"
import { UserRepository } from "../../services/user-repository.service"
import { CommonCache } from "../../services/common-cache.service"
import { User } from "../../models/user"
import { LoadingDialog } from '../../behaviors/loading-dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'writers',
  templateUrl: './writers.component.html',
  styleUrls: ['./writers.component.css']
})
export class WritersComponent implements LoadingDialog, InitResourceContainer<User>, CacheContainer, DialogHolder, OnInit {

  public userList: User[] = []
  public dialogRef: MdDialogRef<UserDialogComponent | ErrorDialogComponent>
  public loadingDialogRef: MdDialogRef<any>
  public forbiddenCity = 'South Elvis'

  public static readonly SELECTED_USER = 'selected-user'
  public static readonly USER_LIST = 'user-list'

  constructor(
    public service: UserRepository,
    public cacheSrv: CommonCache,
    public dialogFactory: MdDialog,
    private router: Router
  ) {}

  public ngOnInit() {

    const key: string = `${WritersComponent.name}||ngOnInit||`
    const result = this.cacheSrv.get(key)
    if (result) {
      this.cacheSrv.set(WritersComponent.USER_LIST, result)
      this.userList = result
    } else {
      setTimeout(() => {
        this.loadingDialogRef = this.dialogFactory.open(
          LoadingDialogComponent, { disableClose: true }
        )
      })

      const resourcePromise = this.service.getResource().toPromise()

      resourcePromise.then((data) => {
        this.cacheSrv.set(key, data)
        this.userList = data
        this.loadingDialogRef.close()
      })
    }
  }

  public selectUser(user: User): void {

    try {
      if(user.address.city === this.forbiddenCity) {
        throw new Error(`We cannot retrieve info from people settled in ${user.address.city} >.<'`)
      }

      this.dialogRef = this.dialogFactory.open(
        UserDialogComponent,
        { data: user }
      )

    } catch (error) {
      const errorContext = { exception: error, subject: user }
      console.info(errorContext)
      console.warn(error.stack)

      this.dialogRef = this.dialogFactory.open(
        ErrorDialogComponent,
        { data: errorContext }
      )
    }

    if (typeof this.onDialogClose === "function") {
      this.dialogRef.afterClosed()
      .subscribe(this.onDialogClose.bind(this))
    }

  }

  public onDialogClose(selectedUser?: User): void {
    if(selectedUser){
      this.cacheSrv.set(WritersComponent.SELECTED_USER, selectedUser)
      this.router.navigate([`/posts/${selectedUser.name.toLowerCase().replace(" ", "-")}`])
    }
  }
}
