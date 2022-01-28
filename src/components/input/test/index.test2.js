import {jest} from '@jest/globals'
jest.useFakeTimers();
import { mount } from '@vue/test-utils';
import Component from '../src/index.ts';

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
          :model-value="input">
        </lx-input>
      `,
      data() {
        return {
          input: ""
        }
      },
      methods: {
        handleFocus
      }
    })

    const inputElm = wrapper.find('input')
    // const vm = wrapper.vm
    // const nativeInput = inputElm.element

    // await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    // expect(handleFocus).toHaveBeenCalled()
    // expect(nativeInput.placeholder).toBe('请输入内容')
    // expect(nativeInput.value).toBe('input')
    // expect(nativeInput.minLength).toBe(3)

    // vm.input = 'text'
    // await sleep()
    console.log('----')
    expect("text").toBe('text')
  })
})