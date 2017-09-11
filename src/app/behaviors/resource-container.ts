import { CommonRequest } from "../services/common-request.service"

export interface ResourceContainer<M = any> {
  service: CommonRequest,
  servicePath?: string
  onResourceFulfit?(data?: M[]): void
}
