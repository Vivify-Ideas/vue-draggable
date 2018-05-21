# VueDraggable

[![npm version](https://img.shields.io/npm/v/vue-draggable.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-draggable)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![GitHub open issues](https://img.shields.io/github/issues/Vivify-Ideas/vue-draggable.svg?maxAge=2592000)](https://github.com/Vivify-Ideas/vue-draggable/issues?q=is%3Aopen+is%3Aissue)
[![npm download](https://img.shields.io/npm/dt/vue-draggable.svg?maxAge=2592000)](https://www.npmjs.com/package/vue-draggable)
[![MIT License](https://img.shields.io/github/license/Vivify-Ideas/vue-draggable.svg)](https://github.com/Vivify-Ideas/vue-draggable/blob/master/LICENSE)

## Description

VueJS 2.* directive for drag and drop

Native HTML5 drag and drop implementation made for VueJS

Try this demo https://codepen.io/nikolasp/pen/yvpWJR

## Installation

```
npm install --save vue-draggable
```
or
```
yarn add vue-draggable
```
## Setup VueDraggable

```javascript
import Vue from 'vue'
import VueDraggable from 'vue-draggable'

Vue.use(VueDraggable)
```

## Usage

In the template, use the `v-drag-and-drop` directive:

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

#### Directive `v-drag-and-drop` options

```javascript
{
  dropzoneSelector: 'ul',
  draggableSelector: 'li',
  excludeOlderBrowsers: true,
  multipleDropzonesItemsDraggingEnabled: true,
  showDropzoneAreas: true,
  onDrop: function(event) {},
  onDragstart: function(event) {},
  onDragend: function(event) {}
}
```

#### Event Params for `onDrop`, `onDragstart`, `onDragend` callbacks

```javascript
{
  nativeEvent: {}, // native js event
  items: [], // list of selected draggable elements
  owner: null, // old dropzone element
  droptarget: null // new dropzone element,
  stop: () => {} // Stop D&D (available only for callbacks `onDragstart` and `onDragend`)
}
```
---

LICENCE MIT - Created by Nikola Spalevic (nikolaspalevic@gmail.com)
