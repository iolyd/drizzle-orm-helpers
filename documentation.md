# drizzle-orm-helpers

## Table of contents

### Type Aliases

- [AnySelect](modules.md#anyselect)
- [InferColumnType](modules.md#infercolumntype)
- [InferDataType](modules.md#inferdatatype)
- [Range](modules.md#range)
- [Select](modules.md#select)

### Variables

- [emptyJsonArray](modules.md#emptyjsonarray)
- [emptyJsonObject](modules.md#emptyjsonobject)
- [emptySqlArray](modules.md#emptysqlarray)
- [fal](modules.md#fal)
- [infinity](modules.md#infinity)
- [nul](modules.md#nul)
- [today](modules.md#today)
- [tru](modules.md#tru)

### Functions

- [arrayAgg](modules.md#arrayagg)
- [bool](modules.md#bool)
- [citext](modules.md#citext)
- [coalesce](modules.md#coalesce)
- [createGenerateNanoid](modules.md#creategeneratenanoid)
- [createRegconfig](modules.md#createregconfig)
- [cs](modules.md#cs)
- [cube](modules.md#cube)
- [daterange](modules.md#daterange)
- [el](modules.md#el)
- [excluded](modules.md#excluded)
- [getColumns](modules.md#getcolumns)
- [getNameOrAlias](modules.md#getnameoralias)
- [intrange](modules.md#intrange)
- [isRange](modules.md#isrange)
- [jsonAgg](modules.md#jsonagg)
- [jsonAggBuildObject](modules.md#jsonaggbuildobject)
- [jsonBuildObject](modules.md#jsonbuildobject)
- [jsonObjectAgg](modules.md#jsonobjectagg)
- [jsonStripNulls](modules.md#jsonstripnulls)
- [paginate](modules.md#paginate)
- [plaintoTsquery](modules.md#plaintotsquery)
- [point](modules.md#point)
- [random](modules.md#random)
- [rowToJson](modules.md#rowtojson)
- [toJson](modules.md#tojson)
- [toJsonb](modules.md#tojsonb)
- [toTsquery](modules.md#totsquery)
- [toTsvector](modules.md#totsvector)
- [ts](modules.md#ts)
- [tsrange](modules.md#tsrange)
- [tsvector](modules.md#tsvector)
- [wn](modules.md#wn)

## Type Aliases

### AnySelect

Ƭ **AnySelect**: `SetOptional`\<`AnyPgSelect` \| `AnyMySqlSelect` \| `AnySQLiteSelect`, ``"where"``\>

Dialect agnostic AnySelect.

**`See`**

 - AnyPgSelect
 - AnyMySqlSelect
 - AnySQLiteSelect

#### Defined in

[src/primitives.ts:36](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L36)

___

### InferColumnType

Ƭ **InferColumnType**\<`T`\>: `AnyColumn`\<`Pick`\<`ReturnType`\<`T`\>[``"_"``], ``"data"`` \| ``"dataType"``\>\>

Infer type of table column.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`config`: `never`[]) => `ColumnBuilderBase` |

#### Defined in

[src/primitives.ts:41](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L41)

___

### InferDataType

Ƭ **InferDataType**\<`T`\>: `T` extends `Column` ? `T`[``"_"``][``"notNull"``] extends ``true`` ? `T`[``"_"``][``"dataType"``] : `T`[``"_"``][``"dataType"``] \| ``null`` : `T` extends `SQL`\<infer U\> ? `U` : `T` extends `SQL.Aliased`\<infer U\> ? `U` : `never`

Infer SQL template or column data type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Column` \| `SQL` \| `SQL.Aliased` |

#### Defined in

[src/primitives.ts:48](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L48)

___

### Range

Ƭ **Range**: [`number`, `number`] \| [``null``, ``null``]

Type for returned value of postgres range data. While empty ranges normally return 'empty', they
are here modeled as [null, null] for convenience when binding range members or reprensentinf
their state for reactivity.

#### Defined in

[src/utilities.ts:159](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L159)

___

### Select

Ƭ **Select**: `SetOptional`\<`PgSelect` \| `MySqlSelect` \| `SQLiteSelect`, ``"where"``\>

Dialect agnostic select.

**`See`**

 - PgSelect.
 - MySqlSelect
 - SQLiteSelect

#### Defined in

[src/primitives.ts:27](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L27)

## Variables

### emptyJsonArray

• `Const` **emptyJsonArray**: `SQL`\<[`never`]\>

Empty array as SQL json.

#### Defined in

[src/primitives.ts:66](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L66)

___

### emptyJsonObject

• `Const` **emptyJsonObject**: `SQL`\<`object`\>

Empty record as SQL json.

#### Defined in

[src/primitives.ts:61](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L61)

___

### emptySqlArray

• `Const` **emptySqlArray**: `SQL`\<`SQL`\<[]\>\>

Empty SQL array (not json typed)

#### Defined in

[src/primitives.ts:71](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L71)

___

### fal

• `Const` **fal**: `SQL`\<``false``\>

SQL template false value.

#### Defined in

[src/primitives.ts:81](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L81)

___

### infinity

• `Const` **infinity**: `SQL`\<`number`\>

SQL template infinity value.

#### Defined in

[src/primitives.ts:98](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L98)

___

### nul

• `Const` **nul**: `SQL`\<``null``\>

SQL template null value.

#### Defined in

[src/primitives.ts:93](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L93)

___

### today

• `Const` **today**: `SQL`\<`Date`\>

SQL template today value.

#### Defined in

[src/primitives.ts:103](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L103)

___

### tru

• `Const` **tru**: `SQL`\<``true``\>

SQL template true value.

#### Defined in

[src/primitives.ts:76](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L76)

## Functions

### arrayAgg

▸ **arrayAgg**\<`T`\>(`raw`): `SQL`\<``null`` \| `T` extends `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`T`\>[] : `T`[]\>

Aggregate sql values into an sql array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> \| {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | `T` |

#### Returns

`SQL`\<``null`` \| `T` extends `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`T`\>[] : `T`[]\>

#### Defined in

[src/primitives.ts:158](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L158)

___

### bool

▸ **bool**\<`T`\>(`value`): `SQL`\<`T`\>

SQL template boolean value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`SQL`\<`T`\>

#### Defined in

[src/primitives.ts:86](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L86)

___

### citext

▸ **citext**\<`TName`\>(`dbName`, `fieldConfig?`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: `string` ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

Ci-text postgres column type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `TName` |
| `fieldConfig?` | `unknown` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: `string` ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

**`See`**

https://www.postgresql.org/docs/current/citext.html

#### Defined in

[src/custom-types.ts:10](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L10)

___

### coalesce

▸ **coalesce**\<`T`\>(`...values`): `CoalesceSQL`\<`T`, ``true``, `never`\>

SQL coalesce.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SQL`\<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `T` |

#### Returns

`CoalesceSQL`\<`T`, ``true``, `never`\>

#### Defined in

[src/primitives.ts:308](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L308)

___

### createGenerateNanoid

▸ **createGenerateNanoid**(`«destructured»`): (`__namedParameters`: \{ `alphabet?`: `string` ; `length?`: `number` = defaultLength; `optimized?`: `boolean` = false }) => `SQL`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `defaultLength` | `number` |
| › `schemaName?` | `string` |

#### Returns

`fn`

▸ (`«destructured»?`): `SQL`\<`unknown`\>

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `«destructured»` | `Object` | `{}` | - |
| › `alphabet?` | `string` | `undefined` | Defaults to your extension's initialization setting. |
| › `length?` | `number` | `defaultLength` | Defaults to {NANOID_LENGTH_DEFAULT}. |
| › `optimized?` | `boolean` | `false` | - |

##### Returns

`SQL`\<`unknown`\>

**`Example`**

```
const generateNanoid = createGenerateNanoid({
	schemaName: extensionsSchema.schemaName,
});
```

#### Defined in

[src/utilities.ts:104](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L104)

___

### createRegconfig

▸ **createRegconfig**\<`T`\>(`languageTags`): (`languageTag`: `SQLWrapper`) => `string`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `Regconfig`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageTags` | `T` | Lookup dictionnary used as a reference to match your app's language tags with Postgres's regconfig language names. |

#### Returns

`fn`

▸ (`languageTag`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `languageTag` | `SQLWrapper` |

##### Returns

`string`

**`Example`**

```
const regconfig = createRegconfig({...})
```

#### Defined in

[src/utilities.ts:77](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L77)

___

### cs

▸ **cs**(`...statements`): `SQL`\<`unknown`\>

Case condition chain.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...statements` | `SQLWrapper`[] |

#### Returns

`SQL`\<`unknown`\>

#### Defined in

[src/primitives.ts:136](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L136)

___

### cube

▸ **cube**\<`TName`\>(`dbName`, `fieldConfig?`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [x: number, y: number, z: number] ; `dataType`: ``"custom"`` ; `driverParam`: `number`[] ; `enumValues`: `undefined` ; `name`: `TName`  }\>

Implements cube extension type for 3d vectors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `TName` |
| `fieldConfig?` | `Object` |
| `fieldConfig.schemaName?` | `string` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [x: number, y: number, z: number] ; `dataType`: ``"custom"`` ; `driverParam`: `number`[] ; `enumValues`: `undefined` ; `name`: `TName`  }\>

**`See`**

https://www.postgresql.org/docs/current/cube.html

#### Defined in

[src/custom-types.ts:93](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L93)

___

### daterange

▸ **daterange**\<`TName`\>(`dbName`, `fieldConfig?`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [`Date`, `Date`] ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

Implements postgres date range.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `TName` |
| `fieldConfig?` | `unknown` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [`Date`, `Date`] ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

**`See`**

 - https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 - https://www.postgresql.org/docs/current/rangetypes.html

**`Todo`**

Add multiranges if needed.

#### Defined in

[src/custom-types.ts:75](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L75)

___

### el

▸ **el**(`statement`): `SQL`\<`unknown`\>

Else statement for fallback statement in condition tree.

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `SQLWrapper` |

#### Returns

`SQL`\<`unknown`\>

#### Defined in

[src/primitives.ts:129](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L129)

___

### excluded

▸ **excluded**\<`T`\>(`columns`): \{ [K in string \| number \| symbol]: SQL\<InferDataType\<T[K]\>\> }

Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `AnyColumn`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `columns` | `T` | Record of columns to get from the conflict's `excluded` table. |

#### Returns

\{ [K in string \| number \| symbol]: SQL\<InferDataType\<T[K]\>\> }

#### Defined in

[src/primitives.ts:145](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L145)

___

### getColumns

▸ **getColumns**\<`T`\>(`table`): `T` extends `Table` ? `T`[``"_"``][``"columns"``] : `T` extends `View` ? `T`[``"_"``][``"selectedFields"``] : `T` extends `Subquery` ? `T`[``"_"``][``"selectedFields"``] : `T` extends [`AnySelect`](modules.md#anyselect) ? `T`[``"_"``][``"selectedFields"``] : `never`

Should replace `getTableColumns` to allow for more input versatility.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnySelect`](modules.md#anyselect) \| `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> \| `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `T` |

#### Returns

`T` extends `Table` ? `T`[``"_"``][``"columns"``] : `T` extends `View` ? `T`[``"_"``][``"selectedFields"``] : `T` extends `Subquery` ? `T`[``"_"``][``"selectedFields"``] : `T` extends [`AnySelect`](modules.md#anyselect) ? `T`[``"_"``][``"selectedFields"``] : `never`

**`See`**

https://github.com/drizzle-team/drizzle-orm/pull/1789

#### Defined in

[src/utilities.ts:19](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L19)

___

### getNameOrAlias

▸ **getNameOrAlias**\<`T`\>(`table`): `T` extends `Table` ? `T`[``"_"``][``"name"``] : `T` extends `View` ? `T`[``"_"``][``"name"``] : `T` extends `Subquery` ? `T`[``"_"``][``"alias"``] : `T` extends [`AnySelect`](modules.md#anyselect) ? `T`[``"_"``][``"tableName"``] : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnySelect`](modules.md#anyselect) \| `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> \| `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `T` |

#### Returns

`T` extends `Table` ? `T`[``"_"``][``"name"``] : `T` extends `View` ? `T`[``"_"``][``"name"``] : `T` extends `Subquery` ? `T`[``"_"``][``"alias"``] : `T` extends [`AnySelect`](modules.md#anyselect) ? `T`[``"_"``][``"tableName"``] : `never`

#### Defined in

[src/utilities.ts:43](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L43)

___

### intrange

▸ **intrange**\<`TName`\>(`dbName`, `fieldConfig?`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [`Range`](modules.md#range) ; `dataType`: ``"custom"`` ; `driverParam`: `string` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

Implements postgres int4 / int8 range type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `TName` |
| `fieldConfig?` | `Object` |
| `fieldConfig.size` | ``4`` \| ``8`` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [`Range`](modules.md#range) ; `dataType`: ``"custom"`` ; `driverParam`: `string` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

**`See`**

https://www.postgresql.org/docs/current/rangetypes.html

**`Todo`**

Add multiranges if needed.

#### Defined in

[src/custom-types.ts:122](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L122)

___

### isRange

▸ **isRange**(`maybeRange`, `«destructured»`): maybeRange is Range

Schema to validate and assert as range. Can also be used for the base of a custom validator with
the library of your choice.

#### Parameters

| Name | Type |
| :------ | :------ |
| `maybeRange` | `unknown` |
| `«destructured»` | `Object` |
| › `lower?` | `RangeBoundType` |
| › `max?` | `number` |
| › `min?` | `number` |
| › `upper?` | `RangeBoundType` |

#### Returns

maybeRange is Range

**`Example`**

```
// zod custom schema
const rangeSchema = z.custom<Range>(isRange);
```

#### Defined in

[src/utilities.ts:175](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L175)

___

### jsonAgg

▸ **jsonAgg**\<`T`\>(`selection`, `«destructured»?`): `SQL`\<`T` extends `Table` ? `InferSelectModel`\<`T`\> : `T` extends `Column` ? [`InferDataType`](modules.md#inferdatatype)\<`T`\>[] : `T` extends `Subquery` ? \{ [K in keyof T["\_"]["selectedFields"]]: InferDataType\<T["\_"]["selectedFields"][K]\> }[] : `T` extends [`AnySelect`](modules.md#anyselect) ? `Awaited`\<`T`\> : `never`\>

Json_agg.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AnySelect`](modules.md#anyselect) \| `Column`\<`ColumnBaseConfig`\<`ColumnDataType`, `string`\>, `object`, `object`\> \| `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> \| `Subquery`\<`string`, `unknown`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selection` | `T` | `undefined` |
| `«destructured»` | `Object` | `{}` |
| › `notNull?` | `boolean` | `true` |

#### Returns

`SQL`\<`T` extends `Table` ? `InferSelectModel`\<`T`\> : `T` extends `Column` ? [`InferDataType`](modules.md#inferdatatype)\<`T`\>[] : `T` extends `Subquery` ? \{ [K in keyof T["\_"]["selectedFields"]]: InferDataType\<T["\_"]["selectedFields"][K]\> }[] : `T` extends [`AnySelect`](modules.md#anyselect) ? `Awaited`\<`T`\> : `never`\>

#### Defined in

[src/primitives.ts:227](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L227)

___

### jsonAggBuildObject

▸ **jsonAggBuildObject**\<`T`\>(`shape`): `SQL`\<\{ [K in keyof T]: InferDataType\<T[K]\> extends never ? T : InferDataType\<T[K]\> }[]\>

Aggregate sql values into a json object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> \| `AnyColumn`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `shape` | `T` |

#### Returns

`SQL`\<\{ [K in keyof T]: InferDataType\<T[K]\> extends never ? T : InferDataType\<T[K]\> }[]\>

#### Defined in

[src/primitives.ts:266](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L266)

___

### jsonBuildObject

▸ **jsonBuildObject**\<`T`\>(`shape`): `SQL`\<\{ [K in string \| number \| symbol]: InferDataType\<T[K]\> }\>

Build objects using `json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
return an object with unwrapped value types instead of SQL wrapped types.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `SQL`\<`unknown`\> \| `AnyColumn`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `shape` | `T` |

#### Returns

`SQL`\<\{ [K in string \| number \| symbol]: InferDataType\<T[K]\> }\>

#### Defined in

[src/primitives.ts:251](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L251)

___

### jsonObjectAgg

▸ **jsonObjectAgg**\<`K`, `V`, `TK`, `TV`\>(`key`, `value`): `SQL`\<`Record`\<`TK`, `TV`\>\>

Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped
type instead of an SQL wrapped type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `AnyColumn` |
| `V` | extends `SQL`\<`unknown`\> \| `AnyTable`\<`TableConfig`\> |
| `TK` | extends `string` \| `number` = ``null`` extends [`InferDataType`](modules.md#inferdatatype)\<`K`\> ? `never` : [`InferDataType`](modules.md#inferdatatype)\<`K`\> extends `string` \| `number` ? `InferDataType<K>` : `never` |
| `TV` | `V` extends `AnyTable`\<`TableConfig`\> ? \{ [K in string \| number]: \{ [Key in string as Key]: V["\_"]["columns"][Key]["\_"]["notNull"] extends true ? V["\_"]["columns"][Key]["\_"]["data"] : null \| V["\_"]["columns"][Key]["\_"]["data"] }[K] } : `V` extends `SQL`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`V`\> : `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `V` |

#### Returns

`SQL`\<`Record`\<`TK`, `TV`\>\>

#### Defined in

[src/primitives.ts:288](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L288)

___

### jsonStripNulls

▸ **jsonStripNulls**\<`T`\>(`json`): `SQL`\<`SetNonNullable`\<`T`, keyof `T`\>\>

SQL json_strip_nulls.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `SQL`\<`T`\> \| `Aliased`\<`T`\> |

#### Returns

`SQL`\<`SetNonNullable`\<`T`, keyof `T`\>\>

#### Defined in

[src/primitives.ts:108](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L108)

___

### paginate

▸ **paginate**\<`T`\>(`qb`, `page`, `size?`): `PgSelect` \| `MySqlSelect` \| `SQLiteSelect`

Paginate a query.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Select`](modules.md#select) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `qb` | `T` | `undefined` |
| `page` | `number` | `undefined` |
| `size` | `number` | `PAGE_SIZE_DEFAULT` |

#### Returns

`PgSelect` \| `MySqlSelect` \| `SQLiteSelect`

#### Defined in

[src/utilities.ts:150](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/utilities.ts#L150)

___

### plaintoTsquery

▸ **plaintoTsquery**(`language`, `text`): `SQL`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `SQLWrapper` |
| `text` | `unknown` |

#### Returns

`SQL`\<`string`\>

#### Defined in

[src/primitives.ts:213](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L213)

___

### point

▸ **point**\<`C`, `N`\>(`name`, `config?`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: \{ `coordinates`: `Coordinate`\<`C`\> ; `type`: `string`  } ; `dataType`: ``"custom"`` ; `driverParam`: `string` ; `enumValues`: `undefined` ; `name`: `N`  }\>

Implements postgis point geometry type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `Object` |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `config?` | `C` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: \{ `coordinates`: `Coordinate`\<`C`\> ; `type`: `string`  } ; `dataType`: ``"custom"`` ; `driverParam`: `string` ; `enumValues`: `undefined` ; `name`: `N`  }\>

**`See`**

 - https://github.com/drizzle-team/drizzle-orm/issues/671
 - https://github.com/drizzle-team/drizzle-orm/issues/337#issuecomment-1600854417.

#### Defined in

[src/custom-types.ts:177](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L177)

___

### random

▸ **random**(): `SQL`\<`number`\>

SQL random function.

#### Returns

`SQL`\<`number`\>

#### Defined in

[src/primitives.ts:115](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L115)

___

### rowToJson

▸ **rowToJson**\<`T`\>(`row`): `SQL`\<`T` extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> ? \{ [K in string \| number]: \{ [Key in string as Key]: T["\_"]["columns"][Key]["\_"]["notNull"] extends true ? T["\_"]["columns"][Key]["\_"]["data"] : null \| T["\_"]["columns"][Key]["\_"]["data"] }[K] } : `T` extends `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> ? `T`[``"_"``][``"selectedFields"``] : ``null``\>

Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> \| `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | `T` |

#### Returns

`SQL`\<`T` extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> ? \{ [K in string \| number]: \{ [Key in string as Key]: T["\_"]["columns"][Key]["\_"]["notNull"] extends true ? T["\_"]["columns"][Key]["\_"]["data"] : null \| T["\_"]["columns"][Key]["\_"]["data"] }[K] } : `T` extends `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> ? `T`[``"_"``][``"selectedFields"``] : ``null``\>

#### Defined in

[src/primitives.ts:195](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L195)

___

### toJson

▸ **toJson**\<`T`\>(`anyelement`): `SQL`\<`T` extends `Column`\<`ColumnBaseConfig`\<`ColumnDataType`, `string`\>, `object`, `object`\> \| `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`T`\> : `T` extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> ? \{ [K in string \| number]: \{ [Key in string as Key]: T["\_"]["columns"][Key]["\_"]["notNull"] extends true ? T["\_"]["columns"][Key]["\_"]["data"] : null \| T["\_"]["columns"][Key]["\_"]["data"] }[K] } : `T` extends `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> ? `T`[``"_"``][``"selectedFields"``] : `unknown`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SQLWrapper` \| `AnyColumn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `anyelement` | `T` |

#### Returns

`SQL`\<`T` extends `Column`\<`ColumnBaseConfig`\<`ColumnDataType`, `string`\>, `object`, `object`\> \| `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`T`\> : `T` extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> ? \{ [K in string \| number]: \{ [Key in string as Key]: T["\_"]["columns"][Key]["\_"]["notNull"] extends true ? T["\_"]["columns"][Key]["\_"]["data"] : null \| T["\_"]["columns"][Key]["\_"]["data"] }[K] } : `T` extends `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> ? `T`[``"_"``][``"selectedFields"``] : `unknown`\>

**`See`**

https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE

#### Defined in

[src/primitives.ts:167](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L167)

___

### toJsonb

▸ **toJsonb**\<`T`\>(`anyelement`): `SQL`\<`T` extends `Column`\<`ColumnBaseConfig`\<`ColumnDataType`, `string`\>, `object`, `object`\> \| `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`T`\> : `T` extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> ? \{ [K in string \| number]: \{ [Key in string as Key]: T["\_"]["columns"][Key]["\_"]["notNull"] extends true ? T["\_"]["columns"][Key]["\_"]["data"] : null \| T["\_"]["columns"][Key]["\_"]["data"] }[K] } : `T` extends `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> ? `T`[``"_"``][``"selectedFields"``] : `unknown`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `SQLWrapper` \| `AnyColumn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `anyelement` | `T` |

#### Returns

`SQL`\<`T` extends `Column`\<`ColumnBaseConfig`\<`ColumnDataType`, `string`\>, `object`, `object`\> \| `SQL`\<`unknown`\> \| `Aliased`\<`unknown`\> ? [`InferDataType`](modules.md#inferdatatype)\<`T`\> : `T` extends `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\> ? \{ [K in string \| number]: \{ [Key in string as Key]: T["\_"]["columns"][Key]["\_"]["notNull"] extends true ? T["\_"]["columns"][Key]["\_"]["data"] : null \| T["\_"]["columns"][Key]["\_"]["data"] }[K] } : `T` extends `View`\<`string`, `boolean`, `ColumnsSelection`\> \| `Subquery`\<`string`, `unknown`\> ? `T`[``"_"``][``"selectedFields"``] : `unknown`\>

#### Defined in

[src/primitives.ts:179](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L179)

___

### toTsquery

▸ **toTsquery**(`language`, `text`): `SQL`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `SQLWrapper` \| `AnyColumn` |
| `text` | `unknown` |

#### Returns

`SQL`\<`string`\>

#### Defined in

[src/primitives.ts:209](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L209)

___

### toTsvector

▸ **toTsvector**(`language`, `text`): `SQL`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `SQLWrapper` \| `AnyColumn` |
| `text` | `unknown` |

#### Returns

`SQL`\<`string`\>

#### Defined in

[src/primitives.ts:205](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L205)

___

### ts

▸ **ts**(`vector`, `querytext`): `SQL`\<`unknown`\>

Test a text search query against a ts_vector value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vector` | `SQLWrapper` |
| `querytext` | `SQLWrapper` |

#### Returns

`SQL`\<`unknown`\>

#### Defined in

[src/primitives.ts:220](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L220)

___

### tsrange

▸ **tsrange**\<`TName`\>(`dbName`, `fieldConfig?`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [`Date`, `Date`] ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

Implements postgres timestamp range.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `TName` |
| `fieldConfig?` | `Object` |
| `fieldConfig.withTimezone` | `boolean` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: [`Date`, `Date`] ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

**`See`**

 - https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 - https://www.postgresql.org/docs/current/rangetypes.html

**`Todo`**

Add multiranges if needed.

#### Defined in

[src/custom-types.ts:55](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L55)

___

### tsvector

▸ **tsvector**\<`TName`\>(`dbName`, `fieldConfig`): `PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: `string` ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

Tsvector type for generated columns used notably for fuzzy string search.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TName` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `TName` |
| `fieldConfig` | `Object` |
| `fieldConfig.language` | `string` |
| `fieldConfig.sources` | `string`[] |
| `fieldConfig.weighted?` | `boolean` |

#### Returns

`PgCustomColumnBuilder`\<\{ `columnType`: ``"PgCustomColumn"`` ; `data`: `string` ; `dataType`: ``"custom"`` ; `driverParam`: `unknown` ; `enumValues`: `undefined` ; `name`: `TName`  }\>

**`See`**

https://github.com/drizzle-team/drizzle-orm/issues/247

#### Defined in

[src/custom-types.ts:24](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/custom-types.ts#L24)

___

### wn

▸ **wn**(`condition`, `statement`): `SQL`\<`unknown`\>

When statement.

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | `SQLWrapper` |
| `statement` | `unknown` |

#### Returns

`SQL`\<`unknown`\>

#### Defined in

[src/primitives.ts:122](https://github.com/iolyd/drizzle-orm-helpers/blob/581028a/src/primitives.ts#L122)
