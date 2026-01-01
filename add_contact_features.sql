-- إضافة ميزات صفحة التواصل
-- تاريخ: 01 يناير 2026

-- جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- إضافة إعدادات صفحة التواصل
INSERT INTO site_settings (`key`, value, type, category, labelAr, labelEn) VALUES
-- معلومات الرئيس التنفيذي
('ceo_name_ar', 'بندر آل علي', 'text', 'contact', 'اسم الرئيس التنفيذي (عربي)', 'CEO Name (Arabic)'),
('ceo_name_en', 'Bandar Al Ali', 'text', 'contact', 'اسم الرئيس التنفيذي (إنجليزي)', 'CEO Name (English)'),
('ceo_title_ar', 'المؤسس والرئيس التنفيذي — مجموعة شهير', 'text', 'contact', 'المنصب (عربي)', 'Title (Arabic)'),
('ceo_title_en', 'Founder & CEO — SHHEERGroup', 'text', 'contact', 'المنصب (إنجليزي)', 'Title (English)'),
('ceo_phone', '+966 532 840 999', 'text', 'contact', 'هاتف الرئيس التنفيذي', 'CEO Phone'),

-- المواقع
('location_text_ar', 'الرياض — المملكة العربية السعودية | الدوحة — قطر | دبي — الإمارات', 'text', 'contact', 'المواقع (عربي)', 'Locations (Arabic)'),
('location_text_en', 'Riyadh — Saudi Arabia | Doha — Qatar | UAE — Dubai', 'text', 'contact', 'المواقع (إنجليزي)', 'Locations (English)'),

-- إحداثيات الخريطة
('map_riyadh_lat', '24.7136', 'text', 'contact', 'خط العرض - الرياض', 'Riyadh Latitude'),
('map_riyadh_lng', '46.6753', 'text', 'contact', 'خط الطول - الرياض', 'Riyadh Longitude'),
('map_qatar_lat', '25.2854', 'text', 'contact', 'خط العرض - قطر', 'Qatar Latitude'),
('map_qatar_lng', '51.5310', 'text', 'contact', 'خط الطول - قطر', 'Qatar Longitude'),
('map_zoom', '6', 'number', 'contact', 'مستوى التكبير', 'Map Zoom Level'),

-- البريد الإلكتروني
('contact_email_primary', 'ceo@eyebankai.com', 'text', 'contact', 'البريد الرئيسي', 'Primary Email'),
('contact_email_info', 'info@eyeorderai.com', 'text', 'contact', 'بريد المعلومات', 'Info Email'),
('contact_email_eyebank', 'info@eyebankai.com', 'text', 'contact', 'بريد EyeBank', 'EyeBank Email'),
('contact_email_eyepay', 'info@eyepayai.com', 'text', 'contact', 'بريد EyePay', 'EyePay Email'),

-- المواقع الإلكترونية
('website_eyebank', 'www.eyebankai.com', 'text', 'contact', 'موقع EyeBank', 'EyeBank Website'),
('website_legal', 'www.legal-shheer.com', 'text', 'contact', 'موقع Legal Shheer', 'Legal Shheer Website'),

-- وسائل التواصل الاجتماعي
('social_instagram', '@EyeOrder', 'text', 'contact', 'إنستغرام', 'Instagram'),
('social_twitter', '@EyeOrder', 'text', 'contact', 'تويتر (X)', 'Twitter (X)'),
('social_youtube', '@EyeOrder', 'text', 'contact', 'يوتيوب', 'YouTube'),

-- نصوص صفحة التواصل
('contact_page_title_ar', 'تواصل معنا', 'text', 'contact', 'عنوان الصفحة (عربي)', 'Page Title (Arabic)'),
('contact_page_title_en', 'Contact Us', 'text', 'contact', 'عنوان الصفحة (إنجليزي)', 'Page Title (English)'),
('contact_page_subtitle_ar', 'نحن هنا للإجابة على استفساراتكم ومساعدتكم', 'text', 'contact', 'العنوان الفرعي (عربي)', 'Subtitle (Arabic)'),
('contact_page_subtitle_en', 'We are here to answer your questions and help you', 'text', 'contact', 'العنوان الفرعي (إنجليزي)', 'Subtitle (English)'),

-- نصوص الفورم
('form_name_label_ar', 'الاسم الكامل', 'text', 'contact', 'تسمية الاسم (عربي)', 'Name Label (Arabic)'),
('form_name_label_en', 'Full Name', 'text', 'contact', 'تسمية الاسم (إنجليزي)', 'Name Label (English)'),
('form_email_label_ar', 'البريد الإلكتروني', 'text', 'contact', 'تسمية البريد (عربي)', 'Email Label (Arabic)'),
('form_email_label_en', 'Email Address', 'text', 'contact', 'تسمية البريد (إنجليزي)', 'Email Label (English)'),
('form_phone_label_ar', 'رقم الهاتف', 'text', 'contact', 'تسمية الهاتف (عربي)', 'Phone Label (Arabic)'),
('form_phone_label_en', 'Phone Number', 'text', 'contact', 'تسمية الهاتف (إنجليزي)', 'Phone Label (English)'),
('form_subject_label_ar', 'الموضوع', 'text', 'contact', 'تسمية الموضوع (عربي)', 'Subject Label (Arabic)'),
('form_subject_label_en', 'Subject', 'text', 'contact', 'تسمية الموضوع (إنجليزي)', 'Subject Label (English)'),
('form_message_label_ar', 'الرسالة', 'text', 'contact', 'تسمية الرسالة (عربي)', 'Message Label (Arabic)'),
('form_message_label_en', 'Message', 'text', 'contact', 'تسمية الرسالة (إنجليزي)', 'Message Label (English)'),
('form_submit_label_ar', 'إرسال الرسالة', 'text', 'contact', 'زر الإرسال (عربي)', 'Submit Button (Arabic)'),
('form_submit_label_en', 'Send Message', 'text', 'contact', 'زر الإرسال (إنجليزي)', 'Submit Button (English)'),
('form_success_message_ar', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'text', 'contact', 'رسالة النجاح (عربي)', 'Success Message (Arabic)'),
('form_success_message_en', 'Your message has been sent successfully! We will contact you soon.', 'text', 'contact', 'رسالة النجاح (إنجليزي)', 'Success Message (English)')
ON DUPLICATE KEY UPDATE value=VALUES(value);
