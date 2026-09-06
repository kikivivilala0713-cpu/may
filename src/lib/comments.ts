import { supabase } from "@/lib/supabase";

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

export async function getComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    postId: row.post_id,
    content: row.content,
    author: row.author,
    createdAt: row.created_at,
  }));
}

export async function addComment(postId: string, content: string): Promise<void> {
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content,
    author: "익명",
  });

  if (error) throw error;
}
