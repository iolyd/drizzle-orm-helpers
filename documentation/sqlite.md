# src/sqlite

## Table of Contents

- [Functions](#functions)
  - [random()](#random)

## Functions

<a id="random" name="random"></a>

### random()

```ts
random(): SQL<number>
```

SQLite random function.

#### Returns

`SQL`<`number`>

Random random integer between -9223372036854775808 and +9223372036854775807.

#### Example

```sql
random();
```
