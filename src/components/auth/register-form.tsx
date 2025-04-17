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
import { registerSchema } from "@/lib/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import GoogleAuth from "../GoogleButton";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/utils/paths";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setUser } = useAuth();
  const router = useRouter();
  const formSchema = registerSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      username: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      api.post("/api/auth/signup", values, { withCredentials: true }),
    onSuccess: (res) => {
      toast.success("Sign up successful, redirecting...", {
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
    registerMutation.mutate(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 flex justify-between">
                      Confirm Password
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
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <Spinner
                      size="small"
                      className="text-background"
                      show={true}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <hr />
                <GoogleAuth text="signup_with" />
              </div>
            </form>
          </Form>
          <p className="text-sm text-center mt-2">
            Already have an account? <Link className="hover:underline" href={paths.login}>Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
