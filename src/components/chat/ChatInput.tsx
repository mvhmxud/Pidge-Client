import React from "react";
import { Textarea } from "../ui/textarea";
import { CircleAlert, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
const Formschema = z.object({
  message: z.string().nonempty("Message Cannot be Empty"),
});
const ChatInput = () => {
  const form = useForm<z.infer<typeof Formschema>>({
    resolver: zodResolver(Formschema),
  });
  const onsubmitHandler = (data: z.infer<typeof Formschema>) => {
    toast.success("You submitted these values ", {
      description: (
        <data>
          <code >{JSON.stringify(data, null, 2)}</code>
        </data>
      ),
    });
  };

  return (
    <div className="p-4 w-full text-center border-b-1 bg-sidebar  ">
      <div className="flex items-center max-w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmitHandler)}
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
                        placeholder="Send message to @johndoe"
                        className="resize-none max-h-52  "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 items-center">
              <CircleAlert className="cursor-pointer" />
              <Button
                type="submit"
                className="cursor-pointer"
                variant="outline"
              >
                <Send />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatInput;

// // <Textarea placeholder={`send Message to @johndoe`} className="flex-11/12" rows={1} inputMode="text" />
// <button
// className="ml-4 cursor-pointer p-3 rounded-md hover:bg-muted outline-muted-foreground focus:outline-2 transition-all"
// aria-label="Open Sidebar"
// >
// <Send className="h-6 w-6" />
// </button>
