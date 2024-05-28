# src/mysql

## Table of Contents

- [Functions](#functions)
  - [random()](#random)

## Functions

<a id="random" name="random" />

### random()

```ts
function random(): SQL<number>;
```

MySQL random function.

#### Returns

`SQL`\<`number`>

Random number between 0 and 1.

#### Example

```sql
rand();
```
