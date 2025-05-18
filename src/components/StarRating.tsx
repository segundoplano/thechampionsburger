import { useState } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";

type Props = {
  burgerId?: string;
  usuarioId?: string;
  initialRating: number | null;
  onRated?: (rating: number) => void;
  readOnly?: boolean;
  size?: string;
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
  const [mensaje, setMensaje] = useState("");

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
      setMensaje(`⭐ Has valorado esta burger con ${newRating} estrella${newRating > 1 ? "s" : ""}`);
      setTimeout(() => setMensaje(""), 3000); // Se borra el mensaje tras 3s
    } else {
      setMensaje("❌ Error al guardar la puntuación");
    }
  }

  return (
    <div className="flex flex-col items-center mt-2 space-y-1">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => handleRate(star)}
            disabled={readOnly}
            whileTap={{ scale: 1.2 }}
            className={`${size} ${
              readOnly ? "cursor-default" : "cursor-pointer"
            } text-yellow-400 transition-transform`}
          >
            {star <= rating ? "★" : "☆"}
          </motion.button>
        ))}
      </div>
      {mensaje && (
        <p className="text-sm text-gray-500 mt-1">{mensaje}</p>
      )}
    </div>
  );
}
