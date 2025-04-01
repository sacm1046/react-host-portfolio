import FederatedActions from "../../federatedComponents/actions";
import FederatedMain from "../../federatedComponents/main";
import FederatedWrapper from "../../federatedComponents/wrapper";

export default function Home() {
  return <FederatedWrapper>
    <FederatedMain />
    <FederatedActions />
  </FederatedWrapper>
}