import { Component, OnInit } from '@angular/core';
import { ResourceContainerBehavior, ResourceContainer } from "./behaviors/resource-container"
import { UserRepository } from "./services/user-repository.service"
import { User } from "./models/user"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, ResourceContainer {
  public userList: User[] = []

  constructor(public service: UserRepository) {}

  public ngOnInit() {
    this.resourceLoad()
  }

  @ResourceContainerBehavior
  public resourceLoad(data?: User[]) {
    this.userList = data
  }
}
