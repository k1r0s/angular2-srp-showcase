import { OnInit } from '@angular/core';
import { CommonRequest } from '../services/common-request.service';
import { beforeMethod } from 'kaop-ts';

export interface ResourceContainer<M = any> {
  service: CommonRequest;
  servicePath?: string;
  onResourceFulfit?(data?: M[]): void;
}

export const ResourceContainerFetch = beforeMethod<ResourceContainer>(function(meta) {

  const path = meta.args[0];
  const source = meta.scope.service.getResource(path || meta.scope.servicePath);

  if (typeof meta.scope.onResourceFulfit === 'function') {
    source.then(meta.scope.onResourceFulfit.bind(meta.scope));
  }

  source.then((data) => {
    meta.args.push(data);
    this.next();
  });
});
