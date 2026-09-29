import { NextResponse } from "next/server";
import { isCurrentAdmin, ADMIN_CREDENTIALS } from "@/lib/auth/admin-auth";
import { getAdmin2FAConfig, getTotpUri } from "@/lib/auth/totp-service";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET() {
  const isAdmin = await isCurrentAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  const config = getAdmin2FAConfig();
  const otpauthUri = getTotpUri(ADMIN_CREDENTIALS.username, config.secret);

  // Generate offline QR code Data URL with high contrast for Google Authenticator
  let qrCodeUrl = "";
  try {
    qrCodeUrl = await QRCode.toDataURL(otpauthUri, {
      width: 240,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#020617",
        light: "#ffffff",
      },
    });
  } catch {
    // Fallback if local generation fails
    qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(otpauthUri)}`;
  }

  return NextResponse.json({
    secret: config.secret,
    otpauthUri,
    qrCodeUrl,
    isEnabled: config.enabled,
    backupCodes: config.backupCodes,
    createdAt: config.createdAt,
  });
}
