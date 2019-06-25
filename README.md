# Outside Click Handler

> A react component for handling outside clicks without using unnecessary DOM operations. Faster and more practical!

## Getting Started
It is developed for increasing efficiency when handling outside click. It does not use unnecessary DOM operations such as `contains` when handling outside click.

## Installation

```bash
npm install react-outside-click-x
```

## Usage

```jsx
import OutsideClickHandler from 'react-outside-click-x';

function MyComponent() {
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        alert('Clicked outside!');
      }}
    >
      Hello World
    </OutsideClickHandler>
  );
}
```

## Alternative Usage
By default, the OutsideClickHandler renders a <div /> to wrap the subtree defined by children. It can be used alternatively without wrapping with additional div.

```jsx 
import OutsideClickHandler from 'react-outside-click-x';

function MyComponent() {
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        alert('Clicked outside!');
      }}
      targetElement={(ref) => { return (<MyComponent2 refHolder={ref} />) ;}}>
    />
  );
}
```

```jsx
function MyComponent2(props) {
  return (
    <div ref={props.refHolder}>
      ...
    </div>
  );
}
```

## Props

### onOutsideClick: `PropTypes.func.isRequired`

When the user clicks outside of the given `children`, clickevent which is specified in `onOutsideClick` prop is triggered.

### children: `PropTypes.node`

If `children` is defined, `OutsideClickHandler` wrap it with outer div and handles clicks outside of the given `children`.

### targetElement: `PropTypes.func`

By default the `OutsideClickHandler` renders a `<div />` to wrap `children`. Children can be given in the `targetElement` prop, so `OutsideClickHandler` does not render `<div />` to wrap the `children` and the `children` is rendered without wrapping.

### closeable: `PropTypes.bool`

If the `closeable` prop is false, outside clicks will not close given node. It is by default true so when outside clicks occur, given node is closed.

### wrapperProps: `PropTypes.object`

When `targetElement` prop is not used, by default the `OutsideClickHandler` renders a `<div />` to wrap `children`. By using `wrapperProps` prop, some properties can be passed to outer div such as styling.

## Contributing
Please open an issue first to discuss the change you wish to make for major changes.

## License
[MIT](https://choosealicense.com/licenses/mit/)