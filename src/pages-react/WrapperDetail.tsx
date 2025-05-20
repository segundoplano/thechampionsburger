import AppShell from "../components/AppShell";
import BurgerDetailPage from "./BurgerDetailPage";

type Props = {
  burgerId: string;
};

export default function BurgerDetailWrapper({ burgerId }: Props) {
  return (
    <AppShell>
      <BurgerDetailPage burgerId={burgerId} />
    </AppShell>
  );
}
