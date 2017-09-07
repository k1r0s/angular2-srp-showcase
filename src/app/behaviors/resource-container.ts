import { OnInit } from '@angular/core';
import { CommonRequest } from '../services/common-request.service';
import { beforeMethod } from 'kaop-ts';

export interface InitResourceContainer<M = any> {
  service: CommonRequest;
  servicePath?: string;
  onResourceFulfit?(data?: M[]): void;
}

export const ResourceContainerBehavior = beforeMethod<InitResourceContainer>(function(meta) {
  const source = meta.scope.service.getResource(meta.args[0] || meta.scope.servicePath);

  if (typeof meta.scope.onResourceFulfit === 'function') {
    source.subscribe(meta.scope['onResourceFulfit'].bind(meta.scope));
  }

  source.subscribe((data) => {
    meta.args.push(data);
    this.next();
  });
});
