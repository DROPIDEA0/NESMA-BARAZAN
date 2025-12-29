# 🏢 Nesma Barzan Trading - نسمة برزان التجارية

![Nesma Barzan Logo](client/public/logo.png)

A professional bilingual (Arabic/English) corporate website for Nesma Barzan Trading Company, featuring a comprehensive admin panel for content management.

موقع إلكتروني احترافي ثنائي اللغة (عربي/إنجليزي) لشركة نسمة برزان التجارية مع لوحة تحكم شاملة لإدارة المحتوى.

---

## 📋 Overview | نظرة عامة

### Company Information | معلومات الشركة
- **Name | الاسم:** Nesma Barzan Trading | نسمة برزان التجارية
- **Founded | سنة التأسيس:** 2005
- **Location | الموقع:** Riyadh, Saudi Arabia | الرياض، المملكة العربية السعودية
- **Contact | التواصل:** +966 555 499 991 | info@shheer.com
- **Website | الموقع:** www.shheer.com

### Tech Stack | التقنيات المستخدمة
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **Backend:** Express.js + tRPC
- **Database:** MySQL (Production) / SQLite (Development)
- **ORM:** Drizzle ORM
- **Authentication:** Manus OAuth (disabled for development)
- **UI Components:** shadcn/ui

---

## 🚀 Quick Start | البدء السريع

### Prerequisites | المتطلبات
- Node.js 22.x or higher | Node.js 22.x أو أحدث
- pnpm package manager
- Git

### Installation | التثبيت

```bash
# Clone the repository | استنساخ المشروع
git clone https://github.com/DROPIDEA0/NESMA-BARAZAN.git
cd NESMA-BARAZAN

# Install dependencies | تثبيت التبعيات
pnpm install

# Start development server | تشغيل وضع التطوير
pnpm dev
```

### Access | الوصول
- **Public Website | الموقع العام:** http://localhost:3000
- **Admin Panel | لوحة التحكم:** http://localhost:3000/admin

---

## 📁 Project Structure | بنية المشروع

```
NESMA-BARAZAN/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React components | مكونات React
│   │   ├── pages/         # Website pages | صفحات الموقع
│   │   └── const.ts       # Constants | الثوابت
│   └── public/            # Static files | الملفات الثابتة
│
├── server/                 # Express Backend
│   ├── _core/             # Core settings | الإعدادات الأساسية
│   ├── db.ts              # Database functions | دوال قاعدة البيانات
│   ├── db-mysql.ts        # MySQL setup | إعدادات MySQL
│   ├── db-sqlite.ts       # SQLite setup | إعدادات SQLite
│   ├── routers.ts         # API Routes
│   └── seed-data.ts       # Initial data | البيانات الأولية
│
├── drizzle/               # Database Schema
│   └── schema.ts          # Table definitions | تعريف الجداول
│
├── dist/                  # Built files (auto-generated)
│
├── local.db               # SQLite database (development)
├── nesma-barzan-mysql.sql # MySQL SQL file (production)
│
├── DEPLOYMENT.md          # Deployment guide | دليل النشر
├── DATABASE_GUIDE.md      # Database guide | دليل قواعد البيانات
└── package.json           # Dependencies | التبعيات
```

---

## 🎨 Features | المميزات

### Public Website | الموقع العام
- ✅ Professional homepage | صفحة رئيسية احترافية
- ✅ About section with vision & mission | قسم من نحن مع الرؤية والمهمة
- ✅ Projects showcase | عرض المشاريع
- ✅ Contact page | صفحة التواصل
- ✅ Bilingual support (Arabic/English) | دعم اللغتين
- ✅ Responsive design | تصميم متجاوب
- ✅ Company logo preloader | شاشة تحميل بلوقو الشركة

### Admin Panel | لوحة التحكم
- ✅ Site settings management | إدارة إعدادات الموقع
- ✅ Content management (Arabic/English) | إدارة المحتوى
- ✅ Projects management (CRUD) | إدارة المشاريع
- ✅ Image management | إدارة الصور
- ✅ Golden theme matching logo | تصميم ذهبي متناسق مع اللوقو
- ✅ User-friendly interface | واجهة سهلة الاستخدام

---

## 🗄️ Database | قاعدة البيانات

### Development (SQLite)
- Works automatically without setup | يعمل تلقائياً بدون إعداد
- Data stored in `local.db`
- Perfect for development | مثالي للتطوير

### Production (MySQL)
- Uses MySQL when `DATABASE_URL` is set
- Import `nesma-barzan-mysql.sql` first
- See `DATABASE_GUIDE.md` for details | راجع دليل قواعد البيانات

### Tables | الجداول
- `users` - User data | بيانات المستخدمين
- `site_settings` - Site settings | إعدادات الموقع
- `site_content` - Site content | محتوى الموقع
- `projects` - Projects | المشاريع
- `images` - Uploaded images | الصور المرفوعة

---

## 🔐 Environment Variables | متغيرات البيئة

### Development (.env)
```env
DATABASE_URL=local.db
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

### Production (Hostinger)
See `HOSTINGER_ENV_VARIABLES.txt` for complete list  
راجع ملف `HOSTINGER_ENV_VARIABLES.txt` للقائمة الكاملة

---

## 📦 Available Commands | الأوامر المتاحة

```bash
# Development mode | وضع التطوير
pnpm dev

# Build for production | البناء للإنتاج
pnpm build

# Run tests | تشغيل الاختبارات
pnpm test

# Lint code | فحص الكود
pnpm lint
```

---

## 🚀 Deployment on Hostinger | النشر على Hostinger

### Auto-Deploy | النشر التلقائي
1. Push changes to GitHub (main branch)
2. Hostinger pulls changes automatically
3. Builds and deploys automatically

### Required Steps | الخطوات المطلوبة
1. Import MySQL database | استيراد قاعدة بيانات MySQL
2. Add Environment Variables | إضافة متغيرات البيئة
3. Ensure Auto-Deployment is enabled | التأكد من تفعيل النشر التلقائي

**See `DEPLOYMENT.md` for complete guide | راجع `DEPLOYMENT.md` للدليل الكامل**

---

## 📚 Documentation Files | الملفات التوثيقية

| File | Description |
|------|-------------|
| `DEPLOYMENT.md` | Complete deployment guide | دليل النشر الشامل |
| `DATABASE_GUIDE.md` | Database usage guide | دليل استخدام قواعد البيانات |
| `HOSTINGER_ENV_VARIABLES.txt` | Environment variables for Hostinger |
| `nesma-barzan-mysql.sql` | MySQL database file | ملف قاعدة بيانات MySQL |

---

## 🔧 Troubleshooting | استكشاف الأخطاء

### "Database connection failed"
**Solution:** Check `DATABASE_URL` in Environment Variables  
**الحل:** تحقق من `DATABASE_URL` في متغيرات البيئة

### "Build failed"
**Solution:** Read Build logs and fix errors  
**الحل:** اقرأ سجلات البناء وصحح الأخطاء

### "500 Internal Server Error"
**Solution:** Check Runtime logs and database connection  
**الحل:** تحقق من السجلات واتصال قاعدة البيانات

**See `DEPLOYMENT.md` for more solutions | راجع `DEPLOYMENT.md` للمزيد**

---

## 🌐 Links | الروابط

### Development | التطوير
- **Local:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

### Production | الإنتاج
- **Website:** https://mediumturquoise-dotterel-343079.hostingersite.com/
- **Admin Panel:** https://mediumturquoise-dotterel-343079.hostingersite.com/admin

### Repository | المستودع
- **GitHub:** https://github.com/DROPIDEA0/NESMA-BARAZAN

---

## 👥 Team | الفريق

- **Owner | المالك:** Mr. Ali Ibrahim Al-Dlaigan | السيد علي إبراهيم الدليقان
- **Development | التطوير:** Built with Manus AI

---

## 📄 License | الترخيص

© 2025 Nesma Barzan Trading. All Rights Reserved.  
© 2025 نسمة برزان التجارية. جميع الحقوق محفوظة.

---

## 📞 Contact | التواصل

- **Phone | الهاتف:** +966 555 499 991
- **Email | البريد:** info@shheer.com
- **Website | الموقع:** www.shheer.com
- **Location | الموقع:** Riyadh, Saudi Arabia | الرياض، المملكة العربية السعودية

---

## ✅ Checklist for New Developers | قائمة للمطورين الجدد

- [ ] Read this README | قراءة هذا الملف
- [ ] Read `DEPLOYMENT.md` | قراءة دليل النشر
- [ ] Read `DATABASE_GUIDE.md` | قراءة دليل قواعد البيانات
- [ ] Install prerequisites | تثبيت المتطلبات
- [ ] Clone project | استنساخ المشروع
- [ ] Install dependencies | تثبيت التبعيات
- [ ] Run development mode | تشغيل وضع التطوير
- [ ] Test admin panel | اختبار لوحة التحكم
- [ ] Understand project structure | فهم بنية المشروع
- [ ] Understand Hostinger deployment | فهم آلية النشر

---

**Created | تاريخ الإنشاء:** December 29, 2025 | 29 ديسمبر 2025  
**Last Updated | آخر تحديث:** December 29, 2025 | 29 ديسمبر 2025  
**Version | الإصدار:** 1.0.0  
**Status | الحالة:** ✅ Production Ready | جاهز للإنتاج
