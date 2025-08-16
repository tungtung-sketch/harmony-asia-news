-- Add SELECT policy to restrict access to newsletter subscriber emails to admins only
CREATE POLICY "Only admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (EXISTS ( 
  SELECT 1
  FROM profiles p
  WHERE p.user_id = auth.uid() 
  AND p.role = 'admin'::user_role
));