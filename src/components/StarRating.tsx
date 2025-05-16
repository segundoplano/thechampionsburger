// src/components/StarRating.tsx
import { useState } from "react";
import { supabase } from "../supabaseClient";

type Props = {
  burgerId?: string;
  usuarioId?: string;
  initialRating: number | null;
  onRated?: (rating: number) => void;
  readOnly?: boolean; // ← si es solo lectura
  size?: string; // eg: text-2xl
};

export default function StarRating({
  burgerId,
  usuarioId,
  initialRating,
  onRated,
  readOnly = false,
  size = "text-3xl",
}: Props) {
  const [rating, setRating] = useState(initialRating || 0);
  const [loading, setLoading] = useState(false);

  async function handleRate(newRating: number) {
    if (readOnly || loading || !burgerId || !usuarioId) return;
    setLoading(true);

    const { error } = await supabase
      .from("hamburguesas_probadas")
      .update({ puntuacion: newRating })
      .eq("usuario_id", usuarioId)
      .eq("hamburguesa_id", burgerId);

    setLoading(false);

    if (!error) {
      setRating(newRating);
      onRated?.(newRating);
      alert(`⭐ Has valorado esta burger con ${newRating} estrellas`);
    } else {
      alert("❌ Error al guardar la puntuación");
    }
  }

  return (
    <div className={`flex space-x-1 mt-2`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          disabled={readOnly}
          className={`${size} ${readOnly ? "cursor-default" : "cursor-pointer"} text-yellow-400`}
        >
          {star <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
