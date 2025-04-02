import { useEffect, useRef, useState } from 'react'
import { createSwapy } from 'swapy'
import FederatedActions from "../../federatedComponents/actions";
import FederatedMain from "../../federatedComponents/main";
import FederatedWrapper from "../../components/wrapper";
import FederatedList from "../../federatedComponents/list";
import FederatedComments from "../../federatedComponents/comments";
import "./index.scss";

export default function Home() {
  const [title, setTitle] = useState("");
  const swapy = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current)
      swapy.current.onSwap((event) => {
        console.log('swap', event);
      })
    }
    return () => {
      swapy.current?.destroy()
    }
  }, [])

  return <div className="home__container" ref={container}>
    <h1 className="home__title">React Host</h1>
    <input className="home__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title to main section" />

    <div className="home__main" data-swapy-slot="main">
      <div data-swapy-item="main">
        <FederatedWrapper>
          <FederatedMain title={title} />
        </FederatedWrapper>
      </div>
    </div>

    <div className="home__actions" data-swapy-slot="actions">
      <div data-swapy-item="actions">
        <FederatedWrapper>
          <FederatedActions title={title} />
        </FederatedWrapper>
      </div>
    </div>

    <div className="home__list" data-swapy-slot="list">
      <div data-swapy-item="list">
        <FederatedWrapper>
          <FederatedList />
        </FederatedWrapper>
      </div>
    </div>

    <div className="home__comments" data-swapy-slot="comments">
      <div data-swapy-item="comments">
        <FederatedWrapper>
          <FederatedComments />
        </FederatedWrapper>
      </div>
    </div>
  </div>
}


