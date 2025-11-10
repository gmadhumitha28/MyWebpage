fetch("/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message })
})
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Message sent successfully 💌");
    } else {
      alert("Failed to send message. Please try again.");
    }
  })
  .catch(() => alert("Something went wrong!"));
