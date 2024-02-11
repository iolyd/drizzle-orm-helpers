# Drizzle ORM Helpers documentation

## Table of Contents

- [Type Aliases](#type-aliases)
  - [AnySelect](#anyselect)
  - [InferColumnType\<T>](#infercolumntypet)
  - [InferDataType\<T>](#inferdatatypet)
  - [Range](#range)
  - [Select](#select)
- [Variables](#variables)
  - [emptyJsonArray](#emptyjsonarray)
  - [emptyJsonObject](#emptyjsonobject)
  - [emptySqlArray](#emptysqlarray)
  - [fal](#fal)
  - [infinity](#infinity)
  - [nul](#nul)
  - [today](#today)
  - [tru](#tru)
- [Functions](#functions)
  - [arrayAgg()](#arrayagg)
  - [bool()](#bool)
  - [citext()](#citext)
  - [coalesce()](#coalesce)
  - [createGenerateNanoid()](#creategeneratenanoid)
  - [createGetRegconfig()](#creategetregconfig)
  - [cs()](#cs)
  - [cube()](#cube)
  - [daterange()](#daterange)
  - [el()](#el)
  - [excluded()](#excluded)
  - [getColumns()](#getcolumns)
  - [getCurrentTsConfig()](#getcurrenttsconfig)
  - [getNameOrAlias()](#getnameoralias)
  - [intrange()](#intrange)
  - [isRange()](#isrange)
  - [jsonAgg()](#jsonagg)
  - [jsonAggBuildObject()](#jsonaggbuildobject)
  - [jsonBuildObject()](#jsonbuildobject)
  - [jsonObjectAgg()](#jsonobjectagg)
  - [jsonStripNulls()](#jsonstripnulls)
  - [paginate()](#paginate)
  - [plaintoTsquery()](#plaintotsquery)
  - [point()](#point)
  - [random()](#random)
  - [regconfig()](#regconfig)
  - [rowToJson()](#rowtojson)
  - [toJson()](#tojson)
  - [toJsonb()](#tojsonb)
  - [toTsquery()](#totsquery)
  - [toTsvector()](#totsvector)
  - [ts()](#ts)
  - [tsrange()](#tsrange)
  - [tsvector()](#tsvector)
  - [wn()](#wn)

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
type InferDataType<T>: T extends Column ? T["_"]["notNull"] extends true ? T["_"]["dataType"] : T["_"]["dataType"] | null : T extends SQL<infer U> ? U : T extends SQL.Aliased<infer U> ? U : never;
```

Infer SQL template or column data type.

#### Type parameters

| Type parameter       |
| :------------------- | ----- | ------------- |
| `T` extends `Column` | `SQL` | `SQL.Aliased` |

---

<a id="range" name="range"></a>

### Range

```ts
type Range: [number, number] | [null, null];
```

Type for returned value of postgres range data. While empty ranges normally return 'empty', they are
here modeled as \[null, null] for convenience when binding range members or reprensentinf their
state for reactivity.

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

<a id="emptyjsonarray" name="emptyjsonarray"></a>

### emptyJsonArray

```ts
const emptyJsonArray: SQL<[never]>;
```

Empty array as SQL json.

---

<a id="emptyjsonobject" name="emptyjsonobject"></a>

### emptyJsonObject

```ts
const emptyJsonObject: SQL<object>;
```

Empty record as SQL json.

---

<a id="emptysqlarray" name="emptysqlarray"></a>

### emptySqlArray

```ts
const emptySqlArray: SQL<SQL<[]>>;
```

Empty SQL array (not json typed)

---

<a id="fal" name="fal"></a>

### fal

```ts
const fal: SQL<false>;
```

SQL template false value.

---

<a id="infinity" name="infinity"></a>

### infinity

```ts
const infinity: SQL<number>;
```

SQL template infinity value.

---

<a id="nul" name="nul"></a>

### nul

```ts
const nul: SQL<null>;
```

SQL template null value.

---

<a id="today" name="today"></a>

### today

```ts
const today: SQL<Date>;
```

SQL template today value.

---

<a id="tru" name="tru"></a>

### tru

```ts
const tru: SQL<true>;
```

SQL template true value.

## Functions

<a id="arrayagg" name="arrayagg"></a>

### arrayAgg()

```ts
arrayAgg<T>(raw: T): SQL<null | T extends SQL<unknown> | Aliased<unknown> ? InferDataType<T>[] : T[]>
```

Aggregate sql values into an sql array.

#### Type parameters

| Type parameter               |
| :--------------------------- | -------------------- | --- |
| `T` extends `SQL`<`unknown`> | `Aliased`<`unknown`> | {}  |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `raw`     | `T`  |

#### Returns

`SQL`<`null` | `T` extends `SQL`<`unknown`> | `Aliased`<`unknown`> ?
[`InferDataType`](documentation.md#inferdatatypet)<`T`>\[] : `T`\[]>

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

<a id="citext" name="citext"></a>

### citext()

```ts
citext<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: string;
  dataType: "custom";
  driverParam: unknown;
  enumValues: undefined;
  name: TName;
}>
```

Ci-text postgres column type.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: `string`; `dataType`:
`"custom"`; `driverParam`: `unknown`; `enumValues`: `undefined`; `name`: `TName`; }>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `string`           |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `unknown`          |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

https://www.postgresql.org/docs/current/citext.html

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

<a id="creategeneratenanoid" name="creategeneratenanoid"></a>

### createGenerateNanoid()

```ts
createGenerateNanoid(__namedParameters:     {
      defaultLength: NANOID_LENGTH_DEFAULT;
      schemaName: string;
      }): (__namedParameters: {
  alphabet: string;
  optimized: false;
  size: defaultLength;
}) => SQL<string>
```

#### Parameters

| Parameter                          | Type     |
| :--------------------------------- | :------- |
| `__namedParameters`                | `Object` |
| `__namedParameters.defaultLength`? | `number` |
| `__namedParameters.schemaName`?    | `string` |

#### Returns

`Function`

> ##### Parameters
>
> | Parameter                      | Type      |
> | :----------------------------- | :-------- |
> | `__namedParameters`            | `Object`  |
> | `__namedParameters.alphabet`?  | `string`  |
> | `__namedParameters.optimized`? | `boolean` |
> | `__namedParameters.size`?      | `number`  |
>
> ##### Returns
>
> `SQL`<`string`>

#### Example

```
const generateNanoid = createGenerateNanoid({
	schemaName: extensionsSchema.schemaName,
});
```

#### See

[Example of how to create the needed extensions and the nanoid functions](https://github.com/iolyd/drizzle-orm-helpers/blob/main/sql/nanoid.sql)
.

---

<a id="creategetregconfig" name="creategetregconfig"></a>

### createGetRegconfig()

```ts
createGetRegconfig<T>(languageTags: T): (languageTag: SQLWrapper) => SQL<null | Regconfig>
```

#### Type parameters

| Type parameter                              |
| :------------------------------------------ |
| `T` extends `Record`<`string`, `Regconfig`> |

#### Parameters

| Parameter      | Type | Description                                                                                                              |
| :------------- | :--- | :----------------------------------------------------------------------------------------------------------------------- |
| `languageTags` | `T`  | Lookup dictionnary used as a reference to match your app's language tags with<br /> Postgres's regconfig language names. |

#### Returns

`Function`

> ##### Parameters
>
> | Parameter     | Type         |
> | :------------ | :----------- |
> | `languageTag` | `SQLWrapper` |
>
> ##### Returns
>
> `SQL`<`null` | `Regconfig`>

#### Example

```
const regconfig = createRegconfig({...})
```

---

<a id="cs" name="cs"></a>

### cs()

```ts
cs(...statements: SQLWrapper[]): SQL<unknown>
```

Case condition chain.

#### Parameters

| Parameter       | Type            |
| :-------------- | :-------------- |
| ...`statements` | `SQLWrapper`\[] |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
CASE statements END;
```

---

<a id="cube" name="cube"></a>

### cube()

```ts
cube<TName>(dbName: TName, fieldConfig?:     {
      schemaName: string;
      }): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: [number, number, number];
  dataType: "custom";
  driverParam: number[];
  enumValues: undefined;
  name: TName;
}>
```

Implements cube extension type for 3d vectors.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter                 | Type     |
| :------------------------ | :------- |
| `dbName`                  | `TName`  |
| `fieldConfig`?            | `Object` |
| `fieldConfig.schemaName`? | `string` |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: \[`number`, `number`, `number`];
`dataType`: `"custom"`; `driverParam`: `number`\[]; `enumValues`: `undefined`; `name`: `TName`; }>

> | Member        | Type                            |
> | :------------ | :------------------------------ |
> | `columnType`  | `"PgCustomColumn"`              |
> | `data`        | \[`number`, `number`, `number`] |
> | `dataType`    | `"custom"`                      |
> | `driverParam` | `number`\[]                     |
> | `enumValues`  | `undefined`                     |
> | `name`        | `TName`                         |

#### See

https://www.postgresql.org/docs/current/cube.html

---

<a id="daterange" name="daterange"></a>

### daterange()

```ts
daterange<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: [Date, Date];
  dataType: "custom";
  driverParam: unknown;
  enumValues: undefined;
  name: TName;
}>
```

Implements postgres date range.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: \[`Date`, `Date`]; `dataType`:
`"custom"`; `driverParam`: `unknown`; `enumValues`: `undefined`; `name`: `TName`; }>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | \[`Date`, `Date`]  |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `unknown`          |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

- https://orm.drizzle.team/docs/custom-types Timestamp for reference.
- https://www.postgresql.org/docs/current/rangetypes.html

#### Todo

Add multiranges if needed.

---

<a id="el" name="el"></a>

### el()

```ts
el(statement: SQLWrapper): SQL<unknown>
```

Else statement for fallback statement in condition tree.

- [**@example**](https://github.com/example).

```sql
ELSE statement;
```

#### Parameters

| Parameter   | Type         |
| :---------- | :----------- |
| `statement` | `SQLWrapper` |

#### Returns

`SQL`<`unknown`>

---

<a id="excluded" name="excluded"></a>

### excluded()

```ts
excluded<T>(columns: T): { [K in string | number | symbol]: SQL<InferDataType<T[K]>> }
```

Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.

#### Type parameters

| Type parameter                              |
| :------------------------------------------ |
| `T` extends `Record`<`string`, `AnyColumn`> |

#### Parameters

| Parameter | Type | Description                                                    |
| :-------- | :--- | :------------------------------------------------------------- |
| `columns` | `T`  | Record of columns to get from the conflict's `excluded` table. |

#### Returns

`{ [K in string | number | symbol]: SQL<InferDataType<T[K]>> }`

---

<a id="getcolumns" name="getcolumns"></a>

### getColumns()

```ts
getColumns<T>(table: T): T extends Table ? T["_"]["columns"] : T extends View ? T["_"]["selectedFields"] : T extends Subquery ? T["_"]["selectedFields"] : T extends AnySelect ? T["_"]["selectedFields"] : never
```

Should replace `getTableColumns` to allow for more input versatility.

#### Type parameters

| Type parameter                                        |
| :---------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------- | ------------------------------- |
| `T` extends [`AnySelect`](documentation.md#anyselect) | `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

`T` extends `Table` ? `T`\[`"_"`]\[`"columns"`] : `T` extends `View` ?
`T`\[`"_"`]\[`"selectedFields"`] : `T` extends `Subquery` ? `T`\[`"_"`]\[`"selectedFields"`] : `T`
extends [`AnySelect`](documentation.md#anyselect) ? `T`\[`"_"`]\[`"selectedFields"`] : `never`

#### See

https://github.com/drizzle-team/drizzle-orm/pull/1789

---

<a id="getcurrenttsconfig" name="getcurrenttsconfig"></a>

### getCurrentTsConfig()

```ts
getCurrentTsConfig(): SQL<Regconfig>
```

#### Returns

`SQL`<`Regconfig`>

---

<a id="getnameoralias" name="getnameoralias"></a>

### getNameOrAlias()

```ts
getNameOrAlias<T>(table: T): T extends Table ? T["_"]["name"] : T extends View ? T["_"]["name"] : T extends Subquery ? T["_"]["alias"] : T extends AnySelect ? T["_"]["tableName"] : never
```

#### Type parameters

| Type parameter                                        |
| :---------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------- | ------------------------------- |
| `T` extends [`AnySelect`](documentation.md#anyselect) | `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `table`   | `T`  |

#### Returns

`T` extends `Table` ? `T`\[`"_"`]\[`"name"`] : `T` extends `View` ? `T`\[`"_"`]\[`"name"`] : `T`
extends `Subquery` ? `T`\[`"_"`]\[`"alias"`] : `T` extends [`AnySelect`](documentation.md#anyselect)
? `T`\[`"_"`]\[`"tableName"`] : `never`

---

<a id="intrange" name="intrange"></a>

### intrange()

```ts
intrange<TName>(dbName: TName, fieldConfig?:     {
      size: 4 | 8;
      }): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: Range;
  dataType: "custom";
  driverParam: string;
  enumValues: undefined;
  name: TName;
}>
```

Implements postgres int4 / int8 range type.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter           | Type     |
| :------------------ | :------- | --- |
| `dbName`            | `TName`  |
| `fieldConfig`?      | `Object` |
| `fieldConfig.size`? | `4`      | `8` |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`:
[`Range`](documentation.md#range); `dataType`: `"custom"`; `driverParam`: `string`; `enumValues`:
`undefined`; `name`: `TName`; }>

> | Member        | Type                              |
> | :------------ | :-------------------------------- |
> | `columnType`  | `"PgCustomColumn"`                |
> | `data`        | [`Range`](documentation.md#range) |
> | `dataType`    | `"custom"`                        |
> | `driverParam` | `string`                          |
> | `enumValues`  | `undefined`                       |
> | `name`        | `TName`                           |

#### See

https://www.postgresql.org/docs/current/rangetypes.html

#### Todo

Add multiranges if needed.

---

<a id="isrange" name="isrange"></a>

### isRange()

```ts
isRange(maybeRange: unknown, __namedParameters:     {
      lower: RangeBoundType;
      max: number;
      min: number;
      upper: RangeBoundType;
      }): maybeRange is Range
```

Schema to validate and assert as range. Can also be used for the base of a custom validator with the
library of your choice.

#### Parameters

| Parameter                  | Type             |
| :------------------------- | :--------------- |
| `maybeRange`               | `unknown`        |
| `__namedParameters`        | `Object`         |
| `__namedParameters.lower`? | `RangeBoundType` |
| `__namedParameters.max`?   | `number`         |
| `__namedParameters.min`?   | `number`         |
| `__namedParameters.upper`? | `RangeBoundType` |

#### Returns

`maybeRange is Range`

#### Example

```
// zod custom schema
const rangeSchema = z.custom<Range>(isRange);
```

---

<a id="jsonagg" name="jsonagg"></a>

### jsonAgg()

```ts
jsonAgg<T>(selection: T, __namedParameters:     {
      notNull: true;
}): SQL<T extends Table ? InferSelectModel<T> : T extends Column ? InferDataType<T>[] : T extends Subquery ? { [K in keyof T["_"]["selectedFields"]]: InferDataType<T["_"]["selectedFields"][K]> }[] : T extends AnySelect ? Awaited<T> : never>
```

Json_agg.

#### Type parameters

| Type parameter                                        |
| :---------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------- |
| `T` extends [`AnySelect`](documentation.md#anyselect) | `Column`<`ColumnBaseConfig`<`ColumnDataType`, `string`>, `object`, `object`> | `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter                    | Type      |
| :--------------------------- | :-------- |
| `selection`                  | `T`       |
| `__namedParameters`          | `Object`  |
| `__namedParameters.notNull`? | `boolean` |

#### Returns

`SQL`<`T` extends `Table` ? `InferSelectModel`<`T`> : `T` extends `Column` ?
[`InferDataType`](documentation.md#inferdatatypet)<`T`>\[] : `T` extends `Subquery` ?
`{ [K in keyof T["_"]["selectedFields"]]: InferDataType<T["_"]["selectedFields"][K]> }`\[] : `T`
extends [`AnySelect`](documentation.md#anyselect) ? `Awaited`<`T`> : `never`>

---

<a id="jsonaggbuildobject" name="jsonaggbuildobject"></a>

### jsonAggBuildObject()

```ts
jsonAggBuildObject<T>(shape: T): SQL<{ [K in keyof T]: InferDataType<T[K]> extends never ? T : InferDataType<T[K]> }[]>
```

Aggregate sql values into a json object.

#### Type parameters

| Type parameter                                  |
| :---------------------------------------------- | -------------------- | ------------ |
| `T` extends `Record`<`string`, `SQL`<`unknown`> | `Aliased`<`unknown`> | `AnyColumn`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `shape`   | `T`  |

#### Returns

`SQL`<`{ [K in keyof T]: InferDataType<T[K]> extends never ? T : InferDataType<T[K]> }`\[]>

---

<a id="jsonbuildobject" name="jsonbuildobject"></a>

### jsonBuildObject()

```ts
jsonBuildObject<T>(shape: T): SQL<{ [K in string | number | symbol]: InferDataType<T[K]> }>
```

Build objects using \`json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
return an object with unwrapped value types instead of SQL wrapped types.

#### Type parameters

| Type parameter                                  |
| :---------------------------------------------- | ------------ |
| `T` extends `Record`<`string`, `SQL`<`unknown`> | `AnyColumn`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `shape`   | `T`  |

#### Returns

`SQL`<`{ [K in string | number | symbol]: InferDataType<T[K]> }`>

---

<a id="jsonobjectagg" name="jsonobjectagg"></a>

### jsonObjectAgg()

```ts
jsonObjectAgg<K, V, TK, TV>(key: K, value: V): SQL<Record<TK, TV>>
```

Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped type
instead of an SQL wrapped type.

#### Type parameters

| Type parameter               | Value                                                   |
| :--------------------------- | :------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `K` extends `AnyColumn`      | -                                                       |
| `V` extends `SQL`<`unknown`> | `AnyTable`<`TableConfig`>                               | -                                                                                                                                                           |
| `TK` extends `string`        | `number`                                                | `null` extends [`InferDataType`](documentation.md#inferdatatypet)<`K`> ? `never` : [`InferDataType`](documentation.md#inferdatatypet)<`K`> extends `string` | `number` ? `InferDataType<K>` : `never`                                                                                                     |
| `TV`                         | `V` extends `AnyTable`<`TableConfig`> ? `{ [K in string | number]: { [Key in string as Key]: V["\_"]["columns"][Key]["_"]["notNull"] extends true ? V["\_"]["columns"][Key]["_"]["data"] : null                       | V["\_"]["columns"][Key]["_"]["data"] }[K] }`:`V`extends`SQL`<`unknown`> ? [`InferDataType`](documentation.md#inferdatatypet)<`V`> : `never` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `key`     | `K`  |
| `value`   | `V`  |

#### Returns

`SQL`<`Record`<`TK`, `TV`>>

---

<a id="jsonstripnulls" name="jsonstripnulls"></a>

### jsonStripNulls()

```ts
jsonStripNulls<T>(json: SQL<T> | Aliased<T>): SQL<SetNonNullable<T, keyof T>>
```

SQL json_strip_nulls.

#### Type parameters

| Type parameter |
| :------------- |
| `T`            |

#### Parameters

| Parameter | Type       |
| :-------- | :--------- | -------------- |
| `json`    | `SQL`<`T`> | `Aliased`<`T`> |

#### Returns

`SQL`<`SetNonNullable`<`T`, keyof `T`>>

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

| Type parameter                                  |
| :---------------------------------------------- |
| `T` extends [`Select`](documentation.md#select) |

#### Parameters

| Parameter | Type     | Default value       |
| :-------- | :------- | :------------------ |
| `qb`      | `T`      | `undefined`         |
| `page`    | `number` | `undefined`         |
| `size`    | `number` | `PAGE_SIZE_DEFAULT` |

#### Returns

`PgSelect` | `MySqlSelect` | `SQLiteSelect`

---

<a id="plaintotsquery" name="plaintotsquery"></a>

### plaintoTsquery()

```ts
plaintoTsquery(language: SQLWrapper, text: unknown): SQL<string>
```

#### Parameters

| Parameter  | Type         |
| :--------- | :----------- |
| `language` | `SQLWrapper` |
| `text`     | `unknown`    |

#### Returns

`SQL`<`string`>

---

<a id="point" name="point"></a>

### point()

```ts
point<C, N>(name: N, config?: C): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: {
     coordinates: Coordinate<C>;
     type: string;
  };
  dataType: "custom";
  driverParam: string;
  enumValues: undefined;
  name: N;
}>
```

Implements postgis point geometry type.

#### Type parameters

| Type parameter |
| :------------- |

| `C` extends { `m`: `boolean`; `schemaName`: `string`; `srid`: `Srid`; `z`: `boolean`; } | | `N`
extends `string` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `name`    | `N`  |
| `config`? | `C`  |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: { `coordinates`:
`Coordinate`<`C`>; `type`: `string`; }; `dataType`: `"custom"`; `driverParam`: `string`;
`enumValues`: `undefined`; `name`: `N`; }>

> | Member             | Type                                                    |
> | :----------------- | :------------------------------------------------------ |
> | `columnType`       | `"PgCustomColumn"`                                      |
> | `data`             | { `coordinates`: `Coordinate`<`C`>; `type`: `string`; } |
> | `data.coordinates` | `Coordinate`<`C`>                                       |
> | `data.type`        | `string`                                                |
> | `dataType`         | `"custom"`                                              |
> | `driverParam`      | `string`                                                |
> | `enumValues`       | `undefined`                                             |
> | `name`             | `N`                                                     |

#### See

- https://github.com/drizzle-team/drizzle-orm/issues/671
- https://github.com/drizzle-team/drizzle-orm/issues/337#issuecomment-1600854417.

---

<a id="random" name="random"></a>

### random()

```ts
random(): SQL<number>
```

SQL random function.

#### Returns

`SQL`<`number`>

#### Example

```sql
random();
```

---

<a id="regconfig" name="regconfig"></a>

### regconfig()

```ts
regconfig<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: Regconfig;
  dataType: "custom";
  driverParam: unknown;
  enumValues: undefined;
  name: TName;
}>
```

Implements Postgres regconfig. Useful for text search language config storage.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: `Regconfig`; `dataType`:
`"custom"`; `driverParam`: `unknown`; `enumValues`: `undefined`; `name`: `TName`; }>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `Regconfig`        |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `unknown`          |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

https://www.postgresql.org/docs/current/textsearch-controls.html

---

<a id="rowtojson" name="rowtojson"></a>

### rowToJson()

```ts
rowToJson<T>(row: T): SQL<T extends Table<TableConfig<Column<any, object, object>>> ? { [K in string | number]: { [Key in string as Key]: T["_"]["columns"][Key]["_"]["notNull"] extends true ? T["_"]["columns"][Key]["_"]["data"] : null | T["_"]["columns"][Key]["_"]["data"] }[K] } : T extends View<string, boolean, ColumnsSelection> | Subquery<string, unknown> ? T["_"]["selectedFields"] : null>
```

Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped type.

#### Type parameters

| Type parameter                                                          |
| :---------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------- |
| `T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `row`     | `T`  |

#### Returns

`SQL`<`T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> ?
`{ [K in string | number]: { [Key in string as Key]: T["_"]["columns"][Key]["_"]["notNull"] extends true ? T["_"]["columns"][Key]["_"]["data"] : null | T["_"]["columns"][Key]["_"]["data"] }[K] }`
: `T` extends `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> ?
`T`\[`"_"`]\[`"selectedFields"`] : `null`>

---

<a id="tojson" name="tojson"></a>

### toJson()

```ts
toJson<T>(anyelement: T): SQL<T extends Column<ColumnBaseConfig<ColumnDataType, string>, object, object> | SQL<unknown> | Aliased<unknown> ? InferDataType<T> : T extends Table<TableConfig<Column<any, object, object>>> ? { [K in string | number]: { [Key in string as Key]: T["_"]["columns"][Key]["_"]["notNull"] extends true ? T["_"]["columns"][Key]["_"]["data"] : null | T["_"]["columns"][Key]["_"]["data"] }[K] } : T extends View<string, boolean, ColumnsSelection> | Subquery<string, unknown> ? T["_"]["selectedFields"] : unknown>
```

#### Type parameters

| Type parameter           |
| :----------------------- | ----------- |
| `T` extends `SQLWrapper` | `AnyColumn` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `anyelement` | `T`  |

#### Returns

`SQL`<`T` extends `Column`<`ColumnBaseConfig`<`ColumnDataType`, `string`>, `object`, `object`> |
`SQL`<`unknown`> | `Aliased`<`unknown`> ? [`InferDataType`](documentation.md#inferdatatypet)<`T`> :
`T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> ?
`{ [K in string | number]: { [Key in string as Key]: T["_"]["columns"][Key]["_"]["notNull"] extends true ? T["_"]["columns"][Key]["_"]["data"] : null | T["_"]["columns"][Key]["_"]["data"] }[K] }`
: `T` extends `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> ?
`T`\[`"_"`]\[`"selectedFields"`] : `unknown`>

#### See

https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE

---

<a id="tojsonb" name="tojsonb"></a>

### toJsonb()

```ts
toJsonb<T>(anyelement: T): SQL<T extends Column<ColumnBaseConfig<ColumnDataType, string>, object, object> | SQL<unknown> | Aliased<unknown> ? InferDataType<T> : T extends Table<TableConfig<Column<any, object, object>>> ? { [K in string | number]: { [Key in string as Key]: T["_"]["columns"][Key]["_"]["notNull"] extends true ? T["_"]["columns"][Key]["_"]["data"] : null | T["_"]["columns"][Key]["_"]["data"] }[K] } : T extends View<string, boolean, ColumnsSelection> | Subquery<string, unknown> ? T["_"]["selectedFields"] : unknown>
```

#### Type parameters

| Type parameter           |
| :----------------------- | ----------- |
| `T` extends `SQLWrapper` | `AnyColumn` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `anyelement` | `T`  |

#### Returns

`SQL`<`T` extends `Column`<`ColumnBaseConfig`<`ColumnDataType`, `string`>, `object`, `object`> |
`SQL`<`unknown`> | `Aliased`<`unknown`> ? [`InferDataType`](documentation.md#inferdatatypet)<`T`> :
`T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> ?
`{ [K in string | number]: { [Key in string as Key]: T["_"]["columns"][Key]["_"]["notNull"] extends true ? T["_"]["columns"][Key]["_"]["data"] : null | T["_"]["columns"][Key]["_"]["data"] }[K] }`
: `T` extends `View`<`string`, `boolean`, `ColumnsSelection`> | `Subquery`<`string`, `unknown`> ?
`T`\[`"_"`]\[`"selectedFields"`] : `unknown`>

---

<a id="totsquery" name="totsquery"></a>

### toTsquery()

```ts
toTsquery(language: SQLWrapper | AnyColumn, text: unknown): SQL<string>
```

#### Parameters

| Parameter  | Type         |
| :--------- | :----------- | ----------- |
| `language` | `SQLWrapper` | `AnyColumn` |
| `text`     | `unknown`    |

#### Returns

`SQL`<`string`>

---

<a id="totsvector" name="totsvector"></a>

### toTsvector()

```ts
toTsvector(language: SQLWrapper | AnyColumn, text: unknown): SQL<string>
```

#### Parameters

| Parameter  | Type         |
| :--------- | :----------- | ----------- |
| `language` | `SQLWrapper` | `AnyColumn` |
| `text`     | `unknown`    |

#### Returns

`SQL`<`string`>

---

<a id="ts" name="ts"></a>

### ts()

```ts
ts(vector: SQLWrapper, querytext: SQLWrapper): SQL<unknown>
```

Test a text search query against a ts_vector value.

#### Parameters

| Parameter   | Type         |
| :---------- | :----------- |
| `vector`    | `SQLWrapper` |
| `querytext` | `SQLWrapper` |

#### Returns

`SQL`<`unknown`>

---

<a id="tsrange" name="tsrange"></a>

### tsrange()

```ts
tsrange<TName>(dbName: TName, fieldConfig?:     {
      withTimezone: boolean;
      }): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: [Date, Date];
  dataType: "custom";
  driverParam: unknown;
  enumValues: undefined;
  name: TName;
}>
```

Implements Postgres timestamp range.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter                   | Type      |
| :-------------------------- | :-------- |
| `dbName`                    | `TName`   |
| `fieldConfig`?              | `Object`  |
| `fieldConfig.withTimezone`? | `boolean` |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: \[`Date`, `Date`]; `dataType`:
`"custom"`; `driverParam`: `unknown`; `enumValues`: `undefined`; `name`: `TName`; }>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | \[`Date`, `Date`]  |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `unknown`          |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

- https://orm.drizzle.team/docs/custom-types Timestamp for reference.
- https://www.postgresql.org/docs/current/rangetypes.html

#### Todo

Add multiranges if needed.

---

<a id="tsvector" name="tsvector"></a>

### tsvector()

```ts
tsvector<TName>(dbName: TName, fieldConfig:     {
      language: Regconfig | SQLWrapper | SQL<Regconfig>;
      sources: string[];
      weighted: boolean;
      }): PgCustomColumnBuilder<{
  columnType: "PgCustomColumn";
  data: string;
  dataType: "custom";
  driverParam: unknown;
  enumValues: undefined;
  name: TName;
}>
```

Tsvector type for generated columns used notably for fuzzy string search.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter               | Type        |
| :---------------------- | :---------- | ------------ | ------------------ |
| `dbName`                | `TName`     |
| `fieldConfig`           | `Object`    |
| `fieldConfig.language`  | `Regconfig` | `SQLWrapper` | `SQL`<`Regconfig`> |
| `fieldConfig.sources`   | `string`\[] |
| `fieldConfig.weighted`? | `boolean`   |

#### Returns

`PgCustomColumnBuilder`<{ `columnType`: `"PgCustomColumn"`; `data`: `string`; `dataType`:
`"custom"`; `driverParam`: `unknown`; `enumValues`: `undefined`; `name`: `TName`; }>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `string`           |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `unknown`          |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

https://github.com/drizzle-team/drizzle-orm/issues/247

#### Todo

Implementation isn't clean. Figure out a better way to map the language name and column references,
or stay up to date on support for `generatedAs()`.

---

<a id="wn" name="wn"></a>

### wn()

```ts
wn(condition: SQLWrapper, statement: unknown): SQL<unknown>
```

When statement.

#### Parameters

| Parameter   | Type         |
| :---------- | :----------- |
| `condition` | `SQLWrapper` |
| `statement` | `unknown`    |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
WHEN condition;
THEN statement;
```
