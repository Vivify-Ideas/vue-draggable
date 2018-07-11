/* global describe, it, before */
import 'jsdom-global/register';
import chai from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueDraggable from '../lib/vue-draggable.js';
import { VueDraggableDirective } from '../src';

chai.expect();

const expect = chai.expect;

let lib;

describe('is an vuejs plugin', () => {
  before(() => {
    lib = VueDraggable;
  });
  describe('when i need the install function', () => {
    it('should return the function', () => {
      expect(lib.install).is.instanceof(Function);
    });
  });
});

describe('li elements are draggable', () => {
  const component = {
    template: `
    <div v-drag-and-drop:options="options">
    <ul>
      <li class="test-el"><label>Item 1</label></li>
      <li><label>Item 2</label></li>
      <li><label>Item 3</label></li>
    </ul>
    <ul>
      <li><label>Item 4</label></li>
      <li><label>Item 5</label></li>
      <li><label>Item 6</label></li>
    </ul>
    <ul>
      <li><label>Item 7</label></li>
      <li><label>Item 8</label></li>
      <li><label>Item 9</label></li>
    </ul>
    </div>
    `,
    data() {
      return {
        options: {
          dropzoneSelector: 'ul',
          draggableSelector: 'li',
          excludeOlderBrowsers: false
        }
      };
    }
  };
  const localVue = createLocalVue();

  localVue.directive('dragAndDrop', VueDraggableDirective);

  const wrapper = shallowMount(component, {
    localVue
  });

  const testEl = wrapper.find('.test-el');

  it('li elements should have attribute draggable', () => {
    expect(testEl.element.getAttribute('draggable')).to.be.equal('true');
  });
});
