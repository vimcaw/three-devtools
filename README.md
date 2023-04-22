<p align="center">
  <img src="./resource/logo.svg" height="128">
  <h1 align="center">Three.js DevTools</h1>
</p>

<h3 align="center">
  Next generation Three.js DevTools, it's modern and future-oriented.
</h3>

| ⚠️  | three-devtools is currently in development and not yet ready for opensource. You can test the latest [alpha build](https://github.com/vimcaw/three-devtools/releases/latest) if you would like, but be warned, you will find many bugs and incomplete features, and API may be changed. Please file new issues [here](https://github.com/vimcaw/three-devtools/issues) after searching to see if the issue already exists. [Contributors welcome](https://github.com/vimcaw/three-devtools/blob/main/CONTRIBUTING.md)! |
| --- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

# Motivation

[Original three-devtools](https://github.com/threejs/three-devtools) and other three.js devtools are feature-lacking, outdated and lack of maintenance. This project aims to provide a modern and feature-rich devtools for three.js.

# Usage

## Browser Extension

Browser extension is working in progress.

### Performance Limitation

Browser extension is running in an isolated environment, it can't access the `three.js` user code directly. So we need to inject a script to the page to communicate with the devtools. This will cause a performance penalty, so we recommend using `Embedding Mode`(Can be injected by browser extension or manually initialize) if care about performance.

## Embedding Usage

### Modern Project With Bundling (Vite, Webpack, Rollup, etc.)

#### 1. install `three-devtools` to your project

```bash
// Choose one of the following commands depends on your package manager

npm install three-devtools -D
yarn add three-devtools -D
pnpm add three-devtools -D
```

#### 2. initialize `three-devtools` in your code

```js
import * as THREE from 'three';
import { ThreeJsDevTools } from 'three-devtools';

// Make sure `three-devtools` has initialized before initializing `three.js`
ThreeJsDevTools.initialize({
  three: THREE,
});
```

### Legacy Project Without Bundling

It's Coming Soon.

# Roadmap

- [ ] Scene Tree
  - [x] View scene tree
  - [x] Remove object
  - [x] Highlight selected object
  - [ ] Pick object in scene to select
  - [ ] Search and filter objects in scene tree
- [ ] Rendering pipelines
  - [ ] View rendering pipelines
- [ ] Render Target
  - [ ] View all render targets
- [ ] Inspector
  - [x] View basic render information
  - [x] View and edit basic object properties
  - [ ] View and edit basic material properties
  - [ ] View and edit basic texture properties
  - [ ] View and edit basic light properties
  - [ ] Shader edit and preview in real time
  - [ ] View and edit vertexes
- [ ] Embedding Mode
  - [x] Embedding to user page
  - [x] Adjust embedding switch button position
  - [x] Adjust embedding panel width
  - [ ] Legacy project usage
- [ ] Browser Extension
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Edge
  - [ ] Safari
- [ ] Misc
  - [x] Dark mode
  - [ ] Unit test
  - [ ] E2E test
  - [ ] Localization
  - [ ] Performance optimization

# Contribution

See [Contributing Guide](CONTRIBUTING.md).

# Credits

- [Original three-devtools](https://github.com/threejs/three-devtools) For inspiration of communication mechanism with `three.js` user code
- [Babylon.js inspector](https://doc.babylonjs.com/toolsAndResources/inspector) For inspiration of functionality and UI

# License

Licensed under the [MIT license](./LICENSE).
