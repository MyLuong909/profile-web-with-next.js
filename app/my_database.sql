
DROP TABLE Users;

CREATE TABLE Users (
    id INT IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL
);

INSERT INTO Users (email, passwordHash)
VALUES ('test@gmail.com', '$2a$10$u..hash...');

