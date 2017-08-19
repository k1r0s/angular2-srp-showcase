import { CommonRequest } from "../services/common-request.service"
import { OnInit } from '@angular/core';
import { beforeMethod } from "kaop-ts"

export interface InitResourceContainer<M = any> {
  service: CommonRequest,
  servicePath?: string
  onResourceFulfit?(data?: M[]): void
}

export const ResourceContainerBehavior = beforeMethod<InitResourceContainer>(function(meta) {
  const resourcePromise = meta.scope.service.getResource(meta.args[0] || meta.scope.servicePath).toPromise()

  if (typeof meta.scope.onResourceFulfit === "function") {
    resourcePromise.then(meta.scope['onResourceFulfit'].bind(meta.scope))
  }

  resourcePromise.then((data) => {
    meta.args.push(data)
    this.next()
  })

})
