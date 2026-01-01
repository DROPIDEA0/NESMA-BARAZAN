import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { trpc } from '../lib/trpc';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, Loader2, Globe, Instagram } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Contact() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const { data: settings } = trpc.settings.getAll.useQuery();
  const createMessage = trpc.contactMessages.create.useMutation();

  const getSetting = (key: string) => {
    return settings?.find((s: any) => s.key === key);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createMessage.mutateAsync(formData);
      toast.success(
        getSetting(`form_success_message_${lang}`)?.value || 
        (lang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!')
      );
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(lang === 'ar' ? 'حدث خطأ أثناء إرسال الرسالة' : 'An error occurred while sending the message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get map coordinates
  const riyadhLat = parseFloat(getSetting('map_riyadh_lat')?.value || '24.7136');
  const riyadhLng = parseFloat(getSetting('map_riyadh_lng')?.value || '46.6753');
  const qatarLat = parseFloat(getSetting('map_qatar_lat')?.value || '25.2854');
  const qatarLng = parseFloat(getSetting('map_qatar_lng')?.value || '51.5310');
  const mapZoom = parseInt(getSetting('map_zoom')?.value || '6');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getSetting(`contact_page_title_${lang}`)?.value || (lang === 'ar' ? 'تواصل معنا' : 'Contact Us')}
            </h1>
            <p className="text-xl text-cyan-50">
              {getSetting(`contact_page_subtitle_${lang}`)?.value || 
               (lang === 'ar' ? 'نحن هنا للإجابة على استفساراتكم ومساعدتكم' : 'We are here to answer your questions and help you')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {getSetting(`form_name_label_${lang}`)?.value || (lang === 'ar' ? 'الاسم الكامل' : 'Full Name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {getSetting(`form_email_label_${lang}`)?.value || (lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={lang === 'ar' ? 'example@email.com' : 'example@email.com'}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {getSetting(`form_phone_label_${lang}`)?.value || (lang === 'ar' ? 'رقم الهاتف' : 'Phone Number')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={lang === 'ar' ? '+966 5XX XXX XXX' : '+966 5XX XXX XXX'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {getSetting(`form_subject_label_${lang}`)?.value || (lang === 'ar' ? 'الموضوع' : 'Subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder={lang === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {getSetting(`form_message_label_${lang}`)?.value || (lang === 'ar' ? 'الرسالة' : 'Message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                    placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={createMessage.isPending}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createMessage.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {lang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {getSetting(`form_submit_label_${lang}`)?.value || (lang === 'ar' ? 'إرسال الرسالة' : 'Send Message')}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* CEO Info Card */}
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  {getSetting(`ceo_name_${lang}`)?.value || 'بندر آل علي'}
                </h3>
                <p className="text-cyan-50 mb-6 text-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  {getSetting(`ceo_title_${lang}`)?.value || 'Founder & CEO — SHHEERGroup'}
                </p>

                <div className="space-y-4">
                  <a
                    href={`tel:${getSetting('ceo_phone')?.value || '+966532840999'}`}
                    className="flex items-center gap-3 text-white hover:text-cyan-100 transition-colors"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span>{getSetting('ceo_phone')?.value || '+966 532 840 999'}</span>
                  </a>

                  <div className="flex items-start gap-3" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                    <span>{getSetting(`location_text_${lang}`)?.value || 'Riyadh — Saudi Arabia | Doha — Qatar | UAE — Dubai'}</span>
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <Mail className="h-6 w-6 text-cyan-500" />
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Addresses'}
                </h3>
                <div className="space-y-3">
                  {getSetting('contact_email_primary')?.value && (
                    <a
                      href={`mailto:${getSetting('contact_email_primary')?.value}`}
                      className="block text-cyan-600 hover:text-cyan-700 transition-colors"
                      dir="ltr"
                    >
                      ✔️ {getSetting('contact_email_primary')?.value}
                    </a>
                  )}
                  {getSetting('contact_email_info')?.value && (
                    <a
                      href={`mailto:${getSetting('contact_email_info')?.value}`}
                      className="block text-cyan-600 hover:text-cyan-700 transition-colors"
                      dir="ltr"
                    >
                      ✔️ {getSetting('contact_email_info')?.value}
                    </a>
                  )}
                  {getSetting('contact_email_eyebank')?.value && (
                    <a
                      href={`mailto:${getSetting('contact_email_eyebank')?.value}`}
                      className="block text-cyan-600 hover:text-cyan-700 transition-colors"
                      dir="ltr"
                    >
                      ✔️ {getSetting('contact_email_eyebank')?.value}
                    </a>
                  )}
                  {getSetting('contact_email_eyepay')?.value && (
                    <a
                      href={`mailto:${getSetting('contact_email_eyepay')?.value}`}
                      className="block text-cyan-600 hover:text-cyan-700 transition-colors"
                      dir="ltr"
                    >
                      ✔️ {getSetting('contact_email_eyepay')?.value}
                    </a>
                  )}
                </div>
              </div>

              {/* Websites */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <Globe className="h-6 w-6 text-cyan-500" />
                  {lang === 'ar' ? 'المواقع الإلكترونية' : 'Websites'}
                </h3>
                <div className="space-y-3">
                  {getSetting('website_eyebank')?.value && (
                    <a
                      href={`https://${getSetting('website_eyebank')?.value}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-cyan-600 hover:text-cyan-700 transition-colors"
                      dir="ltr"
                    >
                      ✔️ {getSetting('website_eyebank')?.value}
                    </a>
                  )}
                  {getSetting('website_legal')?.value && (
                    <a
                      href={`https://${getSetting('website_legal')?.value}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-cyan-600 hover:text-cyan-700 transition-colors"
                      dir="ltr"
                    >
                      ✔️ {getSetting('website_legal')?.value}
                    </a>
                  )}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <Instagram className="h-6 w-6 text-cyan-500" />
                  {lang === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media'}
                </h3>
                <p className="text-gray-600 mb-3" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  {lang === 'ar' ? 'تابعنا على:' : 'Follow us on:'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {getSetting('social_instagram')?.value && (
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold">
                      Instagram: {getSetting('social_instagram')?.value}
                    </span>
                  )}
                  {getSetting('social_twitter')?.value && (
                    <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold">
                      X: {getSetting('social_twitter')?.value}
                    </span>
                  )}
                  {getSetting('social_youtube')?.value && (
                    <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">
                      YouTube: {getSetting('social_youtube')?.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {lang === 'ar' ? 'مواقعنا' : 'Our Locations'}
            </h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '500px' }}>
              <MapContainer
                center={[(riyadhLat + qatarLat) / 2, (riyadhLng + qatarLng) / 2]}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[riyadhLat, riyadhLng]}>
                  <Popup>
                    <div className="text-center">
                      <strong>{lang === 'ar' ? 'الرياض' : 'Riyadh'}</strong>
                      <br />
                      {lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
                    </div>
                  </Popup>
                </Marker>
                <Marker position={[qatarLat, qatarLng]}>
                  <Popup>
                    <div className="text-center">
                      <strong>{lang === 'ar' ? 'الدوحة' : 'Doha'}</strong>
                      <br />
                      {lang === 'ar' ? 'قطر' : 'Qatar'}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
