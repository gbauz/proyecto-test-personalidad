-- This is an empty migration
INSERT INTO `Respuesta` (nombre, puntaje) VALUES
    ('Totalmente en desacuerdo', -2),
    ('En desacuerdo', -1),
    ('Ni de acuerdo ni en desacuerdo', 0),
    ('De acuerdo', 1),
    ('Totalmente de acuerdo', 2);


INSERT INTO `User` (`email`, `password`, `name`, `roleId`)
VALUES ('giovannibauz@gmail.com', '$2b$10$gVqsDL0aGlzmNZWkehXq3ewA1yHYF9hK5UbYbqsffdzMUknNE0zIS', 'Giovanni Bauz', 1);

INSERT INTO `User` (`email`, `password`, `name`, `roleId`)
VALUES ('juanperez@gmail.com', '$2b$10$gVqsDL0aGlzmNZWkehXq3ewA1yHYF9hK5UbYbqsffdzMUknNE0zIS', 'Juan Perez', 2);

INSERT INTO `User` (`email`, `password`, `name`, `roleId`)
VALUES ('juanmerchan@gmail.com', '$2b$10$gVqsDL0aGlzmNZWkehXq3ewA1yHYF9hK5UbYbqsffdzMUknNE0zIS', 'Juan Merchan', 3);
