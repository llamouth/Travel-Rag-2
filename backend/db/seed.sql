\c travelrag_dev;
-- 1. Clear existing data (optional but helps during development)
TRUNCATE vision_board_items, vision_boards, users RESTART IDENTITY CASCADE;

-- 2. Insert users
INSERT INTO users (username, email, password_hash, first_name, last_name)
VALUES
  ('test_user', 'anna@example.com', '$2b$10$7YfGDzTomSeBc1ivh0qI0.seiCqjOeu/BnCCsTqrY4fa3lyg6FbgS', 'Larry', 'Lamouth'),
  ('nomad_jake', 'jake@example.com', '$2b$10$ABCabc123XYZxyz890mNOeB', 'Jake', 'Nomad');

-- 3. Insert vision boards (referencing correct user IDs, assuming they are 1 and 2 now)
INSERT INTO vision_boards (user_id, title, description)
VALUES
  (1, 'Europe 2026', 'My dream destinations for a summer Euro trip.'),
  (2, 'Asia Backpacking', 'Planning a backpacking route through Southeast Asia.');

-- 4. Insert vision board items (referencing correct board IDs)
INSERT INTO vision_board_items (board_id, image_url, location_name, note, link_url, order_index)
VALUES
  (1, 'https://example.com/images/paris.jpg', 'Paris, France', 'See the Eiffel Tower at night', 'https://visitparis.com', 1),
  (1, 'https://example.com/images/rome.jpg', 'Rome, Italy', 'Eat pasta and explore the Colosseum', 'https://rome.info', 2),
  (2, 'https://example.com/images/bali.jpg', 'Bali, Indonesia', 'Yoga retreat on the beach', 'https://baliguide.com', 1),
  (2, 'https://example.com/images/hanoi.jpg', 'Hanoi, Vietnam', 'Try street food and coffee culture', 'https://vietnamtourism.com', 2);
