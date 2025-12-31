# 📚 التوثيق الشامل الموحد - نسمة برزان التجارية
# Complete Unified Documentation - Nesma Barzan Trading

**آخر تحديث:** 31 ديسمبر 2025  
**الإصدار:** 1.0.0  
**الحالة:** ✅ جاهز للإنتاج

---

> **⚠️ تعليمات صارمة للوكلاء (AI Agents):**
> 
> 1. هذا هو الملف الموحد الشامل لجميع التوثيق
> 2. يحتوي على آخر التحديثات والإصلاحات
> 3. يجب الرجوع إلى هذا الملف لأي معلومات عن المشروع
> 4. التحديثات الجديدة يجب إضافتها إلى هذا الملف
> 5. لا تنشئ ملفات توثيق جديدة بدون سبب قوي

---

## 📋 جدول المحتويات

1. [نظرة عامة على المشروع](#نظرة-عامة-على-المشروع)
2. [التقنيات المستخدمة](#التقنيات-المستخدمة)
3. [التثبيت والإعداد](#التثبيت-والإعداد)
4. [قاعدة البيانات](#قاعدة-البيانات)
5. [النشر على VPS](#النشر-على-vps)
6. [نظام المصادقة](#نظام-المصادقة)
7. [لوحة التحكم](#لوحة-التحكم)
8. [الإصلاحات الأخيرة](#الإصلاحات-الأخيرة)
9. [حل المشاكل](#حل-المشاكل)
10. [API Documentation](#api-documentation)

---

## 🏢 نظرة عامة على المشروع

### الوصف
موقع إلكتروني احترافي لشركة **نسمة برزان التجارية** مع لوحة تحكم كاملة لإدارة المحتوى.

### المميزات الرئيسية

#### الموقع الرئيسي
- ✅ تصميم احترافي وعصري متجاوب (Responsive)
- ✅ دعم كامل للغتين العربية والإنجليزية
- ✅ صفحة رئيسية ديناميكية
- ✅ عرض المشاريع والأعمال
- ✅ معرض الصور التفاعلي
- ✅ نموذج التواصل
- ✅ تحسين محركات البحث (SEO)

#### لوحة التحكم
- ✅ نظام تسجيل دخول آمن (JWT + bcrypt)
- ✅ إدارة المحتوى النصي (ثنائي اللغة)
- ✅ إدارة المشاريع (إضافة، تعديل، حذف)
- ✅ إدارة الصور (رفع، عرض، حذف)
- ✅ إدارة الإعدادات (اللوقو، معلومات الاتصال)
- ✅ تغيير كلمة المرور (مع القائمة الجانبية)
- ✅ واجهة سهلة الاستخدام بثيم موحد

### معلومات الاتصال
- **الموقع:** https://www.shheer.com
- **البريد الإلكتروني:** info@shheer.com
- **الهاتف:** +966 555 499 991
- **العنوان:** الرياض، المملكة العربية السعودية

---

## 🛠️ التقنيات المستخدمة

### Frontend Stack
```json
{
  "React": "19.2.1",
  "TypeScript": "5.9.3",
  "Vite": "7.1.7",
  "Tailwind CSS": "4.1.14",
  "Wouter": "3.3.5",
  "tRPC Client": "11.6.0",
  "Lucide React": "0.469.0"
}
```

### Backend Stack
```json
{
  "Node.js": "22.21.0",
  "Express": "4.21.2",
  "tRPC Server": "11.6.0",
  "Drizzle ORM": "0.45.1",
  "MySQL2": "3.15.1",
  "bcryptjs": "3.0.3",
  "Jose (JWT)": "5.9.6"
}
```

### Infrastructure
- **VPS:** Hostinger Ubuntu 22.04
- **IP:** 72.62.7.159
- **Web Server:** Nginx 1.28.0
- **Process Manager:** systemd
- **SSL:** Let's Encrypt (HTTPS)
- **Database:** MySQL 8.0

---

## 🚀 التثبيت والإعداد

### المتطلبات الأساسية
- Node.js 22.x أو أحدث
- pnpm (مدير الحزم)
- MySQL 8.0 أو أحدث
- Git

### التثبيت المحلي (Development)

```bash
# 1. استنساخ المشروع
git clone https://github.com/DROPIDEA0/NESMA-BARAZAN.git
cd NESMA-BARAZAN

# 2. تثبيت Dependencies
pnpm install

# 3. إعداد ملف البيئة
cp .env.example .env

# 4. تحديث متغيرات البيئة في .env
DATABASE_URL=mysql://user:password@localhost:3306/database
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret-here

# 5. استيراد قاعدة البيانات
mysql -u root -p < DATABASE.sql

# 6. تشغيل في وضع التطوير
pnpm run dev

# 7. فتح المتصفح
# الموقع: http://localhost:3000
# لوحة التحكم: http://localhost:3000/login
```

### الأوامر المتاحة

| الأمر | الوصف |
|------|-------|
| `pnpm run dev` | تشغيل وضع التطوير مع Hot Reload |
| `pnpm run build` | بناء المشروع للإنتاج |
| `pnpm start` | تشغيل النسخة المبنية |
| `pnpm run check` | فحص أخطاء TypeScript |
| `pnpm run format` | تنسيق الكود باستخدام Prettier |
| `pnpm run db:push` | تطبيق تغييرات قاعدة البيانات |

---

## 🗄️ قاعدة البيانات

### ملف قاعدة البيانات الموحد

**الملف:** `DATABASE.sql`

⚠️ **تنبيه مهم:**
- هذا هو الملف الوحيد لقاعدة البيانات في جذر المشروع
- لا تقم بإنشاء ملفات SQL إضافية (schema.sql, init.sql, etc.)
- جميع التحديثات يجب أن تكون في هذا الملف الموحد

### بنية قاعدة البيانات

#### 1. جدول المستخدمين (users)
```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` text,
  `email` varchar(320) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT 'password',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 2. جدول محتوى الموقع (site_content)
```sql
CREATE TABLE `site_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value_ar` text,
  `value_en` text,
  `section` varchar(100) DEFAULT NULL,
  `description_ar` varchar(500) DEFAULT NULL,
  `description_en` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_content_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3. جدول إعدادات الموقع (site_settings)
```sql
CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text,
  `type` enum('text','number','boolean','image','json') DEFAULT 'text',
  `category` varchar(100) DEFAULT 'general',
  `label_ar` varchar(255) DEFAULT NULL,
  `label_en` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4. جدول المشاريع (projects)
```sql
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ar` text,
  `description_en` text,
  `image` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `order` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 5. جدول الصور (images) ⭐ محدث
```sql
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `fileKey` varchar(500) DEFAULT NULL,
  `mimeType` varchar(100) DEFAULT NULL,
  `altTextAr` varchar(255) DEFAULT NULL,
  `altTextEn` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**ملاحظة:** تم تحديث جدول images بالتغييرات التالية:
- ✅ إضافة `fileKey` و `mimeType`
- ✅ تغيير `alt_ar`/`alt_en` إلى `altTextAr`/`altTextEn` (camelCase)

### معلومات الاتصال (Production)

| المعلومة | القيمة |
|---------|--------|
| **اسم قاعدة البيانات** | u521934522-nasma-db |
| **اسم المستخدم** | u521934522-nasma-db-new |
| **كلمة المرور** | Downy144168@144168 |
| **المضيف** | 127.0.0.1 |
| **المنفذ** | 3306 |

**DATABASE_URL:**
```
mysql://u521934522-nasma-db-new:Downy144168@144168@127.0.0.1:3306/u521934522-nasma-db
```

---

## 🌐 النشر على VPS

### معلومات السيرفر

| المعلومة | القيمة |
|---------|--------|
| **نوع الاستضافة** | VPS (Hostinger) |
| **IP** | 72.62.7.159 |
| **نظام التشغيل** | Ubuntu 22.04 |
| **Node.js** | v22.21.0 |
| **MySQL** | 8.0 |
| **Nginx** | 1.28.0 |
| **مسار المشروع** | /home/shheercom/htdocs/www.shheer.com |

### بيانات SSH
```bash
ssh root@72.62.7.159
# Password: Downy144168@#144168
```

### متغيرات البيئة (Production)

**ملف:** `/home/shheercom/htdocs/www.shheer.com/.env`

```env
# Database
DATABASE_URL=mysql://u521934522-nasma-db-new:Downy144168@144168@127.0.0.1:3306/u521934522-nasma-db

# JWT & Session
JWT_SECRET=nesma-barzan-jwt-secret-2025-production
SESSION_SECRET=nesma-barzan-session-secret-2025-production

# OAuth (Optional)
VITE_OAUTH_PORTAL_URL=https://www.shheer.com
OAUTH_SERVER_URL=https://www.shheer.com

# Environment
NODE_ENV=production
PORT=3000
```

### Auto Deploy Script

**ملف:** `deploy.sh` (على السيرفر)

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build project
echo "🔨 Building project..."
pnpm run build

# Create uploads directory if not exists
echo "📁 Ensuring uploads directory exists..."
mkdir -p dist/public/uploads
chmod 755 dist/public/uploads

# Restart service
echo "🔄 Restarting service..."
sudo systemctl restart nesma-barzan.service

echo "✅ Deployment completed successfully!"
echo "🌐 Website: https://www.shheer.com"
```

### Systemd Service

**ملف:** `/etc/systemd/system/nesma-barzan.service`

```ini
[Unit]
Description=Nesma Barzan Trading Website
After=network.target mysql.service

[Service]
Type=simple
User=root
WorkingDirectory=/home/shheercom/htdocs/www.shheer.com
ExecStart=/usr/bin/node /home/shheercom/htdocs/www.shheer.com/dist/index.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=nesma-barzan
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Nginx Configuration

**ملف:** `/etc/nginx/sites-available/www.shheer.com.conf`

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.shheer.com;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    # Root directory
    root /home/shheercom/htdocs/www.shheer.com/dist/public;
    index index.html;

    # Proxy to Node.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /uploads/ {
        alias /home/shheercom/htdocs/www.shheer.com/dist/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### أوامر الإدارة

```bash
# التحقق من حالة الخدمة
systemctl status nesma-barzan.service

# إعادة تشغيل الخدمة
systemctl restart nesma-barzan.service

# إيقاف الخدمة
systemctl stop nesma-barzan.service

# بدء الخدمة
systemctl start nesma-barzan.service

# عرض السجلات
journalctl -u nesma-barzan.service -n 50 --no-pager

# متابعة السجلات مباشرة
journalctl -u nesma-barzan.service -f

# تحديث المشروع
cd /home/shheercom/htdocs/www.shheer.com
bash deploy.sh
```

---

## 🔐 نظام المصادقة

### نظرة عامة
يستخدم المشروع نظام مصادقة آمن يعتمد على:
- **JWT (JSON Web Tokens)** - للجلسات
- **bcrypt** - لتشفير كلمات المرور
- **HTTP-only Cookies** - لحفظ الجلسات

### تدفق تسجيل الدخول

```
1. المستخدم يدخل username + password
   ↓
2. Server يتحقق من البيانات في قاعدة البيانات
   ↓
3. bcrypt يتحقق من كلمة المرور المشفرة
   ↓
4. إنشاء JWT token مع بيانات المستخدم
   ↓
5. حفظ JWT في HTTP-only Cookie
   ↓
6. إعادة توجيه إلى لوحة التحكم
```

### بيانات الدخول الافتراضية

```
Username: admin
Password: admin123
```

⚠️ **مهم جداً:** يجب تغيير كلمة المرور فوراً بعد أول تسجيل دخول!

### تغيير كلمة المرور

1. سجل الدخول إلى لوحة التحكم
2. اذهب إلى "تغيير كلمة المرور"
3. أدخل:
   - كلمة المرور الحالية
   - كلمة المرور الجديدة (6 أحرف على الأقل)
   - تأكيد كلمة المرور الجديدة
4. اضغط "تحديث كلمة المرور"

### API Endpoints

#### تسجيل الدخول
```typescript
POST /api/trpc/auth.login

Request:
{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "role": "admin"
  }
}
```

#### التحقق من الجلسة
```typescript
GET /api/trpc/auth.me

Response:
{
  "id": 1,
  "username": "admin",
  "name": "Administrator",
  "email": "admin@nesmabarzan.com",
  "role": "admin"
}
```

#### تغيير كلمة المرور
```typescript
POST /api/trpc/auth.changePassword

Request:
{
  "currentPassword": "admin123",
  "newPassword": "NewSecurePassword123"
}

Response:
{
  "success": true,
  "message": "Password updated successfully"
}
```

#### تسجيل الخروج
```typescript
POST /api/trpc/auth.logout

Response:
{
  "success": true
}
```

---

## 🎨 لوحة التحكم

### الصفحات الرئيسية

#### 1. الرئيسية (/admin)
- نظرة عامة على لوحة التحكم
- إحصائيات سريعة
- روابط سريعة للأقسام

#### 2. إدارة المحتوى (/admin/content)
- تحرير النصوص بالعربية والإنجليزية
- إدارة محتوى الصفحة الرئيسية
- تحديث الأقسام المختلفة

#### 3. إدارة المشاريع (/admin/projects)
- إضافة مشروع جديد
- تعديل المشاريع الموجودة
- حذف المشاريع
- ترتيب المشاريع
- تفعيل/تعطيل المشاريع

#### 4. إدارة الصور (/admin/images) ⭐ محدث
- رفع صور جديدة
- عرض الصور المرفوعة
- حذف الصور
- إضافة نص بديل (Alt Text) بالعربية والإنجليزية
- عرض حجم الصورة ونوعها

**التحسينات الأخيرة:**
- ✅ إصلاح نظام رفع الصور
- ✅ دعم fileKey و mimeType
- ✅ تأمين API (فقط للمسؤولين)

#### 5. الإعدادات (/admin/settings)
- تحديث اللوقو
- معلومات الاتصال
- إعدادات الموقع العامة
- سنة التأسيس

#### 6. تغيير كلمة المرور (/admin/change-password) ⭐ محدث
- واجهة محسّنة مع القائمة الجانبية
- تصميم متناسق مع باقي لوحة التحكم
- التحقق من البيانات
- رسائل توضيحية

**التحسينات الأخيرة:**
- ✅ إضافة AdminLayout (القائمة الجانبية)
- ✅ تحسين التصميم والألوان
- ✅ إضافة أيقونات توضيحية
- ✅ دعم ثنائي اللغة

### المكونات الرئيسية

#### AdminLayout
```typescript
// المكون الأساسي لجميع صفحات لوحة التحكم
<AdminLayout>
  <YourPageContent />
</AdminLayout>
```

**المميزات:**
- القائمة الجانبية مع جميع الروابط
- Header مع اسم المستخدم وزر تسجيل الخروج
- تبديل اللغة
- تصميم متجاوب

---

## 🔧 الإصلاحات الأخيرة

### التحديث الأخير: 31 ديسمبر 2025

#### 1. إصلاح صفحة تغيير كلمة المرور ✅

**المشكلة:**
- الصفحة لا تستخدم AdminLayout
- القائمة الجانبية لا تظهر
- التصميم لا يتطابق مع باقي لوحة التحكم

**الحل:**
```typescript
// قبل
export default function ChangePassword() {
  return <div>...</div>
}

// بعد
export default function ChangePassword() {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        {/* محتوى الصفحة */}
      </div>
    </AdminLayout>
  )
}
```

**النتيجة:**
- ✅ القائمة الجانبية تظهر بشكل صحيح
- ✅ التصميم متناسق مع باقي الصفحات
- ✅ جميع الوظائف تعمل بشكل سليم

---

#### 2. إصلاح نظام رفع الصور ✅

**المشكلة:**
- رفع الصور لا يعمل
- خطأ في قاعدة البيانات: "Failed query: insert into images"
- عدم تطابق أسماء الأعمدة

**الأسباب:**
1. أسماء الأعمدة في قاعدة البيانات: `alt_ar`, `alt_en`
2. أسماء الأعمدة في الكود: `altTextAr`, `altTextEn`
3. أعمدة مفقودة: `fileKey`, `mimeType`
4. استخدام `publicProcedure` (مشكلة أمنية)

**الحلول:**

##### أ. تحديث قاعدة البيانات
```sql
-- إضافة الأعمدة المفقودة
ALTER TABLE images ADD COLUMN fileKey VARCHAR(500);
ALTER TABLE images ADD COLUMN mimeType VARCHAR(100);

-- تغيير أسماء الأعمدة
ALTER TABLE images CHANGE COLUMN alt_ar altTextAr VARCHAR(255);
ALTER TABLE images CHANGE COLUMN alt_en altTextEn VARCHAR(255);
```

##### ب. تأمين API
```typescript
// قبل
upload: publicProcedure // أي شخص يمكنه رفع الصور!

// بعد
upload: adminProcedure // فقط المسؤولين
```

##### ج. إصلاح مسار حفظ الصور
```typescript
const isProduction = process.env.NODE_ENV === 'production';
const uploadsDir = isProduction 
  ? path.join(process.cwd(), 'dist', 'public', 'uploads')
  : path.join(process.cwd(), 'client', 'public', 'uploads');
```

**النتيجة:**
- ✅ رفع الصور يعمل بنجاح
- ✅ الصور تُحفظ في المسار الصحيح
- ✅ الصور تظهر في قائمة الصور المرفوعة
- ✅ تم تأمين API (فقط للمسؤولين)

---

#### 3. تحديث DATABASE.sql ✅

**التغييرات:**
```sql
-- قبل
CREATE TABLE `images` (
  ...
  `alt_ar` varchar(255) DEFAULT NULL,
  `alt_en` varchar(255) DEFAULT NULL,
  ...
)

-- بعد
CREATE TABLE `images` (
  ...
  `fileKey` varchar(500) DEFAULT NULL,
  `mimeType` varchar(100) DEFAULT NULL,
  `altTextAr` varchar(255) DEFAULT NULL,
  `altTextEn` varchar(255) DEFAULT NULL,
  ...
)
```

---

#### 4. تحديث deploy.sh ✅

**الإضافات:**
```bash
# إنشاء مجلد uploads تلقائياً
mkdir -p dist/public/uploads
chmod 755 dist/public/uploads
```

---

## 🐛 حل المشاكل

### المشكلة: الموقع لا يعمل بعد النشر

**الحل:**
```bash
# 1. تحقق من حالة الخدمة
systemctl status nesma-barzan.service

# 2. عرض السجلات
journalctl -u nesma-barzan.service -n 50 --no-pager

# 3. إعادة تشغيل الخدمة
systemctl restart nesma-barzan.service

# 4. تحقق من المنفذ
netstat -tulpn | grep 3000
```

---

### المشكلة: لا يمكن تسجيل الدخول

**الأسباب المحتملة:**
1. قاعدة البيانات غير محدثة
2. JWT_SECRET غير معرف
3. كلمة المرور غير صحيحة
4. مشكلة في الـ Cookies

**الحل:**
```bash
# 1. تحقق من قاعدة البيانات
mysql -u u521934522-nasma-db-new -p u521934522-nasma-db -e "SELECT * FROM users WHERE username='admin';"

# 2. تحقق من متغيرات البيئة
cat /home/shheercom/htdocs/www.shheer.com/.env | grep JWT_SECRET

# 3. امسح الـ Cookies في المتصفح

# 4. استخدم البيانات الافتراضية
# Username: admin
# Password: admin123
```

---

### المشكلة: رفع الصور لا يعمل

**الحل:**
```bash
# 1. تحقق من مجلد uploads
ls -la /home/shheercom/htdocs/www.shheer.com/dist/public/uploads/

# 2. تحقق من الصلاحيات
chmod 755 /home/shheercom/htdocs/www.shheer.com/dist/public/uploads/

# 3. تحقق من بنية جدول images
mysql -u u521934522-nasma-db-new -p u521934522-nasma-db -e "DESCRIBE images;"

# 4. تحقق من السجلات
journalctl -u nesma-barzan.service -n 50 --no-pager | grep images
```

---

### المشكلة: القائمة الجانبية لا تظهر

**السبب:** الصفحة لا تستخدم `AdminLayout`

**الحل:**
```typescript
// تأكد من أن الصفحة تستخدم AdminLayout
import AdminLayout from "@/components/AdminLayout";

export default function YourPage() {
  return (
    <AdminLayout>
      {/* محتوى الصفحة */}
    </AdminLayout>
  );
}
```

---

### المشكلة: خطأ "Invalid Compact JWS"

**السبب:** `JWT_SECRET` غير معرف أو فارغ

**الحل:**
```bash
# 1. تحقق من .env
cat /home/shheercom/htdocs/www.shheer.com/.env | grep JWT_SECRET

# 2. إضافة JWT_SECRET إذا كان مفقوداً
echo "JWT_SECRET=nesma-barzan-jwt-secret-2025-production" >> /home/shheercom/htdocs/www.shheer.com/.env

# 3. إعادة تشغيل الخدمة
systemctl restart nesma-barzan.service
```

---

### المشكلة: خطأ "Unknown column 'openId'"

**السبب:** قاعدة البيانات قديمة

**الحل:**
```sql
-- استيراد DATABASE.sql الجديد
mysql -u u521934522-nasma-db-new -p u521934522-nasma-db < DATABASE.sql

-- أو تحديث يدوي
ALTER TABLE users MODIFY COLUMN openId varchar(64) DEFAULT NULL;
```

---

## 📚 API Documentation

### Base URL
```
Production: https://www.shheer.com/api/trpc
Development: http://localhost:3000/api/trpc
```

### Authentication APIs

#### Login
```typescript
POST /auth.login

Request:
{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "role": "admin"
  }
}
```

#### Get Current User
```typescript
GET /auth.me

Response:
{
  "id": 1,
  "username": "admin",
  "name": "Administrator",
  "email": "admin@nesmabarzan.com",
  "role": "admin"
}
```

#### Change Password
```typescript
POST /auth.changePassword

Request:
{
  "currentPassword": "admin123",
  "newPassword": "NewPassword123"
}

Response:
{
  "success": true
}
```

#### Logout
```typescript
POST /auth.logout

Response:
{
  "success": true
}
```

---

### Images APIs

#### Upload Image
```typescript
POST /images.upload

Request:
{
  "filename": "image.png",
  "base64Data": "iVBORw0KGgoAAAANSUhEUgAA...",
  "mimeType": "image/png",
  "altTextAr": "صورة اختبار",
  "altTextEn": "Test image"
}

Response:
{
  "id": 1,
  "url": "/uploads/xyz-image.png",
  "fileKey": "images/xyz-image.png"
}
```

#### List Images
```typescript
GET /images.list

Response:
[
  {
    "id": 1,
    "filename": "image.png",
    "url": "/uploads/xyz-image.png",
    "altTextAr": "صورة اختبار",
    "altTextEn": "Test image",
    "size": 2048,
    "mimeType": "image/png"
  }
]
```

#### Delete Image
```typescript
DELETE /images.delete

Request:
{
  "id": 1
}

Response:
{
  "success": true
}
```

---

### Content APIs

#### Get All Content
```typescript
GET /content.getAll

Response:
[
  {
    "id": 1,
    "key": "hero_title",
    "value_ar": "نسمة برزان التجارية",
    "value_en": "Nesma Barzan Trading",
    "section": "hero"
  }
]
```

#### Update Content
```typescript
POST /content.update

Request:
{
  "key": "hero_title",
  "value_ar": "عنوان جديد",
  "value_en": "New Title"
}

Response:
{
  "success": true
}
```

---

### Projects APIs

#### Get All Projects
```typescript
GET /projects.getAll

Response:
[
  {
    "id": 1,
    "title_ar": "مشروع 1",
    "title_en": "Project 1",
    "description_ar": "وصف المشروع",
    "description_en": "Project description",
    "image": "/uploads/project1.jpg",
    "status": "active"
  }
]
```

#### Create Project
```typescript
POST /projects.create

Request:
{
  "title_ar": "مشروع جديد",
  "title_en": "New Project",
  "description_ar": "وصف",
  "description_en": "Description",
  "image": "/uploads/image.jpg"
}

Response:
{
  "id": 2,
  "success": true
}
```

#### Update Project
```typescript
POST /projects.update

Request:
{
  "id": 1,
  "title_ar": "مشروع محدث",
  "title_en": "Updated Project"
}

Response:
{
  "success": true
}
```

#### Delete Project
```typescript
DELETE /projects.delete

Request:
{
  "id": 1
}

Response:
{
  "success": true
}
```

---

### Settings APIs

#### Get All Settings
```typescript
GET /settings.getAll

Response:
[
  {
    "key": "site_logo",
    "value": "/uploads/logo.png",
    "type": "image",
    "label_ar": "شعار الموقع",
    "label_en": "Site Logo"
  }
]
```

#### Update Setting
```typescript
POST /settings.update

Request:
{
  "key": "site_logo",
  "value": "/uploads/new-logo.png"
}

Response:
{
  "success": true
}
```

---

## 📁 هيكل المشروع

```
NESMA-BARAZAN/
├── client/                          # Frontend (React)
│   ├── public/                      # Static files
│   │   └── uploads/                 # Uploaded images (dev)
│   ├── src/
│   │   ├── pages/                   # Pages
│   │   │   ├── Home.tsx            # Homepage
│   │   │   ├── Login.tsx           # Login page
│   │   │   └── admin/              # Admin pages
│   │   │       ├── Dashboard.tsx
│   │   │       ├── Content.tsx
│   │   │       ├── Projects.tsx
│   │   │       ├── Images.tsx
│   │   │       ├── Settings.tsx
│   │   │       └── ChangePassword.tsx  # ⭐ Updated
│   │   ├── components/              # Components
│   │   │   ├── AdminLayout.tsx     # Admin layout wrapper
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── lib/                     # Utilities
│   │   │   ├── trpc.ts             # tRPC client
│   │   │   └── i18n.ts             # Internationalization
│   │   └── main.tsx                 # Entry point
│   └── index.html
│
├── server/                          # Backend (Express)
│   ├── _core/                       # Core modules
│   │   ├── index.ts                # Server entry
│   │   ├── env.ts                  # Environment config
│   │   ├── sdk.ts                  # SDK utilities
│   │   └── cookies.ts              # Cookie config
│   ├── auth.ts                      # Authentication
│   ├── routers.ts                   # API routes ⭐ Updated
│   └── db.ts                        # Database operations
│
├── drizzle/                         # Database migrations
│   └── schema.ts                    # Database schema
│
├── shared/                          # Shared types
│   └── types.ts
│
├── dist/                            # Production build
│   ├── index.js                     # Compiled server
│   └── public/                      # Static assets
│       └── uploads/                 # Uploaded images (prod)
│
├── DATABASE.sql                     # Database schema ⭐ Updated
├── COMPLETE_DOCUMENTATION.md        # This file ⭐ New
├── PROJECT_DOCUMENTATION.md         # Technical docs
├── DEPLOYMENT.md                    # Deployment guide
├── README.md                        # Project overview
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env                             # Environment variables
```

---

## 🔄 سير العمل (Workflow)

### تطوير ميزة جديدة

```bash
# 1. إنشاء فرع جديد
git checkout -b feature/new-feature

# 2. تطوير الميزة
# ... code changes ...

# 3. اختبار محلي
pnpm run dev

# 4. بناء للإنتاج
pnpm run build

# 5. Commit & Push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 6. Create Pull Request on GitHub

# 7. Merge to main

# 8. Deploy to production
ssh root@72.62.7.159
cd /home/shheercom/htdocs/www.shheer.com
bash deploy.sh
```

---

### تحديث قاعدة البيانات

```bash
# 1. تعديل DATABASE.sql محلياً

# 2. اختبار التغييرات
mysql -u root -p < DATABASE.sql

# 3. Commit & Push
git add DATABASE.sql
git commit -m "Update database schema"
git push origin main

# 4. تطبيق على السيرفر
ssh root@72.62.7.159
mysql -u u521934522-nasma-db-new -p u521934522-nasma-db < /path/to/DATABASE.sql
```

---

## 📞 الدعم والمساعدة

### للمطورين
- راجع هذا الملف للتوثيق الشامل
- افتح Issue على GitHub للمشاكل التقنية
- استخدم Git Blame لمعرفة تاريخ التغييرات

### للمسؤولين
- استخدم لوحة التحكم لإدارة المحتوى
- راجع قسم "حل المشاكل" للمشاكل الشائعة
- اتصل بالدعم الفني عند الحاجة

---

## 📝 سجل التغييرات (Changelog)

### v1.0.0 - 31 ديسمبر 2025

#### Added ✨
- ✅ صفحة تغيير كلمة المرور مع AdminLayout
- ✅ نظام رفع الصور محسّن ومؤمن
- ✅ دعم fileKey و mimeType في جدول images
- ✅ سكريبت deploy.sh محسّن
- ✅ توثيق شامل موحد (COMPLETE_DOCUMENTATION.md)

#### Fixed 🐛
- ✅ إصلاح القائمة الجانبية في صفحة تغيير كلمة المرور
- ✅ إصلاح رفع الصور (تطابق أسماء الأعمدة)
- ✅ إصلاح مسار حفظ الصور في الإنتاج
- ✅ إصلاح أمان APIs (من public إلى admin)

#### Changed 🔄
- ✅ تحديث DATABASE.sql بالبنية الجديدة
- ✅ تحسين تصميم صفحة تغيير كلمة المرور
- ✅ تحديث جدول images (camelCase)

---

## 🎯 الخطوات القادمة

### قريباً
- [ ] إضافة نظام النسخ الاحتياطي التلقائي
- [ ] إضافة لوحة إحصائيات متقدمة
- [ ] تحسين أداء رفع الصور (ضغط تلقائي)
- [ ] إضافة نظام الإشعارات

### مستقبلاً
- [ ] دعم لغات إضافية
- [ ] نظام إدارة المستخدمين المتعددين
- [ ] API للتطبيقات الخارجية
- [ ] تطبيق موبايل

---

## 📄 الترخيص

هذا المشروع ملك لشركة **نسمة برزان التجارية**.  
جميع الحقوق محفوظة © 2025

---

## 🙏 شكر وتقدير

تم تطوير هذا المشروع بواسطة فريق التطوير المحترف.

**للتواصل:**
- 📧 Email: info@shheer.com
- 📱 Phone: +966 555 499 991
- 🌐 Website: https://www.shheer.com

---

**آخر تحديث:** 31 ديسمبر 2025  
**الإصدار:** 1.0.0  
**الحالة:** ✅ جاهز للإنتاج

---

> **ملاحظة:** هذا هو الملف الموحد الشامل لجميع التوثيق.  
> يرجى الرجوع إليه لأي معلومات عن المشروع.

