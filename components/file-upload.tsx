"use-client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import "@uploadthing/react/styles.css";
import Image from "next/image";

interface Props {
  onChange: (url?: string) => void;
  endpoint: "messageFile" | "serverImage";
  value: string;
}

const FileUpload = ({ endpoint, onChange, value }: Props) => {
  if (value) {
    return (
      <div className="relative h-20 w-20">
        <Image
          className="rounded-full"
          alt="image to upload"
          src={value}
          width={100}
          height={100}
        />
        <button
          className="rounded-full absolute top-0 right-0 text-white bg-rose-600 p-1 shadow-sm"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      onUploadBegin={(name) => {
        console.log("Uploading: ", name);
      }}
    />
  );
};

export default FileUpload;
