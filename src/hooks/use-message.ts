import { useState, useRef, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendMessageSchema } from "@/lib/utils/form-schema";
import { Message, useChat } from "@/context/chat";
import api from "@/lib/axios";
import { useSocket } from "@/context/socket";
import { useMutation } from "@tanstack/react-query";

export type MessageFormValues = z.infer<typeof sendMessageSchema>;

interface UseMessageProps {
  chatId: string;
  currentUserId: string;
}

export const useMessage = ({ chatId, currentUserId }: UseMessageProps) => {
  const socket = useSocket();
  const { setMessages, messages } = useChat();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousMessagesRef = useRef<Message[] | null>(null);

  const reactionMutation = useMutation({
    mutationFn: async ({
      messageId,
      emoji,
    }: {
      messageId: string;
      emoji: string;
    }) => {
      return await api.put("/api/chats/messages/react", {
        messageId,
        emoji,
      });
    },
  });

  const reactionOptimistic = (emoji: string, messageId: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message._id !== messageId) return message;

        const existingReactions = message.reactions || [];

        // Find if user has reacted already
        const userReaction = existingReactions.find((r) =>
          r.users.some((u) => u._id === currentUserId)
        );

        // If same emoji -> remove the user's reaction (toggle off)
        if (userReaction && userReaction.emoji === emoji) {
          const updatedReactions = existingReactions
            .map((r) => ({
              ...r,
              users: r.users.filter((u) => u._id !== currentUserId),
            }))
            .filter((r) => r.users.length > 0); // remove empty reactions

          return { ...message, reactions: updatedReactions };
        }

        // Remove user from any other emoji
        const cleanedReactions = existingReactions
          .map((r) => ({
            ...r,
            users: r.users.filter((u) => u._id !== currentUserId),
          }))
          .filter((r) => r.users.length > 0);

        // Add new emoji with current user
        const targetReaction = cleanedReactions.find((r) => r.emoji === emoji);
        if (targetReaction) {
          targetReaction.users.push({ _id: currentUserId });
        } else {
          cleanedReactions.push({
            emoji,
            users: [{ _id: currentUserId }],
          });
        }

        return { ...message, reactions: cleanedReactions };
      })
    );
  };

  const handleReactionClick = (emoji: string, messageId: string) => {
    // Save snapshot for rollback
    previousMessagesRef.current = structuredClone(messages);

    // Optimistically update
    reactionOptimistic(emoji, messageId);

    // Trigger mutation
    reactionMutation.mutate(
      { messageId, emoji },
      {
        onSuccess: (res) => {
          const updatedMessage = res.data.data; // depends on your API shape
          if (updatedMessage) {
            setMessages((prev) =>
              prev.map((msg) => (msg._id === messageId ? updatedMessage : msg))
            );

            socket?.emit("message", updatedMessage);
          }
        },
        onError: () => {
          if (previousMessagesRef.current) {
            setMessages(previousMessagesRef.current);
          }
          toast.error("Failed to react to message. Try again.");
        },
      }
    );
  };

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      message: "",
      attachments: undefined,
    },
  });

  const createOptimisticMessage = useCallback(
    (data: MessageFormValues): Message => ({
      _id: crypto.randomUUID(),
      content: data.message || "",
      sender: {
        _id: currentUserId,
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
    }),
    [currentUserId]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles) return;

      try {
        const filesArray = Array.from(selectedFiles);
        form.setValue("attachments", filesArray, { shouldValidate: true });
        setFiles(filesArray);
      } catch (error) {
        toast.error("Invalid file selection", {
          description:
            error instanceof Error
              ? error.message
              : "Please select valid files",
        });
      }
    },
    [form]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      form.setValue("attachments", newFiles.length ? newFiles : undefined, {
        shouldValidate: true,
      });

      if (newFiles.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [files, form]
  );

  const onSubmit = useCallback(
    async (data: MessageFormValues) => {
      form.reset();
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      try {
        const newMessage = createOptimisticMessage(data);
        setMessages((prev) => [...prev, newMessage]);
        try {
          const formData = new FormData();

          formData.append("chatId", chatId);
          formData.append("content", data.message || "");

          if (data.attachments && data.attachments.length > 0) {
            data.attachments.forEach((file) => {
              formData.append("attachments", file);
            });
          }

          const sentMessage = await api.post(
            "/api/chats/messages/send",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setMessages((prev) =>
            prev.map((message) =>
              message._id === newMessage._id
                ? { ...message, pending: false }
                : message
            )
          );
          socket?.emit("message", sentMessage.data.messageData);
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
    },
    [chatId, createOptimisticMessage, form, setMessages, socket]
  );

  const onError = useCallback((errors: any) => {
    if (errors.message) {
      toast.error(errors.message.message);
    }
    if (errors.attachments) {
      toast.error(errors.attachments.message);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.handleSubmit(onSubmit, onError)();
      }
    },
    [form, onSubmit, onError]
  );

  return {
    files,
    form,
    fileInputRef,
    handleFileChange,
    removeFile,
    onSubmit,
    onError,
    handleKeyDown,
    handleReactionClick
  };
};
