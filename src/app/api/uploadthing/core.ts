import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ file }) => {
    // Lưu metadata
    // console.log("File uploaded: ", {
    //   key: file.key,
    //   url: file.url,
    //   size: file.size,
    //   type: file.type ?? "",
    // });
    // Trả về để client dùng
    return { url: file.url, key: file.key };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
