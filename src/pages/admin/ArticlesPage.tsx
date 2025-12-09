import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AccessLevelBadge } from '@/components/paywall';
import { AccessLevel } from '@/types/paywall';
import { Plus, Edit, Trash2, Search, RefreshCw } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  status: string;
  access_level: AccessLevel;
  preview_paragraphs: number;
  published_at: string | null;
  created_at: string;
  content?: {
    title: string;
    content: string;
    language: string;
  }[];
}

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { toast } = useToast();

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          content:article_content(title, content, language)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles((data as Article[]) || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({ title: 'Error', description: 'Failed to load articles', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const updateArticle = async (id: string, updates: { access_level?: AccessLevel; preview_paragraphs?: number; status?: 'draft' | 'published' | 'archived' }) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
      toast({ title: 'Updated', description: 'Article updated successfully' });
    } catch (error) {
      console.error('Error updating article:', error);
      toast({ title: 'Error', description: 'Failed to update article', variant: 'destructive' });
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setArticles(prev => prev.filter(a => a.id !== id));
      toast({ title: 'Deleted', description: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({ title: 'Error', description: 'Failed to delete article', variant: 'destructive' });
    }
  };

  const filteredArticles = articles.filter(article => {
    const title = article.content?.[0]?.title || article.slug;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           article.slug.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Articles Management</h1>
          <p className="text-muted-foreground">{articles.length} total articles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchArticles}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Articles Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Access Level</th>
                  <th className="text-left py-3 px-4 font-semibold">Preview ¶</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Created</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {article.content?.[0]?.title || article.slug}
                      </div>
                      <div className="text-sm text-muted-foreground">/{article.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Select 
                        value={article.access_level} 
                        onValueChange={(value: AccessLevel) => updateArticle(article.id, { access_level: value })}
                      >
                        <SelectTrigger className="w-36">
                          <AccessLevelBadge accessLevel={article.access_level} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="admin_only">Admin Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={article.preview_paragraphs}
                        onChange={(e) => updateArticle(article.id, { preview_paragraphs: parseInt(e.target.value) || 1 })}
                        className="w-16"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Select 
                        value={article.status} 
                        onValueChange={(value) => updateArticle(article.id, { status: value as 'draft' | 'published' | 'archived' })}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteArticle(article.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No articles found.
        </div>
      )}

      {/* Access Level Legend */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Access Levels</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <AccessLevelBadge accessLevel="free" />
            <span>— Anyone can read the full article</span>
          </div>
          <div className="flex items-center gap-2">
            <AccessLevelBadge accessLevel="basic" />
            <span>— Basic subscribers and above can read the full article</span>
          </div>
          <div className="flex items-center gap-2">
            <AccessLevelBadge accessLevel="premium" />
            <span>— Premium subscribers only can read the full article</span>
          </div>
          <div className="flex items-center gap-2">
            <AccessLevelBadge accessLevel="admin_only" />
            <span>— Only administrators can read the full article</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
