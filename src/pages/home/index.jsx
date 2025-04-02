import { useState } from "react";
import FederatedActions from "../../federatedComponents/actions";
import FederatedMain from "../../federatedComponents/main";
import FederatedWrapper from "../../components/wrapper";
import "./index.scss";
import FederatedList from "../../federatedComponents/list";

export default function Home() {
  const [title, setTitle] = useState("");

  return <div className="home__container">
    <h1>React Host</h1>
    <input className="home__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title to main section" />
    <div className="home__section">
      <FederatedWrapper>
        <FederatedMain title={title} />
      </FederatedWrapper>
    </div>
    <div className="home__section">
      <FederatedWrapper>
        <FederatedActions />
      </FederatedWrapper>
    </div>
    <div className="home__section">
      <FederatedWrapper>
        <FederatedList />
      </FederatedWrapper>
    </div>
  </div>
}