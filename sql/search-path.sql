/*
 * Without proper search_path configuration, Postgres has trouble finding
 * functions and column types enabled through extensions installed
 * in a different schema (typically "extensions").
 * 
 * This ensures we don't have to constantly prefix column types or functions
 * with the extensions schema name.
 */
 
-- Manual approach
SHOW search_path;
SELECT current_database();
-- Paste values and run
ALTER DATABASE [database name]
SET search_path = [...search path], extensions;
SHOW search_path;

-- Automatic approach
DO $$
BEGIN
EXECUTE 'ALTER DATABASE ' || current_database() || ' SET SEARCH_PATH = ' || current_setting('search_path') || ',extensions';
END $$;