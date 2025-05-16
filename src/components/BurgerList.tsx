import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BurgerCard from "./BurgerCard";
import { useUser } from "@clerk/clerk-react";

type Burger = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  restaurante: string;
};

export default function BurgersList() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [probadasIds, setProbadasIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchBurgers() {
      const { data, error } = await supabase.from("hamburguesas").select("*");
      if (!error && data) setBurgers(data);
      setLoading(false);
    }

    fetchBurgers();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function fetchProbadas() {
      const { data } = await supabase
        .from("hamburguesas_probadas")
        .select("hamburguesa_id")
        .eq("usuario_id", user.id);

      const ids = data?.map((item) => item.hamburguesa_id) || [];
      setProbadasIds(ids);
    }

    fetchProbadas();
  }, [user]);

  if (loading) return <p className="text-center mt-8">Cargando hamburguesas...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {burgers.map((burger) => (
        <BurgerCard
          key={burger.id}
          {...burger}
          isProbada={probadasIds.includes(burger.id)}
        />
      ))}
    </div>
  );
}
