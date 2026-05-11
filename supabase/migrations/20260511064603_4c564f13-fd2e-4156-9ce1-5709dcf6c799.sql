
-- article_views: restrict INSERT to authenticated users inserting their own row
DROP POLICY IF EXISTS "Users can insert their own views" ON public.article_views;
CREATE POLICY "Users can insert their own views"
ON public.article_views
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- newsletter_sends: restrict INSERT to service_role
DROP POLICY IF EXISTS "Allow public insert for newsletter sends" ON public.newsletter_sends;
CREATE POLICY "Service role can insert newsletter sends"
ON public.newsletter_sends
FOR INSERT
TO service_role
WITH CHECK (true);

-- newsletter_opens: restrict INSERT to service_role
DROP POLICY IF EXISTS "Allow public insert for newsletter opens" ON public.newsletter_opens;
CREATE POLICY "Service role can insert newsletter opens"
ON public.newsletter_opens
FOR INSERT
TO service_role
WITH CHECK (true);

-- pdf_cache: remove permissive ALL policy applying to public; keep user SELECT; add service_role manage
DROP POLICY IF EXISTS "Service role manages cache" ON public.pdf_cache;
CREATE POLICY "Service role manages cache"
ON public.pdf_cache
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- storage.objects: restrict insight-pdfs management to service_role
DROP POLICY IF EXISTS "Service role can manage PDFs" ON storage.objects;
CREATE POLICY "Service role can manage PDFs"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'insight-pdfs')
WITH CHECK (bucket_id = 'insight-pdfs');
