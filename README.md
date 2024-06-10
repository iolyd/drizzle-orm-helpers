<h1 align="center">Drizzle ORM Helpers</h1>

<p align="center">
<b>⚠️   Use at your own risk   ⚠️</b>
</p>
<p align="center">
<sup>🚧   This package is under construction, expect some things to be broken!   🚧</sup>
</p>

<br />

This is a collection of unofficial typescript-friendly helpers for use with Drizzle ORM. Provided
items include common SQL/dialect-specific values, functions, operators, and column types. Note that
most the work is currently oriented towards Postgres and that most "solutions" provided by this
package should be seen as provisory, in wait of being replaced by implementations provided
officially and with more stability through Drizzle-ORM package(s).

## Documentation

A crude auto-generated
[**documentation** is available here](https://github.com/iolyd/drizzle-orm-helpers/blob/main/documentation/README.md).

## Examples

### Aggregating translations

```ts
const APP_LANGUAGES = ['fr', 'en', 'es'] as const;
type AppLanguage = (typeof APP_LANGUAGES)[number]; // 'fr' | 'en' | 'es';

const languages = pgTable('languages', {
  lang: textenum('lang', { enum: APP_LANGUAGES }),
});

const projects = pgTable('projects', {
  id: text('id')
    .default(nanoid({ size: 12 }))
    .primaryKey(),
  createdById: text('created_by_id').references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

const projectsTranslations = pgTable(
  'projects_t',
  {
    id: text('id')
      .references(() => projects.id, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull(),
    lang: textenum('lang', { enum: APP_LANGUAGES })
      .references(() => languages.lang, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull(),
    title: text('title'),
    description: text('description'),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.lang] }),
    };
  }
);

/**
 * Build a json object aggregating translations with languages as keys and joined columns as nested
 * properties.
 */
export function aggTranslations<TSelection extends ColumnsSelection>(selection: TSelection) {
  return jsonObjectAgg(languages.lang, jsonBuildObject(selection));
}

/**
 * Join translations through the languages table.
 */
export function joinTranslations<
  TSelect extends PgSelect,
  TTranslations extends
    | (AnyTable<TableConfig> & LangColumn)
    | (Subquery<string, ColumnSelection> & LangColumn),
>(select: TSelect, translations: TTranslations, on: SQL) {
  return select
    .leftJoin(languages, $true)
    .leftJoin(translations, and(on, eq(languages.lang, translations.lang)));
}

const projectsWithTranslations = await joinTranslations(
  db
    .select({
      ...getColumns(projects),
      translations: aggTranslations(getColumns(projectsTranslations)),
    })
    .from(projects),
  projectsTranslations,
  eq(projects.id, projectsTranslations.id)
);
```

Would return aggregated data with expected types as:

```json
[
  {
    id: string,
    created_by_id: string,
    translations: {
      fr: {
        id: string,
        lang: string,
        title?: string,
        description?: string
      },
      en: {
        id: string,
        lang: string,
        title?: string,
        description?: string
      }
      es: {
        id: string,
        lang: string,
        title?: string,
        description?: string
      }
    }
  },
  //...
]
```
