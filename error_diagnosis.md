# تشخيص خطأ الموقع - Error Diagnosis

## الخطأ الظاهر
```
TypeError: Invalid URL
```

## التحليل

الخطأ "Invalid URL" يحدث عادة عندما يحاول الكود إنشاء URL object بقيمة غير صحيحة أو فارغة.

### الأسباب المحتملة:

1. **متغيرات البيئة المفقودة أو غير الصحيحة:**
   - `VITE_APP_ID` - مطلوب للـ frontend
   - `OAUTH_SERVER_URL` - قد يكون مطلوباً
   - `BUILT_IN_FORGE_API_URL` - مطلوب لرفع الصور

2. **مشكلة في تكوين tRPC:**
   - قد يكون الـ API URL غير محدد بشكل صحيح

3. **مشكلة في OAuth configuration:**
   - OAuth معطل في الكود لكن قد تكون هناك متغيرات مطلوبة

## الحل المقترح

### الخطوة 1: إضافة المتغيرات المفقودة

يجب إضافة هذه المتغيرات في Hostinger:

```env
# Frontend variables (يجب أن تبدأ بـ VITE_)
VITE_API_URL=/api
VITE_APP_ID=nesma-barzan-prod

# Storage API (للصور)
BUILT_IN_FORGE_API_URL=https://forge.manus.im/api
BUILT_IN_FORGE_API_KEY=dummy-key-not-used

# OAuth (حتى لو معطل)
OAUTH_SERVER_URL=https://oauth.manus.im
OAUTH_CLIENT_ID=nesma-barzan-prod
OAUTH_CLIENT_SECRET=dummy-secret
```

### الخطوة 2: التحقق من ملف const.ts

الملف `client/src/const.ts` قد يحتوي على URLs تحتاج environment variables.

### الخطوة 3: إعادة البناء والنشر

بعد إضافة المتغيرات، يجب:
1. حفظ التغييرات في Hostinger
2. إعادة النشر (Redeploy)
3. انتظار اكتمال البناء
4. اختبار الموقع مرة أخرى

## تاريخ التشخيص
- **التاريخ:** 29 ديسمبر 2025
- **الحالة:** قيد الإصلاح
