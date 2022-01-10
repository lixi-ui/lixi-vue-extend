import LxvButton from "./components/button/package/index.ts";
import LxvButtonGroup from "./components/button-group/package/index.ts";
import LxvDropdown from "./components/dropdown/package/index.ts";
import LxvDropdownItem from "./components/dropdown-item/package/index.ts";
import LxvDropdownMenu from "./components/dropdown-menu/package/index.ts";
import LxvTooltip from "./components/tooltip/package/index.ts";
import LxvDemo from "./components/button/demo/index.vue";
import LxveButton from "../extend/project/lixi-extend/src/components/button/demo/index.vue";
import LxveDemo from "../extend/project/lixi-extend/src/components/button/demo/index.vue";

var install = function(Vue){
  Vue.component(LxvButton.name, LxvButton);
  Vue.component(LxvButtonGroup.name, LxvButtonGroup);
  Vue.component(LxvDropdown.name, LxvDropdown);
  Vue.component(LxvDropdownItem.name, LxvDropdownItem);
  Vue.component(LxvDropdownMenu.name, LxvDropdownMenu);
  Vue.component(LxvTooltip.name, LxvTooltip);
  Vue.component(LxvDemo.name, LxvDemo);
  Vue.component(LxveButton.name, LxveButton);
  Vue.component(LxveDemo.name, LxveDemo);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  LxvButton
}