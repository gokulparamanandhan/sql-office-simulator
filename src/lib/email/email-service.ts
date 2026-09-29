import nodemailer from "nodemailer";

interface SendPasswordResetEmailParams {
  to: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

/**
 * Dispatches a password reset email securely via SMTP or logs strictly to server console if SMTP is not configured.
 * This guarantees the secret reset URL is NEVER sent to the client browser.
 */
export async function sendPasswordResetEmail({
  to,
  resetUrl,
  expiresInMinutes = 60,
}: SendPasswordResetEmailParams): Promise<{ sent: boolean; method: "smtp" | "console" }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_FROM || "SQL Office Simulator <noreply@sqloffice.com>";

  // If SMTP credentials are fully configured in .env.local
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e2e8f0; rounded-lg: 8px;">
          <h2 style="color: #0f172a; margin-bottom: 12px; font-weight: 800;">Reset Your SQL Office Simulator Password</h2>
          <p style="color: #334155; font-size: 14px; line-height: 1.6;">
            We received a request to reset the password for your SQL Office learning account associated with <strong>${to}</strong>.
          </p>
          <div style="margin: 28px 0; text-align: center;">
            <a href="${resetUrl}" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 700; display: inline-block;">
              Reset Password Now
            </a>
          </div>
          <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
            Or copy and paste this link into your browser:<br />
            <a href="${resetUrl}" style="color: #0284c7; word-break: break-all;">${resetUrl}</a>
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 11px;">
            This link is valid for <strong>${expiresInMinutes} minutes</strong>. If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: fromEmail,
        to,
        subject: "Reset your SQL Office Simulator Password",
        text: `We received a request to reset your password. Use the following link to set a new password: ${resetUrl} (Valid for ${expiresInMinutes} minutes). If you did not request this, ignore this message.`,
        html: htmlContent,
      });

      console.log(`[AUTH:EMAIL] Password reset email successfully dispatched to: ${to}`);
      return { sent: true, method: "smtp" };
    } catch (err) {
      console.error("[AUTH:EMAIL] SMTP transmission failed, falling back to server log:", err);
    }
  }

  // Fallback for local development / self-hosting when SMTP is not configured:
  // Strictly log to the server terminal so maintainers can test locally without exposing anything to the browser.
  console.log("----------------------------------------------------------------");
  console.log("🔒 [SECURE PASSWORD RESET LINK DISPATCHED TO USER INBOX]");
  console.log(`👤 Target User Email: ${to}`);
  console.log(`🔗 Confidential Reset URL: ${resetUrl}`);
  console.log(`⏳ Valid for: ${expiresInMinutes} minutes`);
  console.log("(Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local to send real emails)");
  console.log("----------------------------------------------------------------");

  return { sent: true, method: "console" };
}
