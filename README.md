<p align="center">
  <img src="./resource/logo.svg" height="128">
  <h1 align="center">Three.js DevTools</h1>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/three-devtools"><img src="https://img.shields.io/npm/v/three-devtools?style=for-the-badge"></a>
</p>

<h3 align="center">
  Next-generation Three.js DevTools, it's modern and future-oriented.
</h3>

| ⚠️  | `three-devtools` is currently in development, You can test the latest [alpha build](https://www.npmjs.com/package/three-devtools) if you would like, but be warned, you may find many bugs and incomplete features, and API may be changed. Please file new issues [here](https://github.com/vimcaw/three-devtools/issues) after searching to see if the issue exists. [Contributors welcome](https://github.com/vimcaw/three-devtools/blob/main/CONTRIBUTING.md)! |
| --- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

# Motivation

[Original three-devtools](https://github.com/threejs/three-devtools) and other `three.js` devtools are feature-lacking, outdated, and lack maintenance. This project aims to provide modern and feature-rich devtools for [three.js](https://threejs.org).

# Example website

https://www.chengfeng.fun/three-devtools/example.html

# Usage

## Browser Extension

The browser extension is working in progress.

### Performance Limitation

Browser extension is running in an isolated environment, it can't access the `three.js` objects directly. So we need to inject a script to the page to communicate with the devtools. This will cause a performance penalty, so we recommend using `Embedding Mode`(Can be injected by browser extension or manually initialize) if care about performance.

## Embedding Usage

### Modern Project With Bundling (Vite, Webpack, Rollup, etc.)

#### 1. install `three-devtools` to your project

```bash
// Choose one of the following commands depending on your package manager

npm install three-devtools -D
yarn add three-devtools -D
pnpm add three-devtools -D
```

#### 2. Initialize `three-devtools` in your code

**⚠️ Be cautious, you must make sure that `three-devtools` has been initialized before initializing `three.js`, otherwise `three-devtools` cannot hook three.js correctly.**

##### Option 1: If you want to enable some feature(such as object highlighting on a pick), you have to pass the `THREE` module to the `initialize` method:

```js
import * as THREE from 'three';
import { ThreeJsDevTools } from 'three-devtools';

ThreeJsDevTools.initialize({
  three: THREE,
});
```

##### Option 2: If you don't need those features, you can just call the `initialize` method without passing the `THREE` module:

```js
import { ThreeJsDevTools } from 'three-devtools';

ThreeJsDevTools.initialize();
```

### Legacy Project Without Bundling

It's coming soon.

# Roadmap

- [ ] Scene Tree
  - [x] View scene tree
  - [x] Remove object
  - [x] Highlight the selected object
  - [ ] Improve highlight effect
  - [ ] Pick an object in a scene to select
  - [ ] Search and filter objects in the scene tree
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
  - [ ] Visualize light probes
  - [ ] View and edit basic camera properties
  - [ ] View normals of vertexes
  - [ ] Shader edit and preview in real time
  - [ ] View and edit vertexes
- [ ] Embedding Mode
  - [x] Embedding to a user page
  - [x] Adjust the embedding switch button position
  - [x] Adjust embedding panel width
  - [ ] Legacy project usage
  - [ ] Improve UI
- [ ] Browser Extension
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Edge
  - [ ] Safari
- [ ] Misc
  - [x] Dark mode
  - [x] Automatic versioning and publishing
  - [ ] Issue and PR template
  - [ ] Unit test
  - [ ] E2E test
  - [ ] Internationalization and localization (i18n)
  - [ ] Performance optimization

# Contribution

See [Contributing Guide](CONTRIBUTING.md).

# Credits

- [Original three-devtools](https://github.com/threejs/three-devtools) - For inspiration of communication mechanism with `three.js` user code
- [Babylon.js inspector](https://doc.babylonjs.com/toolsAndResources/inspector) - For inspiration of functionality and UI

# License

Licensed under the [MIT license](./LICENSE).
