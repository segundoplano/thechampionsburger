# 🍔 The Champions Burger – La app definitiva del campeonato de hamburguesas
Aplicación web desarrollada para mostrar las hamburguesas participantes en el campeonato **The Champions Burger**. Los usuarios pueden explorar burgers, marcar las que han probado, puntuar, filtrar por alérgenos y mucho más.

![Astro](https://img.shields.io/badge/Astro-Framework-blueviolet)
![React](https://img.shields.io/badge/React-Component_Lib-61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CSS-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E)
![Clerk.dev](https://img.shields.io/badge/Auth-Clerk.dev-orange)
![Hackatón Clerk](https://img.shields.io/badge/Hackat%C3%B3n-Clerk-FF4081)


## 🔥 Demo en vivo
[cb.lygarmo.com](http://cb.lygarmo.com/)

![Home]![image](https://github.com/user-attachments/assets/7ceb0432-8567-4d08-81a4-7ba561b5c82e)

![Burgers]![image](https://github.com/user-attachments/assets/c171eac7-1bce-4dc0-bc0d-054c92e89af3)

![Mis burgers]

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

## 🤔 Sobre el proyecto
Somos tres estudiantes en prácticas que actualmente colaboramos en una empresa de desarrollo web. Este proyecto ha sido realizado como parte de nuestras prácticas, combinando nuestros conocimientos en frontend, backend, diseño y gestión de datos.

La app nace para celebrar la pasión por las hamburguesas del campeonato The Champions Burger 🍔. Queríamos ofrecer una experiencia completa para los asistentes: explorar todas las burgers, llevar un registro personalizado, puntuar, filtrar por alérgenos… ¡y descubrir nuevas favoritas!

Está diseñada para ser rápida, accesible y visualmente atractiva desde cualquier dispositivo. Un proyecto hecho con cariño, código limpio y mucho hambre. 😋

---

## ⚙️ Tecnologías utilizadas

- **Framework:** Astro
- **Componentes interactivos:** React
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

| <img src="https://github.com/user-attachments/assets/582da696-8b98-4e62-b3c6-b6d5e79a88a9" width="200"/> | <img src="https://github.com/user-attachments/assets/7b5dc2db-f474-418f-ae56-a328308c9197" width="200"/> | <img src="https://github.com/user-attachments/assets/e74da348-9e90-41e0-b553-2dc48e585e78" width="200"/> |
|:--:|:--:|:--:|
| **Alessandro**<br>Responsable del backend de la aplicación. Desarrolló la lógica del servidor, gestionó las rutas, la comunicación con la base de datos y aseguró el correcto funcionamiento de la API. | **Natacha**<br>Encargada del diseño visual y los estilos de la página. Desarrolló una interfaz atractiva, coherente y adaptable, mejorando la experiencia del usuario mediante una estética moderna y funcional. | **Lydia**<br>Responsable del diseño y gestión de la base de datos. Se encargó de estructurar y optimizar el almacenamiento de la información para garantizar una integración fluida con el backend y un acceso eficiente desde el sistema de autenticación. |



## 🧾 Licencia
Este proyecto está bajo la licencia MIT.
