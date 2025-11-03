import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      return { url: file.url, key: file.key };
    },
  ),
  avatar: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      return { url: file.url, key: file.key };
    },
  ),
  documents: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "1MB" },
    video: { maxFileSize: "4MB" },
    audio: { maxFileSize: "4MB" },
    blob: { maxFileSize: "4MB" },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url, key: file.key };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
