# Backend

## Setup

Install dependencies:

```
npm install
```

Lint the code:

```
npm run lint
```

## Run

To run the server:

```
npm start
```

## Database setup

To setup the database, use the `schema.sql`:

```
sqlite3 db.db < schema.sql
```

If you want to set it up with some data, you may also use the `populate.sql` script:

```
sqlite3 db.db < populate.sql
```
