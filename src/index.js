import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const myVnode1 = h('ul', {}, [
    h('li', { key: 'A' }, "A"),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
]);

const container = document.getElementById("container");
patch(container, myVnode1);

const myVnode2 = h('ul', {}, [
    h('li', { key: 'A' }, "A"),
    h('li', { key: 'B' }, 'B'),
    // h('li', { key: 'C' }, 'C'),
    // h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E'),
]);

const btn = document.getElementById("btn");
btn.onclick = () => {
    patch(myVnode1, myVnode2);
};