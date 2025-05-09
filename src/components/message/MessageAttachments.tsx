"use client";

import Image from "next/image";
import CustomModal from "../Modal";

export interface Attachment {
  type: string;
  url: string;
}

interface MessageAttachmentProps {
  attachments: Attachment[];
}

export function MessageAttachment({ attachments }: MessageAttachmentProps) {
  const imageAttachments =
    attachments?.filter((attachment) => attachment.type === "image") || [];

  if (!attachments || attachments.length === 0) {
    return null;
  }

  if (imageAttachments.length > 0) {
    return <ImageGrid images={imageAttachments} />;
  }

  const videoAttachment = attachments.find(
    (attachment) => attachment.type === "video"
  );
  if (videoAttachment) {
    return (
      <video
        src={videoAttachment.url}
        controls
        className="max-h-[300px] w-full rounded-md"
      />
    );
  }

  return null;
}

interface GridProps {
  images: Attachment[];
}

function ImageGrid({ images }: GridProps) {
  const count = images.length;

  return (
    <div className="grid gap-1 max-w-full min-w-60 lg:w-92 h-64">
      {count === 1 && (
        <CustomModal
          trigger={
            <div className="w-full h-full relative">
              <Image
                src={images[0].url || "/placeholder.svg"}
                alt="Image attachment"
                fill
                className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
              />
            </div>
          }
        >
          <Image
            src={images[0].url || "/placeholder.svg"}
            alt="Image attachment"
            width={1000}
            height={1000}
            className="object-cover rounded"
          />
        </CustomModal>
      )}

      {count === 2 && (
        <div className="grid grid-cols-2 gap-1 h-full">
          {images.map((img, idx) => (
            <CustomModal
              key={idx}
              trigger={
                <div className="relative">
                  <Image
                    src={img.url || "/placeholder.svg"}
                    alt="Image attachment"
                    fill
                    className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
                  />
                </div>
              }
            >
              <Image
                alt="Image attachment"
                src={img.url || "/placeholder.svg"}
                width={1000}
                height={1000}
              />
            </CustomModal>
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="grid grid-cols-2 gap-1 h-full">
          <CustomModal
            trigger={
              <div className="relative col-span-1 h-full">
                <Image
                  src={images[0].url || "/placeholder.svg"}
                  alt="Image attachment"
                  fill
                  className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
                />
              </div>
            }
          >
            <Image
              src={images[0].url || "/placeholder.svg"}
              alt="Image attachment"
              width={1000}
              height={1000}
              className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
            />
          </CustomModal>
          <div className="grid grid-rows-2 gap-1 h-full">
            {images.slice(1).map((img, idx) => (
              <CustomModal
                key={idx}
                trigger={
                  <div key={idx} className="relative h-full">
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt="Image attachment"
                      fill
                      className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
                    />
                  </div>
                }
              >
                <Image
                  src={img.url || "/placeholder.svg"}
                  alt="Image attachment"
                  width={1000}
                  height={1000}
                  className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
                />
              </CustomModal>
            ))}
          </div>
        </div>
      )}

      {count >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
          {images.slice(0, 4).map((img, idx) => (
            <CustomModal
              key={idx}
              trigger={
                <div key={idx} className="relative">
                  <Image
                    src={img.url || "/placeholder.svg"}
                    alt="Image attachment"
                    fill
                    className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
                  />
                </div>
              }
            >
              <Image
                src={img.url || "/placeholder.svg"}
                alt="Image attachment"
                width={1000}
                height={1000}
                className="object-cover rounded cursor-pointer hover:brightness-75 transition-all ease-in-out "
              />
            </CustomModal>
          ))}
        </div>
      )}
    </div>
  );
}
