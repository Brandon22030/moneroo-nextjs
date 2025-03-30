import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔍 Données reçues du frontend :", body);

    const {
      amount,
      currency,
      description,
      email,
      firstName,
      lastName,
      returnUrl,
    } = body;

    if (!returnUrl) {
      console.error("❌ ERREUR : returnUrl est undefined !");
      return NextResponse.json(
        { message: "returnUrl est requis" },
        { status: 400 }
      );
    }

    const data = {
      amount: Number(amount),
      currency,
      description,
      customer: {
        email,
        first_name: firstName,
        last_name: lastName,
      },
      return_url: returnUrl, // Assurez-vous que cette valeur est bien envoyée
      metadata: {
        order_id: `order_${Date.now()}`,
        customer_id: email,
      },
      methods: ["mtn_bj"],
    };

    console.log("🚀 Données envoyées à Moneroo :", data);

    const response = await axios.post(
      "https://api.moneroo.io/v1/payments/initialize",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MONEROO_SECRET_KEY}`,
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Réponse Moneroo :", response.data);

    return NextResponse.json(
      { ...response.data.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Erreur Moneroo :", error.response?.data || error.message);

    return NextResponse.json(
      {
        message: "Erreur lors de l'initialisation du paiement",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
