/*
 * Without proper search_path configuration, Postgres has trouble finding
 * functions and column types enabled through extensions installed
 * in a different schema (typically "extensions").
 * 
 * This ensures we don't have to constantly prefix column types or functions
 * with the extensions schema name.
 */
 
SHOW search_path;

ALTER DATABASE [database name]
SET search_path = "$user", public, extensions;

SHOW search_path;