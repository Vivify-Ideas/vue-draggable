# <p align="center"><img src="./vue-draggable.png" width="340" height="140"></p>

[![npm version](https://img.shields.io/npm/v/vue-draggable.svg?maxAge=2592000&v=2.0.6)](https://www.npmjs.com/package/vue-draggable)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![GitHub open issues](https://img.shields.io/github/issues/Vivify-Ideas/vue-draggable.svg?maxAge=2592000&v=2.0.6)](https://github.com/Vivify-Ideas/vue-draggable/issues?q=is%3Aopen+is%3Aissue)
[![npm download](https://img.shields.io/npm/dt/vue-draggable.svg?maxAge=2592000&v=2.0.6)](https://www.npmjs.com/package/vue-draggable)
[![MIT License](https://img.shields.io/github/license/Vivify-Ideas/vue-draggable.svg)](https://github.com/Vivify-Ideas/vue-draggable/blob/master/LICENSE)

## Description

Vue Drag and Drop library without any dependency.

Native HTML5 drag and drop implementation made for Vue.

[Examples 🎪](https://vivify-ideas.github.io/vue-draggable/example/)

## Installation

```
npm install vue-draggable
<!-- or -->
yarn add vue-draggable
```

## Setup

### Setup plugin

```javascript
import Vue from 'vue'
import VueDraggable from 'vue-draggable'

Vue.use(VueDraggable)
```

### Setup directive locally

```javascript
import { VueDraggableDirective } from 'vue-draggable'

export default {
  directives: {
    dragAndDrop: VueDraggableDirective
  }
}

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

#### Directive `v-drag-and-drop` available options

```javascript
{
  dropzoneSelector: 'ul',
  draggableSelector: 'li',
  handlerSelector: null,
  reactivityEnabled: true,
  multipleDropzonesItemsDraggingEnabled: true,
  showDropzoneAreas: true,
  onDrop: function(event) {},
  onDragstart: function(event) {},
  onDragenter: function(event) {},
  onDragover: function(event) {},
  onDragend: function(event) {}
}
```

#### Dropzone events (added, removed, reordered)

```html
<div v-drag-and-drop:options="options">
  <ul
    @added="added"
    @removed="removed"
    @reordered="reordered"
  >
    <li data-id="1">Item 1</li>
    <li data-id="2">Item 2</li>
    <li data-id="3">Item 3</li>
  </ul>
</div>
```
These three custom events have additional `ids` and `index` params.
Ids is an array of defined `data-id` attributes and `index` represents
drop intersection. For more info check out [example](https://vivify-ideas.github.io/vue-draggable/example/#working-with-reactive-data)

#### Reactivity handling and renderless component

There is available `VueDraggableGroup` component so you don't need to write your own model
manipulation logic. However, usage of this component is optional. Use only with Vue v2.6+.
You can pass to component optional `itemsKey` prop if you want to change items collection
property name. By default it's `items`.

```html
<div v-drag-and-drop:options="options">
  <!-- optional renderless component -->
  <vue-draggable-group
    v-for="group in groups"
    v-model="group.items"
    :groups="groups"
    :key="group.id"
    :data-id="group.id"
    @change="onGroupsChange"
  >
    <ul>
      <li
        v-for="item in group.items"
        :key="item.id"
        :data-id="item.id"
      >
        <label v-text="item.name"></label>
      </li>
    </ul>
  </vue-draggable-group>
</div>
```

#### Event Params for `onDrop`, `onDragstart`, `onDragenter`, `onDragover`, `onDragend` callbacks

```javascript
{
  nativeEvent: {}, // native js event
  items: [], // list of selected draggable elements
  owner: null, // old dropzone element
  droptarget: null // new dropzone element,
  stop: () => {} // Stop D&D (available only for callbacks `onDragstart` and `onDragend`)
}
```

## TypeScript

Included TypeScript definitions.

## Browser Compatibility
Polyfills for IE9+ support are included in the repo.

If you need to support IE9 in your applications, import the polyfills:

```javascript
import 'vue-draggable/polyfills'
```

## Contributors 🎖

[<img alt="nikolasp" src="https://avatars2.githubusercontent.com/u/9221865?v=4&s=100&width=100">](https://github.com/nikolasp) |[<img alt="tiagocsilva" src="https://avatars3.githubusercontent.com/u/18669835?v=4&s=100&width=100">](https://github.com/tiagocsilva) |[<img alt="piboistudios" src="https://avatars3.githubusercontent.com/u/21025122?v=4&s=100&width=100">](https://github.com/piboistudios) |[<img alt="swaroopjo" src="https://avatars1.githubusercontent.com/u/2223563?v=4&s=100&width=100" width="100">](https://github.com/swaroopjo) |[<img alt="figurluk" src="https://avatars1.githubusercontent.com/u/5638071?v=4&s=100&width=100" width="100">](https://github.com/figurluk) |
:---:|:---:|:---:|:---:|:---:|
[nikolasp](https://github.com/nikolasp)|[tiagocsilva](https://github.com/tiagocsilva)|[piboistudios](https://github.com/piboistudios)|[swaroopjo](https://github.com/swaroopjo)|[figurluk](https://github.com/figurluk)|

---

LICENCE MIT - Created by Nikola Spalevic (nikolaspalevic@gmail.com)
