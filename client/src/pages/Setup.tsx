import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Setup() {
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSetup = async () => {
    if (!secretKey) {
      setResult({
        success: false,
        message: "يرجى إدخال المفتاح السري"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // استخدام fetch مباشرة بدلاً من TRPC
      const response = await fetch('/api/trpc/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secretKey
        }),
      });

      const data = await response.json();
      
      // TRPC يرجع البيانات في result
      if (data.result && data.result.data) {
        setResult(data.result.data);
      } else if (data.error) {
        setResult({
          success: false,
          message: data.error.message || "حدث خطأ أثناء الإعداد"
        });
      } else {
        setResult(data);
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || "حدث خطأ أثناء الإعداد"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>إعداد قاعدة البيانات</CardTitle>
          <CardDescription>
            صفحة إعداد يدوية لتحديث قاعدة البيانات وإنشاء المستخدم الافتراضي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey">المفتاح السري</Label>
            <Input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="أدخل المفتاح السري"
              disabled={loading}
            />
            <p className="text-sm text-gray-500">
              المفتاح السري: <code className="bg-gray-100 px-2 py-1 rounded">nesma-barzan-setup-2025</code>
            </p>
          </div>

          <Button 
            onClick={handleSetup} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "جاري الإعداد..." : "تشغيل الإعداد"}
          </Button>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {result.success ? "✅ نجح الإعداد!" : "❌ فشل الإعداد"}
                  </p>
                  <p>{result.message}</p>
                  
                  {result.details && result.details.length > 0 && (
                    <div className="mt-4 space-y-1 text-sm">
                      <p className="font-semibold">التفاصيل:</p>
                      {result.details.map((detail: string, index: number) => (
                        <p key={index} className="font-mono text-xs">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {result.success && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="font-semibold text-yellow-800">بيانات تسجيل الدخول:</p>
                      <p className="text-sm text-yellow-700">اسم المستخدم: admin</p>
                      <p className="text-sm text-yellow-700">كلمة المرور: admin123</p>
                      <p className="text-sm text-yellow-700 mt-2">
                        ⚠️ يرجى تغيير كلمة المرور بعد أول تسجيل دخول!
                      </p>
                      <Button 
                        className="mt-3"
                        onClick={() => window.location.href = '/login'}
                      >
                        الذهاب إلى صفحة تسجيل الدخول
                      </Button>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm">
            <p className="font-semibold text-blue-800 mb-2">ملاحظات:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>هذه الصفحة تُستخدم مرة واحدة فقط لإعداد قاعدة البيانات</li>
              <li>سيتم إضافة حقول username و password إلى جدول users</li>
              <li>سيتم إنشاء مستخدم افتراضي بصلاحيات المدير</li>
              <li>يمكن حذف هذه الصفحة بعد الإعداد الناجح</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
