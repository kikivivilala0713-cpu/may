import Link from "next/link";
import { createPostAction } from "@/app/actions";

export default function WritePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <header className="border-b border-orange-100 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <p className="text-sm font-medium text-orange-500">고객센터</p>
          <h1 className="mt-1 text-2xl font-bold text-stone-800">글쓰기</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <form
          action={createPostAction}
          className="space-y-5 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-stone-600">
              카테고리
            </label>
            <select
              name="category"
              defaultValue="qna"
              className="mt-1.5 w-full rounded-xl border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm text-stone-700 focus:border-orange-400 focus:outline-none"
            >
              <option value="qna">Q&A</option>
              <option value="board">게시판</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600">
              제목
            </label>
            <input
              name="title"
              required
              maxLength={100}
              placeholder="제목을 입력해주세요"
              className="mt-1.5 w-full rounded-xl border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm text-stone-700 focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600">
              내용
            </label>
            <textarea
              name="content"
              required
              rows={6}
              placeholder="궁금한 점을 편하게 남겨주세요"
              className="mt-1.5 w-full rounded-xl border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm text-stone-700 focus:border-orange-400 focus:outline-none"
            />
          </div>

          <p className="text-xs text-stone-400">
            작성자는 익명으로 등록됩니다.
          </p>

          <div className="flex justify-end gap-2">
            <Link
              href="/"
              className="rounded-full px-5 py-2 text-sm font-medium text-stone-500 hover:bg-orange-50"
            >
              취소
            </Link>
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              등록하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
