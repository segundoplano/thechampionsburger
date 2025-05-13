import { useUser } from "@clerk/clerk-react";

export function ProbarBurger({ burgerId }: { burgerId: string }) {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <p className="mt-6 text-sm text-gray-600">🔒 Inicia sesión para marcar esta burger como probada.</p>;
  }

  const handleClick = async () => {
    const token = await window.Clerk.session?.getToken();
    const res = await fetch("/api/probar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ burgerId }),
    });

    if (res.ok) {
      alert("¡Guardada como probada!");
      location.reload();
    } else {
      alert("Error al marcar como probada.");
    }
  };
  console.log("🧪 Clerk user info:", useUser());


  return (
    <button
      onClick={handleClick}
      className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Marcar como probada
    </button>
  );
}
