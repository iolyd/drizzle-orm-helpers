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
  - [$currentTimestamp](#currenttimestamp)
  - [$false](#false)
  - [$null](#null)
  - [$true](#true)
- [Functions](#functions)
  - [$boolean()](#boolean)
  - [add()](#add)
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

<a id="anyselect" name="anyselect" />

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

<a id="infercolumntypet" name="infercolumntypet" />

### InferColumnType\<T>

```ts
type InferColumnType<T>: AnyColumn<Pick<ReturnType<T>["_"], "data" | "dataType">>;
```

Infer type of table column.

#### Type parameters

| Type parameter                                                 |
| :------------------------------------------------------------- |
| `T` _extends_ (...`config`: `never`\[]) => `ColumnBuilderBase` |

---

<a id="infercolumnst" name="infercolumnst" />

### InferColumns\<T>

```ts
type InferColumns<T>: T extends Table ? T["_"]["columns"] : T extends View | Subquery | WithSubquery | AnySelect ? T["_"]["selectedFields"] : never;
```

Infer table columns or (sub)query fields.

#### Type parameters

| Type parameter                        |
| :------------------------------------ |
| `T` _extends_                         |
| \| `Table`                            |
| \| `View`                             |
| \| `Subquery`                         |
| \| `WithSubquery`                     |
| \| [`AnySelect`](README.md#anyselect) |

---

<a id="inferdatat" name="inferdatat" />

### InferData\<T>

```ts
type InferData<T>: T extends Table ? InferSelectModel<T> : T extends Column ? T["_"]["notNull"] extends true ? T["_"]["data"] : T["_"]["data"] | null : T extends View | Subquery ? T["_"]["selectedFields"] : T extends SQL<infer U> ? U : T extends SQL.Aliased<infer U> ? U : unknown;
```

Infer any SQL wrapper's expected return data type.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

---

<a id="infernameoraliast" name="infernameoraliast" />

### InferNameOrAlias\<T>

```ts
type InferNameOrAlias<T>: T extends Table | View | Column ? T["_"]["name"] : T extends Subquery | WithSubquery ? T["_"]["alias"] : T extends AnySelect ? T["_"]["tableName"] : T extends SQL.Aliased ? T["fieldAlias"] : T extends Placeholder ? T["name"] : undefined;
```

Infer a table's name or a (sub)query's alias.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

---

<a id="schema" name="schema" />

### Schema

```ts
type Schema: PgSchema | MySqlSchema;
```

Dialect-agnostic schema. Excludes SQLite.

---

<a id="select" name="select" />

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

<a id="subquerywithselectiontselectiontname" name="subquerywithselectiontselectiontname" />

### SubqueryWithSelection\<TSelection, TName>

```ts
type SubqueryWithSelection<TSelection, TName>: MySqlSubqueryWithSelection<TSelection, TName> | PgSubqueryWithSelection<TSelection, TName> | SQLiteSubqueryWithSelection<TSelection, TName>;
```

Dialect-agnostic subquery with selection.

#### Type parameters

| Type parameter                            |
| :---------------------------------------- |
| `TSelection` _extends_ `ColumnsSelection` |
| `TName` _extends_ `string`                |

---

<a id="withsubquerywithselectiontselectiontalias" name="withsubquerywithselectiontselectiontalias" />

### WithSubqueryWithSelection\<TSelection, TAlias>

```ts
type WithSubqueryWithSelection<TSelection, TAlias>: PgWithSubqueryWithSelection<TSelection, TAlias> | SQLiteWithSubqueryWithSelection<TSelection, TAlias> | MySqlWithSubqueryWithSelection<TSelection, TAlias>;
```

Dialect-agnostic with subquery with selection.

#### Type parameters

| Type parameter                            |
| :---------------------------------------- |
| `TSelection` _extends_ `ColumnsSelection` |
| `TAlias` _extends_ `string`               |

## Variables

<a id="$currenttimestamp" name="$currenttimestamp" />

### $currentTimestamp

```ts
const $currentTimestamp: SQL<Date>;
```

#### Example

```sql
current_timestamp();
```

---

<a id="$false" name="$false" />

### $false

```ts
const $false: SQL<false>;
```

SQL template false value.

---

<a id="$null" name="$null" />

### $null

```ts
const $null: SQL<null>;
```

SQL template null value.

---

<a id="$true" name="$true" />

### $true

```ts
const $true: SQL<true>;
```

SQL template true value.

## Functions

<a id="$boolean" name="$boolean" />

### $boolean()

```ts
function $boolean<T>(value: T): SQL<T>;
```

SQL template boolean value.

#### Type parameters

| Type parameter          |
| :---------------------- |
| `T` _extends_ `boolean` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `value`   | `T`  |

#### Returns

`SQL`\<`T`>

---

<a id="add" name="add" />

### add()

```ts
function add<T>(...values: T): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>;
```

Add values.

#### Type parameters

| Type parameter                              |
| :------------------------------------------ |
| `T` _extends_ (`number` \| `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`\<`T`\[`number`] _extends_ `SQLWrapper` ? [`InferData`](README.md#inferdatat)\<`any`\[`any`]> :
`T`\[`number`]>

---

<a id="cases" name="cases" />

### cases()

```ts
function cases<C, F, T, R>(conditionals: C, fallback?: F): SQL<R>;
```

Case condition chain.

#### Type parameters

| Type parameter                                                                                                                                                                                                                                | Value                                                |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `C` _extends_ (`undefined` \| \[`SQLWrapper`, `unknown`])\[]                                                                                                                                                                                  | -                                                    |
| `F`                                                                                                                                                                                                                                           | -                                                    |
| `T`                                                                                                                                                                                                                                           | `NonUndefinable`\<`TupleToUnion`\<`C`>>              |
| `R`                                                                                                                                                                                                                                           | `T` _extends_ \[`T0`, `T1`] ? `T0` _extends_ `SQL`\< |
| \| `null`                                                                                                                                                                                                                                     |                                                      |
| \| `false`                                                                                                                                                                                                                                    |                                                      |
| \| `0`                                                                                                                                                                                                                                        |                                                      |
| \| `"0"`                                                                                                                                                                                                                                      |                                                      |
| \| `"f"`                                                                                                                                                                                                                                      |                                                      |
| \| `"F"`> ? `never` : `T1` _extends_ `SQLWrapper` ? [`InferData`](README.md#inferdatat)\<`T1`\<`T1`>> : `T1` : `never` \| `F` _extends_ `void` ? `never` : `F` _extends_ `SQLWrapper` ? [`InferData`](README.md#inferdatat)\<`F`\<`F`>> : `F` |                                                      |

#### Parameters

| Parameter      | Type |
| :------------- | :--- |
| `conditionals` | `C`  |
| `fallback`?    | `F`  |

#### Returns

`SQL`\<`R`>

#### Examples

```ts
cases([[eq(thing, other), 2]], 3);
```

```sql
CASE
 WHEN thing = other THEN 2
 ELSE 3
END;
```

#### Todo

Implement smarter typing to identify confirmable early returns with truthy conditions.

---

<a id="coalesce" name="coalesce" />

### coalesce()

```ts
function coalesce<T>(...values: [...T[]]): SQL<CoalesceSQL<T, true, never>>;
```

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `unknown`\[] |

#### Parameters

| Parameter   | Type        |
| :---------- | :---------- |
| ...`values` | \[`...T[]`] |

#### Returns

`SQL`\<`CoalesceSQL`\<`T`, `true`, `never`>>

#### See

[https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL)

---

<a id="distinct" name="distinct" />

### distinct()

```ts
function distinct<T>(statement: T): SQL<InferData<T>>;
```

Distinct keyword.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| `statement` | `T`  |

#### Returns

`SQL`\<[`InferData`](README.md#inferdatat)\<`T`>>

---

<a id="divide" name="divide" />

### divide()

```ts
function divide<T>(
  ...values: T
): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>;
```

Divide values.

#### Type parameters

| Type parameter                              |
| :------------------------------------------ |
| `T` _extends_ (`number` \| `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`\<`T`\[`number`] _extends_ `SQLWrapper` ? [`InferData`](README.md#inferdatat)\<`any`\[`any`]> :
`T`\[`number`]>

---

<a id="getcolumns" name="getcolumns" />

### getColumns()

```ts
function getColumns<T>(table: T): InferColumns<T>;
```

Should replace `getTableColumns` to allow for more input versatility.

#### Type parameters

| Type parameter                                                    |
| :---------------------------------------------------------------- |
| `T` _extends_                                                     |
| \| `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`>>> |
| \| `View`\<`string`, `boolean`, `ColumnsSelection`>               |
| \| [`AnySelect`](README.md#anyselect)                             |
| \| `Subquery`\<`string`, `ColumnsSelection`>                      |
| \| `WithSubquery`\<`string`, `ColumnsSelection`>                  |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

[`InferColumns`](README.md#infercolumnst)\<`T`>

#### See

[drizzle-team/drizzle-orm#1789](https://github.com/drizzle-team/drizzle-orm/pull/1789)

---

<a id="getnameoralias" name="getnameoralias" />

### getNameOrAlias()

```ts
function getNameOrAlias<T>(query: T): InferNameOrAlias<T>;
```

Get a table's name or a (sub)query's alias.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `query`   | `T`  |

#### Returns

[`InferNameOrAlias`](README.md#infernameoraliast)\<`T`>

---

<a id="greatest" name="greatest" />

### greatest()

```ts
function greatest<T>(
  ...values: [...T[]]
): SQL<
  {
    [I in string | number | symbol]: T[I<I>] extends SQLWrapper ? InferData<any[any]> : T[I<I>];
  }[number]
>;
```

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `unknown`\[] |

#### Parameters

| Parameter   | Type        |
| :---------- | :---------- |
| ...`values` | \[`...T[]`] |

#### Returns

`SQL`\<\{ \[I in string | number | symbol]: T\[I\<I>] extends SQLWrapper ? InferData\<any\[any]> :
T\[I\<I>] }\[`number`]>

#### See

[https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST)

---

<a id="least" name="least" />

### least()

```ts
function least<T>(
  ...values: [...T[]]
): SQL<
  {
    [I in string | number | symbol]: T[I<I>] extends SQLWrapper ? InferData<any[any]> : T[I<I>];
  }[number]
>;
```

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `unknown`\[] |

#### Parameters

| Parameter   | Type        |
| :---------- | :---------- |
| ...`values` | \[`...T[]`] |

#### Returns

`SQL`\<\{ \[I in string | number | symbol]: T\[I\<I>] extends SQLWrapper ? InferData\<any\[any]> :
T\[I\<I>] }\[`number`]>

#### See

[https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST)

---

<a id="multiply" name="multiply" />

### multiply()

```ts
function multiply<T>(
  ...values: T
): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>;
```

Multiply values.

#### Type parameters

| Type parameter                              |
| :------------------------------------------ |
| `T` _extends_ (`number` \| `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`\<`T`\[`number`] _extends_ `SQLWrapper` ? [`InferData`](README.md#inferdatat)\<`any`\[`any`]> :
`T`\[`number`]>

---

<a id="nullif" name="nullif" />

### nullIf()

```ts
function nullIf<V, C>(value: V, condition: C): SQL<null | V>;
```

Return null if value meets condition. Useful to coalesce to something else.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `V` _extends_ `SQLWrapper` |
| `C`                        |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| `value`     | `V`  |
| `condition` | `C`  |

#### Returns

`SQL`\<`null` | `V`>

#### See

[https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-NULLIF](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-NULLIF)

---

<a id="paginate" name="paginate" />

### paginate()

```ts
function paginate<T>(qb: T, __namedParameters: object): PgSelect | MySqlSelect | SQLiteSelect;
```

Paginate a query.

#### Type parameters

| Type parameter                             |
| :----------------------------------------- |
| `T` _extends_ [`Select`](README.md#select) |

#### Parameters

| Parameter                 | Type     |
| :------------------------ | :------- |
| `qb`                      | `T`      |
| `__namedParameters`       | `object` |
| `__namedParameters.page`  | `number` |
| `__namedParameters.size`? | `number` |

#### Returns

`PgSelect` | `MySqlSelect` | `SQLiteSelect`

---

<a id="subtract" name="subtract" />

### subtract()

```ts
function subtract<T>(
  ...values: T
): SQL<T[number] extends SQLWrapper ? InferData<any[any]> : T[number]>;
```

Subtract values.

#### Type parameters

| Type parameter                              |
| :------------------------------------------ |
| `T` _extends_ (`number` \| `SQLWrapper`)\[] |

#### Parameters

| Parameter   | Type |
| :---------- | :--- |
| ...`values` | `T`  |

#### Returns

`SQL`\<`T`\[`number`] _extends_ `SQLWrapper` ? [`InferData`](README.md#inferdatat)\<`any`\[`any`]> :
`T`\[`number`]>
