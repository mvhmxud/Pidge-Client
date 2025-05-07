import React from "react";
import { Video, X } from "lucide-react";
import { formatFileSize } from "@/lib/utils/file-utils";

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  return (
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
            onClick={() => onRemove(index)}
            className="absolute w-full h-full bg-zinc-900 inset-0 cursor-pointer opacity-0 group-hover:opacity-60 group-hover: rounded-md transition-all ease-in-out grid place-content-center"
          >
            <X size={25} />
          </div>
          <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
            {formatFileSize(file.size)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;