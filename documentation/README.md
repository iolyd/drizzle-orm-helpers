# src

## Table of Contents

- [Type Aliases](#type-aliases)
  - [AnySelect](#anyselect)
  - [InferColumnType\<T>](#infercolumntypet)
  - [InferColumns\<T>](#infercolumnst)
  - [InferDataType\<T>](#inferdatatypet)
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
  - [multiply()](#multiply)
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

| `T` extends | `Table` | `View` | `Subquery`<`string`, `Record`<`string`, `unknown`>> |
`WithSubquery`<`string`, `Record`<`string`, `unknown`>> | [`AnySelect`](README.md#anyselect) |

---

<a id="inferdatatypet" name="inferdatatypet"></a>

### InferDataType\<T>

```ts
type InferDataType<T>: T extends Table ? InferSelectModel<T> : T extends Column ? T["_"]["notNull"] extends true ? T["_"]["dataType"] : T["_"]["dataType"] | null : T extends View | Subquery ? T["_"]["selectedFields"] : T extends SQL<infer U> ? U : T extends SQL.Aliased<infer U> ? U : T extends Param ? T["value"] : unknown;
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
type InferNameOrAlias<T>: T extends Table | View ? T["_"]["name"] : T extends Subquery | WithSubquery ? T["_"]["alias"] : T extends AnySelect ? T["_"]["tableName"] : T extends SQL.Aliased ? T["fieldAlias"] : never;
```

Infer a table's name or a (sub)query's alias.

#### Type parameters

| Type parameter |
| :------------- |

| `T` extends | `Table` | `View` | `Subquery` | `WithSubquery` | [`AnySelect`](README.md#anyselect)
| `SQL.Aliased` |

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
add<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferDataType<any[any]> : T[number]>
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

`SQL`<`T`\[`number`] extends `SQLWrapper` ?
[`InferDataType`](README.md#inferdatatypet)<`any`\[`any`]> : `T`\[`number`]>

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
[`InferDataType`](README.md#inferdatatypet)<`T1`> : `T1` : `never` | `F` extends `void` ? `never` :
`F` extends `SQLWrapper` ? [`InferDataType`](README.md#inferdatatypet)<`F`> : `F` |

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
coalesce<T>(...values: T): CoalesceSQL<T, true, never>
```

SQL coalesce.

#### Type parameters

| Type parameter                  |
| :------------------------------ |
| `T` extends `SQL`<`unknown`>\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`CoalesceSQL`<`T`, `true`, `never`>

---

<a id="distinct" name="distinct"></a>

### distinct()

```ts
distinct<T>(statement: T): SQL<InferDataType<T>>
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

`SQL`<[`InferDataType`](README.md#inferdatatypet)<`T`>>

---

<a id="divide" name="divide"></a>

### divide()

```ts
divide<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferDataType<any[any]> : T[number]>
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

`SQL`<`T`\[`number`] extends `SQLWrapper` ?
[`InferDataType`](README.md#inferdatatypet)<`any`\[`any`]> : `T`\[`number`]>

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
getNameOrAlias<T>(table: T): InferNameOrAlias<T>
```

Get a table's name or a (sub)query's alias.

#### Type parameters

| Type parameter |
| :------------- |

| `T` extends | `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `Aliased`<`unknown`> |
`View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> |
[`AnySelect`](README.md#anyselect) | `WithSubquery`<`string`, `unknown`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

[`InferNameOrAlias`](README.md#infernameoraliast)<`T`>

---

<a id="multiply" name="multiply"></a>

### multiply()

```ts
multiply<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferDataType<any[any]> : T[number]>
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

`SQL`<`T`\[`number`] extends `SQLWrapper` ?
[`InferDataType`](README.md#inferdatatypet)<`any`\[`any`]> : `T`\[`number`]>

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
subtract<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferDataType<any[any]> : T[number]>
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

`SQL`<`T`\[`number`] extends `SQLWrapper` ?
[`InferDataType`](README.md#inferdatatypet)<`any`\[`any`]> : `T`\[`number`]>
