import { Injectable } from "@angular/core"

@Injectable()
export class CommonCache {

  public provider = localStorage

  public get(key) {
    return JSON.parse(this.provider.getItem(key))
  }

  public set(key, value) {
    if (!value) { return }
    const val = JSON.stringify(value)
    this.provider.setItem(key, val)
  }

  public remove(...args) {
    throw new Error('not implemented yet!!')
  }
}
