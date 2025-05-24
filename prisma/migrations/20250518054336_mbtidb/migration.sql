-- CreateTable
CREATE TABLE `UsuarioTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `tipoTestId` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaDePreguntas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL,
    `tipoTestId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregunta` VARCHAR(191) NOT NULL,
    `categoriaPreguntasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `puntaje` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RespuestasUsuarioTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuarioTest` INTEGER NOT NULL,
    `idRespuesta` INTEGER NOT NULL,
    `idPregunta` INTEGER NOT NULL,
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personalidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(200) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResultadosDeTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idDicotomia` INTEGER NOT NULL,
    `idUsuarioTest` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioTest` ADD CONSTRAINT `UsuarioTest_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioTest` ADD CONSTRAINT `UsuarioTest_tipoTestId_fkey` FOREIGN KEY (`tipoTestId`) REFERENCES `TipoTest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaDePreguntas` ADD CONSTRAINT `CategoriaDePreguntas_tipoTestId_fkey` FOREIGN KEY (`tipoTestId`) REFERENCES `TipoTest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_categoriaPreguntasId_fkey` FOREIGN KEY (`categoriaPreguntasId`) REFERENCES `CategoriaDePreguntas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestasUsuarioTest` ADD CONSTRAINT `RespuestasUsuarioTest_idUsuarioTest_fkey` FOREIGN KEY (`idUsuarioTest`) REFERENCES `UsuarioTest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestasUsuarioTest` ADD CONSTRAINT `RespuestasUsuarioTest_idRespuesta_fkey` FOREIGN KEY (`idRespuesta`) REFERENCES `Respuesta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestasUsuarioTest` ADD CONSTRAINT `RespuestasUsuarioTest_idPregunta_fkey` FOREIGN KEY (`idPregunta`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestasUsuarioTest` ADD CONSTRAINT `RespuestasUsuarioTest_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `CategoriaDePreguntas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultadosDeTest` ADD CONSTRAINT `ResultadosDeTest_idDicotomia_fkey` FOREIGN KEY (`idDicotomia`) REFERENCES `Dicotomia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResultadosDeTest` ADD CONSTRAINT `ResultadosDeTest_idUsuarioTest_fkey` FOREIGN KEY (`idUsuarioTest`) REFERENCES `UsuarioTest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


-- Insertar datos en la tabla 'TipoTest'
INSERT INTO `TipoTest` (nombre) VALUES
  ('MBTI'),
  ('OtroTest');

-- Insertar datos en la tabla 'Dicotomia'
INSERT INTO `Personalidades` (`nombre`, `keywords`, `descripcion`) VALUES
('ESTJ – El Ejecutivo', 'Organizado. Práctico. Líder nato.', 'Los ESTJ valoran la estructura y la responsabilidad. Son personas decididas que confían en su experiencia y se enfocan en hacer las cosas de manera eficiente. Si hay caos, ellos lo convierten en orden. Fortalezas: Dedicados, fuertes en la gestión, leales y directos. Debilidades: Inflexibles, impacientes y pueden ser insensibles a las emociones ajenas. Desarrollo: Fomenta la empatía y considera diferentes perspectivas antes de tomar decisiones.'),
('ESTP – El Emprendedor', 'Espontáneo. Energético. Resolvedor de problemas.', 'Los ESTP viven el momento. Son ingeniosos y directos, prefieren actuar antes que planear en exceso. Les encanta tomar riesgos y adaptarse rápido a los cambios. Fortalezas: Enérgicos, perceptivos, directos y valientes. Debilidades: Impacientes, insensibles y pueden ser propensos al riesgo excesivo. Desarrollo: Practica la reflexión antes de actuar y considera las consecuencias a largo plazo.'),
('ESFP – El Animador', 'Alegre. Sensorial. Auténtico.', 'Los ESFP disfrutan cada momento y contagian su entusiasmo. Se enfocan en las experiencias y las personas, y buscan la armonía en su entorno. Son honestos y prefieren conexiones reales. Fortalezas: Entusiastas, sociables, observadores y prácticos. Debilidades: Impulsivos, buscan constantemente atención y pueden evitar la planificación. Desarrollo: Establece metas claras y trabaja en la autodisciplina para lograr un equilibrio entre diversión y responsabilidad.'),
('ESFJ – El Proveedor', 'Amable. Práctico. Protector.', 'Los ESFJ son solidarios y comprometidos con los demás. Les gusta ayudar y mantener la armonía. Son atentos, confiables y tienen una gran habilidad para cuidar a los que les rodean. Fortalezas: Leales, con un fuerte sentido del deber, sensibles y cálidos. Debilidades: Preocupados por su imagen social, inflexibles y pueden ser demasiado necesitados. Desarrollo: Trabaja en la autovaloración independiente de la aprobación externa y acepta que no puedes complacer a todos.'),
('ISTJ – El Inspector', 'Responsable. Realista. Confiable.', 'Los ISTJ se toman sus deberes en serio. Les motiva la tradición, la precisión y la eficiencia. Su sentido del deber los hace confiables y constantes, especialmente en situaciones difíciles. Fortalezas: Honestos, responsables, organizados y leales. Debilidades: Inflexibles, resistentes al cambio y pueden ser demasiado críticos. Desarrollo: Practica la apertura a nuevas ideas y reconoce el valor de la adaptabilidad.'),
('ISTP – El Virtuoso', 'Curioso. Silencioso. Inventivo.', 'Los ISTP son expertos en entender cómo funcionan las cosas. Analíticos y lógicos, prefieren actuar por su cuenta y resolver problemas con soluciones prácticas e ingeniosas. Fortalezas: Prácticos, experimentadores, eficientes y tranquilos. Debilidades: Impulsivos, insensibles y pueden evitar compromisos a largo plazo. Desarrollo: Fomenta la planificación a largo plazo y considera el impacto emocional de tus acciones.'),
('ISFP – El Aventurero', 'Sensitivo. Creativo. Leal.', 'Los ISFP valoran la belleza, la armonía y la autenticidad. Les gusta vivir en el presente y ser fieles a sí mismos. Su mundo interior es rico y lleno de sensibilidad. Fortalezas: Artísticos, sensibles, curiosos y leales. Debilidades: Reservados, impredecibles y pueden evitar conflictos. Desarrollo: Trabaja en la expresión abierta de tus pensamientos y enfrenta los desafíos directamente.'),
('ISFJ – El Defensor', 'Cuidadoso. Leal. Discreto.', 'Los ISFJ son protectores naturales. Dedican su energía a cuidar a los demás, valoran las tradiciones y son profundamente comprometidos con sus responsabilidades. Fortalezas: Confiables, pacientes, observadores y comprometidos. Debilidades: Evitan conflictos, se sobrecargan fácilmente y pueden subestimar sus logros. Desarrollo: Aprende a expresar tus necesidades y reconoce tus propios logros.'),
('INTJ – El Arquitecto', 'Estratega. Independiente. Visionario.', 'Los INTJ son pensadores profundos que buscan mejorar el mundo con sus ideas. Les gusta planear, encontrar patrones y construir sistemas eficientes. Fortalezas: Racionales, informados, independientes, determinados y curiosos. Debilidades: Arrogantes, perfeccionistas, emocionalmente distantes y propensos al aislamiento. Desarrollo: Practica la empatía activa y busca equilibrar la lógica con las emociones en tus relaciones.'),
('INTP – El Lógico', 'Analítico. Abstracto. Independiente.', 'Los INTP buscan comprender cómo funciona todo. Su mente es su laboratorio: analizan, reflexionan y buscan teorías innovadoras. Fortalezas: Originales, de mente abierta, curiosos y honestos. Debilidades: Desconectados emocionalmente, insatisfechos y propensos a la procrastinación. Desarrollo: Establece rutinas que fomenten la acción y busca compartir tus ideas con otros para obtener retroalimentación.'),
('INFP – El Mediador', 'Idealista. Empático. Reflexivo.', 'Los INFP buscan sentido en todo lo que hacen. Valoran la autenticidad, la armonía interna y tienen un fuerte sentido de propósito. Fortalezas: Empáticos, leales, creativos y con una fuerte brújula moral. Debilidades: Propensos a la autocrítica, evasión de conflictos y pueden ser demasiado idealistas. Desarrollo: Acepta que los errores son parte del crecimiento y busca el equilibrio entre tus ideales y la realidad.'),
('INFJ – El Abogado', 'Intuitivo. Compasivo. Profundo.', 'Los INFJ ven más allá de lo obvio. Son empáticos, con un fuerte sentido de misión. Buscan relaciones significativas y luchan por causas en las que creen. Fortalezas: Perspicaces, con principios sólidos, apasionados, altruistas y creativos. Debilidades: Sensibles a la crítica, reservados y pueden sobrecargarse emocionalmente. Desarrollo: Establece límites saludables y comunica tus necesidades de manera abierta.'),
('ENTJ – El Comandante', 'Ambicioso. Eficiente. Líder natural.', 'Los ENTJ están hechos para liderar. Visualizan metas, trazan planes y los ejecutan con precisión. Son decididos y confiados, motivados por el logro y el progreso. Fortalezas: Decididos, eficientes, seguros de sí mismos y buenos comunicadores. Debilidades: Impacientes, tercos y pueden parecer insensibles. Desarrollo: Trabaja en la escucha activa y considera las emociones de los demás en la toma de decisiones.'),
('ENTP – El Innovador', 'Creativo. Ingenioso. Energético.', 'Los ENTP adoran los retos intelectuales. Son entusiastas, versátiles y siempre están generando ideas. Les gusta debatir y descubrir nuevas perspectivas. Fortalezas: Conocedores, pensadores ágiles, originales, excelentes en la lluvia de ideas y carismáticos. Debilidades: Insensibles, propensos a la dispersión y pueden evitar compromisos. Desarrollo: Enfócate en profundizar en tus proyectos y considera el impacto emocional de tus palabras en los demás.'),
('ENFP – El Activista', 'Inspirador. Empático. Curioso.', 'Los ENFP son entusiastas, creativos y valoran la conexión emocional. Les interesa explorar posibilidades y vivir de forma auténtica, con pasión y optimismo. Fortalezas: Curiosos, perceptivos, entusiastas, excelentes comunicadores y positivos. Debilidades: Buscan agradar a todos, desorganizados y pueden evitar tareas rutinarias. Desarrollo: Establece metas claras y trabaja en la gestión del tiempo para mantener el enfoque.'),
('ENFJ – El Protagonista', 'Carismático. Empático. Organizador.', 'Los ENFJ son líderes sociales natos. Conectan con los demás de forma natural, inspiran y motivan. Su meta es construir un mundo mejor a través de la cooperación. Fortalezas: Receptivos, confiables, apasionados y altruistas. Debilidades: Pueden ser demasiado empáticos, condescendientes y tener dificultades para decir "no". Desarrollo: Aprende a priorizar tu bienestar y reconoce que no puedes ayudar a todos todo el tiempo.');

-- Insertar datos en la tabla 'Role' (si tienes esta tabla)
INSERT INTO `Role` (name) VALUES
  ('Administrador'),
  ('Postulante'),
  ('Recursos Humanos');


-- Insertar datos en la tabla 'CategoriaDePreguntas'
INSERT INTO `CategoriaDePreguntas` (nombre, orden, tipoTestId) VALUES
  ('Dimensión E/I', 1, 1),
  ('Dimensión S/N', 2, 1),
  ('Dimensión T/N', 3, 1),
  ('Dimensión J/P', 4, 1);

-- Insertar datos en la tabla 'Pregunta'
INSERT INTO `Pregunta` (pregunta, categoriaPreguntasId) VALUES
  ('¿Te consideras extrovertido?', 1),
  ('¿Prefieres concentrarte en detalles concretos?', 2);
