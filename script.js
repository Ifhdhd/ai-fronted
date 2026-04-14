const API_URL = "https://ai-backend-ccne.onrender.com/chat";

async function send() {
    let input = document.getElementById("input").value;

    if (!input) return;

    let res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
    });

    let data = await res.json();

    document.getElementById("chat").innerHTML +=
        "<p><b>Kamu:</b> " + input + "</p>" +
        "<p><b>AI:</b> " + data.reply + "</p>";

    document.getElementById("input").value = "";
}