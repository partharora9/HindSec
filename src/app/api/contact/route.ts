import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body || {};

    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        { ok: false, error: "First name is required" },
        { status: 400 }
      );
    }

    if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json(
        { ok: false, error: "Last name is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: "A valid email address is required" },
        { status: 400 }
      );
    }

    // In a real application, persist or send email notification
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
