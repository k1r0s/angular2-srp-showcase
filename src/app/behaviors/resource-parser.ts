import { beforeMethod } from "kaop-ts"

export function ResourceParserBehavior(parser){
  return beforeMethod(function(meta) {
    meta.args[0] = (meta.args[0] as Array<any>).map(parser)
  })
}
