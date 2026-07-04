import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, image, mimeType } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key Gemini belum diatur di file .env.local" },
        { status: 500 }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    let contents = [];

    if (image) {
      // Multimodal Image analysis
      contents = [
        {
          parts: [
            {
              text: "Anda adalah pakar budaya Indonesia, khususnya Batik. Analisis gambar batik ini secara akurat. Berikan hasil analisis dalam format JSON mentah tanpa markdown block (jangan gunakan ```json atau ```), pastikan formatnya valid JSON dengan properti berikut: \n{\n  \"motifName\": \"Nama Motif Batik\",\n  \"philosophy\": \"Filosofi mendalam di balik motif ini (1-2 kalimat)\",\n  \"visualTraits\": [\"ciri visual 1\", \"ciri visual 2\", \"ciri visual 3\"],\n  \"region\": \"Asal daerah motif batik ini\",\n  \"slug\": \"batik-parang\"\n}"
            },
            {
              inlineData: {
                mimeType: mimeType || "image/jpeg",
                data: image // base64 string
              }
            }
          ]
        }
      ];
    } else {
      // Standard chat
      contents = [
        {
          parts: [
            {
              text: `Kamu adalah "Nusara", asisten budaya digital dari platform Culture Verse. Kamu ahli dalam budaya, tradisi, kerajinan, kuliner, dan seni tradisional Indonesia. Jawab semua pertanyaan dengan hangat, edukatif, dan mudah dipahami. Gunakan bahasa Indonesia yang santai tapi tetap informatif. Jika ditanya di luar topik budaya Indonesia, arahkan kembali ke topik budaya dengan sopan. Sesekali tambahkan fakta menarik yang relevan untuk membuat percakapan lebih engaging.

Pertanyaan: ${message}`
            }
          ]
        }
      ];
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error?.message || "Gagal memanggil Gemini API" }, { status: response.status });
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
