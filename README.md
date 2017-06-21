# lloop
A React JSX `<Loop />` component with the lloopy name.
It allows you to specify some markup to loop through without switching back and forth
between JSX and JavaScript.

![this might be a llama](https://github.com/donavon/lloop/blob/master/img/llama-small.png?raw=true)

(this might be a llama)

## How do I get it?

LLet's quickly get this out of the way. How do I get your aweome code?

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
  {users.map(user => {
    return <User key={user.name} {...user} />;
  })}
</ul>
```

The `User` component would receive the following props:
`name`, `sex`, `age`, and `imgUrl`.
It's the way we've always done it.

## But is there a better way?

Lloop can accomplish the same thing without context switching
between JSX and JavaScript, and with only 3 llines of code.

```js
<Loop items={users} primaryKey="name">
  <User />
</Loop>
```

`Loop` automatically attaches the same props (one for each object key) that we passed in the JavaScript `map`
example above, but it does so automatically, reducing visual clutter for a cleaner code.

Both render the exact same HTML which might look something like this:

![simpsons screen shot](https://raw.githubusercontent.com/donavon/lloop/master/img/lloop-screen-shot.png)

## What `props` can/must I pass to `Loop`?

| prop       | description |
| ---------- | ----------- |
| items      | An array of items to render (required) |
| primaryKey | Name of the unique key for the array. If there is no unique key, set to `null` and the index of the item will be passed to React as the `key` (not recommended). |
| type       | The type of tag to use as the wrapped component. Defaults to a `<ul>`. This may also be the name of a component or class. Example `type={MyItems}`.
