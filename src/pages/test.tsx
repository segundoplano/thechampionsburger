// src/pages/test.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import BaseLayout from '../layouts/BaseLayout';

export default function TestPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('hamburguesas').select('*');
      setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <BaseLayout>
      <h1 className="text-2xl font-bold mb-4">Prueba de conexión con Supabase</h1>
      <ul className="list-disc pl-4">
        {data.map((burger) => (
          <li key={burger.id}>{burger.nombre}</li>
        ))}
      </ul>
    </BaseLayout>
  );
}