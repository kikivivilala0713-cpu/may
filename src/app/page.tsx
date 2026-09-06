import Link from "next/link";
import { getPosts, CATEGORY_LABELS, type Category } from "@/lib/posts";

const FILTERS: { label: string; value: "all" | Category }[] = [
  { label: "전체", value: "all" },
  { label: "Q&A", value: "qna" },
  { label: "게시판", value: "board" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = getPosts().filter(
    (p) => !category || category === "all" || p.category === category
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <header className="border-b border-orange-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <p className="text-sm font-medium text-orange-500">고객센터</p>
          <h1 className="mt-1 text-2xl font-bold text-stone-800">
            서비스 고객센터
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            궁금한 점을 남겨주시면 최대한 빠르게 답변해드릴게요 :)
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <nav className="flex gap-2">
            {FILTERS.map((f) => {
              const active = (category ?? "all") === f.value;
              return (
                <Link
                  key={f.value}
                  href={f.value === "all" ? "/" : `/?category=${f.value}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-orange-400 text-white shadow-sm"
                      : "bg-white text-stone-500 hover:bg-orange-100"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/write"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            글쓰기
          </Link>
        </div>

        <ul className="mt-6 space-y-3">
          {posts.length === 0 && (
            <li className="rounded-2xl border border-dashed border-orange-200 bg-white/60 p-10 text-center text-sm text-stone-400">
              아직 등록된 글이 없어요. 첫 글을 남겨보세요!
            </li>
          )}
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  {CATEGORY_LABELS[post.category]}
                </span>
                <span className="text-xs text-stone-400">
                  {new Date(post.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-stone-800">
                {post.title}
              </h2>
              <p className="mt-1 whitespace-pre-wrap text-sm text-stone-600">
                {post.content}
              </p>
              <p className="mt-3 text-xs font-medium text-stone-400">
                작성자: {post.author}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
