import { randomUUID } from "crypto";

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

// DB 미연동: 서버 메모리에만 임시 저장 (서버 재시작 시 초기화됨)
const posts: Post[] = [
  {
    id: randomUUID(),
    category: "qna",
    title: "환불은 얼마나 걸리나요?",
    content:
      "환불 요청 후 영업일 기준 3~5일 이내에 처리됩니다. 궁금한 점은 언제든 남겨주세요!",
    author: "익명",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: randomUUID(),
    category: "board",
    title: "고객센터 운영시간 안내",
    content:
      "평일 오전 9시부터 오후 6시까지 운영하며, 문의 남겨주시면 최대한 빠르게 답변드릴게요 :)",
    author: "익명",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export function getPosts(): Post[] {
  return [...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addPost(data: {
  category: Category;
  title: string;
  content: string;
}): Post {
  const post: Post = {
    id: randomUUID(),
    category: data.category,
    title: data.title,
    content: data.content,
    author: "익명",
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return post;
}
