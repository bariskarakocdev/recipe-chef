const BASE_URL = "https://recipechef-chatbot.onrender.com";

export async function searchRecipes(message) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  return data.reply;
}

export async function getRecipeDetail(index) {
  const res = await fetch(`${BASE_URL}/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index })
  });
  const data = await res.json();
  return data.reply;
}

export async function resetChat() {
  await fetch(`${BASE_URL}/reset`, { method: "POST" });
}