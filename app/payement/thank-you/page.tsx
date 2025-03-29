import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Paiement Réussi 🎉
        </h1>
        <p className="text-gray-700">Merci pour votre paiement !</p>
        <p className="text-gray-500">
          Vous allez recevoir un email de confirmation.
        </p>
        <Link
          href={"/"}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
