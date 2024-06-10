# src/pg

## Table of Contents

- [Type Aliases](#type-aliases)
  - [IntervalUnit](#intervalunit)
  - [RangeBoundType](#rangeboundtype)
  - [RangeValue\<T>](#rangevaluet)
  - [Regconfig](#regconfig)
  - [RegconfigString](#regconfigstring)
- [Variables](#variables)
  - [$empty](#empty)
  - [$emptyArray](#emptyarray)
  - [$emptyJsonArray](#emptyjsonarray)
  - [$emptyJsonObject](#emptyjsonobject)
  - [$nullArray](#nullarray)
  - [INTERVAL_UNITS](#interval_units)
  - [INTERVAL_UNITS_ARR_ORDERED](#interval_units_arr_ordered)
  - [RANGE_BOUND_TYPES](#range_bound_types)
  - [RANGE_EMPTY](#range_empty)
  - [REGCONFIGS](#regconfigs)
- [Functions](#functions)
  - [age()](#age)
  - [arrayAgg()](#arrayagg)
  - [boolAnd()](#booland)
  - [boolOr()](#boolor)
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
  - [extract()](#extract)
  - [generatedTsvector()](#generatedtsvector)
  - [geography()](#geography)
  - [geometry()](#geometry)
  - [getCurrentTsConfig()](#getcurrenttsconfig)
  - [intrange()](#intrange)
  - [intrangeSchema()](#intrangeschema)
  - [isEmpty()](#isempty)
  - [jsonAgg()](#jsonagg)
  - [jsonAggBuildObject()](#jsonaggbuildobject)
  - [jsonBuildObject()](#jsonbuildobject)
  - [jsonObjectAgg()](#jsonobjectagg)
  - [jsonStripNulls()](#jsonstripnulls)
  - [jsonbBuildObject()](#jsonbbuildobject)
  - [jsonbObjectAgg()](#jsonbobjectagg)
  - [makeCube()](#makecube)
  - [nanoid()](#nanoid)
  - [now()](#now)
  - [numrange()](#numrange)
  - [numrangeSchema()](#numrangeschema)
  - [overlaps()](#overlaps)
  - [random()](#random)
  - [regconfig()](#regconfig-1)
  - [rowToJson()](#rowtojson)
  - [setweight()](#setweight)
  - [similar()](#similar)
  - [soundex()](#soundex)
  - [textenum()](#textenum)
  - [toExcluded()](#toexcluded)
  - [toInterval()](#tointerval)
  - [toJson()](#tojson)
  - [toJsonb()](#tojsonb)
  - [toRange()](#torange)
  - [toTsquery()](#totsquery)
  - [toTsvector()](#totsvector)
  - [ts()](#ts)
  - [tsrange()](#tsrange)
  - [tsrangeSchema()](#tsrangeschema)
  - [tsvector()](#tsvector)

## Type Aliases

<a id="intervalunit" name="intervalunit" />

### IntervalUnit

```ts
type IntervalUnit: ValueOf<typeof INTERVAL_UNITS>;
```

---

<a id="rangeboundtype" name="rangeboundtype" />

### RangeBoundType

```ts
type RangeBoundType: ValueOf<typeof RANGE_BOUND_TYPES>;
```

---

<a id="rangevaluet" name="rangevaluet" />

### RangeValue\<T>

```ts
type RangeValue<T>: object;
```

#### Type parameters

| Type parameter | Value  |
| :------------- | :----- |
| `T`            | `void` |

#### Type declaration

| Member  | Type          |
| :------ | :------------ |
| `lower` | `T` \| `null` |
| `upper` | `T` \| `null` |

---

<a id="regconfig" name="regconfig" />

### Regconfig

```ts
type Regconfig: ValueOf<typeof REGCONFIGS>;
```

---

<a id="regconfigstring" name="regconfigstring" />

### RegconfigString

```ts
type RegconfigString: Regconfig | string & NonNullable<unknown>;
```

## Variables

<a id="$empty" name="$empty" />

### $empty

```ts
const $empty: SQL<[] | "'empty'">;
```

Postgres value returned for empty ranges.

---

<a id="$emptyarray" name="$emptyarray" />

### $emptyArray

```ts
const $emptyArray: SQL<[]>;
```

Empty SQL array (not json typed)

---

<a id="$emptyjsonarray" name="$emptyjsonarray" />

### $emptyJsonArray

```ts
const $emptyJsonArray: SQL<[never]>;
```

Empty array as SQL json.

---

<a id="$emptyjsonobject" name="$emptyjsonobject" />

### $emptyJsonObject

```ts
const $emptyJsonObject: SQL<object>;
```

Empty record as SQL json.

---

<a id="$nullarray" name="$nullarray" />

### $nullArray

```ts
const $nullArray: SQL<[null]>;
```

An array with a single null member. Typically returned when aggregation result is empty.

---

<a id="interval_units" name="interval_units" />

### INTERVAL_UNITS

```ts
const INTERVAL_UNITS: object;
```

#### Type declaration

| Member    | Type        | Value     |
| :-------- | :---------- | :-------- |
| `DAYS`    | `"days"`    | 'days'    |
| `HOURS`   | `"hours"`   | 'hours'   |
| `MINUTES` | `"minutes"` | 'minutes' |
| `MONTHS`  | `"months"`  | 'months'  |
| `SECONDS` | `"seconds"` | 'seconds' |
| `WEEKS`   | `"weeks"`   | 'weeks'   |
| `YEARS`   | `"years"`   | 'years'   |

---

<a id="interval_units_arr_ordered" name="interval_units_arr_ordered" />

### INTERVAL_UNITS_ARR_ORDERED

```ts
const INTERVAL_UNITS_ARR_ORDERED: readonly [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
];
```

---

<a id="range_bound_types" name="range_bound_types" />

### RANGE_BOUND_TYPES

```ts
const RANGE_BOUND_TYPES: object;
```

#### Type declaration

| Member      | Type          | Value       |
| :---------- | :------------ | :---------- |
| `EXCLUSIVE` | `"exclusive"` | 'exclusive' |
| `INCLUSIVE` | `"inclusive"` | 'inclusive' |

---

<a id="range_empty" name="range_empty" />

### RANGE_EMPTY

```ts
const RANGE_EMPTY: object;
```

Value for app-side representation of empty postgres ranges.

#### Type declaration

| Member  | Type   | Value |
| :------ | :----- | :---- |
| `lower` | `null` | null  |
| `upper` | `null` | null  |

---

<a id="regconfigs" name="regconfigs" />

### REGCONFIGS

```ts
const REGCONFIGS: object;
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

## Functions

<a id="age" name="age" />

### age()

```ts
function age<TOrigin, TTarget>(origin: TOrigin, target: TTarget): SQL<string>;
```

Subtract arguments, producing a “symbolic” result that uses years and months, rather than just days.

#### Type parameters

| Type parameter                             |
| :----------------------------------------- |
| `TOrigin` _extends_ `SQLWrapper` \| `Date` |
| `TTarget` _extends_ `SQLWrapper` \| `Date` |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `origin`  | `TOrigin` |
| `target`  | `TTarget` |

#### Returns

`SQL`\<`string`>

#### Example

```sql
-- age ( timestamp, timestamp ) → interval
age(timestamp '2001-04-10', timestamp '1957-06-13') → 43 years 9 mons 27 days
```

---

<a id="arrayagg" name="arrayagg" />

### arrayAgg()

```ts
function arrayAgg<T>(expression: T): SQL<null | InferData<T>>;
```

Aggregate sql values into an sql array.

Input values, including nulls, concatenated into an array.

Input arrays concatenated into array of one higher dimension (inputs must all have same
dimensionality, and cannot be empty or null)

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `expression` | `T`  |

#### Returns

`SQL`\<`null` | [`InferData`](README.md#inferdatat)\<`T`>>

#### See

[https://www.postgresql.org/docs/9.5/functions-aggregate.html](https://www.postgresql.org/docs/9.5/functions-aggregate.html)

#### Todo

Implement collapsing for null array with notNull option.

---

<a id="booland" name="booland" />

### boolAnd()

```ts
function boolAnd(...expression: SQLWrapper[]): SQL<boolean>;
```

True if all input values are true, otherwise false.

#### Parameters

| Parameter       | Type            |
| :-------------- | :-------------- |
| ...`expression` | `SQLWrapper`\[] |

#### Returns

`SQL`\<`boolean`>

---

<a id="boolor" name="boolor" />

### boolOr()

```ts
function boolOr(...expression: SQLWrapper[]): SQL<boolean>;
```

True if at least one input value is true, otherwise false.

#### Parameters

| Parameter       | Type            |
| :-------------- | :-------------- |
| ...`expression` | `SQLWrapper`\[] |

#### Returns

`SQL`\<`boolean`>

---

<a id="citext" name="citext" />

### citext()

```ts
function citext<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<object>;
```

Ci-text postgres column type.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type               |
| :------------ | :----------------- |
| `columnType`  | `"PgCustomColumn"` |
| `data`        | `string`           |
| `dataType`    | `"custom"`         |
| `driverParam` | `unknown`          |
| `enumValues`  | `undefined`        |
| `name`        | `TName`            |

#### See

[https://www.postgresql.org/docs/current/citext.html](https://www.postgresql.org/docs/current/citext.html)

---

<a id="contained" name="contained" />

### contained()

```ts
function contained(left: SQLWrapper, right: unknown): SQL<unknown>;
```

Is the first cube contained in the second?

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`\<`unknown`>

#### Example

```sql
cube <@ cube → boolean
```

---

<a id="contains" name="contains" />

### contains()

```ts
function contains(left: SQLWrapper, right: unknown): SQL<unknown>;
```

Does the first cube contain the second?

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`\<`unknown`>

#### Example

```sql
cube @> cube → boolean
```

---

<a id="cube" name="cube" />

### cube()

```ts
function cube<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<object>;
```

Postgres cube column type with customizable amount of dimensions.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type                                       |
| :------------ | :----------------------------------------- |
| `columnType`  | `"PgCustomColumn"`                         |
| `data`        | `number`\[] \| \[`number`\[], `number`\[]] |
| `dataType`    | `"custom"`                                 |
| `driverParam` | `number`\[] \| \[`number`\[], `number`\[]] |
| `enumValues`  | `undefined`                                |
| `name`        | `TName`                                    |

#### See

[https://www.postgresql.org/docs/current/cube.html](https://www.postgresql.org/docs/current/cube.html)

---

<a id="cubedim" name="cubedim" />

### cubeDim()

```ts
function cubeDim(cube: SQLWrapper): SQL<number>;
```

Returns the number of dimensions of the cube.

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `cube`    | `SQLWrapper` |

#### Returns

`SQL`\<`number`>

#### Example

```sql
--cube_dim ( cube ) → integer
cube_dim('(1,2),(3,4)') → 2
```

---

<a id="cubedistance" name="cubedistance" />

### cubeDistance()

```ts
function cubeDistance(...cubes: [SQLWrapper, SQLWrapper]): SQL<number>;
```

Returns the distance between two cubes. If both cubes are points, this is the normal distance
function.

#### Parameters

| Parameter  | Type                          |
| :--------- | :---------------------------- |
| ...`cubes` | \[`SQLWrapper`, `SQLWrapper`] |

#### Returns

`SQL`\<`number`>

#### Example

```sql
-- cube_distance ( cube, cube ) → float8
cube_distance('(1,2)', '(3,4)') → 2.8284271247461903
```

---

<a id="cubeenlarge" name="cubeenlarge" />

### cubeEnlarge()

```ts
function cubeEnlarge(): void;
```

Increases the size of the cube by the specified radius r in at least n dimensions. If the radius is
negative the cube is shrunk instead. All defined dimensions are changed by the radius r. Lower-left
coordinates are decreased by r and upper-right coordinates are increased by r. If a lower-left
coordinate is increased to more than the corresponding upper-right coordinate (this can only happen
when r \< 0) than both coordinates are set to their average. If n is greater than the number of
defined dimensions and the cube is being enlarged (r > 0), then extra dimensions are added to make n
altogether; 0 is used as the initial value for the extra coordinates. This function is useful for
creating bounding boxes around a point for searching for nearby points.

#### Returns

`void`

#### Example

```sql
-- cube_enlarge ( c cube, r double, n integer ) → cube
cube_enlarge('(1,2),(3,4)', 0.5, 3) → (0.5, 1.5, -0.5),(3.5, 4.5, 0.5)
```

---

<a id="cubeinter" name="cubeinter" />

### cubeInter()

```ts
function cubeInter(): void;
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

<a id="cubeispoint" name="cubeispoint" />

### cubeIsPoint()

```ts
function cubeIsPoint(cube: SQLWrapper): SQL<boolean>;
```

Returns true if the cube is a point, that is, the two defining corners are the same.

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `cube`    | `SQLWrapper` |

#### Returns

`SQL`\<`boolean`>

#### Example

```sql
-- cube_is_point ( cube ) → boolean
cube_is_point(cube(1,1)) → t
```

---

<a id="cubelowerleftcoord" name="cubelowerleftcoord" />

### cubeLowerLeftCoord()

```ts
function cubeLowerLeftCoord(): void;
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

<a id="cubesubset" name="cubesubset" />

### cubeSubset()

```ts
function cubeSubset(): void;
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

<a id="cubeunion" name="cubeunion" />

### cubeUnion()

```ts
function cubeUnion(): void;
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

<a id="cubeupperrightcoord" name="cubeupperrightcoord" />

### cubeUpperRightCoord()

```ts
function cubeUpperRightCoord(): void;
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

<a id="daitch_mokotoff" name="daitch_mokotoff" />

### daitch_mokotoff()

```ts
function daitch_mokotoff(source: string | SQLWrapper): SQL<string[]>;
```

#### Parameters

| Parameter | Type                     |
| :-------- | :----------------------- |
| `source`  | `string` \| `SQLWrapper` |

#### Returns

`SQL`\<`string`\[]>

#### See

[https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF](https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF)

---

<a id="daterange" name="daterange" />

### daterange()

```ts
function daterange<TName, TConfig, TData>(
  name: TName,
  config?: TConfig
): PgCustomColumnBuilder<object>;
```

Implements postgres date range.

#### Type parameters

| Type parameter               | Value                                                                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TName` _extends_ `string`   | -                                                                                                                                                         |
| `TConfig` _extends_ `object` | -                                                                                                                                                         |
| `TData`                      | `TConfig`\[`"mode"`] _extends_ `"string"` ? [`RangeValue`](src/pg.md#rangevaluet)\<`string`> : [`RangeValue`](src/pg.md#rangevaluet)\<`number` \| `Date`> |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type               |
| :------------ | :----------------- |
| `columnType`  | `"PgCustomColumn"` |
| `data`        | `TData`            |
| `dataType`    | `"custom"`         |
| `driverParam` | `string`           |
| `enumValues`  | `undefined`        |
| `name`        | `TName`            |

#### See

- [https://orm.drizzle.team/docs/custom-types](https://orm.drizzle.team/docs/custom-types) Timestamp
  for reference.
- [https://www.postgresql.org/docs/current/rangetypes.html](https://www.postgresql.org/docs/current/rangetypes.html)

---

<a id="daterangeschema" name="daterangeschema" />

### daterangeSchema()

```ts
function daterangeSchema<TMode, TData>(
  __namedParameters: object
): ZodObject<
  object,
  'strip',
  ZodTypeAny,
  { [k in 'lower' | 'upper']: addQuestionMarks<baseObjectOutputType<Object>, any>[k] },
  object
>;
```

#### Type parameters

| Type parameter                           | Value                                                        |
| :--------------------------------------- | :----------------------------------------------------------- |
| `TMode` _extends_ `"string"` \| `"date"` | -                                                            |
| `TData`                                  | `TMode` _extends_ `"string"` ? `string` : `number` \| `Date` |

#### Parameters

| Parameter                 | Type     |
| :------------------------ | :------- |
| `__namedParameters`       | `object` |
| `__namedParameters.max`?  | `Date`   |
| `__namedParameters.min`?  | `Date`   |
| `__namedParameters.mode`? | `TMode`  |

#### Returns

`ZodObject`\<`object`, `"strip"`, `ZodTypeAny`, \{ \[k in "lower" | "upper"]:
addQuestionMarks\<baseObjectOutputType\<Object>, any>\[k] }, `object`>

| Member  | Type                                                                                                                                                                                | Value       |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `lower` | `ZodEffects`\<`ZodNullable`\<`ZodDate`>, `TData`, `null` \| `Date`> \| `ZodEffects`\<`ZodNullable`\<`ZodUnion`\<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` \| `number` \| `Date`> | lowerSchema |
| `upper` | `ZodEffects`\<`ZodNullable`\<`ZodDate`>, `TData`, `null` \| `Date`> \| `ZodEffects`\<`ZodNullable`\<`ZodUnion`\<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` \| `number` \| `Date`> | upperSchema |

---

<a id="difference" name="difference" />

### difference()

```ts
function difference(...texts: [string | SQLWrapper, string | SQLWrapper]): SQL<number>;
```

#### Parameters

| Parameter  | Type                                                  |
| :--------- | :---------------------------------------------------- |
| ...`texts` | \[`string` \| `SQLWrapper`, `string` \| `SQLWrapper`] |

#### Returns

`SQL`\<`number`>

#### See

[https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF](https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF)

---

<a id="distance" name="distance" />

### distance()

```ts
function distance(left: SQLWrapper, right: unknown, __namedParameters: object): SQL<unknown>;
```

Computes the distance between two cubes.

#### Parameters

| Parameter                 | Type           |
| :------------------------ | :------------- |
| `left`                    | `SQLWrapper`   |
| `right`                   | `unknown`      |
| `__namedParameters`       | `object`       |
| `__namedParameters.type`? | `DistanceType` |

#### Returns

`SQL`\<`unknown`>

#### Examples

```sql
-- Computes the Euclidean distance between the two cubes.
cube <-> cube → float8
```

```sql
-- Computes the taxicab (L-1 metric) distance between the two cubes.
cube <#> cube → float8
```

```sql
-- Computes the Chebyshev (L-inf metric) distance between the two cubes.
cube <=> cube → float8
```

---

<a id="extract" name="extract" />

### extract()

```ts
function extract(left: SQLWrapper, right: unknown): SQL<unknown>;
```

Extracts the n-th coordinate of the cube (counting from 1).

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`\<`unknown`>

#### Examples

```sql
cube -> integer → float8
```

Extracts the n-th coordinate of the cube, counting in the following way: n = 2 \* k - 1 means lower
bound of k-th dimension, n = 2 \* k means upper bound of k-th dimension. Negative n denotes the
inverse value of the corresponding positive coordinate. This operator is designed for KNN-GiST
support.

```sql
cube ~> integer → float8
```

---

<a id="generatedtsvector" name="generatedtsvector" />

### generatedTsvector()

```ts
function generatedTsvector<TName>(
  dbName: TName,
  fieldConfig: object
): PgCustomColumnBuilder<object>;
```

Tsvector type for generated columns used notably for fuzzy string search.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |

#### Parameters

| Parameter               | Type                     |
| :---------------------- | :----------------------- |
| `dbName`                | `TName`                  |
| `fieldConfig`           | `object`                 |
| `fieldConfig.language`  | `string` \| `SQLWrapper` |
| `fieldConfig.sources`   | `string`\[]              |
| `fieldConfig.weighted`? | `boolean`                |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type               |
| :------------ | :----------------- |
| `columnType`  | `"PgCustomColumn"` |
| `data`        | `string`           |
| `dataType`    | `"custom"`         |
| `driverParam` | `unknown`          |
| `enumValues`  | `undefined`        |
| `name`        | `TName`            |

#### See

[drizzle-team/drizzle-orm#247](https://github.com/drizzle-team/drizzle-orm/issues/247)

#### Todo

Implementation isn't clean. Figure out a better way to map the language name and column references,
or stay up to date on support for `generatedAs()`.

---

<a id="geography" name="geography" />

### geography()

```ts
function geography<TName, TGeography, TZ, TM, TSrid>(
  name: TName,
  config?: object
): PgCustomColumnBuilder<object>;
```

PostGIS column type for generic or specific geographies.

**⚠️ Warning ⚠️**

Uses a nasty trick to get the data back as properly formatted GeoJSON rather than WKT. Expect things
to break.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |
| `TGeography` _extends_     |
| \| `"Point"`               |
| \| `"MultiPoint"`          |
| \| `"LineString"`          |
| \| `"MultiLineString"`     |
| \| `"Polygon"`             |
| \| `"MultiPolygon"`        |
| \| `"GeometryCollection"`  |
| `TZ` _extends_ `boolean`   |
| `TM` _extends_ `boolean`   |
| `TSrid` _extends_ `Srid`   |

#### Parameters

| Parameter      | Type         |
| :------------- | :----------- |
| `name`         | `TName`      |
| `config`?      | `object`     |
| `config.m`?    | `TM`         |
| `config.srid`? | `TSrid`      |
| `config.type`? | `TGeography` |
| `config.z`?    | `TZ`         |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member                                                     | Type                                         |
| :--------------------------------------------------------- | :------------------------------------------- |
| `columnType`                                               | `"PgCustomColumn"`                           |
| `data`                                                     |                                              |
| \| `Extract`\<`Point`, `object`>                           |                                              |
| \| `Extract`\<`MultiPoint`, `object`>                      |                                              |
| \| `Extract`\<`LineString`, `object`>                      |                                              |
| \| `Extract`\<`MultiLineString`, `object`>                 |                                              |
| \| `Extract`\<`Polygon`, `object`>                         |                                              |
| \| `Extract`\<`MultiPolygon`, `object`>                    |                                              |
| \| `Extract`\<`GeometryCollection`\<`Geometry`>, `object`> |                                              |
| `dataType`                                                 | `"custom"`                                   |
| `driverParam`                                              | `string`                                     |
| `enumValues`                                               | `undefined`                                  |
| `name`                                                     | \`st_asgeojson"("$\{TName}") as "$\{TName}\` |

#### See

Unstable until better support for custom type custom select is available (e.g.
[drizzle-team/drizzle-orm#1423](https://github.com/drizzle-team/drizzle-orm/pull/1423))

---

<a id="geometry" name="geometry" />

### geometry()

```ts
function geometry<TName, TGeometry, TZ, TM, TSrid>(
  name: TName,
  config?: object
): PgCustomColumnBuilder<object>;
```

- PostGIS column type for generic or specific geometries.

**⚠️ Warning ⚠️**

Uses a nasty trick to get the data back as properly formatted GeoJSON rather than WKT. Expect things
to break.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |
| `TGeometry` _extends_      |
| \| `"Point"`               |
| \| `"MultiPoint"`          |
| \| `"LineString"`          |
| \| `"MultiLineString"`     |
| \| `"Polygon"`             |
| \| `"MultiPolygon"`        |
| \| `"GeometryCollection"`  |
| `TZ` _extends_ `boolean`   |
| `TM` _extends_ `boolean`   |
| `TSrid` _extends_ `Srid`   |

#### Parameters

| Parameter      | Type        |
| :------------- | :---------- |
| `name`         | `TName`     |
| `config`?      | `object`    |
| `config.m`?    | `TM`        |
| `config.srid`? | `TSrid`     |
| `config.type`? | `TGeometry` |
| `config.z`?    | `TZ`        |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member                                                     | Type                                         |
| :--------------------------------------------------------- | :------------------------------------------- |
| `columnType`                                               | `"PgCustomColumn"`                           |
| `data`                                                     |                                              |
| \| `Extract`\<`Point`, `object`>                           |                                              |
| \| `Extract`\<`MultiPoint`, `object`>                      |                                              |
| \| `Extract`\<`LineString`, `object`>                      |                                              |
| \| `Extract`\<`MultiLineString`, `object`>                 |                                              |
| \| `Extract`\<`Polygon`, `object`>                         |                                              |
| \| `Extract`\<`MultiPolygon`, `object`>                    |                                              |
| \| `Extract`\<`GeometryCollection`\<`Geometry`>, `object`> |                                              |
| `dataType`                                                 | `"custom"`                                   |
| `driverParam`                                              | `string`                                     |
| `enumValues`                                               | `undefined`                                  |
| `name`                                                     | \`st_asgeojson"("$\{TName}") as "$\{TName}\` |

#### See

Unstable until better support for custom type custom select is available (e.g.
[drizzle-team/drizzle-orm#1423](https://github.com/drizzle-team/drizzle-orm/pull/1423))

---

<a id="getcurrenttsconfig" name="getcurrenttsconfig" />

### getCurrentTsConfig()

```ts
function getCurrentTsConfig(): SQL<RegconfigString>;
```

Get the database's currently set regconfig for text-search functionalities.

```sql
get_current_ts_config();
```

#### Returns

`SQL`\<[`RegconfigString`](src/pg.md#regconfigstring)>

---

<a id="intrange" name="intrange" />

### intrange()

```ts
function intrange<TName, TConfig>(name: TName, config?: TConfig): PgCustomColumnBuilder<object>;
```

Implements postgres int4range and int8range types.

#### Type parameters

| Type parameter               |
| :--------------------------- |
| `TName` _extends_ `string`   |
| `TConfig` _extends_ `object` |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type                                             |
| :------------ | :----------------------------------------------- |
| `columnType`  | `"PgCustomColumn"`                               |
| `data`        | [`RangeValue`](src/pg.md#rangevaluet)\<`number`> |
| `dataType`    | `"custom"`                                       |
| `driverParam` | `string`                                         |
| `enumValues`  | `undefined`                                      |
| `name`        | `TName`                                          |

#### See

[https://www.postgresql.org/docs/current/rangetypes.html](https://www.postgresql.org/docs/current/rangetypes.html)

---

<a id="intrangeschema" name="intrangeschema" />

### intrangeSchema()

```ts
function intrangeSchema(
  __namedParameters: object
): ZodObject<object, 'strip', ZodTypeAny, object, object>;
```

#### Parameters

| Parameter                | Type     |
| :----------------------- | :------- |
| `__namedParameters`      | `object` |
| `__namedParameters.max`? | `number` |
| `__namedParameters.min`? | `number` |

#### Returns

`ZodObject`\<`object`, `"strip"`, `ZodTypeAny`, `object`, `object`>

| Member  | Type                        | Value       |
| :------ | :-------------------------- | :---------- |
| `lower` | `ZodNullable`\<`ZodNumber`> | lowerSchema |
| `upper` | `ZodNullable`\<`ZodNumber`> | upperSchema |

---

<a id="isempty" name="isempty" />

### isEmpty()

```ts
function isEmpty<T>(range: T): SQL<boolean>;
```

#### Type parameters

| Type parameter          |
| :---------------------- |
| `T` _extends_ `unknown` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `range`   | `T`  |

#### Returns

`SQL`\<`boolean`>

---

<a id="jsonagg" name="jsonagg" />

### jsonAgg()

```ts
function jsonAgg<T, N>(
  selection: T,
  __namedParameters: object
): SQL<N extends true ? NonNullable<InferData<T>>[] : InferData<T>[] | [null]>;
```

Aggregates values, including nulls, as a JSON array.

#### Type parameters

| Type parameter             | Value  |
| :------------------------- | :----- |
| `T` _extends_ `SQLWrapper` | -      |
| `N` _extends_ `boolean`    | `true` |

#### Parameters

| Parameter                    | Type     |
| :--------------------------- | :------- |
| `selection`                  | `T`      |
| `__namedParameters`          | `object` |
| `__namedParameters.notNull`? | `N`      |

#### Returns

`SQL`\<`N` _extends_ `true` ? `NonNullable`\<[`InferData`](README.md#inferdatat)\<`T`>>\[] :
[`InferData`](README.md#inferdatat)\<`T`>\[] | \[`null`]>

#### See

[https://www.postgresql.org/docs/9.5/functions-aggregate.html](https://www.postgresql.org/docs/9.5/functions-aggregate.html)

---

<a id="jsonaggbuildobject" name="jsonaggbuildobject" />

### jsonAggBuildObject()

```ts
function jsonAggBuildObject<T>(
  shape: T,
  __namedParameters: object
): SQL<{ [K in string | number | symbol]: T[K] extends SQLWrapper ? InferData<any[any]> : T[K] }[]>;
```

Aggregate sql values into an array of json objects using a combination of `json_agg` and
`jsonb_build_object`. Jsonb object building is used in lieu of json to allow use of distinct.

#### Type parameters

| Type parameter                   |
| :------------------------------- |
| `T` _extends_ `ColumnsSelection` |

#### Parameters

| Parameter                     | Type      |
| :---------------------------- | :-------- |
| `shape`                       | `T`       |
| `__namedParameters`           | `object`  |
| `__namedParameters.distinct`? | `boolean` |

#### Returns

`SQL`\<\{ \[K in string | number | symbol]: T\[K] extends SQLWrapper ? InferData\<any\[any]> : T\[K]
}\[]>

---

<a id="jsonbuildobject" name="jsonbuildobject" />

### jsonBuildObject()

```ts
function jsonBuildObject<T>(
  shape: T
): SQL<{ [K in string | number | symbol]: T[K] extends SQLWrapper ? InferData<any[any]> : T[K] }>;
```

Build objects using \`json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
return an object with unwrapped value types instead of SQL wrapped types.

#### Type parameters

| Type parameter                   |
| :------------------------------- |
| `T` _extends_ `ColumnsSelection` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `shape`   | `T`  |

#### Returns

`SQL`\<\{ \[K in string | number | symbol]: T\[K] extends SQLWrapper ? InferData\<any\[any]> : T\[K]
}>

---

<a id="jsonobjectagg" name="jsonobjectagg" />

### jsonObjectAgg()

```ts
function jsonObjectAgg<K, V, TK, TV>(name: K, value: V): SQL<Record<TK, TV>>;
```

Aggregates name/value pairs as a JSON object; values can be null, but not names.

Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped type
instead of an SQL wrapped type.

#### Type parameters

| Type parameter                                                                                                                | Value                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K` _extends_ `AnyColumn`                                                                                                     | -                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `V` _extends_ `SQL`\<`unknown`> \| `Aliased`\<`unknown`> \| `AnyTable`\<`TableConfig`\<`Column`\<`any`, `object`, `object`>>> | -                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `TK` _extends_ `string` \| `number`                                                                                           | `null` _extends_ [`InferData`](README.md#inferdatat)\<`K`> ? `never` : [`InferData`](README.md#inferdatat)\<`K`> _extends_ `string` \| `number` ? [`InferData`](README.md#inferdatat)\<[`InferData`](README.md#inferdatat)\<`K`>> : `never`                                                                                                                                                                              |
| `TV`                                                                                                                          | `V` _extends_ `AnyTable`\<`TableConfig`\<`Column`\<`any`, `object`, `object`>>> ? \{ \[K in string]: \{ \[Key in string as Key]: V\<(...)>\["\_"]\["columns"]\[Key]\["\_"]\["notNull"] extends true ? V\<(...)>\["\_"]\["columns"]\[Key]\["\_"]\["data"] : null \| (...)\[(...)]\["columns"]\[Key]\["\_"]\["data"] }\[K] } : `V` _extends_ `SQL`\<`unknown`> ? [`InferData`](README.md#inferdatat)\<`V`\<`V`>> : `never` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `name`    | `K`  |
| `value`   | `V`  |

#### Returns

`SQL`\<`Record`\<`TK`, `TV`>>

#### Example

```sql
json_object_agg(...)
```

#### See

[https://www.postgresql.org/docs/9.5/functions-aggregate.html](https://www.postgresql.org/docs/9.5/functions-aggregate.html)

---

<a id="jsonstripnulls" name="jsonstripnulls" />

### jsonStripNulls()

```ts
function jsonStripNulls<T>(
  json: T
): SQL<
  SetNonNullable<
    T extends SQLWrapper ? InferData<T<T>> : T,
    keyof T extends SQLWrapper ? InferData<T<T>> : T
  >
>;
```

SQL json_strip_nulls.

#### Type parameters

| Type parameter |
| :------------- |
| `T`            |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `json`    | `T`  |

#### Returns

`SQL`\<`SetNonNullable`\<`T` _extends_ `SQLWrapper` ?
[`InferData`](README.md#inferdatat)\<`T`\<`T`>> : `T`, keyof `T` _extends_ `SQLWrapper` ?
[`InferData`](README.md#inferdatat)\<`T`\<`T`>> : `T`>>

---

<a id="jsonbbuildobject" name="jsonbbuildobject" />

### jsonbBuildObject()

```ts
function jsonbBuildObject<T>(
  shape: T
): SQL<{ [K in string | number | symbol]: T[K] extends SQLWrapper ? InferData<any[any]> : T[K] }>;
```

Build objects using \`jsonb_build_object(k1, v1, ...kn, vn). Since it is a jsonb method, it should
return an object with unwrapped value types instead of SQL wrapped types.

#### Type parameters

| Type parameter                   |
| :------------------------------- |
| `T` _extends_ `ColumnsSelection` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `shape`   | `T`  |

#### Returns

`SQL`\<\{ \[K in string | number | symbol]: T\[K] extends SQLWrapper ? InferData\<any\[any]> : T\[K]
}>

---

<a id="jsonbobjectagg" name="jsonbobjectagg" />

### jsonbObjectAgg()

```ts
function jsonbObjectAgg<K, V, TK, TV>(name: K, value: V): SQL<Record<TK, TV>>;
```

Aggregates name/value pairs as a JSON object; values can be null, but not names.

#### Type parameters

| Type parameter                                                                                                                | Value                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K` _extends_ `AnyColumn`                                                                                                     | -                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `V` _extends_ `SQL`\<`unknown`> \| `Aliased`\<`unknown`> \| `AnyTable`\<`TableConfig`\<`Column`\<`any`, `object`, `object`>>> | -                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `TK` _extends_ `string` \| `number`                                                                                           | `null` _extends_ [`InferData`](README.md#inferdatat)\<`K`> ? `never` : [`InferData`](README.md#inferdatat)\<`K`> _extends_ `string` \| `number` ? [`InferData`](README.md#inferdatat)\<[`InferData`](README.md#inferdatat)\<`K`>> : `never`                                                                                                                                                                              |
| `TV`                                                                                                                          | `V` _extends_ `AnyTable`\<`TableConfig`\<`Column`\<`any`, `object`, `object`>>> ? \{ \[K in string]: \{ \[Key in string as Key]: V\<(...)>\["\_"]\["columns"]\[Key]\["\_"]\["notNull"] extends true ? V\<(...)>\["\_"]\["columns"]\[Key]\["\_"]\["data"] : null \| (...)\[(...)]\["columns"]\[Key]\["\_"]\["data"] }\[K] } : `V` _extends_ `SQL`\<`unknown`> ? [`InferData`](README.md#inferdatat)\<`V`\<`V`>> : `never` |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `name`    | `K`  |
| `value`   | `V`  |

#### Returns

`SQL`\<`Record`\<`TK`, `TV`>>

#### Example

```sql
jsonb_object_agg(...)
```

#### See

[https://www.postgresql.org/docs/9.5/functions-aggregate.html](https://www.postgresql.org/docs/9.5/functions-aggregate.html)

---

<a id="makecube" name="makecube" />

### makeCube()

```ts
function makeCube<T>(...args: T): SQL<number[]>;
```

Makes a one dimensional cube with both coordinates the same.

#### Type parameters

| Type parameter                         |
| :------------------------------------- |
| `T` _extends_                          |
| \| `number`\[]                         |
| \| \[`number`\[], `number`\[]]         |
| \| \[`number`]                         |
| \| \[`number`, `number`]               |
| \| \[`SQLWrapper`, `number`]           |
| \| \[`SQLWrapper`, `number`, `number`] |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| ...`args` | `T`  |

#### Returns

`SQL`\<`number`\[]>

#### Examples

```sql
-- cube ( float8 ) → cube
cube(1) → (1)
```

Makes a one dimensional cube.

```sql
-- cube ( float8, float8 ) → cube
cube(1, 2) → (1),(2)
```

Makes a zero-volume cube using the coordinates defined by the array.

```sql
-- cube ( float8[] ) → cube
cube(ARRAY[1,2,3]) → (1, 2, 3)
```

Makes a cube with upper right and lower left coordinates as defined by the two arrays, which must be
of the same length.

```sql
-- cube ( float8[], float8[] ) → cube
cube(ARRAY[1,2], ARRAY[3,4]) → (1, 2),(3, 4)
```

Makes a new cube by adding a dimension on to an existing cube, with the same values for both
endpoints of the new coordinate. This is useful for building cubes piece by piece from calculated
values.

```sql
-- cube ( cube, float8 ) → cube
cube('(1,2),(3,4)'::cube, 5) → (1, 2, 5),(3, 4, 5)
```

Makes a new cube by adding a dimension on to an existing cube. This is useful for building cubes
piece by piece from calculated values.

```sql
--cube ( cube, float8, float8 ) → cube
cube('(1,2),(3,4)'::cube, 5, 6) → (1, 2, 5),(3, 4, 6)
```

---

<a id="nanoid" name="nanoid" />

### nanoid()

```ts
function nanoid(__namedParameters: (object & object) | object): SQL<string>;
```

Generate a nanoid using a postgres implementation of the nanoid function.

#### Parameters

| Parameter           | Type                            |
| :------------------ | :------------------------------ |
| `__namedParameters` | `object` & `object` \| `object` |

#### Returns

`SQL`\<`string`>

#### See

- [Postgres implementation of the nanoid generator](https://github.com/iolyd/drizzle-orm-helpers/blob/main/sql/nanoid.sql)
- [https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571](https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571)

#### Todo

Stay up to date when default values will accept 'sql' without having to pass param to sql.raw()

---

<a id="now" name="now" />

### now()

```ts
function now(): SQL<Date>;
```

Get the current time (dynamically).

#### Returns

`SQL`\<`Date`>

#### Example

```sql
now();
```

---

<a id="numrange" name="numrange" />

### numrange()

```ts
function numrange<TName, TConfig>(name: TName, config?: TConfig): PgCustomColumnBuilder<object>;
```

Implements postgres numrange type.

#### Type parameters

| Type parameter               |
| :--------------------------- |
| `TName` _extends_ `string`   |
| `TConfig` _extends_ `object` |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type                                             |
| :------------ | :----------------------------------------------- |
| `columnType`  | `"PgCustomColumn"`                               |
| `data`        | [`RangeValue`](src/pg.md#rangevaluet)\<`number`> |
| `dataType`    | `"custom"`                                       |
| `driverParam` | `string`                                         |
| `enumValues`  | `undefined`                                      |
| `name`        | `TName`                                          |

#### See

[https://www.postgresql.org/docs/current/rangetypes.html](https://www.postgresql.org/docs/current/rangetypes.html)

---

<a id="numrangeschema" name="numrangeschema" />

### numrangeSchema()

```ts
function numrangeSchema(
  __namedParameters: object
): ZodObject<object, 'strip', ZodTypeAny, object, object>;
```

#### Parameters

| Parameter                | Type     |
| :----------------------- | :------- |
| `__namedParameters`      | `object` |
| `__namedParameters.max`? | `number` |
| `__namedParameters.min`? | `number` |

#### Returns

`ZodObject`\<`object`, `"strip"`, `ZodTypeAny`, `object`, `object`>

| Member  | Type                        | Value       |
| :------ | :-------------------------- | :---------- |
| `lower` | `ZodNullable`\<`ZodNumber`> | lowerSchema |
| `upper` | `ZodNullable`\<`ZodNumber`> | upperSchema |

---

<a id="overlaps" name="overlaps" />

### overlaps()

```ts
function overlaps(left: SQLWrapper, right: unknown): SQL<unknown>;
```

Do the cubes overlap?

#### Parameters

| Parameter | Type         |
| :-------- | :----------- |
| `left`    | `SQLWrapper` |
| `right`   | `unknown`    |

#### Returns

`SQL`\<`unknown`>

#### Example

```sql
cube && cube → boolean
```

---

<a id="random" name="random" />

### random()

```ts
function random(): SQL<number>;
```

Postgres random function.

#### Returns

`SQL`\<`number`>

Random number between 0 and 1.

#### Example

```sql
random();
```

---

<a id="regconfig-1" name="regconfig-1" />

### regconfig()

```ts
function regconfig<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<object>;
```

Implements Postgres regconfig. Useful for text search language config storage.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type                               |
| :------------ | :--------------------------------- |
| `columnType`  | `"PgCustomColumn"`                 |
| `data`        | [`Regconfig`](src/pg.md#regconfig) |
| `dataType`    | `"custom"`                         |
| `driverParam` | `unknown`                          |
| `enumValues`  | `undefined`                        |
| `name`        | `TName`                            |

#### See

[https://www.postgresql.org/docs/current/textsearch-controls.html](https://www.postgresql.org/docs/current/textsearch-controls.html)

---

<a id="rowtojson" name="rowtojson" />

### rowToJson()

```ts
function rowToJson<T>(row: T): SQL<InferData<T>>;
```

Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped type.

#### Type parameters

| Type parameter                                                                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T` _extends_ `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`>>> \| `View`\<`string`, `boolean`, `ColumnsSelection`> \| `Subquery`\<`string`, `Record`\<`string`, `unknown`>> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `row`     | `T`  |

#### Returns

`SQL`\<[`InferData`](README.md#inferdatat)\<`T`>>

---

<a id="setweight" name="setweight" />

### setweight()

```ts
function setweight(tsvector: SQLWrapper, weight: string | number): SQL<string>;
```

The function setweight can be used to label the entries of a tsvector with a given weight, where a
weight is one of the letters A, B, C, or D. This is typically used to mark entries coming from
different parts of a document, such as title versus body. Later, this information can be used for
ranking of search results.

Because to_tsvector(NULL) will return NULL, it is recommended to use coalesce whenever a field might
be null.

#### Parameters

| Parameter  | Type                 |
| :--------- | :------------------- |
| `tsvector` | `SQLWrapper`         |
| `weight`   | `string` \| `number` |

#### Returns

`SQL`\<`string`>

---

<a id="similar" name="similar" />

### similar()

```ts
function similar(): void;
```

#### Returns

`void`

---

<a id="soundex" name="soundex" />

### soundex()

```ts
function soundex(text: string | SQLWrapper): SQL<string>;
```

#### Parameters

| Parameter | Type                     |
| :-------- | :----------------------- |
| `text`    | `string` \| `SQLWrapper` |

#### Returns

`SQL`\<`string`>

#### See

[https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-SOUNDEX](https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-SOUNDEX)

---

<a id="textenum" name="textenum" />

### textenum()

```ts
function textenum<TName, TEnum, TConfig>(
  name: TName,
  config: TConfig
): PgCustomColumnBuilder<object>;
```

Text-based enum with runtime check and type inferrence. In other words, similar to drizzle's own
`text` column with `config.enum` but this time with runtime peace-of mind.

If you simply want a union-typed text without runtime safety of values, use drizzle's own `text`
with the `config.enum` configuration.

#### Type parameters

| Type parameter                                        |
| :---------------------------------------------------- |
| `TName` _extends_ `string`                            |
| `TEnum` _extends_ `string`\[] \| readonly `string`\[] |
| `TConfig` _extends_ `object`                          |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`  | `TConfig` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type                            |
| :------------ | :------------------------------ |
| `columnType`  | `"PgCustomColumn"`              |
| `data`        | `TConfig`\[`"enum"`]\[`number`] |
| `dataType`    | `"custom"`                      |
| `driverParam` | `string`                        |
| `enumValues`  | `undefined`                     |
| `name`        | `TName`                         |

#### See

[https://orm.drizzle.team/docs/column-types/pg#text](https://orm.drizzle.team/docs/column-types/pg#text)

---

<a id="toexcluded" name="toexcluded" />

### toExcluded()

```ts
function toExcluded<T>(columns: T): { [K in string | number | symbol]: SQL<InferData<T[K]>> };
```

Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.

#### Type parameters

| Type parameter                                 |
| :--------------------------------------------- |
| `T` _extends_ `Record`\<`string`, `AnyColumn`> |

#### Parameters

| Parameter | Type | Description                                                    |
| :-------- | :--- | :------------------------------------------------------------- |
| `columns` | `T`  | Record of columns to get from the conflict's `excluded` table. |

#### Returns

\{ \[K in string | number | symbol]: SQL\<InferData\<T\[K]>> }

---

<a id="tointerval" name="tointerval" />

### toInterval()

```ts
function toInterval<T>(value: T): SQL<string>;
```

Create an interval value by passing a value deconstructed into time units.

#### Type parameters

| Type parameter                                                                          |
| :-------------------------------------------------------------------------------------- |
| `T` _extends_ `Partial`\<`Record`\<[`IntervalUnit`](src/pg.md#intervalunit), `number`>> |

#### Parameters

| Parameter | Type |
| :-------- | :--- |
| `value`   | `T`  |

#### Returns

`SQL`\<`string`>

---

<a id="tojson" name="tojson" />

### toJson()

```ts
function toJson<T>(anyelement: T): SQL<InferData<T>>;
```

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `anyelement` | `T`  |

#### Returns

`SQL`\<[`InferData`](README.md#inferdatat)\<`T`>>

#### See

[https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE](https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE)

---

<a id="tojsonb" name="tojsonb" />

### toJsonb()

```ts
function toJsonb<T>(anyelement: T): SQL<InferData<T>>;
```

#### Type parameters

| Type parameter             |
| :------------------------- |
| `T` _extends_ `SQLWrapper` |

#### Parameters

| Parameter    | Type |
| :----------- | :--- |
| `anyelement` | `T`  |

#### Returns

`SQL`\<[`InferData`](README.md#inferdatat)\<`T`>>

---

<a id="torange" name="torange" />

### toRange()

```ts
function toRange<T>(tuple: T, __namedParameters: object): SQL<T>;
```

Using canonical form of included lower bound and excluded upper bound. See
[https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE](https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE).

#### Type parameters

| Type parameter                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------- |
| `T` _extends_ \[`undefined` \| `number`, `undefined` \| `number`] \| \[`undefined` \| `Date`, `undefined` \| `Date`] |

#### Parameters

| Parameter                       | Type                                         |
| :------------------------------ | :------------------------------------------- |
| `tuple`                         | `T`                                          |
| `__namedParameters`             | `object`                                     |
| `__namedParameters.lowerBound`? | [`RangeBoundType`](src/pg.md#rangeboundtype) |
| `__namedParameters.upperBound`? | [`RangeBoundType`](src/pg.md#rangeboundtype) |

#### Returns

`SQL`\<`T`>

---

<a id="totsquery" name="totsquery" />

### toTsquery()

```ts
function toTsquery(text: unknown, text: object): SQL<string>;
```

#### Parameters

| Parameter         | Type                                                           | Description                                      |
| :---------------- | :------------------------------------------------------------- | :----------------------------------------------- |
| `text`            | `unknown`                                                      | Source text to convert into a text search query. |
| `text`            | `object`                                                       | Source text to convert into a text search query. |
| `text.plain`?     | `boolean`                                                      | -                                                |
| `text.regconfig`? | `SQLWrapper` \| [`RegconfigString`](src/pg.md#regconfigstring) | -                                                |

#### Returns

`SQL`\<`string`>

---

<a id="totsvector" name="totsvector" />

### toTsvector()

```ts
function toTsvector(text: unknown, text: object): SQL<string>;
```

#### Parameters

| Parameter         | Type                                                           | Description                                                                                                                    |
| :---------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `text`            | `unknown`                                                      | <p>Source text to convert into a text search vector.</p> <code> to_tsvector();<p> --or;</p><p> plainto_tsvector();</p> </code> |
| `text`            | `object`                                                       | <p>Source text to convert into a text search vector.</p> <code> to_tsvector();<p> --or;</p><p> plainto_tsvector();</p> </code> |
| `text.regconfig`? | `SQLWrapper` \| [`RegconfigString`](src/pg.md#regconfigstring) | -                                                                                                                              |

#### Returns

`SQL`\<`string`>

---

<a id="ts" name="ts" />

### ts()

```ts
function ts(vector: SQLWrapper, querytext: SQLWrapper): SQL<unknown>;
```

Test a text search query against a ts_vector value.

#### Parameters

| Parameter   | Type         |
| :---------- | :----------- |
| `vector`    | `SQLWrapper` |
| `querytext` | `SQLWrapper` |

#### Returns

`SQL`\<`unknown`>

---

<a id="tsrange" name="tsrange" />

### tsrange()

```ts
function tsrange<TName, TConfig, TData>(
  name: TName,
  config?: TConfig
): PgCustomColumnBuilder<object>;
```

Implements Postgres timestamp range.

#### Type parameters

| Type parameter               | Value                                                                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TName` _extends_ `string`   | -                                                                                                                                                         |
| `TConfig` _extends_ `object` | -                                                                                                                                                         |
| `TData`                      | `TConfig`\[`"mode"`] _extends_ `"string"` ? [`RangeValue`](src/pg.md#rangevaluet)\<`string`> : [`RangeValue`](src/pg.md#rangevaluet)\<`number` \| `Date`> |

#### Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `name`    | `TName`   |
| `config`? | `TConfig` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type               |
| :------------ | :----------------- |
| `columnType`  | `"PgCustomColumn"` |
| `data`        | `TData`            |
| `dataType`    | `"custom"`         |
| `driverParam` | `string`           |
| `enumValues`  | `undefined`        |
| `name`        | `TName`            |

#### See

- [https://www.postgresql.org/docs/current/rangetypes.html](https://www.postgresql.org/docs/current/rangetypes.html)
- [https://github.com/bendrucker/postgres-date](https://github.com/bendrucker/postgres-date)

---

<a id="tsrangeschema" name="tsrangeschema" />

### tsrangeSchema()

```ts
function tsrangeSchema<TMode, TData>(
  __namedParameters: object
): ZodObject<
  object,
  'strip',
  ZodTypeAny,
  { [k in 'lower' | 'upper']: addQuestionMarks<baseObjectOutputType<Object>, any>[k] },
  object
>;
```

Because of typescript's peculiar handling of Inifinity/-Infinity, ranges without limit need to
consider number members that indicate infinite bounds.

#### Type parameters

| Type parameter                           | Value                                                        |
| :--------------------------------------- | :----------------------------------------------------------- |
| `TMode` _extends_ `"string"` \| `"date"` | -                                                            |
| `TData`                                  | `TMode` _extends_ `"string"` ? `string` : `number` \| `Date` |

#### Parameters

| Parameter                         | Type      |
| :-------------------------------- | :-------- |
| `__namedParameters`               | `object`  |
| `__namedParameters.max`?          | `Date`    |
| `__namedParameters.min`?          | `Date`    |
| `__namedParameters.mode`?         | `TMode`   |
| `__namedParameters.withTimezone`? | `boolean` |

#### Returns

`ZodObject`\<`object`, `"strip"`, `ZodTypeAny`, \{ \[k in "lower" | "upper"]:
addQuestionMarks\<baseObjectOutputType\<Object>, any>\[k] }, `object`>

| Member  | Type                                                                                                                                                                                | Value       |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `lower` | `ZodEffects`\<`ZodNullable`\<`ZodDate`>, `TData`, `null` \| `Date`> \| `ZodEffects`\<`ZodNullable`\<`ZodUnion`\<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` \| `number` \| `Date`> | lowerSchema |
| `upper` | `ZodEffects`\<`ZodNullable`\<`ZodDate`>, `TData`, `null` \| `Date`> \| `ZodEffects`\<`ZodNullable`\<`ZodUnion`\<\[`ZodDate`, `ZodNumber`]>>, `TData`, `null` \| `number` \| `Date`> | upperSchema |

---

<a id="tsvector" name="tsvector" />

### tsvector()

```ts
function tsvector<TName>(dbName: TName, fieldConfig?: unknown): PgCustomColumnBuilder<object>;
```

Postgres text-search vector.

#### Type parameters

| Type parameter             |
| :------------------------- |
| `TName` _extends_ `string` |

#### Parameters

| Parameter      | Type      |
| :------------- | :-------- |
| `dbName`       | `TName`   |
| `fieldConfig`? | `unknown` |

#### Returns

`PgCustomColumnBuilder`\<`object`>

| Member        | Type               |
| :------------ | :----------------- |
| `columnType`  | `"PgCustomColumn"` |
| `data`        | `string`           |
| `dataType`    | `"custom"`         |
| `driverParam` | `unknown`          |
| `enumValues`  | `undefined`        |
| `name`        | `TName`            |
