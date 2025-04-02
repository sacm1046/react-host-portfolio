import { useState } from "react";
import FederatedActions from "../../federatedComponents/actions";
import FederatedMain from "../../federatedComponents/main";
import FederatedWrapper from "../../components/wrapper";
import "./index.scss";

export default function Home() {
  const [title, setTitle] = useState("");

  return <div className="home__container">
    <h1>React Host</h1>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title to main section"/>
    <FederatedWrapper>
      <div className="home__section">
        <FederatedMain title={title} />
      </div>
      <div className="home__section">
        <FederatedActions />
      </div>
    </FederatedWrapper>
  </div>
}