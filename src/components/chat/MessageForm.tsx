import React from "react";
import { Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import FileUpload from "./FileUpload";
import { MessageFormValues } from "@/hooks/use-message";

interface MessageFormProps {
  form: UseFormReturn<MessageFormValues>;
  username: string;
  onSubmit: (data: MessageFormValues) => Promise<void>;
  onError: (errors: any) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageForm = ({
  form,
  username,
  onSubmit,
  onError,
  handleKeyDown,
  fileInputRef,
  files,
  handleFileChange,
}: MessageFormProps) => {
  return (
    <div className="flex items-center max-w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex items-center gap-5 w-full"
        >
          <div className="flex-1">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={`Send message to @${username}`}
                      className="resize-none max-h-52"
                      onKeyDown={handleKeyDown}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 items-center">
            <FileUpload
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              filesCount={files.length}
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
  );
};

export default MessageForm;