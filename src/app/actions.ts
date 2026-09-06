"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addPost, type Category } from "@/lib/posts";

export async function createPostAction(formData: FormData) {
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");

  if (
    (category !== "qna" && category !== "board") ||
    typeof title !== "string" ||
    typeof content !== "string" ||
    !title.trim() ||
    !content.trim()
  ) {
    throw new Error("입력값을 확인해주세요.");
  }

  addPost({
    category: category as Category,
    title: title.trim(),
    content: content.trim(),
  });

  revalidatePath("/");
  redirect("/");
}
