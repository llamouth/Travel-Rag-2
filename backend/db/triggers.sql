\c travelrag_dev;

-- Trigger to ensure user_preferences.user_id exists in users table
CREATE OR REPLACE FUNCTION check_user_preferences_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.user_id) THEN
    RAISE EXCEPTION 'user_id % does not exist in users table', NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_preferences_user_id_check
BEFORE INSERT OR UPDATE ON user_preferences
FOR EACH ROW
EXECUTE FUNCTION check_user_preferences_user_id();

-- Trigger to ensure user_recommendations.user_id exists in users table
CREATE OR REPLACE FUNCTION check_user_recommendations_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.user_id) THEN
    RAISE EXCEPTION 'user_id % does not exist in users table', NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_recommendations_user_id_check
BEFORE INSERT OR UPDATE ON user_recommendations
FOR EACH ROW
EXECUTE FUNCTION check_user_recommendations_user_id();

-- Trigger to ensure user_recommendations.destination_id exists in destinations table
CREATE OR REPLACE FUNCTION check_user_recommendations_destination_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM destinations WHERE id = NEW.destination_id) THEN
    RAISE EXCEPTION 'destination_id % does not exist in destinations table', NEW.destination_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_recommendations_destination_id_check
BEFORE INSERT OR UPDATE ON user_recommendations
FOR EACH ROW
EXECUTE FUNCTION check_user_recommendations_destination_id();

-- Trigger to ensure user_favorites.user_id exists in users table
CREATE OR REPLACE FUNCTION check_user_favorites_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = NEW.user_id) THEN
    RAISE EXCEPTION 'user_id % does not exist in users table', NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_favorites_user_id_check
BEFORE INSERT OR UPDATE ON user_favorites
FOR EACH ROW
EXECUTE FUNCTION check_user_favorites_user_id();

-- Trigger to ensure user_favorites.destination_id exists in destinations table
CREATE OR REPLACE FUNCTION check_user_favorites_destination_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM destinations WHERE id = NEW.destination_id) THEN
    RAISE EXCEPTION 'destination_id % does not exist in destinations table', NEW.destination_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_favorites_destination_id_check
BEFORE INSERT OR UPDATE ON user_favorites
FOR EACH ROW
EXECUTE FUNCTION check_user_favorites_destination_id();

