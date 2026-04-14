const API_URL = "https://ai-backend-ccne.onrender.com/chat";

async function send() {
    const inputEl = document.getElementById("input");
    const chat = document.getElementById("chat");

    const input = inputEl.value.trim();

    if (!input) {
        alert("Tulis pesan dulu");
        return;
    }

    // tampilkan pesan user
    chat.innerHTML += `<p><b>Kamu:</b> ${input}</p>`;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: input })
        });

        const data = await res.json();

        if (data.reply) {
            chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
        } else {
            chat.innerHTML += `<p style="color:red;">Error: tidak ada response</p>`;
        }

    } catch (error) {
        console.error(error);
        chat.innerHTML += `<p style="color:red;">Gagal konek ke server</p>`;
    }

    inputEl.value = "";
}
