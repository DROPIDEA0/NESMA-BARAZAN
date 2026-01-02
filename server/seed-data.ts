import { getDb } from './db';

export async function seedInitialData() {
  console.log('[Seed] Starting to seed initial data...');
  
  try {
    const db = await getDb();
    if (!db) {
      console.warn('[Seed] Database not available, skipping seed');
      return;
    }

    // Import schema
    const { siteSettings } = await import("../drizzle/schema");
    
    // Check if settings already exist
    const existingSettings = await db.select().from(siteSettings).limit(1);
    if (existingSettings.length > 0) {
      console.log('[Seed] Settings already exist, skipping seed');
      return;
    }

    // Prepare data to insert
    const settingsData = [
      { key: 'site_logo', value: '/uploads/logo.png', type: 'image', category: 'general', labelAr: 'شعار الموقع', labelEn: 'Site Logo' },
      { key: 'site_name_ar', value: 'نسمة برزان التجارية', type: 'text', category: 'general', labelAr: 'اسم الموقع بالعربي', labelEn: 'Site Name (Arabic)' },
      { key: 'site_name_en', value: 'Nesma Barzan Trading', type: 'text', category: 'general', labelAr: 'اسم الموقع بالإنجليزي', labelEn: 'Site Name (English)' },
      { key: 'foundation_year', value: '2005', type: 'number', category: 'general', labelAr: 'سنة التأسيس', labelEn: 'Foundation Year' },
      { key: 'contact_phone', value: '+966 555 499 991', type: 'text', category: 'contact', labelAr: 'رقم الهاتف', labelEn: 'Phone Number' },
      { key: 'contact_email', value: 'info@shheer.com', type: 'text', category: 'contact', labelAr: 'البريد الإلكتروني', labelEn: 'Email' },
      { key: 'contact_website', value: 'www.shheer.com', type: 'text', category: 'contact', labelAr: 'الموقع الإلكتروني', labelEn: 'Website' },
      { key: 'contact_address_ar', value: 'الرياض، المملكة العربية السعودية', type: 'text', category: 'contact', labelAr: 'العنوان (عربي)', labelEn: 'Address (Arabic)' },
      { key: 'contact_address_en', value: 'Riyadh, Saudi Arabia', type: 'text', category: 'contact', labelAr: 'العنوان (إنجليزي)', labelEn: 'Address (English)' },
    ];

    // Insert data using upsert to avoid conflicts
    for (const setting of settingsData) {
      try {
        await db.insert(siteSettings).values(setting as any)
          .onDuplicateKeyUpdate({
            set: { value: setting.value },
          });
      } catch (error) {
        console.error(`[Seed] Error inserting setting ${setting.key}:`, error);
      }
    }

    console.log('[Seed] Initial data seeded successfully!');
  } catch (error) {
    console.error('[Seed] Error seeding data:', error);
    // Don't throw error, just log it to prevent app from crashing
  }
}
