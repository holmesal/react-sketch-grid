# react-sketch-grid

A React port of Sketch's grid overlay

### See it in action

Go to [alonso.io](http://alonso.io), and press _ctrl+g_ to toggle the grid on and off.

### Features

- 🔥 _hotkeys_ - toggle on/off with ctrl+G, just like in Sketch
- 💾 _persistent_ - remembers state across page reloads
- 👩‍🎨 _customizable_ - control grid size, line thickness, color, and more
- 🧘‍♀️ _flexible_ - can be used for whole-page grids, or inside single components

### Goal

I design in Sketch, and I use grids pretty heavily. When I start implementing the layout in code, I want to be looking at exactly the same grid I used in the design phase.

### Installation

`yarn add react-sketch-grid`

### Usage

1. Add the `<Grid />` component.
2. Add `position: relative` to any parent element you want the grid to “fill”

### Example

```jsx
<div style={{ position: 'relative' }}>
  <Grid />
  <h1>Control + G to toggle grid</h1>
  <p>The grid will fill the whole parent's span</p>
</div>
```

### Help wanted

- react-native compatibility (<div /> —> <view />)
- counting blocks is no fun - find a better way?
- remove need for `position: relative` on parent element?
