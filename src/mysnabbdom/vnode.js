
/**
 * 
 * @param {string} sel dom元素的id或者class 
 * @param {object} data 
 * @param {Array} children 子元素
 * @param {string} text dom元素的文本内容
 * @param {HTMLElement} elm 真实的dom节点
 * @returns 
 */
export default function vnode(sel, data, children, text, elm) {

    return {
        sel, data, children, text, elm, key: data.key
    };;
}