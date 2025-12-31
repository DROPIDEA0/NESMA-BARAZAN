# 🚀 دليل النشر والتحديث - Deployment Guide

## 📋 معلومات السيرفر

### بيانات VPS (Hostinger)
- **IP:** 72.62.7.159
- **نظام التشغيل:** Ubuntu 22.04
- **Node.js:** v22.21.0
- **مدير الحزم:** pnpm v10.4.1
- **خادم الويب:** Nginx 1.28.0
- **إدارة العمليات:** systemd

### بيانات SSH
```bash
ssh root@72.62.7.159
# كلمة المرور: Downy144168@#144168
```

### مسار المشروع على السيرفر
```
/home/shheercom/htdocs/www.shheer.com
```

---

## 🗄️ معلومات قاعدة البيانات

### بيانات الاتصال
| المعلومة | القيمة |
|---------|--------|
| **Host** | 127.0.0.1 |
| **Port** | 3306 |
| **Database Name** | u521934522-nasma-db |
| **Username** | u521934522-nasma-db-new |
| **Password** | Downy144168@144168 |

### الاتصال عبر MySQL CLI
```bash
mysql -h 127.0.0.1 -u u521934522-nasma-db-new -p'Downy144168@144168' u521934522-nasma-db
```

---

## 🔄 نظام Auto Deploy

### كيفية العمل
1. عند عمل Push إلى GitHub (branch: main)
2. قم بتشغيل سكريبت النشر يدوياً على السيرفر
3. السكريبت يقوم بـ:
   - سحب آخر التحديثات من GitHub
   - تثبيت Dependencies الجديدة
   - بناء المشروع
   - إعادة تشغيل الخدمة

### تشغيل النشر يدوياً
```bash
# الاتصال بالسيرفر
ssh root@72.62.7.159

# الانتقال لمجلد المشروع
cd /home/shheercom/htdocs/www.shheer.com

# تشغيل سكريبت النشر
bash deploy.sh
```

### محتوى سكريبت النشر
السكريبت موجود في: `/home/shheercom/htdocs/www.shheer.com/deploy.sh`

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment for Nesma Barzan..."

# Navigate to project directory
cd /home/shheercom/htdocs/www.shheer.com

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git fetch origin main
git reset --hard origin/main

# Install/update dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Rebuild better-sqlite3 for current Node.js version
echo "🔨 Rebuilding native modules..."
pnpm rebuild better-sqlite3

# Build the project
echo "🏗️  Building project..."
pnpm run build

# Restart the service
echo "🔄 Restarting service..."
systemctl restart nesma-barzan.service

# Wait for service to start
sleep 3

# Check service status
if systemctl is-active --quiet nesma-barzan.service; then
    echo "✅ Deployment completed successfully!"
    echo "🌐 Service is running on port 3000"
else
    echo "❌ Deployment failed! Service is not running."
    journalctl -u nesma-barzan.service -n 20 --no-pager
    exit 1
fi
```

---

## ⚙️ إدارة الخدمة (systemd)

### ملف الخدمة
الموقع: `/etc/systemd/system/nesma-barzan.service`

```ini
[Unit]
Description=Nesma Barzan Trading Website
After=network.target mysql.service

[Service]
Type=simple
User=root
WorkingDirectory=/home/shheercom/htdocs/www.shheer.com
Environment="NODE_ENV=production"
EnvironmentFile=/home/shheercom/htdocs/www.shheer.com/.env
ExecStart=/usr/bin/node /home/shheercom/htdocs/www.shheer.com/dist/index.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=nesma-barzan

[Install]
WantedBy=multi-user.target
```

### أوامر إدارة الخدمة
```bash
# بدء الخدمة
systemctl start nesma-barzan.service

# إيقاف الخدمة
systemctl stop nesma-barzan.service

# إعادة تشغيل الخدمة
systemctl restart nesma-barzan.service

# حالة الخدمة
systemctl status nesma-barzan.service

# تفعيل التشغيل التلقائي عند بدء النظام
systemctl enable nesma-barzan.service

# عرض السجلات (Logs)
journalctl -u nesma-barzan.service -f

# عرض آخر 50 سطر من السجلات
journalctl -u nesma-barzan.service -n 50 --no-pager
```

---

## 🌐 إعدادات Nginx

### ملف الإعداد
الموقع: `/etc/nginx/sites-enabled/www.shheer.com.conf`

### إعادة تحميل Nginx بعد التعديل
```bash
# اختبار صحة الإعدادات
nginx -t

# إعادة تحميل الإعدادات
systemctl reload nginx

# إعادة تشغيل Nginx
systemctl restart nginx
```

### عرض سجلات Nginx
```bash
# سجلات الوصول
tail -f /home/shheercom/logs/nginx/access.log

# سجلات الأخطاء
tail -f /home/shheercom/logs/nginx/error.log
```

---

## 🔐 متغيرات البيئة (.env)

### الموقع
```
/home/shheercom/htdocs/www.shheer.com/.env
```

### المحتوى الحالي
```env
DATABASE_URL=mysql://u521934522-nasma-db-new:Downy144168@144168@127.0.0.1:3306/u521934522-nasma-db
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=u521934522-nasma-db-new
DB_PASSWORD=Downy144168@144168
DB_NAME=u521934522-nasma-db
SESSION_SECRET=nesma-barzan-production-secret-2025-vps
NODE_ENV=production
PORT=3000

# OAuth Configuration (disabled for now)
VITE_OAUTH_PORTAL_URL=https://oauth.example.com
VITE_APP_ID=nesma-barzan
OAUTH_SERVER_URL=

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# Frontend Forge API (optional)
VITE_FRONTEND_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_URL=
```

⚠️ **ملاحظة:** بعد تعديل ملف `.env`، يجب إعادة بناء المشروع وإعادة تشغيل الخدمة.

---

## 📝 سجل التحديثات والإصلاحات

### 31 ديسمبر 2025
1. ✅ **ترقية Node.js** من v18.19.1 إلى v22.21.0
2. ✅ **إصلاح أسماء الأعمدة في MySQL** (open_id → openId)
3. ✅ **إصلاح نظام الجلسات** (JWT بدلاً من JSON مباشر)
4. ✅ **تحديث قاعدة البيانات** بالبنية الجديدة
5. ✅ **إنشاء مستخدم admin** بكلمة مرور مشفرة
6. ✅ **إعداد Auto Deploy Script**
7. ✅ **تكوين Nginx** للربط مع الدومين
8. ✅ **إعداد systemd service** للتشغيل الدائم

---

## 🔧 حل المشاكل الشائعة

### المشروع لا يعمل بعد النشر
```bash
# 1. تحقق من حالة الخدمة
systemctl status nesma-barzan.service

# 2. عرض السجلات
journalctl -u nesma-barzan.service -n 50 --no-pager

# 3. تحقق من المنفذ 3000
lsof -i :3000

# 4. إعادة بناء ونشر
cd /home/shheercom/htdocs/www.shheer.com
bash deploy.sh
```

### خطأ في قاعدة البيانات
```bash
# 1. اختبار الاتصال بقاعدة البيانات
mysql -h 127.0.0.1 -u u521934522-nasma-db-new -p'Downy144168@144168' u521934522-nasma-db -e "SELECT 1;"

# 2. التحقق من وجود الجداول
mysql -h 127.0.0.1 -u u521934522-nasma-db-new -p'Downy144168@144168' u521934522-nasma-db -e "SHOW TABLES;"

# 3. إعادة استيراد قاعدة البيانات
mysql -h 127.0.0.1 -u u521934522-nasma-db-new -p'Downy144168@144168' u521934522-nasma-db < DATABASE.sql
```

### الموقع يعرض 502 Bad Gateway
```bash
# 1. تحقق من تشغيل الخدمة
systemctl status nesma-barzan.service

# 2. إعادة تشغيل الخدمة
systemctl restart nesma-barzan.service

# 3. إعادة تشغيل Nginx
systemctl restart nginx
```

### تحديث Git لا يعمل
```bash
cd /home/shheercom/htdocs/www.shheer.com

# إعادة تعيين Git
git fetch origin main
git reset --hard origin/main

# حذف التغييرات المحلية
git clean -fd
```

---

## 📊 المراقبة والصيانة

### مراقبة استخدام الموارد
```bash
# استخدام CPU والذاكرة
top

# مساحة القرص
df -h

# حجم مجلد المشروع
du -sh /home/shheercom/htdocs/www.shheer.com
```

### تنظيف السجلات القديمة
```bash
# حذف سجلات systemd القديمة (أكثر من 7 أيام)
journalctl --vacuum-time=7d

# حذف سجلات Nginx القديمة
find /home/shheercom/logs/nginx/ -name "*.log.*" -mtime +30 -delete
```

### النسخ الاحتياطي
```bash
# نسخ احتياطي لقاعدة البيانات
mysqldump -h 127.0.0.1 -u u521934522-nasma-db-new -p'Downy144168@144168' u521934522-nasma-db > backup_$(date +%Y%m%d).sql

# نسخ احتياطي للمشروع
tar -czf nesma-backup-$(date +%Y%m%d).tar.gz /home/shheercom/htdocs/www.shheer.com
```

---

## 🔗 الروابط المهمة

- **الموقع الرئيسي:** https://www.shheer.com
- **لوحة التحكم:** https://www.shheer.com/login
- **GitHub Repository:** https://github.com/DROPIDEA0/NESMA-BARAZAN

---

## 👥 معلومات الاتصال

للدعم الفني أو الاستفسارات:
- **البريد الإلكتروني:** info@shheer.com
- **الهاتف:** +966 555 499 991

---

**آخر تحديث:** 31 ديسمبر 2025
