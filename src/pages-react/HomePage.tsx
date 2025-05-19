// src/pages-react/HomePage.tsx
import AppShell from "../components/AppShell";
import Banner from "../components/Banner";
import BurgerCarousel from "../components/BurgerCarousel";
import SeccionHome from "../components/SeccionHome";

export default function HomePage() {
  return (
    <AppShell>
      <Banner />
      <BurgerCarousel />
      <SeccionHome />
    </AppShell>
  );
}
