import { beforeMethod } from "kaop-ts"
import { CommonCache } from "../services/common-cache.service"

export interface CacheContainer {
  cacheSrv: CommonCache
}

export function CacheReader(privateKey) {
  return beforeMethod<CacheContainer>(function(meta) {
    const key: string = `${privateKey}::${meta.target.constructor.name}::${meta.propertyKey}`
    meta.args[0] = meta.scope.cacheSrv.get(key)
    if (meta.args[0]) { this.break() }
  })
}

export function CacheWriter(privateKey) {
  return beforeMethod<CacheContainer>(function(meta) {
    const key: string = `${privateKey}::${meta.target.constructor.name}::${meta.propertyKey}`
    meta.scope.cacheSrv.set(key, meta.args[0])
  })
}

