const API_URL = "https://ai-backend-igmc.onrender.com/chat";

async function send() {
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const message = input.value;

    chat.innerHTML += `<p><b>Kamu:</b> ${message}</p>`;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await res.json();

        if (data.reply) {
            chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
        } else if (data.error) {
            chat.innerHTML += `<p style="color:red">ERROR: ${JSON.stringify(data.error)}</p>`;
        } else {
            chat.innerHTML += `<p style="color:red">UNKNOWN: ${JSON.stringify(data)}</p>`;
        }

    } catch (err) {
        chat.innerHTML += `<p style="color:red">FETCH ERROR: ${err}</p>`;
    }

    input.value = "";
}
