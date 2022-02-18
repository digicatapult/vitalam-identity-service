# Database usage

## Database migrations

Database migrations are handled using [`knex.js`](https://knexjs.org/) and can be migrated manually using the following commands:

```sh
npx knex migrate:latest # used to migrate to latest database version
npx knex migrate:up # used to migrate to the next database version
npx knex migrate:down # used to migrate to the previous database version
```

## Table structure

The following tables exist in the `vitalam` database.

### `members`

`members` represent the on-chain member identities, and provides storage for aliases to be stored when optionally selected to do so.

#### Columns

| column          | PostgreSQL type           | nullable |       default        | description                        |
|:----------------| :------------------------ | :------- | :------------------: |:-----------------------------------|
| `id`            | `UUID`                    | FALSE    | `uuid_generate_v4()` | Unique identifier for the `member` |
| `address`       | `CHARACTER VARYING (50)`  | FALSE    |          -           | The address of the member          |
| `alias`         | `CHARACTER VARYING (50)`  | FALSE    |          -           | A friendly name for the member     |
| `created_at`    | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was first created     |
| `updated_at`    | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was last updated      |

#### Indexes

| columns     | Index Type | description                                                                    |
|:------------|:-----------|:-------------------------------------------------------------------------------|
| `id`        | PRIMARY    | Primary key                                                                    |
| `address`   | Unique     | Prevents more than one `member` from being created with an identical `address` |
| `alias`     | Unique     | Prevents more than one `member` from being created with an identical `alias`   |

### `suppliers`

`suppliers` represents the suppliers and their corresponding details.

#### Columns

| column               | PostgreSQL type           | nullable |       default        | description                            |
|:---------------------|:--------------------------|:---------| :------------------: |:---------------------------------------|
| `id`                 | `UUID`                    | FALSE    | `uuid_generate_v4()` | Unique identifier for the `member`     |
| `name`               | `CHARACTER VARYING (50)`  | FALSE    |          -           | The name of the supplier               |
| `tier`               | `CHARACTER VARYING (50)`  | FALSE    |          -           | The tier of the supplier               |
| `address_line_1`     | `CHARACTER VARYING (50)`  | FALSE    |          -           | The address line 1 of the supplier     |
| `address_line_2`     | `CHARACTER VARYING (50)`  | TRUE     |          -           | The address line 2 of the supplier     |
| `postcode`           | `CHARACTER VARYING (50)`  | FALSE    |          -           | The postcode of the supplier           |
| `country`            | `CHARACTER VARYING (50)`  | FALSE    |          -           | The country of the supplier            |
| `sc10_certification` | `BINARY`                  | FALSE    |          -           | The SC10 Certification of the supplier |
| `contact_first_name` | `CHARACTER VARYING (50)`  | FALSE    |          -           | The contact first name of the supplier |
| `contact_last_name`  | `CHARACTER VARYING (50)`  | FALSE    |          -           | The contact last name of the supplier  |
| `contact_email`      | `CHARACTER VARYING (50)`  | FALSE    |          -           | The contact email of the supplier      |
| `created_at`         | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was first created         |
| `updated_at`         | `Timestamp with timezone` | FALSE    |       `now()`        | When the row was last updated          |

#### Indexes

| columns | Index Type | description                            |
|:--------|:-----------|:---------------------------------------|
| `id`    | PRIMARY    | Primary key                            |
| `name`  | Index      | Index for optimising queries by `name` |
| `tier`  | Index      | Index for optimising queries by `tier` |
