import { NextResponse } from "next/server";

const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzmCBb0VpkULES3r69S7Ult4JP6ttv_NnML_y9F6tMelWOr-lhGUFQ69QYenjsyTx9z/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, gender, service, date, time } = body;

    // Validate 10-digit mobile number (numbers only)
    const cleanPhone = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
    if (!/^\d{10}$/.test(cleanPhone)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please provide a valid 10-digit mobile number (numbers only)",
        },
        { status: 400 }
      );
    }

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
        name,
        phone,
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
