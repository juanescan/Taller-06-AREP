document.getElementById("loginForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const text = await response.text(); // Obtener la respuesta como texto
        console.log("Respuesta del backend:", text); // Ver qué está devolviend>

        const data = JSON.parse(text); // Intentar parsear la respuesta como JS>
        console.log("Token recibido:", data.token); // Mostrar el token en cons>

        if (response.ok && data.token) {
            localStorage.setItem("token", data.token); // Guardar token en loca>
            window.location.href = "home.html"; // Redirigir a la página princi>
        } else {
            document.getElementById("mensaje").innerText = "❌ Error: " + (data.error || "Respuesta invalida del backend");
        }
    } catch (error) {
        console.error("Error al procesar la respuesta:", error);
    }
});