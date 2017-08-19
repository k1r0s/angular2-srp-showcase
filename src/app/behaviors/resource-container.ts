import { CommonRequest } from "../services/common-request.service"
import { OnInit } from '@angular/core';
import { beforeMethod } from "kaop-ts"

export interface InitResourceContainer<M = any> extends OnInit {
  service: CommonRequest
  onResourceFulfit?(data?: M[]): void
  ngOnInit(data?: M[]): void
}

export const ResourceContainerBehavior = beforeMethod<InitResourceContainer, "ngOnInit">(function(meta) {
  const resourcePromise = meta.scope.service.getResource().toPromise()

  if (typeof meta.scope.onResourceFulfit === "function") {
    resourcePromise.then(meta.scope['onResourceFulfit'].bind(meta.scope))
  }

  resourcePromise.then((data) => {
    meta.args[0] = data
    this.next()
  })

})
