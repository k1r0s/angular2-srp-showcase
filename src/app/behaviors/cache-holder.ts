import { beforeMethod } from 'kaop-ts';
import { CommonCache } from '../services/common-cache.service';

export interface CacheContainer {
  cacheSrv: CommonCache;
}

export interface CacheOpts {
  argDriverIndex: number;
}

export function ArgsCacheReader(cacheOpts?: CacheOpts) {
  return beforeMethod<CacheContainer>(function(meta) {
    const key = `${meta.target.constructor.name}//${meta.propertyKey}//${cacheOpts ? meta.args[cacheOpts.argDriverIndex] : ''}`;
    const result = meta.scope.cacheSrv.get(key);
    if (result) {
      meta.args = result;
      this.break();
    }
  });
}

export function ArgsCacheWriter(cacheOpts?: CacheOpts) {
  return beforeMethod<CacheContainer>(function(meta) {
    const key = `${meta.target.constructor.name}//${meta.propertyKey}//${cacheOpts ? meta.args[cacheOpts.argDriverIndex] : ''}`;
    meta.scope.cacheSrv.set(key, meta.args);
  });
}
