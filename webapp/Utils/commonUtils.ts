export let debounce = function(func: Function , delay: number) {
    return function(args: any) {
        let self = this;
        let timeOut = null;
        if(timeOut) {
            clearTimeout(timeOut);
        } else {
            timeOut = setTimeout(() => func.call(self, args), delay);
        }
    }
}