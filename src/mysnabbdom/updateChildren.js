import patchVNode from "./patchVNode";

export default function updateChildren(parentElm, oldCh, newCh) {
    // console.log(oldCh, newCh);
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1;

    // 旧前节点
    let oldStartVnode = oldCh[0];
    let newStartVnode = newCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndVnode = newCh[newEndIdx];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            patchVNode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
    }
}


function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key;
}