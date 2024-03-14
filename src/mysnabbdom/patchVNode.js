import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVNode(oldVnode, newVnode) {
    if (oldVnode === newVnode) {
        // 如果新虚拟节点中的text和老的虚拟节点的text不同 , 那么直接让新的text写入老的elm中即可.如果
        return;
    }
    // 判断新vnode有没有text属性
    if (newVnode.text != undefined && newVnode.children == undefined || newVnode.children.length == 0) {
        // 新节点有text属性
        if (oldVnode.text != newVnode.text) {
            oldVnode.elm.innerText = newVnode.text;
            // console.log(oldVnode.elm);
        }
    } else {
        // 新节点没有text属性
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            // console.log("aa");
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
        } else {
            oldVnode.elm.innerHTML = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                console.log(newVnode);
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
}