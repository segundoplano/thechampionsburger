import BurgerDetail from "../components/BurgerDetailWrapper";

type Props = {
  burgerId: string;
};

export default function BurgerDetailPage({ burgerId }: Props) {
  return <BurgerDetail burgerId={burgerId} />;
}
