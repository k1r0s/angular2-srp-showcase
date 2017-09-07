import { onException } from 'kaop-ts';


export const ReturnException = onException(function(meta) {
    // asign a default return (in this case we simply asign the first argument)
    meta.result = {
        exception: meta.exception,
        subject: meta.args
    };

    console.log(meta.result);
    console.warn(meta.exception.stack);
});
