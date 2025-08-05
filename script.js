const API_KEY = "AIzaSyA7u1ADQZXncFH30kNsjMAQC0T_TdHqaEk";

async function analisar() {
  const inputText = document.getElementById("inputText").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerText = "🔄 Analisando...";

  const prompt = `Você é o sistema SICÁRIO. Faça uma análise estruturada do seguinte conteúdo e gere 30 contra-narrativas com 500 caracteres cada:\n\n${inputText}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Não foi possível gerar a resposta.";
    outputDiv.innerText = result;
  } catch (error) {
    outputDiv.innerText = "❌ Erro: " + error.message;
  }
}
