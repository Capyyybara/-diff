import h from "./mysnabbdom/h";
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
let myVnode1 = h('div', {}, [
    h('p', {}, h("div", {}, "aa")),
    h('p', {}, '哈哈'),
    h('p', {}, '哈哈')
]);

patch(myVnode1);