import { CommonRequest } from "../services/common-request.service"
import { beforeMethod } from "../../../kaop-ts"

export interface ResourceContainer {
  service: CommonRequest
  resourceLoad(data?: any[]): void
}

export const ResourceContainerBehavior = beforeMethod<ResourceContainer, "resourceLoad">((meta) => {
  meta.scope.service.getResource().toPromise().then((data) => {
    meta.args.push(data)
    this.next()
  })
})
