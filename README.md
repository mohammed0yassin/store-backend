# Storefront Backend Project

## Getting Started

### Setup database:
#### create database.json file with:

    {
    "dev": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "database_name",
        "user": "database_username",
        "password": "password"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "database_name",
        "user": "database_username",
        "password": "password"
    }
}

#### Create database on your server/local environment
1. Run the following commands in psql to create database user

        CREATE USER store_user WITH PASSWORD 'somepassword';

2. Create the databases for dev and test environments
        CREATE DATABASE store_backend;
        CREATE DATABASE store_backend_test;

3. Grant all database privileges to user in both databases

        GRANT ALL PRIVILEGES ON DATABASE store_backend TO store_user;
        GRANT ALL PRIVILEGES ON DATABASE store_backend_test TO store_user;

#### create .env file and fill these variables:
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=database_name
    POSTGRES_TEST_DB=test_database_name
    POSTGRES_USER=database_username
    POSTGRES_PASSWORD=database password
    BCRYPT_PASSWORD=my-bcrypt-good-pw
    SALT_ROUNDS=10
    TOKEN_SECRET=my-awesome-tok3n!
    ENV=dev
### database port : default port (5432)
### endpoint port : 3000

### Package installation:
run the command `npm install`
