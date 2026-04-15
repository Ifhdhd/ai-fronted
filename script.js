const API_URL = "https://ai-backend-igmc.onrender.com/chat";

const chat = document.getElementById("chat");
const input = document.getElementById("input");

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}

async function send() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("...", "ai"); // loading

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        // hapus loading
        chat.lastChild.remove();

        if (data.reply) {
            addMessage(data.reply, "ai");
        } else {
            addMessage("Error: " + JSON.stringify(data.error), "ai");
        }

    } catch (err) {
        chat.lastChild.remove();
        addMessage("Server error 😢", "ai");
    }
}

// enter = kirim
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        send();
    }
});
