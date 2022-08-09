CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status BOOLEAN NOT NULL
);