import FederatedActions from "../../federatedComponents/actions";
import FederatedMain from "../../federatedComponents/main";
import FederatedWrapper from "../../components/wrapper";

export default function Home() {
  return <FederatedWrapper>
    <FederatedMain />
    <FederatedActions />
  </FederatedWrapper>
}