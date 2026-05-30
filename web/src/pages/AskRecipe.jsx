import { useState } from "react";
import { searchRecipes, getRecipeDetail, resetChat } from "../api/recipeApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export default function RecipeBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Merhaba! Malzeme yaz, tarif önereyim." }
  ]);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text }]);
  };

  const handleSearch = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    addMessage("user", msg);
    setInput("");
    setLoading(true);
    addMessage("loading", "⏳ Düşünüyorum...");

    try {
      const reply = await searchRecipes(msg);
      setMessages(prev => prev.filter(m => m.from !== "loading"));
      addMessage("bot", reply);
    } catch {
      setMessages(prev => prev.filter(m => m.from !== "loading"));
      addMessage("bot", "❌ Bağlantı hatası, tekrar dene.");
    }
    setLoading(false);
  };

  const handleSelect = async (index) => {
    if (loading) return;
    setLoading(true);
    addMessage("loading", `⏳ ${index}. tarif yükleniyor...`);

    try {
      const reply = await getRecipeDetail(index);
      setMessages(prev => prev.filter(m => m.from !== "loading"));
      addMessage("bot", reply);
    } catch {
      setMessages(prev => prev.filter(m => m.from !== "loading"));
      addMessage("bot", "❌ Tarif yüklenemedi.");
    }
    setLoading(false);
  };

  const handleReset = async () => {
    await resetChat();
    setMessages([{ from: "bot", text: "🔄 Sıfırlandı! Yeni malzeme yaz." }]);
  };

  return (
    <div style={styles.container}>
     <button onClick={() => navigate(-1)} style={{position:"fixed", top:"9rem", left:"20px",padding:"5px 10px", marginBottom:"10px",backgroundColor:'orange',color:'white',border:'none',borderRadius:'5px', display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"3px", zIndex:"1000"}}>
          <FaArrowLeft />Geri Dön
        </button>
      <h2 style={styles.title}>🍳 Tarif Botu</h2>

      {/* Mesajlar */}
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.from === "user" ? styles.userMsg : styles.botMsg)
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Tarif seçim butonları */}
      <div style={styles.selectRow}>
        {[1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={loading}
            style={styles.selectBtn}
          >
            {i}. Tarif
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder="Malzeme yaz... (örn: tavuk, soğan)"
          disabled={loading}
          style={styles.input}
        />
        <button onClick={handleSearch} disabled={loading} style={styles.sendBtn}>
          Gönder
        </button>
      </div>

      <button onClick={handleReset} style={styles.resetBtn}>
        🔄 Sıfırla
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    margin: "0 auto",
    padding: 20,
    fontFamily: "Segoe UI, sans-serif",
    background: "#0f0f1a",
    color: "#e8e8f0",
    height: "83.5vh",
    overflow: "hidden"
    
  },
  title: {
    color: "#f5a623",
    textAlign: "center",
    marginBottom: 16
  },
  chatBox: {
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    height: 400,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 12
  },
  message: {
    padding: "10px 14px",
    borderRadius: 12,
    maxWidth: "85%",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5,
    fontSize: 14
  },
  botMsg: {
    background: "#1e2f5e",
    alignSelf: "flex-start"
  },
  userMsg: {
    background: "#f5a623",
    color: "#1a1a2e",
    alignSelf: "flex-end",
    fontWeight: 600
  },
  selectRow: {
    display: "flex",
    gap: 8,
    marginBottom: 8
  },
  selectBtn: {
    flex: 1,
    padding: "10px 0",
    background: "#1e2f5e",
    color: "#f5a623",
    border: "1px solid #f5a62340",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600
  },
  inputRow: {
    display: "flex",
    gap: 8,
    marginBottom: 8
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #2a2a45",
    background: "#1a1a2e",
    color: "#e8e8f0",
    fontSize: 14,
    outline: "none"
  },
  sendBtn: {
    padding: "12px 20px",
    background: "#f5a623",
    color: "#1a1a2e",
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer"
  },
  resetBtn: {
    background: "transparent",
    border: "1px solid #2a2a45",
    color: "#666",
    borderRadius: 8,
    padding: "6px 14px",
    cursor: "pointer",
    display: "block",
    margin: "0 auto"
  }
};