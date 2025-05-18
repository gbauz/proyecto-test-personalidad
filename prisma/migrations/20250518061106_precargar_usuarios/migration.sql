-- This is an empty migration.
-- Insertar datos de usuarios con contraseñas encriptadas
INSERT INTO `User` (email, name, password, roleId) VALUES
  ('usuario1@example.com', 'Usuario 1', '$2a$10$z.HZf.gV3H0Ql34hfKZpyEr91c5V8M5mcxG52v8iV1yMSaZFbZZ3u', 1), -- Contraseña: miContraseña1
  ('usuario2@example.com', 'Usuario 2', '$2a$10$LZ2uAeaCb2nMGfITpn7Uy6.wt5doaQhYS7yB7DW7zPHzcMHe69gGa', 2), -- Contraseña: miContraseña2
  ('usuario3@example.com', 'Usuario 3', '$2a$10$wB90rPoxz7c0e9sD2UqXy2f2C4WmIQC.VmS5IQ92hjhb.kb5PMgLu', 2); -- Contraseña: miContraseña3
