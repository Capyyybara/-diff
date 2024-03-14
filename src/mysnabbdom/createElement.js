// 真正创建节点,将vnode创建为DOM,插入到pivot之前

export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel);
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        for (let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i];
            let chDom = createElement(ch);
            domNode.appendChild(chDom);
        }
    }
    vnode.elm = domNode;
    // 返回elm , elm是一个纯dom对象
    return vnode.elm;
}