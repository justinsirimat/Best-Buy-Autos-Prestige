-- Function to check if a specific table exists in the database
-- Returns TRUE if table exists, FALSE otherwise
CREATE OR REPLACE FUNCTION public.check_table_exists(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  table_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = check_table_exists.table_name
  ) INTO table_exists;
  
  RETURN table_exists;
END;
$$;

-- Allow anyone to execute this function
ALTER FUNCTION public.check_table_exists(text) SECURITY DEFINER;
REVOKE EXECUTE ON FUNCTION public.check_table_exists(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_table_exists(text) TO anon;
GRANT EXECUTE ON FUNCTION public.check_table_exists(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_table_exists(text) TO service_role; 