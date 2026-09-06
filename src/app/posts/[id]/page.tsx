import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, CATEGORY_LABELS } from "@/lib/posts";
import { getComments } from "@/lib/comments";
import { createCommentAction } from "@/app/actions";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const comments = await getComments(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <header className="border-b border-orange-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <Link
            href="/"
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            ← 목록으로
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-6 py-8">
        <article className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="text-xs text-stone-400">
              {new Date(post.createdAt).toLocaleString("ko-KR")}
            </span>
          </div>
          <h1 className="mt-2 text-xl font-bold text-stone-800">
            {post.title}
          </h1>
          <p className="mt-3 whitespace-pre-wrap text-sm text-stone-600">
            {post.content}
          </p>
          <p className="mt-4 text-xs font-medium text-stone-400">
            작성자: {post.author}
          </p>
        </article>

        <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-700">
            댓글 {comments.length}개
          </h2>

          <ul className="mt-4 space-y-3">
            {comments.length === 0 && (
              <li className="text-sm text-stone-400">
                아직 댓글이 없어요. 첫 댓글을 남겨보세요!
              </li>
            )}
            {comments.map((c) => {
              const isAI = c.author === "AI 상담원";
              return (
                <li
                  key={c.id}
                  className={`rounded-xl p-3 ${
                    isAI ? "bg-amber-100/70" : "bg-orange-50/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        isAI ? "text-amber-700" : "text-stone-500"
                      }`}
                    >
                      {isAI && "🤖"} {c.author}
                    </span>
                    <span className="text-xs text-stone-400">
                      {new Date(c.createdAt).toLocaleString("ko-KR")}
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-stone-700">
                    {c.content}
                  </p>
                </li>
              );
            })}
          </ul>

          <form action={createCommentAction} className="mt-5 space-y-2">
            <input type="hidden" name="postId" value={post.id} />
            <textarea
              name="content"
              required
              rows={3}
              placeholder="댓글을 남겨주세요"
              className="w-full rounded-xl border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm text-stone-700 focus:border-orange-400 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                댓글 등록
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
