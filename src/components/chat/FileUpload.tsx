import React from "react";
import { Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FileUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filesCount: number;
}

const FileUpload = ({ fileInputRef, handleFileChange, filesCount }: FileUploadProps) => {
  return (
    <div className="relative">
      <Label htmlFor="attachment" className="cursor-pointer relative">
        <Paperclip className="h-5 w-5" />
        {filesCount > 0 && (
          <Badge
            variant="default"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          >
            {filesCount}
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
    </div>
  );
};

export default FileUpload;