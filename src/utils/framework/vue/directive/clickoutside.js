import { on } from '../../utils/dom';

const nodeList = [];
const eleField = '@g-click-outside';
let mark = 0;

EASY_ENV_IS_BROWSER && on(document, 'click', (event) => {
  nodeList.forEach(el => {
    if (!el || !event.target || el.contains(event.target)) return;
    if (el[eleField] && typeof el[eleField].bindingFn === 'function') {
      el[eleField].bindingFn();
    }
  });
});


export default {
  bind(el, binding, vnode) {
    const id = mark++;
    nodeList.push(el);
    el[eleField] = {
      id,
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },
  update(el, binding, vnode) {
    el[eleField].methodName = binding.expression;
    el[eleField].bindingFn = binding.value;
  },
  unbind(el) {
    const len = nodeList.length;
    for (let i = 0; i < len; i++) {
      if (nodeList[i][eleField].id === el[eleField].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[eleField];
  },
};