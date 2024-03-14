import vnode from "./vnode";
import createElement from "./createElement";
import patchVNode from "./patchVNode";

export default function patch(oldVnode, newVnode) {


    // 判断传入的第一个参数 , 是DOM 节点还是虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }

    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        console.log('是同一个节点');
        //  判断新旧vnode是否是同一个对象
        patchVNode(oldVnode, newVnode);
    } else {
        console.log(("不是同一个节点"));
        console.log(oldVnode);
        let newVnodeElm = createElement(newVnode);
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }

}