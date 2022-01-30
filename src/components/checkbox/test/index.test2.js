import {jest} from '@jest/globals'
jest.useFakeTimers();
import { mount } from '@vue/test-utils';
import Component from '../src/index.ts';

const _mount = options => mount({
  components: {
    'g-checkbox': Component,
  },
  ...options,
})

describe('Component', () => {

  test('create', () => {
    const wrapper = mount(Component);
    var buttonElm = wrapper.find(".g-checkbox-component");
    expect(buttonElm.exists()).toBe(true);
  })

  test('isChecked', async () => {
    const wrapper = _mount({
      template: `<g-checkbox :isChecked="check" />`,
      data(){
        return {
          check: true
        }
      }
    })
    // const inputElm = wrapper.find('input');
    const vm = wrapper.vm;
    expect(vm.check).toBe(true);
  })
  
  test('disabled', async () => {
    const wrapper = _mount({
      template: `<g-checkbox disabled />`,
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.disabled).not.toBeNull()
  })

  test('handleChecked', async () => {
    const handleClick = jest.fn()
    const wrapper = _mount({
      template: `<g-checkbox @handleChecked="handleChecked" />`,
      methods: {
        handleChecked: handleClick
      }
    })
    const inputElm = wrapper.find('input')
    await inputElm.trigger('click')
    expect(handleClick).toBeCalled()
  })
})