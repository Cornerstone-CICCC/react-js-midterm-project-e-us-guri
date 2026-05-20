import { generateUploadButton } from "@uploadthing/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const UploadButton = generateUploadButton({
  url: `${API_URL}/uploadthing`,
});
