# src

## Table of Contents

- [Type Aliases](#type-aliases)
  - [AnySelect](#anyselect)
  - [InferColumnType\<T>](#infercolumntypet)
  - [InferColumns\<T>](#infercolumnst)
  - [InferData\<T>](#inferdatat)
  - [InferNameOrAlias\<T>](#infernameoraliast)
  - [Schema](#schema)
  - [Select](#select)
  - [SubqueryWithSelection\<TSelection, TName>](#subquerywithselectiontselection-tname)
  - [WithSubqueryWithSelection\<TSelection, TAlias>](#withsubquerywithselectiontselection-talias)
- [Variables](#variables)
  - [currentTimestamp](#currenttimestamp)
  - [fal](#fal)
  - [nul](#nul)
  - [tru](#tru)
- [Functions](#functions)
  - [add()](#add)
  - [bool()](#bool)
  - [cases()](#cases)
  - [coalesce()](#coalesce)
  - [distinct()](#distinct)
  - [divide()](#divide)
  - [getColumns()](#getcolumns)
  - [getNameOrAlias()](#getnameoralias)
  - [greatest()](#greatest)
  - [least()](#least)
  - [multiply()](#multiply)
  - [nullIf()](#nullif)
  - [paginate()](#paginate)
  - [subtract()](#subtract)

## Type Aliases

<a id="anyselect" name="anyselect"></a>

### AnySelect

```ts
type AnySelect: SetOptional<AnyPgSelect | AnyMySqlSelect | AnySQLiteSelect, "where">;
```

Dialect agnostic AnySelect.

#### See

- AnyPgSelect
- AnyMySqlSelect
- AnySQLiteSelect

---

<a id="infercolumntypet" name="infercolumntypet"></a>

### InferColumnType\<T>

```ts
type InferColumnType<T>: AnyColumn<Pick<ReturnType<T>["_"], "data" | "dataType">>;
```

Infer type of table column.

#### Type parameters

| Type parameter                                               |
| :----------------------------------------------------------- |
| `T` extends (...`config`: `never`\[]) => `ColumnBuilderBase` |

---

<a id="infercolumnst" name="infercolumnst"></a>

### InferColumns\<T>

```ts
type InferColumns<T>: T extends Table ? T["_"]["columns"] : T extends View | Subquery | WithSubquery | AnySelect ? T["_"]["selectedFields"] : never;
```

Infer table columns or (sub)query fields.

#### Type parameters

| Type parameter |
| :------------- |

| `T` extends | `Table` | `View` | `Subquery`<`string`, `ColumnsSelection`> |
`WithSubquery`<`string`, `ColumnsSelection`> | [`AnySelect`](README.md#anyselect) |

---

<a id="inferdatat" name="inferdatat"></a>

### InferData\<T>

```ts
type InferData<T>: T extends Table ? InferSelectModel<T> : T extends Column ? T["_"]["notNull"] extends true ? T["_"]["data"] : T["_"]["data"] | null : T extends View | Subquery ? T["_"]["selectedFields"] : T extends SQL<infer U> ? U : T extends SQL.Aliased<infer U> ? U : unknown;
```

Infer any SQL wrapper's expected return data type.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `SQLWrapper` |

---

<a id="infernameoraliast" name="infernameoraliast"></a>

### InferNameOrAlias\<T>

```ts
type InferNameOrAlias<T>: T extends Table | View | Column ? T["_"]["name"] : T extends Subquery | WithSubquery ? T["_"]["alias"] : T extends AnySelect ? T["_"]["tableName"] : T extends SQL.Aliased ? T["fieldAlias"] : T extends Placeholder ? T["name"] : undefined;
```

Infer a table's name or a (sub)query's alias.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `SQLWrapper` |

---

<a id="schema" name="schema"></a>

### Schema

```ts
type Schema: PgSchema | MySqlSchema;
```

Dialect-agnostic schema. Excludes SQLite.

---

<a id="select" name="select"></a>

### Select

```ts
type Select: SetOptional<PgSelect | MySqlSelect | SQLiteSelect, "where">;
```

Dialect agnostic select.

#### See

- PgSelect.
- MySqlSelect
- SQLiteSelect

---

<a id="subquerywithselectiontselectiontname" name="subquerywithselectiontselectiontname"></a>

### SubqueryWithSelection\<TSelection, TName>

```ts
type SubqueryWithSelection<TSelection, TName>: MySqlSubqueryWithSelection<TSelection, TName> | PgSubqueryWithSelection<TSelection, TName> | SQLiteSubqueryWithSelection<TSelection, TName>;
```

Dialect-agnostic subquery with selection.

#### Type parameters

| Type parameter                          |
| :-------------------------------------- |
| `TSelection` extends `ColumnsSelection` |
| `TName` extends `string`                |

---

<a id="withsubquerywithselectiontselectiontalias" name="withsubquerywithselectiontselectiontalias"></a>

### WithSubqueryWithSelection\<TSelection, TAlias>

```ts
type WithSubqueryWithSelection<TSelection, TAlias>: PgWithSubqueryWithSelection<TSelection, TAlias> | SQLiteWithSubqueryWithSelection<TSelection, TAlias> | MySqlWithSubqueryWithSelection<TSelection, TAlias>;
```

Dialect-agnostic with subquery with selection.

#### Type parameters

| Type parameter                          |
| :-------------------------------------- |
| `TSelection` extends `ColumnsSelection` |
| `TAlias` extends `string`               |

## Variables

<a id="currenttimestamp" name="currenttimestamp"></a>

### currentTimestamp

```ts
const currentTimestamp: SQL<Date>;
```

#### Example

```sql
current_timestamp();
```

---

<a id="fal" name="fal"></a>

### fal

```ts
const fal: SQL<false>;
```

SQL template false value.

---

<a id="nul" name="nul"></a>

### nul

```ts
const nul: SQL<null>;
```

SQL template null value.

---

<a id="tru" name="tru"></a>

### tru

```ts
const tru: SQL<true>;
```

SQL template true value.

## Functions

<a id="add" name="add"></a>

### add()

```ts
add<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>
```

Add values.

#### Type parameters

| Type parameter        |
| :-------------------- | ---------------- |
| `T` extends (`number` | `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`<`T`\[`number`] extends `SQLWrapper` ? [`InferData`](README.md#inferdatat)<`any`\[`any`]> :
`T`\[`number`]>

---

<a id="bool" name="bool"></a>

### bool()

```ts
bool<T>(value: T): SQL<T>
```

SQL template boolean value.

#### Type parameters

| Type parameter        |
| :-------------------- |
| `T` extends `boolean` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `value`   | `T`  |

#### Returns

`SQL`<`T`>

---

<a id="cases" name="cases"></a>

### cases()

```ts
cases<C, F, T, R>(conditionals: C, fallback?: F): SQL<R>
```

Case condition chain.

#### Type parameters

| Type parameter           | Value                                           |
| :----------------------- | :---------------------------------------------- | --- |
| `C` extends (`undefined` | \[`SQLWrapper`, `unknown`])\[]                  | -   |
| `F`                      | -                                               |
| `T`                      | `NonUndefinable`<`TupleToUnion`<`C`>>           |
| `R`                      | `T` extends \[`T0`, `T1`] ? `T0` extends `SQL`< |

| `null` | `false` | `0` | `"0"` | `"f"` | `"F"`> ? `never` : `T1` extends `SQLWrapper` ?
[`InferData`](README.md#inferdatat)<`T1`> : `T1` : `never` | `F` extends `void` ? `never` : `F`
extends `SQLWrapper` ? [`InferData`](README.md#inferdatat)<`F`> : `F` |

#### Parameters

| Parameter      | Type |
| :------------- | :--- |
| `conditionals` | `C`  |
| `fallback`?    | `F`  |

#### Returns

`SQL`<`R`>

#### Example

```ts
cases([[eq(thing, other), 2]], 3);
```

#### Example

```sql
CASE
 WHEN thing = other THEN 2
 ELSE 3
END;
```

#### Todo

Implement smarter typing to identify confirmable early returns with truthy conditions.

---

<a id="coalesce" name="coalesce"></a>

### coalesce()

```ts
coalesce<T>(...values: [...T[]]): CoalesceSQL<T, true, never>
```

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `unknown`\[] |

#### Parameters

| Parameter   | Type        |
| :---------- | :---------- |
| ...`values` | \[`...T[]`] |

#### Returns

`CoalesceSQL`<`T`, `true`, `never`>

#### See

https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL

---

<a id="distinct" name="distinct"></a>

### distinct()

```ts
distinct<T>(statement: T): SQL<InferData<T>>
```

Distinct keyword.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `SQLWrapper` |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| `statement` | `T`  |

#### Returns

`SQL`<[`InferData`](README.md#inferdatat)<`T`>>

---

<a id="divide" name="divide"></a>

### divide()

```ts
divide<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>
```

Subtract values.

#### Type parameters

| Type parameter        |
| :-------------------- | ---------------- |
| `T` extends (`number` | `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`<`T`\[`number`] extends `SQLWrapper` ? [`InferData`](README.md#inferdatat)<`any`\[`any`]> :
`T`\[`number`]>

---

<a id="getcolumns" name="getcolumns"></a>

### getColumns()

```ts
getColumns<T>(table: T): InferColumns<T>
```

Should replace `getTableColumns` to allow for more input versatility.

#### Type parameters

| Type parameter |
| :------------- |

| `T` extends | `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `View`<`string`,
`boolean`, `ColumnsSelection`> | [`AnySelect`](README.md#anyselect) | `Subquery`<`string`,
`Record`<`string`, `unknown`>> | `WithSubquery`<`string`, `Record`<`string`, `unknown`>> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

[`InferColumns`](README.md#infercolumnst)<`T`>

#### See

https://github.com/drizzle-team/drizzle-orm/pull/1789

---

<a id="getnameoralias" name="getnameoralias"></a>

### getNameOrAlias()

```ts
getNameOrAlias<T>(query: T): InferNameOrAlias<T>
```

Get a table's name or a (sub)query's alias.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `SQLWrapper` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `query`   | `T`  |

#### Returns

[`InferNameOrAlias`](README.md#infernameoraliast)<`T`>

---

<a id="greatest" name="greatest"></a>

### greatest()

```ts
greatest<T>(...values: [...T[]]): SQL<{ [I in string | number | symbol]: T[I] extends SQLWrapper ? InferData<any[any]> : T[I] }[number]>
```

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `unknown`\[] |

#### Parameters

| Parameter   | Type        |
| :---------- | :---------- |
| ...`values` | \[`...T[]`] |

#### Returns

`SQL`<`{ [I in string | number | symbol]: T[I] extends SQLWrapper ? InferData<any[any]> : T[I] }`\[`number`]>

#### See

https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST

---

<a id="least" name="least"></a>

### least()

```ts
least<T>(...values: [...T[]]): SQL<{ [I in string | number | symbol]: T[I] extends SQLWrapper ? InferData<any[any]> : T[I] }[number]>
```

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `unknown`\[] |

#### Parameters

| Parameter   | Type        |
| :---------- | :---------- |
| ...`values` | \[`...T[]`] |

#### Returns

`SQL`<`{ [I in string | number | symbol]: T[I] extends SQLWrapper ? InferData<any[any]> : T[I] }`\[`number`]>

#### See

https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST

---

<a id="multiply" name="multiply"></a>

### multiply()

```ts
multiply<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>
```

Subtract values.

#### Type parameters

| Type parameter        |
| :-------------------- | ---------------- |
| `T` extends (`number` | `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`<`T`\[`number`] extends `SQLWrapper` ? [`InferData`](README.md#inferdatat)<`any`\[`any`]> :
`T`\[`number`]>

---

<a id="nullif" name="nullif"></a>

### nullIf()

```ts
nullIf<V, C>(value: V, condition: C): SQL<null | V>
```

Return null if value meets condition. Useful to coalesce to something else.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `V` extends `SQLWrapper` |
| `C`                      |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| `value`     | `V`  |
| `condition` | `C`  |

#### Returns

`SQL`<`null` | `V`>

#### See

https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-NULLIF

---

<a id="paginate" name="paginate"></a>

### paginate()

```ts
paginate<T>(
   qb: T,
   page: number,
   size: number): PgSelect | MySqlSelect | SQLiteSelect
```

Paginate a query.

#### Type parameters

| Type parameter                           |
| :--------------------------------------- |
| `T` extends [`Select`](README.md#select) |

#### Parameters

| Parameter | Type     | Default value |
| :-------- | :------- | :------------ |
| `qb`      | `T`      | `undefined`   |
| `page`    | `number` | `undefined`   |
| `size`    | `number` | `20`          |

#### Returns

`PgSelect` | `MySqlSelect` | `SQLiteSelect`

---

<a id="subtract" name="subtract"></a>

### subtract()

```ts
subtract<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>
```

Subtract values.

#### Type parameters

| Type parameter        |
| :-------------------- | ---------------- |
| `T` extends (`number` | `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`<`T`\[`number`] extends `SQLWrapper` ? [`InferData`](README.md#inferdatat)<`any`\[`any`]> :
`T`\[`number`]>
