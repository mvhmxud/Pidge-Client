import React, { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Paperclip, Send, Video, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { boolean, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { sendMessageSchema } from "@/lib/utils/form-schema";
import { Message, useChat } from "@/context/chat";
import api from "@/lib/axios";

type FormValues = z.infer<typeof sendMessageSchema>;

const ChatInput = ({
  username,
  chatId,
}: {
  username: string;
  chatId: string;
}) => {
  const { setMessages } = useChat();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      message: "",
      attachments: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    try {
      const filesArray = Array.from(selectedFiles);
      form.setValue("attachments", filesArray, { shouldValidate: true });
      setFiles(filesArray);
    } catch (error) {
      toast.error("Invalid file selection", {
        description:
          error instanceof Error ? error.message : "Please select valid files",
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    form.setValue("attachments", newFiles.length ? newFiles : undefined, {
      shouldValidate: true,
    });

    if (newFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createOptimisticMessage = (data: FormValues): Message => ({
    _id: crypto.randomUUID(),
    content: data.message || "",
    sender: {
      _id: "680f5f27e7f60c85e08527c1",
      name: "Mahmoud",
      image:
        "https://res.cloudinary.com/dncfl5cnv/image/upload/v1745712529/subz/issoamgfnxsk52fgykda.jpg",
    },
    createdAt: new Date(),
    readBy: [],
    attachments:
      data.attachments?.map((file) => ({
        type: file.type.startsWith("image/") ? "image" : "video",
        url: URL.createObjectURL(file),
        preview: URL.createObjectURL(file),
      })) ?? [],
    isEdited: false,
    reactions: [],
    pending: true,
  });

  const onSubmit = async (data: FormValues) => {
    form.reset();
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    try {
      const newMessage = createOptimisticMessage(data);
      setMessages((prev) => [...prev, newMessage]);
      console.log(newMessage);
      try {
        const formData = new FormData();

        formData.append("chatId", chatId);
        formData.append("content", data.message || "");

        if (data.attachments && data.attachments.length > 0) {
          data.attachments.forEach((file) => {
            formData.append("attachments", file);
          });
        }

        await api.post("/api/chats/messages/send", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setMessages((prev) =>
          prev.map((message) =>
            message._id === newMessage._id
              ? { ...message, pending: false }
              : message
          )
        );
      } catch (error) {
        setMessages((prev) =>
          prev.filter((message) => message._id !== newMessage._id)
        );
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const onError = (errors: any) => {
    if (errors.message) {
      toast.error(errors.message.message);
    }
    if (errors.attachments) {
      toast.error(errors.attachments.message);
    }
  };

  return (
    <div className="p-4 w-full border-b-1 bg-sidebar">
      {files.length > 0 && (
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
          {files.map((file, index) => (
            <div key={index} className="relative group overflow-hidden">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="h-16 w-16 object-cover rounded-md"
                />
              ) : (
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs">
                    <Video />
                  </span>
                </div>
              )}
              <div
                onClick={() => removeFile(index)}
                className="absolute w-full h-full bg-zinc-900 inset-0 cursor-pointer opacity-0 group-hover:opacity-60 group-hover: rounded-md transition-all ease-in-out grid place-content-center"
              >
                <X size={25} />
              </div>
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                {(file.size / (1024 * 1024)).toFixed(2)}MB
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center max-w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)} // Pass onError handler
            className="flex items-center gap-5 w-full"
          >
            <div className="flex-1">
              <FormField
                control={form.control}
                name="message"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={`Send message to @${username}`}
                        className="resize-none max-h-52"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit, onError)();
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 items-center relative">
              <Label htmlFor="attachment" className="cursor-pointer relative">
                <Paperclip className="h-5 w-5" />
                {files.length > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {files.length}
                  </Badge>
                )}
              </Label>
              <Input
                className="hidden"
                id="attachment"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                maxLength={5}
                accept="image/jpeg,image/png,image/gif,video/mp4,video/webm"
              />
              <Button
                type="submit"
                className="cursor-pointer"
                variant="outline"
                disabled={form.formState.isSubmitting}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatInput;
