"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthFormProps } from "../../services/types";
import { authService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AuthForm({ className, type, ...props }: AuthFormProps) {
  const isLogin = type === "login";
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async () => {
    try {
      await authService.login({
        email: formData.email,
        password: formData.password,
      });
      toast.success("Welcome back! Loading your dashboard...");
      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err.message || "Login failed. Please check your credentials.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully! Please login.");
      router.push("/login");
    } catch (err: any) {
      const message = err.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {isLogin ? "Login" : "Register"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Field>

              {!isLogin && (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field>
              )}

              {error && (
                <div className="text-red-500 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                </Button>

                <FieldDescription className="text-center">
                  {isLogin ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <a href="/register" className="underline">
                        Register
                      </a>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <a href="/login" className="underline">
                        Login
                      </a>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
