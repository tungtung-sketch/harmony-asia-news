-- Add RLS policy for users to view their own reading history
CREATE POLICY "Users can view their own article views" 
ON public.article_views 
FOR SELECT 
USING (user_id = auth.uid());