import { AdminLayout } from '@/components/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { FileText, FolderKanban, Image, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

export default function AdminDashboard() {
  const { lang, t } = useLanguage();
  const { data: projects } = trpc.projects.getAll.useQuery();
  const { data: images } = trpc.images.getAll.useQuery();
  const { data: content } = trpc.content.getAll.useQuery();

  const stats = [
    {
      title: t('admin.content'),
      value: content?.length || 0,
      icon: FileText,
      href: '/admin/content',
      color: 'bg-gradient-to-br from-[#0DCAF0] to-[#48CAE4]',
    },
    {
      title: t('admin.projects'),
      value: projects?.length || 0,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'bg-gradient-to-br from-[#0DCAF0] to-[#48CAE4]',
    },
    {
      title: t('admin.images'),
      value: images?.length || 0,
      icon: Image,
      href: '/admin/images',
      color: 'bg-gradient-to-br from-[#0DCAF0] to-[#48CAE4]',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="px-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            {lang === 'ar' 
              ? 'مرحباً بك في لوحة تحكم نسمة برزان'
              : 'Welcome to Nesma Barzan Admin Panel'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
          {stats.map((stat) => (
            <Link key={stat.href} href={stat.href}>
              <Card className="bg-white border-2 border-gray-200 hover:border-[#0DCAF0] hover:shadow-xl transition-all cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base md:text-sm font-medium text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 md:p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5 md:h-4 md:w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-2 border-gray-200 mx-2">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-gray-900">{lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/projects">
                <div className="p-5 md:p-4 border-2 border-gray-200 rounded-lg hover:border-[#0DCAF0] hover:bg-gradient-to-br hover:from-[#faf7f2] hover:to-[#f5f0e8] transition-all cursor-pointer group">
                  <FolderKanban className="h-10 w-10 md:h-8 md:w-8 text-[#0DCAF0] mb-3 md:mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold md:font-medium text-base md:text-sm text-gray-900 mb-1">{lang === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</h3>
                  <p className="text-sm md:text-sm text-gray-600">
                    {lang === 'ar' ? 'أضف مشروعاً جديداً للعرض' : 'Add a new project to display'}
                  </p>
                </div>
              </Link>
              <Link href="/admin/images">
                <div className="p-5 md:p-4 border-2 border-gray-200 rounded-lg hover:border-[#0DCAF0] hover:bg-gradient-to-br hover:from-[#faf7f2] hover:to-[#f5f0e8] transition-all cursor-pointer group">
                  <Image className="h-10 w-10 md:h-8 md:w-8 text-[#0DCAF0] mb-3 md:mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold md:font-medium text-base md:text-sm text-gray-900 mb-1">{lang === 'ar' ? 'رفع صورة' : 'Upload Image'}</h3>
                  <p className="text-sm md:text-sm text-gray-600">
                    {lang === 'ar' ? 'ارفع صوراً جديدة للموقع' : 'Upload new images for the site'}
                  </p>
                </div>
              </Link>
              <Link href="/admin/content">
                <div className="p-5 md:p-4 border-2 border-gray-200 rounded-lg hover:border-[#0DCAF0] hover:bg-gradient-to-br hover:from-[#faf7f2] hover:to-[#f5f0e8] transition-all cursor-pointer group">
                  <FileText className="h-10 w-10 md:h-8 md:w-8 text-[#0DCAF0] mb-3 md:mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold md:font-medium text-base md:text-sm text-gray-900 mb-1">{lang === 'ar' ? 'تعديل المحتوى' : 'Edit Content'}</h3>
                  <p className="text-sm md:text-sm text-gray-600">
                    {lang === 'ar' ? 'عدّل نصوص الموقع' : 'Edit site texts'}
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
