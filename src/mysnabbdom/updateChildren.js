import createElement from "./createElement";
import patchVNode from "./patchVNode";

export default function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1;

    // 旧前节点
    let oldStartVnode = oldCh[0];
    let newStartVnode = newCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndVnode = newCh[newEndIdx];

    let keyMap = [];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh(++oldStartIdx);
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh(--oldEndIdx);
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh(++newStartIdx);
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh(--newEndIdx);
        } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            patchVNode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            patchVNode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            patchVNode(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            patchVNode(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            if (!keyMap) {
                keyMap = {};
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if (key != undefined) {
                        keyMap[key] = i;
                    }
                }

            }
            console.log(keyMap);
            const idxInOld = keyMap[newStartVnode.key];
            // 如果inxInOld是undefined表示他是全新的项
            if (idxInOld == undefined) {
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            } else {
                // inxInOld不是undefined表示他是全新的项
                const elmToMove = oldCh[idxInOld];
                // if (elmToMove.eom.nodeType == 1) {

                patchVNode(elmToMove, newStartVnode);
                // 把这项设置为undefined,表示我已经出完这项了
                oldCh[idxInOld] = undefined;
                // 移动 , 调用insertBefore也可以实现
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
                // }
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }

    // 循环结束后,start还是比end小
    if (newStartIdx <= newEndIdx) {
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore方法可以自动识别null , 如果是null就会自动排到队尾 , 和appendChild就一致了
            // newCh[i]现在还没有真正的DOM,所以要调用createElement
            parentElm.insertBefore(createElement(newCh[i]), before);
        }
    } else if (oldStartIdx <= oldEndIdx) {
        // old还有剩余节点没有处理
        // 批量删除oldStart和oldEnd指针之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            console.log(oldCh[i]);
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}


function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key;
}