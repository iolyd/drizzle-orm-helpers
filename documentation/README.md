# src

<a id="anyselect" name="anyselect"></a>

## Table of Contents

- [AnySelect](#anyselect)
  - [See](#see)
- [InferColumnType\<T>](#infercolumntypet)
  - [Type parameters](#type-parameters)
- [InferDataType\<T>](#inferdatatypet)
  - [Type parameters](#type-parameters-1)
- [Schema](#schema)
- [Select](#select)
  - [See](#see-1)
- [currentTimestamp](#currenttimestamp)
  - [Example](#example)
- [fal](#fal)
- [no](#no)
  - [See](#see-2)
- [nul](#nul)
- [tru](#tru)
- [yes](#yes)
  - [See](#see-3)
- [bool()](#bool)
  - [Type parameters](#type-parameters-2)
  - [Parameters](#parameters)
  - [Returns](#returns)
- [cases()](#cases)
  - [Parameters](#parameters-1)
  - [Returns](#returns-1)
  - [Example](#example-1)
  - [Example](#example-2)
- [coalesce()](#coalesce)
  - [Type parameters](#type-parameters-3)
  - [Parameters](#parameters-2)
  - [Returns](#returns-2)
- [distinct()](#distinct)
  - [Type parameters](#type-parameters-4)
  - [Parameters](#parameters-3)
  - [Returns](#returns-3)
- [getColumns()](#getcolumns)
  - [Type parameters](#type-parameters-5)
  - [Parameters](#parameters-4)
  - [Returns](#returns-4)
  - [See](#see-4)
- [getNameOrAlias()](#getnameoralias)
  - [Type parameters](#type-parameters-6)
  - [Parameters](#parameters-5)
  - [Returns](#returns-5)
- [paginate()](#paginate)
  - [Type parameters](#type-parameters-7)
  - [Parameters](#parameters-6)
  - [Returns](#returns-6)
- [withSchema()](#withschema)
  - [Type parameters](#type-parameters-8)
  - [Parameters](#parameters-7)
  - [Returns](#returns-7)

## AnySelect

```ts
type AnySelect: SetOptional<AnyPgSelect | AnyMySqlSelect | AnySQLiteSelect, "where">;
```

Dialect agnostic AnySelect.

### See

- AnyPgSelect
- AnyMySqlSelect
- AnySQLiteSelect

---

<a id="infercolumntypet" name="infercolumntypet"></a>

## InferColumnType\<T>

```ts
type InferColumnType<T>: AnyColumn<Pick<ReturnType<T>["_"], "data" | "dataType">>;
```

Infer type of table column.

### Type parameters

• **T** extends (...`config`: `never`\[]) => `ColumnBuilderBase`

---

<a id="inferdatatypet" name="inferdatatypet"></a>

## InferDataType\<T>

```ts
type InferDataType<T>: T extends Table ? InferSelectModel<T> : T extends Column ? T["_"]["notNull"] extends true ? T["_"]["dataType"] : T["_"]["dataType"] | null : T extends View | Subquery ? T["_"]["selectedFields"] : T extends SQL<infer U> ? U : T extends SQL.Aliased<infer U> ? U : T extends Param ? T["value"] : unknown;
```

Infer any SQL wrapper's expected return data type.

### Type parameters

• **T** extends `SQLWrapper`

---

<a id="schema" name="schema"></a>

## Schema

```ts
type Schema: PgSchema | MySqlSchema;
```

Dialect-agnostic schema. Excludes SQLite.

---

<a id="select" name="select"></a>

## Select

```ts
type Select: SetOptional<PgSelect | MySqlSelect | SQLiteSelect, "where">;
```

Dialect agnostic select.

### See

- PgSelect.
- MySqlSelect
- SQLiteSelect

---

<a id="currenttimestamp" name="currenttimestamp"></a>

## currentTimestamp

```ts
const currentTimestamp: SQL<Date>;
```

### Example

```sql
current_timestamp();
```

---

<a id="fal" name="fal"></a>

## fal

```ts
const fal: SQL<false>;
```

SQL template false value.

---

<a id="no" name="no"></a>

## no

```ts
const no: SQL<false> = fal;
```

SQL template alias false value.

### See

fal

---

<a id="nul" name="nul"></a>

## nul

```ts
const nul: SQL<null>;
```

SQL template null value.

---

<a id="tru" name="tru"></a>

## tru

```ts
const tru: SQL<true>;
```

SQL template true value.

---

<a id="yes" name="yes"></a>

## yes

```ts
const yes: SQL<true> = tru;
```

SQL template alias for true value.

### See

tru

---

<a id="bool" name="bool"></a>

## bool()

```ts
bool<T>(value: T): SQL<T>
```

SQL template boolean value.

### Type parameters

• **T** extends `boolean`

### Parameters

• **value**: `T`

### Returns

`SQL`<`T`>

---

<a id="cases" name="cases"></a>

## cases()

```ts
cases(...cases: [...(undefined | [SQLWrapper, unknown])[], unknown][] | (undefined | [SQLWrapper, unknown])[]): SQL | undefined
```

Case condition chain.

### Parameters

• ...**cases**: \[`...(undefined | [SQLWrapper, unknown])[]`, `unknown`]\[] | (`undefined` |
\[`SQLWrapper`, `unknown`])\[]

### Returns

`SQL` | `undefined`

### Example

```ts
cs([eq(...), 2], 3)
```

### Example

```sql
CASE statements END;
```

---

<a id="coalesce" name="coalesce"></a>

## coalesce()

```ts
coalesce<T>(...values: T): CoalesceSQL<T, true, never>
```

SQL coalesce.

### Type parameters

• **T** extends `SQL`<`unknown`>\[]

### Parameters

• ...**values**: `T`

### Returns

`CoalesceSQL`<`T`, `true`, `never`>

---

<a id="distinct" name="distinct"></a>

## distinct()

```ts
distinct<T>(statement: T): SQL<InferDataType<T>>
```

Distinct keyword.

### Type parameters

• **T** extends `SQLWrapper`

### Parameters

• **statement**: `T`

### Returns

`SQL`<[`InferDataType`](README.md#inferdatatypet)<`T`>>

---

<a id="getcolumns" name="getcolumns"></a>

## getColumns()

```ts
getColumns<T>(table: T): T extends Table ? T["_"]["columns"] : T extends View ? T["_"]["selectedFields"] : T extends Subquery ? T["_"]["selectedFields"] : T extends AnySelect ? T["_"]["selectedFields"] : never
```

Should replace `getTableColumns` to allow for more input versatility.

### Type parameters

• **T** extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> |
[`AnySelect`](README.md#anyselect) | `View`<`string`, `boolean`, `ColumnsSelection`> |
`Subquery`<`string`, `unknown`>

### Parameters

• **table**: `T`

### Returns

`T` extends `Table` ? `T`\[`"_"`]\[`"columns"`] : `T` extends `View` ?
`T`\[`"_"`]\[`"selectedFields"`] : `T` extends `Subquery` ? `T`\[`"_"`]\[`"selectedFields"`] : `T`
extends [`AnySelect`](README.md#anyselect) ? `T`\[`"_"`]\[`"selectedFields"`] : `never`

### See

https://github.com/drizzle-team/drizzle-orm/pull/1789

---

<a id="getnameoralias" name="getnameoralias"></a>

## getNameOrAlias()

```ts
getNameOrAlias<T>(table: T): T extends Table ? T["_"]["name"] : T extends View ? T["_"]["name"] : T extends Subquery ? T["_"]["alias"] : T extends AnySelect ? T["_"]["tableName"] : never
```

### Type parameters

• **T** extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> |
[`AnySelect`](README.md#anyselect) | `View`<`string`, `boolean`, `ColumnsSelection`> |
`Subquery`<`string`, `unknown`>

### Parameters

• **table**: `T`

### Returns

`T` extends `Table` ? `T`\[`"_"`]\[`"name"`] : `T` extends `View` ? `T`\[`"_"`]\[`"name"`] : `T`
extends `Subquery` ? `T`\[`"_"`]\[`"alias"`] : `T` extends [`AnySelect`](README.md#anyselect) ?
`T`\[`"_"`]\[`"tableName"`] : `never`

---

<a id="paginate" name="paginate"></a>

## paginate()

```ts
paginate<T>(
   qb: T,
   page: number,
   size: number): PgSelect | MySqlSelect | SQLiteSelect
```

Paginate a query.

### Type parameters

• **T** extends [`Select`](README.md#select)

### Parameters

• **qb**: `T`

• **page**: `number`

• **size**: `number`= `20`

### Returns

`PgSelect` | `MySqlSelect` | `SQLiteSelect`

---

<a id="withschema" name="withschema"></a>

## withSchema()

```ts
withSchema<A, T, S>(ressource:     (this: ThisWithSchema, ...args: A) => T, schema: S): (...args: A) => T
```

Indicate if a custom type, a function, or a value belongs to a schema, ex. a different extensions
schema.

### Type parameters

• **A** extends `unknown`\[]

• **T** extends `SQLWrapper` | `ColumnBuilderBase`<`ColumnBuilderBaseConfig`<`ColumnDataType`,
`string`>, `object`>

• **S** extends `string` | [`Schema`](README.md#schema)

### Parameters

• **ressource**

The column type, function, or etc. for which to specify the schema where the related extension was
created in your database.

• **schema**: `S`

### Returns

`Function`

The ressource with bound to the specified schema.

> #### Parameters
>
> • ...**args**: `A`
>
> #### Returns
>
> `T`
