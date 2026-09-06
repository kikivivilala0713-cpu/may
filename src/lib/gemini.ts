const GEMINI_MODEL = "gemini-3.6-flash";

export async function generateAIReply(
  title: string,
  content: string
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = `당신은 "서비스 고객센터" 게시판의 AI 상담원입니다. 아래 문의글에 따뜻하고 친절한 말투로 2~4문장 정도로 간결하게 답변해주세요. 확실하지 않은 내용은 정확한 안내를 위해 담당자 확인이 필요하다고 안내해주세요.

제목: ${title}
내용: ${content}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === "string" ? text.trim() : null;
}
