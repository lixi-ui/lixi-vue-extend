import {jest} from '@jest/globals'
jest.useFakeTimers();
import { mount } from '@vue/test-utils';
import Component from '../src/index.ts';

import { sleep } from '../../../../test/utils.js';

const _mount = options => mount({
  components: {
    'lx-input': Component,
  },
  ...options,
})


describe('Component', () => {
  
  test('create', async () => {
    const handleFocus = jest.fn()
    const wrapper = _mount({
      template: `
        <lx-input
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
          @focus="handleFocus"
          v-model="input">
        </lx-input>
      `,
      data() {
        return {
          input: "input"
        }
      },
      methods: {
        handleFocus
      }
    })

    const inputElm = wrapper.find('input');
    const vm = wrapper.vm;
    const nativeInput = inputElm.element;
    var placeholder =  wrapper.find('.g-placeholder').element;

    expect(inputElm.exists()).toBe(true);
    expect(placeholder.innerHTML).toBe('请输入内容');
    expect(nativeInput.value).toBe('input');

    vm.input = 'text';
    await sleep();
    expect(nativeInput.value).toBe('text')
  })

  test('disabled', async () => {
    const wrapper = _mount({
      template: `<lx-input disabled />`,
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.disabled).not.toBeNull()
  })

  test('readonly', async () => {
    const wrapper = _mount({
      template: `<lx-input readonly />`,
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.readonly).not.toBeNull()
  })

  test('type', async () => {
    const wrapper = _mount({
      template: `<lx-input/>`,
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.type).toBe('text')
  })

  test('autocomplete', async () => {
    const wrapper = _mount({
      template: `<lx-input autocomplete="off"/>`,
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.autocomplete).toBe('off')
  })

})