"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addPost, type Category } from "@/lib/posts";
import { addComment } from "@/lib/comments";
import { generateAIReply } from "@/lib/gemini";

const AI_AUTHOR = "AI 상담원";

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

  const postId = await addPost({
    category: category as Category,
    title: title.trim(),
    content: content.trim(),
  });

  try {
    const aiReply = await generateAIReply(title.trim(), content.trim());
    if (aiReply) {
      await addComment(postId, aiReply, AI_AUTHOR);
    }
  } catch {
    // AI 댓글 생성에 실패해도 게시글 등록 자체는 계속 진행
  }

  revalidatePath("/");
  redirect("/");
}

export async function createCommentAction(formData: FormData) {
  const postId = formData.get("postId");
  const content = formData.get("content");

  if (
    typeof postId !== "string" ||
    !postId ||
    typeof content !== "string" ||
    !content.trim()
  ) {
    throw new Error("입력값을 확인해주세요.");
  }

  await addComment(postId, content.trim());

  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}
