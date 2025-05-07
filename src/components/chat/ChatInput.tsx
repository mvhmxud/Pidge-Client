import React, { RefObject } from "react";
import FilePreview from "./FilePreview";
import MessageForm from "./MessageForm";
import { useMessage } from "@/hooks/use-message";

interface ChatInputProps {
  username: string;
  chatId: string;
  currentUserId: string;
}

const ChatInput = ({ username, chatId, currentUserId }: ChatInputProps) => {
  const {
    files,
    form,
    fileInputRef,
    handleFileChange,
    removeFile,
    onSubmit,
    onError,
    handleKeyDown,
  } = useMessage({ chatId, currentUserId });

  return (
    <div className="p-4 w-full border-b-1 bg-sidebar">
      {files.length > 0 && <FilePreview files={files} onRemove={removeFile} />}
      <MessageForm
        form={form}
        username={username}
        onSubmit={onSubmit}
        onError={onError}
        handleKeyDown={handleKeyDown}
        fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
        files={files}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default ChatInput;
