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
import { onboardingSchema } from "@/lib/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatMember } from "@/types/types";
interface OnBoardingFormProps extends React.ComponentProps<"div"> {
  user: ChatMember & {
    exp?: number;
}
}

export function OnBoardingForm({
  user,
  className,
  ...props
}: OnBoardingFormProps) {
  const router = useRouter();
  const formSchema = onboardingSchema;
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: user?.bio || "",
      name: user?.name || "",
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return api.put("api/users/user", {
        name: values.name,
        bio: values.bio,
        onboarding: false,
      });
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

  const UpdateImageMutation = useMutation({
    mutationFn: (image: File) => {
      const formData = new FormData();
      formData.append("image", image);
      if (image.size > 2 * 1024 * 1024) {
        throw new Error("Image size must be less than 2MB");
      }
      return api.post("api/users/user/update-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (err: AxiosError<{ message: string }> | Error) => {
      if (err instanceof Error) toast.error(err.message);
      if (err instanceof AxiosError)
        toast.error(
          err.response?.data?.message || "An unexpected error occurred",
          {
            description: "Please try again",
          }
        );
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const imagePromise = image
        ? UpdateImageMutation.mutateAsync(image)
        : Promise.resolve();
  
      const userUpdatePromise = updateUserMutation.mutateAsync(values);
  
      await Promise.all([imagePromise, userUpdatePromise]);
  
      toast.success(`Now you can start using the app, ${user.username}!`);
      router.push("/"); // or wherever you want
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    }
  };
  
 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome on board {user?.username}!
          </CardTitle>
          <CardDescription>
            Complete your profile to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col  gap-4">
          <ImageUpload image={image} setImage={setImage} user={user} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1">Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. Tyler Durden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 flex justify-between">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea className="max-h-24 resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  
                  disabled={
                    updateUserMutation.isPending ||
                    UpdateImageMutation.isPending||
                    !form.formState.isDirty
                  }
                >
                  {updateUserMutation.isPending ||
                  UpdateImageMutation.isPending ? (
                    <Spinner
                      size="small"
                      className="text-background"
                      show={true}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
