// app/chat/[chatId]/not-found.tsx
import { paths } from "@/lib/utils/paths";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6 border rounded-lg shadow-sm bg-card">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-destructive/10 text-destructive rounded-full mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Chat Not Found</h1>
        <p className="text-muted-foreground mb-6">
          This conversation may have been deleted or never existed.
        </p>

        <Link
          href={paths.chat}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chats
        </Link>
      </div>
    </div>
  );
}
