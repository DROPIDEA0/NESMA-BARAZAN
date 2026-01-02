import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "../lib/trpc";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح", {
        description: "مرحباً بك في لوحة التحكم",
      });
      utils.auth.me.invalidate();
      setLocation("/admin");
    },
    onError: (error) => {
      toast.error("خطأ في تسجيل الدخول", {
        description: error.message,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginMutation.mutate({ username, password });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4" 
      style={{ 
        background: '#ffffff',
        minHeight: '100vh'
      }}
    >
      <Card 
        className="w-full max-w-md shadow-2xl border-0" 
        style={{ 
          background: '#ffffff',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
        }}
      >
        <CardHeader className="space-y-3 text-center">
          <div 
            className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #0DCAF0 0%, #48CAE4 100%)'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <CardTitle 
            className="text-2xl font-bold" 
            style={{ color: '#1a1a1a' }}
          >
            لوحة التحكم
          </CardTitle>
          <CardDescription 
            className="text-base" 
            style={{ color: '#666666' }}
          >
            نسمة برزان التجارية
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label 
                htmlFor="username"
                style={{ color: '#333333' }}
              >
                اسم المستخدم
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="text-right border-gray-300"
                style={{
                  background: '#f8f9fa',
                  color: '#1a1a1a',
                  borderColor: '#dee2e6'
                }}
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label 
                htmlFor="password"
                style={{ color: '#333333' }}
              >
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="text-right border-gray-300"
                style={{
                  background: '#f8f9fa',
                  color: '#1a1a1a',
                  borderColor: '#dee2e6'
                }}
                dir="rtl"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white font-semibold py-6 text-lg border-0"
              style={{
                background: 'linear-gradient(135deg, #0DCAF0 0%, #00B4D8 100%)',
                boxShadow: '0 4px 15px rgba(13, 202, 240, 0.3)'
              }}
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
