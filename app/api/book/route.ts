import { NextResponse } from "next/server";

const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzmCBb0VpkULES3r69S7Ult4JP6ttv_NnML_y9F6tMelWOr-lhGUFQ69QYenjsyTx9z/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, gender, service, date, time } = body;

    // Validate name (alphabets and spaces only, no numeric characters)
    if (
      !name ||
      typeof name !== "string" ||
      !/^[A-Za-z\s]+$/.test(name.trim()) ||
      name.trim().length < 2
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please provide a valid name containing only alphabets (no numbers).",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate and normalize mobile number
    let digits = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }

    const isIndian = digits.length === 10 && /^[6-9]/.test(digits);
    const isInternational =
      typeof phone === "string" &&
      phone.trim().startsWith("+") &&
      digits.length >= 7 &&
      digits.length <= 15;

    if (!isIndian && !isInternational) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please provide a valid mobile number.",
        },
        { status: 400 }
      );
    }

    const formattedPhone = isIndian ? `+91 ${digits}` : phone;

    const scriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      DEFAULT_SCRIPT_URL;

    // Forward the POST request to Google Apps Script Web App
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: formattedPhone,
        gender,
        service,
        date,
        time,
      }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit appointment",
      },
      { status: 500 }
    );
  }
}
