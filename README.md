# lloop
A React JSX `<Loop />` component with the lloopy name.
It allows you to iterate through an array of items and render markup without switching context back and forth
between JSX and JavaScript.

![this might be a llama](https://github.com/donavon/lloop/blob/master/img/llama-small.png?raw=true)

(this might be a llama. his name is lloyd)

## How do I get it?

Let's quickly get this out of the way. How do I get your aweome code?

```sh
$ npm i --save lloop
```

## Now, what problem does it solve?

Let's say that you had an array of user objects that llooked like this.

```js
const users = [
  { name: 'Homer Simpson', sex: 'M', age: 36, imgUrl: 'http://example.com/homer.png' },
  { name: 'Marge Simpson', sex: 'F', age: 34, imgUrl: 'http://example.com/marge.png' },
  { name: 'Lisa Simpson', sex: 'F', age: 11, imgUrl: 'http://example.com/lisa.png' },
  { name: 'Bart Simpson', sex: 'M', age: 8 ,imgUrl: 'http://example.com/bart.png' },
];
```

You want to render this llist of users.
Traditionally you might go about this using `map`, something llike this:

```js
<ul>
  {
    users.map(user => {
      return <User key={user.name} {...user} />;
    })
  }
</ul>
```

The `User` component would receive the following props:
`name`, `sex`, `age`, and `imgUrl`.
You find yourself context switching in and out of JSX, making the code cumbersome to read that stright markup.
But it's the way we've always done it, so it must be right.

## But is there a better way?

Lloop can accomplish the same thing without popping
between JSX and JavaScript.

```js
<Loop items={users} primaryKey="name">
  <User />
</Loop>
```

`Loop` automatically attaches the same props (one for each object key) that we passed in the JavaScript `map`
example above, but it does so automatically, like magic, reducing visual clutter for a cleaner code.

Both render the exact same HTML which might look something like this:

![simpsons screen shot](https://raw.githubusercontent.com/donavon/lloop/master/img/lloop-screen-shot.png)

(see the code running live in this [codesandbox](https://codesandbox.io/s/ZkLVy722))

## What `props` can/must I pass to `Loop`?

| Prop Name  | Description |
| ---------- | ----------- |
| `items`      | An array of items to render (required) |
| `primaryKey` | Name of the unique key for the array. If there is no unique key, set to `null` and the index of the item will be passed to React as the `key`. So while it is not required, it is recommended that you pass a `primaryKey`. |
| `as`       | The type of tag to use as the wrapped component. Defaults to `as="ul"`. This may also be the name of a component or class. Example `as={MyList}`. |
| itemKey | The prop to use if `destructure` is true. Defaults to `item`.  |
| indexKey | The prop to pass the loop index. Defaults to `index`. |
| destructure | If set to true, each item will be destructured and passed as an individual prop (i.e. `{...item}`). If false, the item is passed as the prop defined by `itemKey` (i.e. `item={item}`). Defaults to true. |

Any other props passed to `Loop` will be passed on to the wrapping element. For example:
```html
<Loop items={users} className="foo">
  ...
```
will produce
```html
<ul class="foo">
  ...
```

## Shortcuts

Because we realize that there are several distinct use case for looping, we've created these shortcuts.

```js
import { SimpleLoop } from 'lloop';
...
<SimpleLoop />
```
which is functionally equivalent to
```js
<Loop destructure={false} itemKey="children" />
```

and

```js
import { ItemLoop } from 'lloop';
...
<ItemLoop />
```
which is functionally equivalent to
```js
<Loop destructure={false} />
```

## Live Example

You can see an extensive live example running here on [codesandbox](https://codesandbox.io/s/73zLr4Blr).
