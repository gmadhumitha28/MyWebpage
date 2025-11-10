import { Resend } from 'resend';

export async function handler(event, context) {
  // Parse incoming form data
  const { name, email, message } = JSON.parse(event.body);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'yourgmail@gmail.com', // replace with your Gmail
      subject: `New Message from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    if (data.error) {
      console.error("⚠️ Resend API error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Email API error" })
      };
    }

    console.log("✅ Email sent successfully:", data.id);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent successfully" })
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Email sending failed" })
    };
  }
}
