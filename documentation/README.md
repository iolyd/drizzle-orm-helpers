# src

## Table of Contents

- [Type Aliases](#type-aliases)
  - [AnySelect](#anyselect)
  - [InferColumnType\<T>](#infercolumntypet)
  - [InferDataType\<T>](#inferdatatypet)
  - [Schema](#schema)
  - [Select](#select)
- [Variables](#variables)
  - [currentTimestamp](#currenttimestamp)
  - [fal](#fal)
  - [nul](#nul)
  - [tru](#tru)
- [Functions](#functions)
  - [bool()](#bool)
  - [cases()](#cases)
  - [coalesce()](#coalesce)
  - [distinct()](#distinct)
  - [getColumns()](#getcolumns)
  - [getNameOrAlias()](#getnameoralias)
  - [paginate()](#paginate)
  - [withSchema()](#withschema)

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
cases(...cases: [...(undefined | [SQLWrapper, unknown])[], unknown][] | (undefined | [SQLWrapper, unknown])[]): SQL | undefined
```

Case condition chain.

#### Parameters

| Parameter  | Type             |
| :--------- | :--------------- | ---------------------------------------- | ------------ | ------------------------------ |
| ...`cases` | \[`...(undefined | [SQLWrapper, unknown])[]`, `unknown`]\[] | (`undefined` | \[`SQLWrapper`, `unknown`])\[] |

#### Returns

`SQL` | `undefined`

#### Example

```ts
cs([eq(...), 2], 3)
```

#### Example

```sql
CASE statements END;
```

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

<a id="getcolumns" name="getcolumns"></a>

### getColumns()

```ts
getColumns<T>(table: T): T extends Table ? T["_"]["columns"] : T extends View ? T["_"]["selectedFields"] : T extends Subquery ? T["_"]["selectedFields"] : T extends AnySelect ? T["_"]["selectedFields"] : never
```

Should replace `getTableColumns` to allow for more input versatility.

#### Type parameters

| Type parameter                                                          |
| :---------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- | ------------------------------- |
| `T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | [`AnySelect`](README.md#anyselect) | `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

`T` extends `Table` ? `T`\[`"_"`]\[`"columns"`] : `T` extends `View` ?
`T`\[`"_"`]\[`"selectedFields"`] : `T` extends `Subquery` ? `T`\[`"_"`]\[`"selectedFields"`] : `T`
extends [`AnySelect`](README.md#anyselect) ? `T`\[`"_"`]\[`"selectedFields"`] : `never`

#### See

https://github.com/drizzle-team/drizzle-orm/pull/1789

---

<a id="getnameoralias" name="getnameoralias"></a>

### getNameOrAlias()

```ts
getNameOrAlias<T>(table: T): T extends Table ? T["_"]["name"] : T extends View ? T["_"]["name"] : T extends Subquery ? T["_"]["alias"] : T extends AnySelect ? T["_"]["tableName"] : never
```

#### Type parameters

| Type parameter                                                          |
| :---------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------- | ------------------------------- |
| `T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | [`AnySelect`](README.md#anyselect) | `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

`T` extends `Table` ? `T`\[`"_"`]\[`"name"`] : `T` extends `View` ? `T`\[`"_"`]\[`"name"`] : `T`
extends `Subquery` ? `T`\[`"_"`]\[`"alias"`] : `T` extends [`AnySelect`](README.md#anyselect) ?
`T`\[`"_"`]\[`"tableName"`] : `never`

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

<a id="withschema" name="withschema"></a>

### withSchema()

```ts
withSchema<A, T, S>(ressource:     (this: ThisWithSchema, ...args: A) => T, schema: S): (...args: A) => T
```

Indicate if a custom type, a function, or a value belongs to a schema, ex. a different extensions
schema.

#### Type parameters

| Type parameter           |
| :----------------------- | ------------------------------------------------------------------------------------ |
| `A` extends `unknown`\[] |
| `T` extends `SQLWrapper` | `ColumnBuilderBase`<`ColumnBuilderBaseConfig`<`ColumnDataType`, `string`>, `object`> |
| `S` extends `string`     | [`Schema`](README.md#schema)                                                         |

#### Parameters

| Parameter   | Type                                              | Description                                                                                                                        |
| :---------- | :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| `ressource` | (`this`: `ThisWithSchema`, ...`args`: `A`) => `T` | The column type, function, or etc. for which to specify the schema where the<br /> related extension was created in your database. |
| `schema`    | `S`                                               | -                                                                                                                                  |

#### Returns

`Function`

The ressource with bound to the specified schema.

> ##### Parameters
>
> | Parameter | Type |
> | :-------- | :--- |
> | ...`args` | `A`  |
>
> ##### Returns
>
> `T`
