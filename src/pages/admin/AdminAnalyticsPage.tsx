import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AnalyticsDashboard from '@/components/admin/analytics/AnalyticsDashboard';

const AdminAnalyticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <AnalyticsDashboard />
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
