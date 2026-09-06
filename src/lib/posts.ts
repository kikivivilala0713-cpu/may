import { supabase } from "@/lib/supabase";

export type Category = "qna" | "board";

export interface Post {
  id: string;
  category: Category;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  qna: "Q&A",
  board: "게시판",
};

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    category: row.category,
    title: row.title,
    content: row.content,
    author: row.author,
    createdAt: row.created_at,
  }));
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    category: data.category,
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: data.created_at,
  };
}

export async function addPost(data: {
  category: Category;
  title: string;
  content: string;
}): Promise<void> {
  const { error } = await supabase.from("posts").insert({
    category: data.category,
    title: data.title,
    content: data.content,
    author: "익명",
  });

  if (error) throw error;
}
