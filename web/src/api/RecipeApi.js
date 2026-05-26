const BASE_URL = "https://recipechef-chatbot.onrender.com";

async function fetchWithTimeout(url, options, timeoutMs = 60000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (e) {
    clearTimeout(timer);
    if (e.name === "AbortError") throw new Error("İstek zaman aşımına uğradı (60s). Sunucu uyanıyor olabilir, tekrar dene.");
    throw e;
  }
}

export async function searchRecipes(message) {
  const data = await fetchWithTimeout(
    `${BASE_URL}/chat`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    }
  );
  return data.reply;
}

export async function getRecipeDetail(index) {
  const data = await fetchWithTimeout(
    `${BASE_URL}/select`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index })
    }
  );
  return data.reply;
}

export async function resetChat() {
  try {
    await fetchWithTimeout(`${BASE_URL}/reset`, { method: "POST" });
  } catch {}
}