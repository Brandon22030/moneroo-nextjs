"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "XOF",
    description: "",
    email: "",
    firstName: "",
    lastName: "",
    returnUrl: "http://localhost:3000/payment/thank-you",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors du paiement");

      // Rediriger l'utilisateur vers la page de paiement Moneroo
      window.location.href = data.checkout_url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Initier un Paiement</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="amount"
          type="number"
          placeholder="Montant"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="currency"
          type="text"
          placeholder="Devise (ex: XOF)"
          value={formData.currency}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email client"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="firstName"
          type="text"
          placeholder="Prénom client"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Nom client"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Traitement..." : "Payer maintenant"}
        </button>
      </form>
    </div>
  );
}
