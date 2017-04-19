# vue-draggable

## Description

Vuejs 2.0 directive for drag and drop

Native HTML5 drag and drop implementation made for Vue

## Installation

```
npm install --save vue-draggable
```

Install the plugin into Vue:

```javascript
import Vue from 'vue'
import VueDraggable from 'vue-draggable'

Vue.use(VueDraggable)
```

## Usage

In the template, use the `v-draggable` directive:

### HTML

```html
<div v-drag-and-drop:options="options">
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <ul>
      <li>Item 4</li>
      <li>Item 5</li>
      <li>Item 6</li>
  </ul>
</div>
```

### Options

```javascript
{
  dropzoneSelector: 'ul',
  draggableSelector: 'li',
  excludeOlderBrowsers: true,
  multipleDropzonesItemsDraggingEnabled: true,
  onDrop: null
}
```

### CSS

```css
/* draggable targets */
ul
{
  float:left;
  list-style-type:none;

  overflow-y:auto;

  /*margin:0 0.5em 0.5em 0;*/
  /*padding:0.5em;*/

  border:2px solid #888;
  border-radius:0.2em;

  background:#ddd;
  color:#555;
}

/* drop target state */
ul[aria-dropeffect="move"]
{
  border-color:#68b;

  background:#fff;
}

/* drop target focus and dragover state */
ul[aria-dropeffect="move"]:focus,
ul[aria-dropeffect="move"].dragover
{
  outline:none;

  box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
}

/* draggable items */
li
{
  display:block;
  list-style-type:none;

  margin:0 0 2px 0;
  padding:0.2em 0.4em;

  border-radius:0.2em;

  line-height:1.3;
}

/* items focus state */
li:focus
{
  outline:none;

  box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items grabbed state */
li[aria-grabbed="true"]
{
  background:#8adccc;
  color:#fff;
}
```

---

LICENCE MIT - Created by Nikola Spalevic (nikolaspalevic@gmail.com)
