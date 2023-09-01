"use-client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

interface Props {
  onChange: (url?: string) => void;
  endpoint: "messageFile" | "serverImage";
  value: string;
}

const FileUpload = ({ endpoint, onChange, value }: Props) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
