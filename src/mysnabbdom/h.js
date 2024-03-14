import vnode from "./vnode";

// 调用的时候形态必须是下面的三种之一
// h('div', {}, '文字');
// h('div', {}, []);
// h('div', {}, h());
export default function h(sel, data, c) {
    if (arguments.length != 3) {
        throw new Error("对不起,h函数参数必须是三个三个参数,我们是低配版h函数");
    }
    if (typeof c == "string" || typeof c == "number") {
        // 说明现在调用h函数形态1
        return vnode(sel, data, undefined, c, undefined);
    } else if (Array.isArray(c)) {
        let children = [];
        // 说明现在调用h函数形态2
        for (let i = 0; i < c.length; i++) {
            if (!(typeof c[i] == "object" && c[i].hasOwnProperty("sel"))) {
                throw new Error('传入的数组参数中有项不是h函数');
            }
            children.push(c[i]);
        }
        // 循环结束了 , 就说明children收集完毕了 , 此时可以返回
        return vnode(sel, data, children, undefined, undefined);
    } else if (typeof c == "object" && c.hasOwnProperty("sel")) {
        // 说明现在调用h函数形态3
        // 传入的c是唯一的children , 不用执行c , 因为测试语句中就已经执行了c
        return vnode(sel, data, [c], undefined, undefined);
    }
}