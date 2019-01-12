import { getContainer } from './../../helpers';

export const dragleaveHandler = function () {
  // get a drop target reference from the relatedTarget
  let droptarget = getContainer(this.related);

  // if the drop target is different from the last stored reference
  // (or we have one of those references but not the other one)
  if (droptarget !== this.selections.droptarget) {
    // if we have a saved reference, clear its existing dragover class
    if (this.selections.droptarget) {
      this.selections.droptarget.className =
            this.selections.droptarget.className.replace(/ dragover/g, '');
    }

    // apply the dragover class to the new drop target reference
    if (droptarget) {
      droptarget.className += ' dragover';
    }

    // then save that reference for next time
    this.selections.droptarget = droptarget;
  }
};
