# 🍔 The Champions Burger
Aplicación web desarrollada para mostrar las hamburguesas participantes en el campeonato **The Champions Burger**. Los usuarios pueden explorar burgers, marcar las que han probado, puntuar, filtrar por alérgenos y mucho más.

## 🔥 Demo en vivo
[http://cb.lygarmo.com/]

---

## ✨ Funcionalidades principales

### 🧭 Navegación
- Página pública con hamburguesas participantes.
- Página de detalles para cada burger.
- Vista personalizada de "mis burgers" con autenticación.

### 🧠 UX / Experiencia de usuario
- Filtros por hamburguesas probadas / no probadas.
- Filtro por nombre, alérgenos, puntuación.
- Buscador inteligente en tiempo real.
- Feedback visual con mensajes dinámicos.
- Diseño responsive y accesible.

### 🍔 Página /burgers
- Listado en grid con imagen, descripción, restaurante e iconos de alérgenos.
- Estado de “Probada” visible si aplica.
- Scroll infinito con carga progresiva y skeletons.
- Interfaz cuidada con animaciones fluidas (Framer Motion).

### ⭐ Página /burgers/[id]
- Detalle de burger con información completa.
- Si el usuario está logueado: marcar como probada y puntuar.
- Si no está logueado: mensaje + CTA para iniciar sesión.
- Transiciones suaves y layout elegante.

### ✅ Página /misburgers
- Listado personalizado de hamburguesas probadas.
- Filtros avanzados y ordenación por puntuación.
- Edición y eliminación de puntuaciones.
- Modal de confirmación para eliminar.

---

## ⚙️ Tecnologías utilizadas

- **Framework:** Astro
- **Estilos:** TailwindCSS
- **Animaciones:** Framer Motion
- **Backend / DB:** Supabase
- **Auth:** Clerk.dev

---

## 🧪 Instalación y ejecución local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/segundoplanothechampionsburger.git
   ```

2. Entra en la carpeta de tu proyecto
    ```bash
   cd thechampionsburger
   ```

3. Instala las dependencias
    ```bash
   npm install
   ```

4. Crea tu archivo .env con las claves necesarias
    ```bash
    PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_clerk
    PUBLIC_SUPABASE_URL=tu_url_supabase
    PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
    ```
5. Inicia tu servidor local
    ```bash
    npm run dev
    ```
---

## 🧑‍🤝‍🧑 Colaboradores

### ![Alessandro](imagen)  
**Alessandro**  
Responsable del backend de la aplicación. Desarrolló la lógica del servidor, gestionó las rutas, la comunicación con la base de datos y aseguró el correcto funcionamiento de la API.

---

### ![Natacha](imagen)  
**Natacha**  
Encargada del diseño visual y los estilos de la página. Desarrolló una interfaz atractiva, coherente y adaptable, mejorando la experiencia del usuario mediante una estética moderna y funcional.

---

### ![Lydia](himagen)  
**Lydia**  
Responsable del diseño y gestión de la base de datos. Me encargué de estructurar y optimizar el almacenamiento de la información para garantizar una integración fluida con el backend y un acceso eficiente desde el sistema de autenticación.

---

## 🧾 Licencia
Este proyecto está bajo la licencia MIT.
