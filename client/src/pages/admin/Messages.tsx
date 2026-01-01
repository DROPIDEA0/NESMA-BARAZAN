import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { trpc } from '../../lib/trpc';
import { toast } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  Circle,
  MessageCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export default function Messages() {
  const { lang } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: messages, refetch } = trpc.contactMessages.getAll.useQuery({
    status: selectedStatus,
    limit: 100,
  });

  const { data: counts } = trpc.contactMessages.getCount.useQuery();

  const updateStatus = trpc.contactMessages.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success(lang === 'ar' ? 'تم تحديث الحالة بنجاح' : 'Status updated successfully');
    },
  });

  const deleteMessage = trpc.contactMessages.delete.useMutation({
    onSuccess: () => {
      refetch();
      setShowModal(false);
      setSelectedMessage(null);
      toast.success(lang === 'ar' ? 'تم حذف الرسالة بنجاح' : 'Message deleted successfully');
    },
  });

  const handleStatusChange = async (id: number, status: 'new' | 'read' | 'replied') => {
    await updateStatus.mutateAsync({ id, status });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) {
      await deleteMessage.mutateAsync({ id });
    }
  };

  const openMessage = (message: any) => {
    setSelectedMessage(message);
    setShowModal(true);
    if (message.status === 'new') {
      handleStatusChange(message.id, 'read');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: {
        ar: 'جديد',
        en: 'New',
        color: 'bg-blue-100 text-blue-800',
        icon: Circle,
      },
      read: {
        ar: 'مقروء',
        en: 'Read',
        color: 'bg-yellow-100 text-yellow-800',
        icon: Eye,
      },
      replied: {
        ar: 'مُجاب',
        en: 'Replied',
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
      },
    };

    const badge = badges[status as keyof typeof badges];
    if (!badge) return null;

    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        <Icon className="h-4 w-4" />
        {lang === 'ar' ? badge.ar : badge.en}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPp', { locale: lang === 'ar' ? ar : enUS });
  };

  return (
    <AdminLayout>
      <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {lang === 'ar' ? 'إدارة الرسائل' : 'Messages Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {lang === 'ar' ? 'إدارة رسائل التواصل الواردة من العملاء' : 'Manage incoming contact messages from customers'}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedStatus === 'all'
                ? 'border-cyan-500 bg-cyan-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{lang === 'ar' ? 'جميع الرسائل' : 'All Messages'}</p>
                <p className="text-3xl font-bold text-gray-900">{counts?.total || 0}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
          </button>

          <button
            onClick={() => setSelectedStatus('new')}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedStatus === 'new'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{lang === 'ar' ? 'جديد' : 'New'}</p>
                <p className="text-3xl font-bold text-blue-600">{counts?.new || 0}</p>
              </div>
              <Circle className="h-8 w-8 text-blue-400" />
            </div>
          </button>

          <button
            onClick={() => setSelectedStatus('read')}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedStatus === 'read'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{lang === 'ar' ? 'مقروء' : 'Read'}</p>
                <p className="text-3xl font-bold text-yellow-600">{counts?.read || 0}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-400" />
            </div>
          </button>

          <button
            onClick={() => setSelectedStatus('replied')}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedStatus === 'replied'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{lang === 'ar' ? 'مُجاب' : 'Replied'}</p>
                <p className="text-3xl font-bold text-green-600">{counts?.replied || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </button>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'الهاتف' : 'Phone'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'الموضوع' : 'Subject'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {lang === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {messages && messages.length > 0 ? (
                  messages.map((message: any) => (
                    <tr
                      key={message.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        message.status === 'new' ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {message.status === 'new' && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          <span className="font-medium text-gray-900">{message.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${message.email}`}
                          className="text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                        >
                          <Mail className="h-4 w-4" />
                          {message.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {message.phone ? (
                          <a
                            href={`tel:${message.phone}`}
                            className="text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                          >
                            <Phone className="h-4 w-4" />
                            {message.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{message.subject || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(message.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(message.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openMessage(message)}
                            className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                            title={lang === 'ar' ? 'عرض الرسالة' : 'View Message'}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(message.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={lang === 'ar' ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      {lang === 'ar' ? 'لا توجد رسائل' : 'No messages found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Modal */}
        {showModal && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {lang === 'ar' ? 'تفاصيل الرسالة' : 'Message Details'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Sender Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">
                      {lang === 'ar' ? 'الاسم' : 'Name'}
                    </label>
                    <p className="text-lg font-medium text-gray-900">{selectedMessage.name}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">
                      {lang === 'ar' ? 'التاريخ' : 'Date'}
                    </label>
                    <p className="text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700"
                    >
                      <Mail className="h-5 w-5" />
                      {selectedMessage.email}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">
                      {lang === 'ar' ? 'الهاتف' : 'Phone'}
                    </label>
                    {selectedMessage.phone ? (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700"
                      >
                        <Phone className="h-5 w-5" />
                        {selectedMessage.phone}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="text-gray-400">-</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                {selectedMessage.subject && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">
                      {lang === 'ar' ? 'الموضوع' : 'Subject'}
                    </label>
                    <p className="text-lg font-medium text-gray-900">{selectedMessage.subject}</p>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    {lang === 'ar' ? 'الرسالة' : 'Message'}
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id, 'new')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedMessage.status === 'new'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'ar' ? 'جديد' : 'New'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedMessage.status === 'read'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'ar' ? 'مقروء' : 'Read'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedMessage.status === 'replied'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'ar' ? 'مُجاب' : 'Replied'}
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    {lang === 'ar' ? 'إرسال بريد' : 'Send Email'}
                  </a>
                  {selectedMessage.phone && (
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="h-5 w-5" />
                      {lang === 'ar' ? 'اتصال' : 'Call'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
