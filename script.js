const API_URL = "https://ai-backend-ccne.onrender.com/chat";

document.getElementById("sendBtn").addEventListener("click", send);

async function send() {
    const inputEl = document.getElementById("input");
    const chat = document.getElementById("chat");

    const input = inputEl.value.trim();
    if (!input) return;

    chat.innerHTML += `<p><b>Kamu:</b> ${input}</p>`;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            mode: "cors", // 🔥 PENTING
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: input })
        });

        console.log("STATUS:", res.status);

        const data = await res.json();

        if (data.error) {
            chat.innerHTML += `<p style="color:red;">${data.error}</p>`;
        } else {
            chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
        }

    } catch (err) {
        console.log("ERROR:", err);
        chat.innerHTML += `<p style="color:red;">Error koneksi server</p>`;
    }

    inputEl.value = "";
}
