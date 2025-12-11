import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: t("خطأ", "Error"),
        description: t("يرجى ملء جميع الحقول", "Please fill all fields"),
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    const result = await login(loginForm.username, loginForm.password);
    setIsLoading(false);
    if (result.success) {
      toast({
        title: t("تم تسجيل الدخول", "Login successful"),
        description: t("مرحباً بك!", "Welcome back!"),
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: t("خطأ", "Error"),
        description: t("اسم المستخدم أو كلمة المرور غير صحيحة", result.error || "Invalid credentials"),
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.username || !registerForm.password) {
      toast({
        title: t("خطأ", "Error"),
        description: t("يرجى ملء الحقول المطلوبة", "Please fill required fields"),
        variant: "destructive",
      });
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: t("خطأ", "Error"),
        description: t("كلمات المرور غير متطابقة", "Passwords do not match"),
        variant: "destructive",
      });
      return;
    }
    if (registerForm.password.length < 6) {
      toast({
        title: t("خطأ", "Error"),
        description: t("كلمة المرور يجب أن تكون ٦ أحرف على الأقل", "Password must be at least 6 characters"),
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    const result = await register({
      username: registerForm.username,
      password: registerForm.password,
      name: registerForm.name || undefined,
      email: registerForm.email || undefined,
      phone: registerForm.phone || undefined,
    });
    setIsLoading(false);
    if (result.success) {
      toast({
        title: t("تم إنشاء الحساب", "Account created"),
        description: t("مرحباً بك في جلنار!", "Welcome to Gulnar!"),
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل إنشاء الحساب", result.error || "Registration failed"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            {t("جلنار", "Gulnar")}
          </CardTitle>
          <CardDescription>
            {t("سجل دخولك أو أنشئ حساباً جديداً", "Sign in or create a new account")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("تسجيل الدخول", "Login")}</TabsTrigger>
              <TabsTrigger value="register">{t("إنشاء حساب", "Register")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">{t("اسم المستخدم", "Username")}</Label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder={t("أدخل اسم المستخدم", "Enter username")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">{t("كلمة المرور", "Password")}</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder={t("أدخل كلمة المرور", "Enter password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("تسجيل الدخول", "Login")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">{t("اسم المستخدم", "Username")} *</Label>
                  <Input
                    id="reg-username"
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    placeholder={t("أدخل اسم المستخدم", "Enter username")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-name">{t("الاسم الكامل", "Full Name")}</Label>
                  <Input
                    id="reg-name"
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder={t("أدخل اسمك الكامل", "Enter your full name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">{t("البريد الإلكتروني", "Email")}</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder={t("أدخل بريدك الإلكتروني", "Enter your email")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">{t("رقم الهاتف", "Phone")}</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder={t("أدخل رقم هاتفك", "Enter your phone number")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">{t("كلمة المرور", "Password")} *</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder={t("أدخل كلمة المرور", "Enter password")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-confirm">{t("تأكيد كلمة المرور", "Confirm Password")} *</Label>
                  <Input
                    id="reg-confirm"
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    placeholder={t("أعد إدخال كلمة المرور", "Re-enter password")}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("إنشاء حساب", "Create Account")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
