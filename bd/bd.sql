CREATE TABLE posts_new (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL,
  image_url    TEXT,
  caption      TEXT, 
  likes        NUMERIC DEFAULT 0, 
  created_at   TIMESTAMPTZ DEFAULT NOW(), 
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO posts_new (user_id, image_url, caption, likes, created_at)
VALUES
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank1/600/600',
  'Atardecer en la playa, momentos que valen oro',
  1250,
  NOW() - INTERVAL '2 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank2/600/600',
  'Explorando nuevos lugares cada día',
  980,
  NOW() - INTERVAL '8 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank3/600/600',
  'Código y café, la combinación perfecta',
  875,
  NOW() - INTERVAL '1 day'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank4/600/600',
  'Nuevo proyecto terminado!',
  654,
  NOW() - INTERVAL '2 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank5/600/600',
  'Aprendiendo algo nuevo cada día',
  543,
  NOW() - INTERVAL '3 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank6/600/600',
  'El diseño está en los detalles',
  421,
  NOW() - INTERVAL '4 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank7/600/600',
  'Arte digital, mi nueva pasión',
  389,
  NOW() - INTERVAL '5 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank8/600/600',
  'La música es vida',
  256,
  NOW() - INTERVAL '6 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/rank9/600/600',
  'Receta del día: pasta casera',
  128,
  NOW() - INTERVAL '7 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/movie1/600/600',
  'Maratón de películas clásicas este fin de semana 🍿',
  1450,
  NOW() - INTERVAL '1 hour'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/ai1/600/600',
  'Probando nuevos modelos de IA y los resultados son increíbles 🤖',
  1320,
  NOW() - INTERVAL '3 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/code1/600/600',
  'Nada mejor que programar con café y buena música ☕💻',
  980,
  NOW() - INTERVAL '5 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/beach1/600/600',
  'Desconectando frente al mar 🌊',
  870,
  NOW() - INTERVAL '7 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/tech1/600/600',
  'Nuevo setup terminado y listo para desarrollar 🚀',
  1650,
  NOW() - INTERVAL '10 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/movie2/600/600',
  'Las bandas sonoras del cine tienen otro nivel 🎬',
  720,
  NOW() - INTERVAL '12 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/ai2/600/600',
  'Automatizando tareas con inteligencia artificial',
  1100,
  NOW() - INTERVAL '14 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/code2/600/600',
  'Debugging nocturno hasta encontrar el bug 🐛',
  650,
  NOW() - INTERVAL '18 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/beach2/600/600',
  'Atardeceres que parecen sacados de una película 🌅',
  940,
  NOW() - INTERVAL '1 day'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/tech2/600/600',
  'Explorando nuevas herramientas para desarrollo frontend',
  530,
  NOW() - INTERVAL '1 day 4 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/movie3/600/600',
  'Ciencia ficción + palomitas = plan perfecto 👽',
  890,
  NOW() - INTERVAL '2 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/ai3/600/600',
  'La IA está cambiando la forma en que construimos software',
  1500,
  NOW() - INTERVAL '2 days 6 hours'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/code3/600/600',
  'Hoy tocó refactorizar medio proyecto 😅',
  470,
  NOW() - INTERVAL '3 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/beach3/600/600',
  'Arena, sol y cero notificaciones 📵',
  760,
  NOW() - INTERVAL '4 days'
),
(
  gen_random_uuid(),
  'https://picsum.photos/seed/tech3/600/600',
  'Aprendiendo sobre arquitecturas escalables en la nube ☁️',
  1180,
  NOW() - INTERVAL '5 days'
);