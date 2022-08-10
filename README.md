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
