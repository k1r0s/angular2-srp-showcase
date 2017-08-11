import { onException } from "kaop-ts"


export const catchXenophoby = onException(function(meta) {
    // asign a default return (in this case we simply asign the first argument)
    meta.result = {
        exception: meta.exception,
        subject: meta.args
    }

    console.error(meta.result)
    console.error(meta.exception.stack)
})