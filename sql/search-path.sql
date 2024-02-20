/*
 * Without proper search_path configuration, Postgres has trouble finding
 * functions and column types enabled through extensions installed
 * in a different schema (typically "extensions").
 * 
 * This ensures we don't have to constantly prefix column types or functions
 * with the extensions schema name.
 */
-- Check the current search_path
SHOW search_path;

-- Append your extension schema(s) to the search_path
ALTER DATABASE postgres
SET search_path = CONCAT(current_setting('search_path'), ',extensions');

-- Verify the updated search_path
SHOW search_path;