DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    latitude FLOAT,
    longitude FLOAT,
    feeling TEXT
);


INSERT INTO users (name, latitude, longitude, feeling)
    VALUES
        ('Austin Wright', 40.123456, 30.012746, 'happy'),
        ('Lucas Earl', 60.123456, 40.012746, 'happy'),
        ('Frank Dave', 50.123456, 50.012746, 'angry'),
        ('Sally Wright', 40.123456, 30.012746, 'disgusted'),
        ('Holly Prows', 40.123456, 30.012746, 'afraid')
;