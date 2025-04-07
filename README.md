# Prisma ORM Project

## Useful Prisma Commands

### Setup and Generation

```bash
# Initialize Prisma in your project
npx prisma init

# Generate Prisma Client
npx prisma generate
```

### Database Migrations

```bash
# Create a migration from your Prisma schema, apply it to the database, trigger generators
npx prisma migrate dev --name "chess"

# Reset the database and apply all migrations
npx prisma migrate reset

# Apply pending migrations to the database in production/staging
npx prisma migrate deploy

# Check the status of migrations in the production/staging database
npx prisma migrate status
```

### Database Management

```bash
# Push the Prisma schema state to the database without migrations
npx prisma db push

# Pull the schema from an existing database
npx prisma db pull

# Seed your database
npx prisma db seed
```

### Development Tools

```bash
# Start Prisma Studio (GUI to view and edit data)
npx prisma studio

# Format your schema.prisma file
npx prisma format

# Validate your Prisma schema
npx prisma validate
```

### Troubleshooting

```bash
# Get Prisma version
npx prisma --version

# Display information about the current database
npx prisma db info
```

## Common Workflows

### Creating a New Model

1. Add the model to your `schema.prisma` file
2. Run `npx prisma migrate dev --name "add-new-model"`
3. Use the generated client to interact with the new model

### Updating an Existing Model

1. Modify the model in your `schema.prisma` file
2. Run `npx prisma migrate dev --name "update-model"`

### Database Seeding

1. Create a `prisma/seed.js` or `prisma/seed.ts` file
2. Define your seed logic
3. Add a seed script to your `package.json`:
   ```json
   "prisma": {
     "seed": "node prisma/seed.js"
   }
   ```
4. Run `npx prisma db seed`
