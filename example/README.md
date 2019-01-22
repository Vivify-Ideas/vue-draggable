# Examples

## Start

::: tip
Attach vue-draggable directive on d&d wrapper element and you are ready to start.
If you want to change default draggable and droppable elements you can pass
new values `dropzoneSelector` and `draggableSelector`.
By default selectors are `'ul'` and `'li'`.
:::
<iframe height="265" style="width: 100%;" scrolling="no" title="VueDraggable" src="//codepen.io/nikolasp/embed/yvpWJR/?height=265&theme-id=0&default-tab=js,resultundefined" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/nikolasp/pen/yvpWJR/'>VueDraggable</a> by Nikola Spalevic
  (<a href='https://codepen.io/nikolasp'>@nikolasp</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Working with Reactive Data

::: tip
Multiple callbacks available for use`onDragstart`, `onDrop`, `onDragend`.

- `onDragend` is always triggered even if item is dropped in invalid
dropzone.

- `onDrop` is triggered only when items are dropped in
valid dropzones.

- `onDragstart` is always called when D&D starts.

Data passed to callbacks:

```javascript
{
  nativeEvent: {}, // native js event
  items: [], // list of selected draggable elements
  owner: null, // old dropzone element
  droptarget: null // new dropzone element,
  stop: () => {} // Stop D&D (available only for callbacks `onDragstart` and `onDragend`)
}
```
:::
<iframe src="https://codesandbox.io/embed/7ml5x9p6pj" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>