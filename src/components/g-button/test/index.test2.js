import {jest} from '@jest/globals'
jest.useFakeTimers();
import { mount } from '@vue/test-utils';
import GButton from '../src/index.ts';

const _mount = options => mount({
  components: {
    'g-button': GButton,
  },
  ...options,
})

describe('GButton', () => {

  test('create', () => {
    const wrapper = mount(GButton);
    var buttonElm = wrapper.find(".g-button-components");
    expect(buttonElm.exists()).toBe(true);
  })

  test('size', () => {
    const wrapper = _mount({
      template: `<g-button size="small"></g-button>`
    });
    var buttonElm = wrapper.find(".g-button-small");
    expect(buttonElm.exists()).toBe(true);
  })

  test('theme', () => {
    const wrapper = _mount({
      template: `<g-button theme="light"></g-button>`
    });
    var buttonElm = wrapper.find(".g-button-light");
    expect(buttonElm.exists()).toBe(true);
  })

  test('disabled', () => {
    const wrapper = _mount({
      template: `<g-button disabled></g-button>`
    });
    var buttonElm = wrapper.find(".g-button-components");
    expect(buttonElm.element.disabled).not.toBeNull()
  })
  
})