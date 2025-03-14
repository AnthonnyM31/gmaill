document.getElementById("emailForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const subject = document.getElementById("subject").value;
  const content = document.getElementById("content").value;

  try {
    const response = await fetch("https://gmaill.onrender.com/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, content }),
    });

    if (response.ok) {
      alert("Correo enviado con éxito.");
    } else {
      console.error("Error en la respuesta:", response.statusText);
      alert("Hubo un error al enviar el correo.");
    }
  } catch (error) {
    console.error("Error en fetch:", error);
    alert("Error en la conexión con el servidor.");
  }
});
