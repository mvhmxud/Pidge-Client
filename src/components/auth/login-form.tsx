"use client";

import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { paths } from "@/lib/utils/paths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import GoogleAuth from "../GoogleButton";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setUser } = useAuth();
  const router = useRouter();
  const formSchema = loginSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      api.post("/api/auth/login", values, { withCredentials: true }),
    onSuccess: (res) => {
      toast.success("Login successful, redirecting...", {
        duration: 2000,
      });
      setUser(res.data.user);
      router.push("/");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data?.message || "An unexpected error occurred",
        {
          description: "Please try again",
        }
      );
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 flex justify-between">
                      Password
                      <Link
                        href={paths.register}
                        className="text-sm underline underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <Spinner
                      size="small"
                      className="text-background"
                      show={true}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
                <hr />
                <GoogleAuth text="continue_with" />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
// make reusable form component
