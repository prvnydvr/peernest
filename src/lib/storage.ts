import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { nanoid } from "nanoid";

import { AppError } from "@/lib/api";
import { getServerEnv, hasSupabaseConfig } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function savePdfUpload(file: File, userId: string) {
  const maxBytes = getServerEnv().UPLOAD_MAX_MB * 1024 * 1024;

  if (file.size > maxBytes) {
    throw new AppError(`PDF uploads must be smaller than ${getServerEnv().UPLOAD_MAX_MB}MB.`, 400);
  }

  if (file.type !== "application/pdf") {
    throw new AppError("Only PDF uploads are supported right now.", 400);
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const filename = `${nanoid(10)}-${safeName || "resource.pdf"}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (hasSupabaseConfig()) {
    const supabase = await createSupabaseServerClient();
    const storagePath = `${userId}/${filename}`;
    const { error } = await supabase.storage.from("resources").upload(storagePath, buffer, {
      contentType: "application/pdf",
      upsert: false,
    });

    if (error) {
      throw new AppError(`Supabase Storage upload failed: ${error.message}. Create a public "resources" bucket and storage policy.`, 400);
    }

    const { data } = supabase.storage.from("resources").getPublicUrl(storagePath);

    return {
      fileUrl: data.publicUrl,
      fileName: file.name,
    };
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "resources");
  await mkdir(uploadsDir, { recursive: true });

  const destination = path.join(uploadsDir, filename);

  await writeFile(destination, buffer);

  return {
    fileUrl: `/uploads/resources/${filename}`,
    fileName: file.name,
  };
}
