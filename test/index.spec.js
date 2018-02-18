/* global describe, it, before */

import chai from 'chai';
import VueDraggable from '../lib/vue-draggable.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my VueDraggable library', () => {
  before(() => {
    lib = VueDraggable;
  });
  describe('when I need the install function', () => {
    it('should return the function', () => {
      expect(lib.install).is.instanceof(Function);
    });
  });
});
