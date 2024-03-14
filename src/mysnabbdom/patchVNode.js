import createElement from "./createElement";

export default function patchVNode(newVnode, oldVnode) {
    if (oldVnode === newVnode) {
        // 如果新虚拟节点中的text和老的虚拟节点的text不同 , 那么直接让新的text写入老的elm中即可.如果
        return;
    }
    // 判断新vnode有没有text属性
    if (newVnode.text != undefined && newVnode.children == undefined || newVnode.children.length == 0) {
        // 新节点有text属性
        if (oldVnode.text != newVnode.text) {
            oldVnode.elm.text = newVnode.text;
        }
    } else {
        // 新节点没有text属性
        if (oldVnode.children != undefined && oldVnode.children > 0) {
            // oldVnode.elm.text = newVnode.text;
        } else {
            oldVnode.elm.innerHTML = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
}