import { CommonRequest } from "../services/common-request.service"
import { OnInit } from '@angular/core';
import { beforeMethod } from "kaop-ts"

export interface InitResourceContainer extends OnInit {
  service: CommonRequest
  ngOnInit(data?: any[]): void
}

export const ResourceContainerBehavior = beforeMethod<InitResourceContainer, "ngOnInit">(function(meta) {
  meta.scope.service.getResource().toPromise().then((data) => {
    meta.args.push(data)
    this.next()
  })
})
