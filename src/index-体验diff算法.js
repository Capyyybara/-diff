import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule]);


let key = {
    A: Symbol(),
    B: Symbol(),
    C: Symbol(),
    D: Symbol(),
    E: Symbol(),
};

const vnode1 = h('ul', {}, [
    h('li', { key: key.A }, 'A'),
    h('li', { key: key.B }, 'B'),
    h('li', { key: key.C }, 'C'),
    h('li', { key: key.D }, 'D'),
]);

const container = document.getElementById("container");
let btn = document.getElementById("btn");
patch(container, vnode1);

const vnode2 = h('ul', {}, [
    h('li', { key: key.A }, 'A'),
    h('li', { key: key.B }, 'B'),
    h('li', { key: key.C }, 'C'),
    h('li', { key: key.D }, 'D'),
    h('li', { key: key.E }, 'E'),
]);
btn.onclick = () => {
    patch(container, vnode2);
};