# src/pg

## Table of Contents

- [Type Aliases](#type-aliases)
  - [RangeBoundType](#rangeboundtype)
  - [RangeValue\<T>](#rangevaluet)
  - [Regconfig](#regconfig)
- [Variables](#variables)
  - [RANGE_BOUND_TYPES](#range_bound_types)
  - [RANGE_EMPTY](#range_empty)
  - [REGCONFIGS](#regconfigs)
  - [empty](#empty)
  - [emptyArray](#emptyarray)
  - [emptyJsonArray](#emptyjsonarray)
  - [emptyJsonObject](#emptyjsonobject)
- [Functions](#functions)
  - [arrayAgg()](#arrayagg)
  - [citext()](#citext)
  - [contained()](#contained)
  - [contains()](#contains)
  - [cube()](#cube)
  - [cubeDim()](#cubedim)
  - [cubeDistance()](#cubedistance)
  - [cubeEnlarge()](#cubeenlarge)
  - [cubeInter()](#cubeinter)
  - [cubeIsPoint()](#cubeispoint)
  - [cubeLowerLeftCoord()](#cubelowerleftcoord)
  - [cubeSubset()](#cubesubset)
  - [cubeUnion()](#cubeunion)
  - [cubeUpperRightCoord()](#cubeupperrightcoord)
  - [daitch_mokotoff()](#daitch_mokotoff)
  - [daterange()](#daterange)
  - [daterangeSchema()](#daterangeschema)
  - [difference()](#difference)
  - [distance()](#distance)
  - [excluded()](#excluded)
  - [extract()](#extract)
  - [generatedTsvector()](#generatedtsvector)
  - [geography()](#geography)
  - [getCurrentTsConfig()](#getcurrenttsconfig)
  - [getNow()](#getnow)
  - [intrange()](#intrange)
  - [intrangeSchema()](#intrangeschema)
  - [jsonAgg()](#jsonagg)
  - [jsonAggBuildObject()](#jsonaggbuildobject)
  - [jsonBuildObject()](#jsonbuildobject)
  - [jsonObjectAgg()](#jsonobjectagg)
  - [jsonStripNulls()](#jsonstripnulls)
  - [makeCube()](#makecube)
  - [nanoid()](#nanoid)
  - [numrange()](#numrange)
  - [numrangeSchema()](#numrangeschema)
  - [overlaps()](#overlaps)
  - [random()](#random)
  - [regconfig()](#regconfig-1)
  - [rowToJson()](#rowtojson)
  - [setweight()](#setweight)
  - [similar()](#similar)
  - [soundex()](#soundex)
  - [toJson()](#tojson)
  - [toJsonb()](#tojsonb)
  - [toTsquery()](#totsquery)
  - [toTsvector()](#totsvector)
  - [ts()](#ts)
  - [tsrange()](#tsrange)
  - [tsrangeSchema()](#tsrangeschema)
  - [tsvector()](#tsvector)

## Type Aliases

<a id="rangeboundtype" name="rangeboundtype"></a>

### RangeBoundType

```ts
type RangeBoundType: ValueOf<typeof RANGE_BOUND_TYPES>;
```

---

<a id="rangevaluet" name="rangevaluet"></a>

### RangeValue\<T>

```ts
type RangeValue<T>: Object;
```

#### Type parameters

| Type parameter | Value  |
| :------------- | :----- |
| `T`            | `void` |

#### Type declaration

| Member  | Type |
| :------ | :--- | ------ |
| `lower` | `T`  | `null` |
| `upper` | `T`  | `null` |

---

<a id="regconfig" name="regconfig"></a>

### Regconfig

```ts
type Regconfig: ValueOf<typeof REGCONFIGS>;
```

## Variables

<a id="range_bound_types" name="range_bound_types"></a>

### RANGE_BOUND_TYPES

```ts
const RANGE_BOUND_TYPES: Object;
```

#### Type declaration

| Member      | Type          | Value       |
| :---------- | :------------ | :---------- |
| `EXCLUSIVE` | `"exclusive"` | 'exclusive' |
| `INCLUSIVE` | `"inclusive"` | 'inclusive' |

---

<a id="range_empty" name="range_empty"></a>

### RANGE_EMPTY

```ts
const RANGE_EMPTY: Object;
```

Value for app-side representation of empty postgres ranges.

#### Type declaration

| Member  | Type   | Value |
| :------ | :----- | :---- |
| `lower` | `null` | null  |
| `upper` | `null` | null  |

---

<a id="regconfigs" name="regconfigs"></a>

### REGCONFIGS

```ts
const REGCONFIGS: Object;
```

Postgres regconfig cfgnames.

#### Example

```sql
SELECT json_object_agg(upper(cfgname), cfgname)
FROM pg_catalog.pg_ts_config;
```

#### Type declaration

| Member       | Type           | Value        |
| :----------- | :------------- | :----------- |
| `ARABIC`     | `"arabic"`     | 'arabic'     |
| `ARMENIAN`   | `"armenian"`   | 'armenian'   |
| `BASQUE`     | `"basque"`     | 'basque'     |
| `CATALAN`    | `"catalan"`    | 'catalan'    |
| `DANISH`     | `"danish"`     | 'danish'     |
| `DUTCH`      | `"dutch"`      | 'dutch'      |
| `ENGLISH`    | `"english"`    | 'english'    |
| `FINNISH`    | `"finnish"`    | 'finnish'    |
| `FRENCH`     | `"french"`     | 'french'     |
| `GERMAN`     | `"german"`     | 'german'     |
| `GREEK`      | `"greek"`      | 'greek'      |
| `HINDI`      | `"hindi"`      | 'hindi'      |
| `HUNGARIAN`  | `"hungarian"`  | 'hungarian'  |
| `INDONESIAN` | `"indonesian"` | 'indonesian' |
| `IRISH`      | `"irish"`      | 'irish'      |
| `ITALIAN`    | `"italian"`    | 'italian'    |
| `LITHUANIAN` | `"lithuanian"` | 'lithuanian' |
| `NEPALI`     | `"nepali"`     | 'nepali'     |
| `NORWEGIAN`  | `"norwegian"`  | 'norwegian'  |
| `PORTUGUESE` | `"portuguese"` | 'portuguese' |
| `ROMANIAN`   | `"romanian"`   | 'romanian'   |
| `RUSSIAN`    | `"russian"`    | 'russian'    |
| `SERBIAN`    | `"serbian"`    | 'serbian'    |
| `SIMPLE`     | `"simple"`     | 'simple'     |
| `SPANISH`    | `"spanish"`    | 'spanish'    |
| `SWEDISH`    | `"swedish"`    | 'swedish'    |
| `TAMIL`      | `"tamil"`      | 'tamil'      |
| `TURKISH`    | `"turkish"`    | 'turkish'    |
| `YIDDISH`    | `"yiddish"`    | 'yiddish'    |

---

<a id="empty" name="empty"></a>

### empty

```ts
const empty: SQL<string>;
```

Postgres value returned for empty ranges.

---

<a id="emptyarray" name="emptyarray"></a>

### emptyArray

```ts
const emptyArray: SQL<SQL<[]>>;
```

Empty SQL array (not json typed)

---

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

## Functions

<a id="arrayagg" name="arrayagg"></a>

### arrayAgg()

```ts
arrayAgg<T>(raw: T): SQL<null | T extends SQL<unknown> | Aliased<unknown> ? InferDataType<T>[] : T[]>
```

Aggregate sql values into an sql array.

#### Type parameters

| Type parameter               |
| :--------------------------- | -------------------- | -------- |
| `T` extends `SQL`<`unknown`> | `Aliased`<`unknown`> | `Object` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `raw`     | `T`  |

#### Returns

`SQL`<`null` | `T` extends `SQL`<`unknown`> | `Aliased`<`unknown`> ?
[`InferDataType`](README.md#inferdatatypet)<`T`>\[] : `T`\[]>

---

<a id="citext" name="citext"></a>

### citext()

```ts
citext<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<Object>
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

`PgCustomColumnBuilder`<`Object`>

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

<a id="contained" name="contained"></a>

### contained()

```ts
contained(left: SQLWrapper, right: unknown): SQL<unknown>
```

Is the first cube contained in the second?

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
cube <@ cube → boolean
```

---

<a id="contains" name="contains"></a>

### contains()

```ts
contains(left: SQLWrapper, right: unknown): SQL<unknown>
```

Does the first cube contain the second?

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
cube @> cube → boolean
```

---

<a id="cube" name="cube"></a>

### cube()

```ts
cube<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<Object>
```

Postgres cube column type with customizable amount of dimensions.

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

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type               |
> | :------------ | :----------------- | --------------------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `number`\[]        | \[`number`\[], `number`\[]] |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `number`\[]        | \[`number`\[], `number`\[]] |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

https://www.postgresql.org/docs/current/cube.html

---

<a id="cubedim" name="cubedim"></a>

### cubeDim()

```ts
cubeDim(cube: SQLWrapper): SQL<number>
```

Returns the number of dimensions of the cube.

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `cube`    | `SQLWrapper` |

#### Returns

`SQL`<`number`>

#### Example

```sql
--cube_dim ( cube ) → integer
cube_dim('(1,2),(3,4)') → 2
```

---

<a id="cubedistance" name="cubedistance"></a>

### cubeDistance()

```ts
cubeDistance(...cubes: [SQLWrapper, SQLWrapper]): SQL<number>
```

Returns the distance between two cubes. If both cubes are points, this is the normal distance
function.

#### Parameters

| Parameter  | Type                          |
| :--------- | :---------------------------- |
| ...`cubes` | \[`SQLWrapper`, `SQLWrapper`] |

#### Returns

`SQL`<`number`>

#### Example

```sql
-- cube_distance ( cube, cube ) → float8
cube_distance('(1,2)', '(3,4)') → 2.8284271247461903
```

---

<a id="cubeenlarge" name="cubeenlarge"></a>

### cubeEnlarge()

```ts
cubeEnlarge(): void
```

Increases the size of the cube by the specified radius r in at least n dimensions. If the radius is
negative the cube is shrunk instead. All defined dimensions are changed by the radius r. Lower-left
coordinates are decreased by r and upper-right coordinates are increased by r. If a lower-left
coordinate is increased to more than the corresponding upper-right coordinate (this can only happen
when r
`< 0) than both coordinates are set to their average. If n is greater than the number of defined dimensions and the cube is being enlarged (r >`
0), then extra dimensions are added to make n altogether; 0 is used as the initial value for the
extra coordinates. This function is useful for creating bounding boxes around a point for searching
for nearby points.

#### Returns

`void`

#### Example

```sql
-- cube_enlarge ( c cube, r double, n integer ) → cube
cube_enlarge('(1,2),(3,4)', 0.5, 3) → (0.5, 1.5, -0.5),(3.5, 4.5, 0.5)
```

---

<a id="cubeinter" name="cubeinter"></a>

### cubeInter()

```ts
cubeInter(): void
```

Produces the intersection of two cubes.

#### Returns

`void`

#### Example

```sql
-- cube_inter ( cube, cube ) → cube
cube_inter('(1,2)', '(3,4)') → (3, 4),(1, 2)
```

---

<a id="cubeispoint" name="cubeispoint"></a>

### cubeIsPoint()

```ts
cubeIsPoint(cube: SQLWrapper): SQL<boolean>
```

Returns true if the cube is a point, that is, the two defining corners are the same.

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `cube`    | `SQLWrapper` |

#### Returns

`SQL`<`boolean`>

#### Example

```sql
-- cube_is_point ( cube ) → boolean
cube_is_point(cube(1,1)) → t
```

---

<a id="cubelowerleftcoord" name="cubelowerleftcoord"></a>

### cubeLowerLeftCoord()

```ts
cubeLowerLeftCoord(): void
```

Returns the n-th coordinate value for the lower left corner of the cube.

#### Returns

`void`

#### Example

```sql
-- cube_ll_coord ( cube, integer ) → float8
cube_ll_coord('(1,2),(3,4)', 2) → 2
```

---

<a id="cubesubset" name="cubesubset"></a>

### cubeSubset()

```ts
cubeSubset(): void
```

Makes a new cube from an existing cube, using a list of dimension indexes from an array. Can be used
to extract the endpoints of a single dimension, or to drop dimensions, or to reorder them as
desired.

#### Returns

`void`

#### Example

```sql
cube_subset ( cube, integer[] ) → cube
cube_subset(cube('(1,3,5),(6,7,8)'), ARRAY[2]) → (3),(7)
cube_subset(cube('(1,3,5),(6,7,8)'), ARRAY[3,2,1,1]) → (5, 3, 1, 1),(8, 7, 6, 6)
```

---

<a id="cubeunion" name="cubeunion"></a>

### cubeUnion()

```ts
cubeUnion(): void
```

Produces the union of two cubes.

#### Returns

`void`

#### Example

```sql
-- cube_union ( cube, cube ) → cube
cube_union('(1,2)', '(3,4)') → (1, 2),(3, 4)
```

---

<a id="cubeupperrightcoord" name="cubeupperrightcoord"></a>

### cubeUpperRightCoord()

```ts
cubeUpperRightCoord(): void
```

```
Returns the n-th coordinate value for the upper right corner of the cube.
```

#### Returns

`void`

#### Example

```sql
-- cube_ur_coord ( cube, integer ) → float8
cube_ur_coord('(1,2),(3,4)', 2) → 4
```

---

<a id="daitch_mokotoff" name="daitch_mokotoff"></a>

### daitch_mokotoff()

```ts
daitch_mokotoff(source: string | SQLWrapper): SQL<string[]>
```

#### Parameters

| Parameter | Type     |
| :-------- | :------- | ------------ |
| `source`  | `string` | `SQLWrapper` |

#### Returns

`SQL`<`string`\[]>

#### See

https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF

---

<a id="daterange" name="daterange"></a>

### daterange()

```ts
daterange<TName, TConfig, TData>(name: TName, config?: TConfig): PgCustomColumnBuilder<Object>
```

Implements postgres date range.

#### Type parameters

| Type parameter             | Value                                                                                                                                      |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `TName` extends `string`   | -                                                                                                                                          |
| `TConfig` extends `Object` | -                                                                                                                                          |
| `TData`                    | `TConfig`\[`"mode"`] extends `"string"` ? [`RangeValue`](src/pg.md#rangevaluet)<`string`> : [`RangeValue`](src/pg.md#rangevaluet)<`number` | `Date`> |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `TData`            |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `string`           |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

- https://orm.drizzle.team/docs/custom-types Timestamp for reference.
- https://www.postgresql.org/docs/current/rangetypes.html

---

<a id="daterangeschema" name="daterangeschema"></a>

### daterangeSchema()

```ts
daterangeSchema<TMode, TData>(__namedParameters:     Object): ZodObject<Object, "strip", ZodTypeAny, { [k_1 in "lower" | "upper"]: addQuestionMarks<baseObjectOutputType<Object>, (undefined extends TData ? never : "lower") | (undefined extends TData ? never : "upper")>[k_1] }, Object>
```

#### Type parameters

| Type parameter             | Value                                            |
| :------------------------- | :----------------------------------------------- | ------ |
| `TMode` extends `"string"` | `"date"`                                         | -      |
| `TData`                    | `TMode` extends `"string"` ? `string` : `number` | `Date` |

#### Parameters

| Parameter                 | Type     |
| :------------------------ | :------- |
| `__namedParameters`       | `Object` |
| `__namedParameters.max`?  | `Date`   |
| `__namedParameters.min`?  | `Date`   |
| `__namedParameters.mode`? | `TMode`  |

#### Returns

`ZodObject`<`Object`, `"strip"`, `ZodTypeAny`,
`{ [k_1 in "lower" | "upper"]: addQuestionMarks<baseObjectOutputType<Object>, (undefined extends TData ? never : "lower") | (undefined extends TData ? never : "upper")>[k_1] }`,
`Object`>

> | Member  | Type                                                   | Value   |
> | :------ | :----------------------------------------------------- | :------ | ---------------------------------------------------------------------------------- | -------- | ------- | ----------- |
> | `lower` | `ZodEffects`<`ZodNullable`<`ZodDate`>, `TData`, `null` | `Date`> | `ZodEffects`<`ZodNullable`<`ZodUnion`<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` | `number` | `Date`> | lowerSchema |
> | `upper` | `ZodEffects`<`ZodNullable`<`ZodDate`>, `TData`, `null` | `Date`> | `ZodEffects`<`ZodNullable`<`ZodUnion`<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` | `number` | `Date`> | upperSchema |

---

<a id="difference" name="difference"></a>

### difference()

```ts
difference(...texts: [string | SQLWrapper, string | SQLWrapper]): SQL<number>
```

#### Parameters

| Parameter  | Type       |
| :--------- | :--------- | ---------------------- | ------------- |
| ...`texts` | \[`string` | `SQLWrapper`, `string` | `SQLWrapper`] |

#### Returns

`SQL`<`number`>

#### See

https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF

---

<a id="distance" name="distance"></a>

### distance()

```ts
distance(
   left: SQLWrapper,
   right: unknown,
__namedParameters:     Object): SQL<unknown>
```

Computes the distance between two cubes.

#### Parameters

| Parameter                 | Type           |
| :------------------------ | :------------- |
| `left`                    | `SQLWrapper`   |
| `right`                   | `unknown`      |
| `__namedParameters`       | `Object`       |
| `__namedParameters.type`? | `DistanceType` |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
-- Computes the Euclidean distance between the two cubes.
cube <-> cube → float8
```

#### Example

```sql
-- Computes the taxicab (L-1 metric) distance between the two cubes.
cube <#> cube → float8
```

#### Example

```sql
-- Computes the Chebyshev (L-inf metric) distance between the two cubes.
cube <=> cube → float8
```

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

<a id="extract" name="extract"></a>

### extract()

```ts
extract(left: SQLWrapper, right: unknown): SQL<unknown>
```

Extracts the n-th coordinate of the cube (counting from 1).

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
cube -> integer → float8
```

Extracts the n-th coordinate of the cube, counting in the following way: n = 2 \* k - 1 means lower
bound of k-th dimension, n = 2 \* k means upper bound of k-th dimension. Negative n denotes the
inverse value of the corresponding positive coordinate. This operator is designed for KNN-GiST
support.

#### Example

```sql
cube ~> integer → float8
```

---

<a id="generatedtsvector" name="generatedtsvector"></a>

### generatedTsvector()

```ts
generatedTsvector<TName>(dbName: TName, fieldConfig:     Object): PgCustomColumnBuilder<Object>
```

Tsvector type for generated columns used notably for fuzzy string search.

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

#### Parameters

| Parameter               | Type        |
| :---------------------- | :---------- | ------------ |
| `dbName`                | `TName`     |
| `fieldConfig`           | `Object`    |
| `fieldConfig.language`  | `string`    | `SQLWrapper` |
| `fieldConfig.sources`   | `string`\[] |
| `fieldConfig.weighted`? | `boolean`   |

#### Returns

`PgCustomColumnBuilder`<`Object`>

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

<a id="geography" name="geography"></a>

### geography()

```ts
geography<TName, TGeography, TZ, TM, TSrid>(name: TName, config?:     Object): PgCustomColumnBuilder<Object>
```

#### Type parameters

| Type parameter           |
| :----------------------- |
| `TName` extends `string` |

| `TGeography` extends | `"Point"` | `"MultiPoint"` | `"LineString"` | `"MultiLineString"` |
`"Polygon"` | `"MultiPolygon"` | `"GeometryCollection"` | | `TZ` extends `boolean` | | `TM` extends
`boolean` | | `TSrid` extends `Srid` |

#### Parameters

| Parameter      | Type         |
| :------------- | :----------- |
| `name`         | `TName`      |
| `config`?      | `Object`     |
| `config.m`?    | `TM`         |
| `config.srid`? | `TSrid`      |
| `config.type`? | `TGeography` |
| `config.z`?    | `TZ`         |

#### Returns

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type                                     |
> | :------------ | :--------------------------------------- | ---------------------------- | --------------------------------- | --------------------------------- | -------------------------------------- | ------------------------------ | ----------------------------------- | ----------------------------------------------------- |
> | `columnType`  | `"PgCustomColumn"`                       |
> | `data`        |                                          | `Extract`<`Point`, `Object`> | `Extract`<`MultiPoint`, `Object`> | `Extract`<`LineString`, `Object`> | `Extract`<`MultiLineString`, `Object`> | `Extract`<`Polygon`, `Object`> | `Extract`<`MultiPolygon`, `Object`> | `Extract`<`GeometryCollection`<`Geometry`>, `Object`> |
> | `dataType`    | `"custom"`                               |
> | `driverParam` | `string`                                 |
> | `enumValues`  | `undefined`                              |
> | `name`        | \`ST_AsGeoJSON("${TName}") as ${TName}\` |

---

<a id="getcurrenttsconfig" name="getcurrenttsconfig"></a>

### getCurrentTsConfig()

```ts
getCurrentTsConfig(): SQL<Regconfig>
```

Get the database's currently set regconfig for text-search functionalities.

```sql
get_current_ts_config();
```

#### Returns

`SQL`<[`Regconfig`](src/pg.md#regconfig)>

---

<a id="getnow" name="getnow"></a>

### getNow()

```ts
getNow(): SQL<Date>
```

Get the current time (dynamically).

#### Returns

`SQL`<`Date`>

#### Example

```sql
now();
```

---

<a id="intrange" name="intrange"></a>

### intrange()

```ts
intrange<TName, TConfig>(name: TName, config?: TConfig): PgCustomColumnBuilder<Object>
```

Implements postgres int4range and int8range types.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` extends `string`   |
| `TConfig` extends `Object` |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type                                            |
> | :------------ | :---------------------------------------------- |
> | `columnType`  | `"PgCustomColumn"`                              |
> | `data`        | [`RangeValue`](src/pg.md#rangevaluet)<`number`> |
> | `dataType`    | `"custom"`                                      |
> | `driverParam` | `string`                                        |
> | `enumValues`  | `undefined`                                     |
> | `name`        | `TName`                                         |

#### See

https://www.postgresql.org/docs/current/rangetypes.html

---

<a id="intrangeschema" name="intrangeschema"></a>

### intrangeSchema()

```ts
intrangeSchema(__namedParameters:     Object): ZodObject<Object, "strip", ZodTypeAny, Object, Object>
```

#### Parameters

| Parameter                | Type     |
| :----------------------- | :------- |
| `__namedParameters`      | `Object` |
| `__namedParameters.max`? | `number` |
| `__namedParameters.min`? | `number` |

#### Returns

`ZodObject`<`Object`, `"strip"`, `ZodTypeAny`, `Object`, `Object`>

> | Member  | Type                       | Value       |
> | :------ | :------------------------- | :---------- |
> | `lower` | `ZodNullable`<`ZodNumber`> | lowerSchema |
> | `upper` | `ZodNullable`<`ZodNumber`> | upperSchema |

---

<a id="jsonagg" name="jsonagg"></a>

### jsonAgg()

```ts
jsonAgg<T>(selection: T, __namedParameters:     Object): SQL<T extends Table ? InferSelectModel<T> : T extends Column ? InferDataType<T>[] : T extends Subquery ? { [K in keyof T["_"]["selectedFields"]]: InferDataType<T["_"]["selectedFields"][K]> }[] : T extends AnySelect ? Awaited<T> : never>
```

Json_agg.

#### Type parameters

| Type parameter                                                                           |
| :--------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------- | ------------------------------- |
| `T` extends `Column`<`ColumnBaseConfig`<`ColumnDataType`, `string`>, `object`, `object`> | `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | [`AnySelect`](README.md#anyselect) | `Subquery`<`string`, `unknown`> |

#### Parameters

| Parameter                    | Type      |
| :--------------------------- | :-------- |
| `selection`                  | `T`       |
| `__namedParameters`          | `Object`  |
| `__namedParameters.notNull`? | `boolean` |

#### Returns

`SQL`<`T` extends `Table` ? `InferSelectModel`<`T`> : `T` extends `Column` ?
[`InferDataType`](README.md#inferdatatypet)<`T`>\[] : `T` extends `Subquery` ?
`{ [K in keyof T["_"]["selectedFields"]]: InferDataType<T["_"]["selectedFields"][K]> }`\[] : `T`
extends [`AnySelect`](README.md#anyselect) ? `Awaited`<`T`> : `never`>

---

<a id="jsonaggbuildobject" name="jsonaggbuildobject"></a>

### jsonAggBuildObject()

```ts
jsonAggBuildObject<T>(shape: T): SQL<{ [K in keyof T]: InferDataType<T[K]> extends never ? T : InferDataType<T[K]> }[]>
```

Aggregate sql values into a json object.

#### Type parameters

| Type parameter                                  |
| :---------------------------------------------- | ----------- | --------------------- |
| `T` extends `Record`<`string`, `SQL`<`unknown`> | `AnyColumn` | `Aliased`<`unknown`>> |

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

| Type parameter               | Value                                                                                        |
| :--------------------------- | :------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `K` extends `AnyColumn`      | -                                                                                            |
| `V` extends `SQL`<`unknown`> | `Aliased`<`unknown`>                                                                         | `AnyTable`<`TableConfig`<`Column`<`any`, `object`, `object`>>>                                                                                | -                                                                                                                                    |
| `TK` extends `string`        | `number`                                                                                     | `null` extends [`InferDataType`](README.md#inferdatatypet)<`K`> ? `never` : [`InferDataType`](README.md#inferdatatypet)<`K`> extends `string` | `number` ? `InferDataType<K>` : `never`                                                                                              |
| `TV`                         | `V` extends `AnyTable`<`TableConfig`<`Column`<`any`, `object`, `object`>>> ? `{ [K in string | number]: { [Key in string as Key]: V["\_"]["columns"][Key]["_"]["notNull"] extends true ? V["\_"]["columns"][Key]["_"]["data"] : null         | V["\_"]["columns"][Key]["_"]["data"] }[K] }`:`V`extends`SQL`<`unknown`> ? [`InferDataType`](README.md#inferdatatypet)<`V`> : `never` |

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

<a id="makecube" name="makecube"></a>

### makeCube()

```ts
makeCube<T>(...args: T): SQL<number[]>
```

Makes a one dimensional cube with both coordinates the same.

#### Type parameters

| Type parameter |
| :------------- |

| `T` extends | `number`\[] | \[`number`\[], `number`\[]] | \[`number`] | \[`number`, `number`] |
\[`SQLWrapper`, `number`] | \[`SQLWrapper`, `number`, `number`] |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| ...`args` | `T`  |

#### Returns

`SQL`<`number`\[]>

#### Example

```sql
-- cube ( float8 ) → cube
cube(1) → (1)
```

Makes a one dimensional cube.

#### Example

```sql
-- cube ( float8, float8 ) → cube
cube(1, 2) → (1),(2)
```

Makes a zero-volume cube using the coordinates defined by the array.

#### Example

```sql
-- cube ( float8[] ) → cube
cube(ARRAY[1,2,3]) → (1, 2, 3)
```

Makes a cube with upper right and lower left coordinates as defined by the two arrays, which must be
of the same length.

#### Example

```sql
-- cube ( float8[], float8[] ) → cube
cube(ARRAY[1,2], ARRAY[3,4]) → (1, 2),(3, 4)
```

Makes a new cube by adding a dimension on to an existing cube, with the same values for both
endpoints of the new coordinate. This is useful for building cubes piece by piece from calculated
values.

#### Example

```sql
-- cube ( cube, float8 ) → cube
cube('(1,2),(3,4)'::cube, 5) → (1, 2, 5),(3, 4, 5)
```

Makes a new cube by adding a dimension on to an existing cube. This is useful for building cubes
piece by piece from calculated values.

#### Example

```sql
--cube ( cube, float8, float8 ) → cube
cube('(1,2),(3,4)'::cube, 5, 6) → (1, 2, 5),(3, 4, 6)
```

---

<a id="nanoid" name="nanoid"></a>

### nanoid()

```ts
nanoid(__namedParameters: Object & Object | Object): SQL<string>
```

Generate a nanoid using a postgres implementation of the nanoid function.

#### Parameters

| Parameter           | Type                |
| :------------------ | :------------------ | -------- |
| `__namedParameters` | `Object` & `Object` | `Object` |

#### Returns

`SQL`<`string`>

#### See

- [Postgres implementation of the nanoid generator](https://github.com/iolyd/drizzle-orm-helpers/blob/main/sql/nanoid.sql)
- https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571

#### Todo

Stay up to date when default values will accept 'sql' without having to pass param to sql.raw()

---

<a id="numrange" name="numrange"></a>

### numrange()

```ts
numrange<TName, TConfig>(name: TName, config?: TConfig): PgCustomColumnBuilder<Object>
```

Implements postgres numrange type.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` extends `string`   |
| `TConfig` extends `Object` |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type                                            |
> | :------------ | :---------------------------------------------- |
> | `columnType`  | `"PgCustomColumn"`                              |
> | `data`        | [`RangeValue`](src/pg.md#rangevaluet)<`number`> |
> | `dataType`    | `"custom"`                                      |
> | `driverParam` | `string`                                        |
> | `enumValues`  | `undefined`                                     |
> | `name`        | `TName`                                         |

#### See

https://www.postgresql.org/docs/current/rangetypes.html

---

<a id="numrangeschema" name="numrangeschema"></a>

### numrangeSchema()

```ts
numrangeSchema(__namedParameters:     Object): ZodObject<Object, "strip", ZodTypeAny, Object, Object>
```

#### Parameters

| Parameter                | Type     |
| :----------------------- | :------- |
| `__namedParameters`      | `Object` |
| `__namedParameters.max`? | `number` |
| `__namedParameters.min`? | `number` |

#### Returns

`ZodObject`<`Object`, `"strip"`, `ZodTypeAny`, `Object`, `Object`>

> | Member  | Type                       | Value       |
> | :------ | :------------------------- | :---------- |
> | `lower` | `ZodNullable`<`ZodNumber`> | lowerSchema |
> | `upper` | `ZodNullable`<`ZodNumber`> | upperSchema |

---

<a id="overlaps" name="overlaps"></a>

### overlaps()

```ts
overlaps(left: SQLWrapper, right: unknown): SQL<unknown>
```

Do the cubes overlap?

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`<`unknown`>

#### Example

```sql
cube && cube → boolean
```

---

<a id="random" name="random"></a>

### random()

```ts
random(): SQL<number>
```

Postgres random function.

#### Returns

`SQL`<`number`>

Random number between 0 and 1.

#### Example

```sql
random();
```

---

<a id="regconfig-1" name="regconfig-1"></a>

### regconfig()

```ts
regconfig<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<Object>
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

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type                               |
> | :------------ | :--------------------------------- |
> | `columnType`  | `"PgCustomColumn"`                 |
> | `data`        | [`Regconfig`](src/pg.md#regconfig) |
> | `dataType`    | `"custom"`                         |
> | `driverParam` | `unknown`                          |
> | `enumValues`  | `undefined`                        |
> | `name`        | `TName`                            |

#### See

https://www.postgresql.org/docs/current/textsearch-controls.html

---

<a id="rowtojson" name="rowtojson"></a>

### rowToJson()

```ts
rowToJson<T>(row: T): SQL<InferDataType<T>>
```

Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped type.

#### Type parameters

| Type parameter                                                          |
| :---------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------- |
| `T` extends `Table`<`TableConfig`<`Column`<`any`, `object`, `object`>>> | `Subquery`<`string`, `unknown`> | `View`<`string`, `boolean`, `ColumnsSelection`> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `row`     | `T`  |

#### Returns

`SQL`<[`InferDataType`](README.md#inferdatatypet)<`T`>>

---

<a id="setweight" name="setweight"></a>

### setweight()

```ts
setweight(tsvector: SQLWrapper, weight: string | number): SQL<string>
```

#### Parameters

| Parameter  | Type         |
| :--------- | :----------- | -------- |
| `tsvector` | `SQLWrapper` |
| `weight`   | `string`     | `number` |

#### Returns

`SQL`<`string`>

---

<a id="similar" name="similar"></a>

### similar()

```ts
similar(): void
```

#### Returns

`void`

---

<a id="soundex" name="soundex"></a>

### soundex()

```ts
soundex(text: string | SQLWrapper): SQL<string>
```

#### Parameters

| Parameter | Type     |
| :-------- | :------- | ------------ |
| `text`    | `string` | `SQLWrapper` |

#### Returns

`SQL`<`string`>

#### See

https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-SOUNDEX

---

<a id="tojson" name="tojson"></a>

### toJson()

```ts
toJson<T>(anyelement: T): SQL<InferDataType<T>>
```

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `SQLWrapper` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `anyelement` | `T`  |

#### Returns

`SQL`<[`InferDataType`](README.md#inferdatatypet)<`T`>>

#### See

https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE

---

<a id="tojsonb" name="tojsonb"></a>

### toJsonb()

```ts
toJsonb<T>(anyelement: T): SQL<InferDataType<T>>
```

#### Type parameters

| Type parameter           |
| :----------------------- |
| `T` extends `SQLWrapper` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `anyelement` | `T`  |

#### Returns

`SQL`<[`InferDataType`](README.md#inferdatatypet)<`T`>>

---

<a id="totsquery" name="totsquery"></a>

### toTsquery()

```ts
toTsquery(text: unknown, text:     Object): SQL<string>
```

#### Parameters

| Parameter         | Type         | Description                                      |
| :---------------- | :----------- | :----------------------------------------------- | --- |
| `text`            | `unknown`    | Source text to convert into a text search query. |
| `text`            | `Object`     | Source text to convert into a text search query. |
| `text.plain`?     | `boolean`    | -                                                |
| `text.regconfig`? | `SQLWrapper` | [`Regconfig`](src/pg.md#regconfig)               | -   |

#### Returns

`SQL`<`string`>

---

<a id="totsvector" name="totsvector"></a>

### toTsvector()

```ts
toTsvector(text: unknown, text:     Object): SQL<string>
```

#### Parameters

| Parameter         | Type         | Description                                                                                                           |
| :---------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------- | --- |
| `text`            | `unknown`    | Source text to convert into a text search vector.<br /><br /> `sql   to_tsvector();   --or;   plainto_tsvector();   ` |
| `text`            | `Object`     | Source text to convert into a text search vector.<br /><br /> `sql   to_tsvector();   --or;   plainto_tsvector();   ` |
| `text.regconfig`? | `SQLWrapper` | [`Regconfig`](src/pg.md#regconfig)                                                                                    | -   |

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
tsrange<TName, TConfig, TData>(name: TName, config?: TConfig): PgCustomColumnBuilder<Object>
```

Implements Postgres timestamp range.

#### Type parameters

| Type parameter             | Value                                                                                                                                      |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `TName` extends `string`   | -                                                                                                                                          |
| `TConfig` extends `Object` | -                                                                                                                                          |
| `TData`                    | `TConfig`\[`"mode"`] extends `"string"` ? [`RangeValue`](src/pg.md#rangevaluet)<`string`> : [`RangeValue`](src/pg.md#rangevaluet)<`number` | `Date`> |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `TData`            |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `string`           |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |

#### See

- https://www.postgresql.org/docs/current/rangetypes.html
- https://github.com/bendrucker/postgres-date

---

<a id="tsrangeschema" name="tsrangeschema"></a>

### tsrangeSchema()

```ts
tsrangeSchema<TMode, TData>(__namedParameters:     Object): ZodObject<Object, "strip", ZodTypeAny, { [k_1 in "lower" | "upper"]: addQuestionMarks<baseObjectOutputType<Object>, (undefined extends TData ? never : "lower") | (undefined extends TData ? never : "upper")>[k_1] }, Object>
```

Because of typescript's peculiar handling of Inifinity/-Infinity, ranges without limit need to
consider number members that indicate infinite bounds.

#### Type parameters

| Type parameter             | Value                                            |
| :------------------------- | :----------------------------------------------- | ------ |
| `TMode` extends `"string"` | `"date"`                                         | -      |
| `TData`                    | `TMode` extends `"string"` ? `string` : `number` | `Date` |

#### Parameters

| Parameter                         | Type      |
| :-------------------------------- | :-------- |
| `__namedParameters`               | `Object`  |
| `__namedParameters.max`?          | `Date`    |
| `__namedParameters.min`?          | `Date`    |
| `__namedParameters.mode`?         | `TMode`   |
| `__namedParameters.withTimezone`? | `boolean` |

#### Returns

`ZodObject`<`Object`, `"strip"`, `ZodTypeAny`,
`{ [k_1 in "lower" | "upper"]: addQuestionMarks<baseObjectOutputType<Object>, (undefined extends TData ? never : "lower") | (undefined extends TData ? never : "upper")>[k_1] }`,
`Object`>

> | Member  | Type                                                   | Value   |
> | :------ | :----------------------------------------------------- | :------ | ---------------------------------------------------------------------------------- | -------- | ------- | ----------- |
> | `lower` | `ZodEffects`<`ZodNullable`<`ZodDate`>, `TData`, `null` | `Date`> | `ZodEffects`<`ZodNullable`<`ZodUnion`<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` | `number` | `Date`> | lowerSchema |
> | `upper` | `ZodEffects`<`ZodNullable`<`ZodDate`>, `TData`, `null` | `Date`> | `ZodEffects`<`ZodNullable`<`ZodUnion`<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` | `number` | `Date`> | upperSchema |

---

<a id="tsvector" name="tsvector"></a>

### tsvector()

```ts
tsvector<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<Object>
```

Postgres text-search vector.

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

`PgCustomColumnBuilder`<`Object`>

> | Member        | Type               |
> | :------------ | :----------------- |
> | `columnType`  | `"PgCustomColumn"` |
> | `data`        | `string`           |
> | `dataType`    | `"custom"`         |
> | `driverParam` | `unknown`          |
> | `enumValues`  | `undefined`        |
> | `name`        | `TName`            |
