import { useEffect, useRef, useState } from 'react'
import { createSwapy } from 'swapy'
import FederatedActions from "../../federatedComponents/actions";
import FederatedMain from "../../federatedComponents/main";
import FederatedWrapper from "../../components/wrapper";
import FederatedList from "../../federatedComponents/list";
import FederatedComments from "../../federatedComponents/comments";
import "./index.scss";
import GridBoard from '../../components/gridBoard';
import CardToggleDropdown from '../../components/cardToggleDropdown';

export default function Home() {
  // const swapy = useRef(null)
  // const container = useRef(null)
  // const [title, setTitle] = useState("");
  // const [showSection, setShowSection] = useState({
  //   main: true,
  //   actions: true,
  //   list: true,
  //   comments: true
  // })

  // const handleRadioCheck = (e) => {
  //   const { checked, name } = e.target
  //   setShowSection({ ...showSection, [name]: checked })
  // }

  // useEffect(() => {
  //   if (container.current) {
  //     swapy.current = createSwapy(container.current)
  //     swapy.current.onSwap((event) => {
  //       console.log('swap', event);
  //     })
  //   }
  //   return () => {
  //     swapy.current?.destroy()
  //   }
  // }, [])

  // return <div className="home__container">
  //   <h1 className="home__title">React Host</h1>
  //   {/* <input className="home__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title to main section" />
  //   <div className="home__sections" ref={container}>
  //     {
  //       showSection.main && <div className="home__main" data-swapy-slot="main">
  //         <div data-swapy-item="main">
  //           <FederatedWrapper>
  //             <FederatedMain title={title} />
  //           </FederatedWrapper>
  //         </div>
  //       </div>
  //     }
  //     {
  //       showSection.actions && <div className="home__actions" data-swapy-slot="actions">
  //         <div data-swapy-item="actions">
  //           <FederatedWrapper>
  //             <FederatedActions />
  //           </FederatedWrapper>
  //         </div>
  //       </div>
  //     }
  //     {
  //       showSection.list && <div className="home__list" data-swapy-slot="list">
  //         <div data-swapy-item="list">
  //           <FederatedWrapper>
  //             <FederatedList />
  //           </FederatedWrapper>
  //         </div>
  //       </div>
  //     }
  //     {
  //       showSection.comments && <div className="home__comments" data-swapy-slot="comments">
  //         <div data-swapy-item="comments">
  //           <FederatedWrapper>
  //             <FederatedComments />
  //           </FederatedWrapper>
  //         </div>
  //       </div>
  //     }
  //   </div> */}
  // </div>

  const availableCards = {
    note: { title: 'Nota', render: <div className="card-content">📝 Nota</div> },
    stats: { title: 'Estadística', render: <div className="card-content">📈 Estadística</div> },
    graph: { title: 'Gráfico', render: <div className="card-content">📊 Gráfico</div> }
  };

  const [rows, setRows] = useState([
    []
  ]);

  return (
    <div className="layout">
      <CardToggleDropdown cards={availableCards} rows={rows} onRowsChange={setRows} />
      <GridBoard rows={rows} onRowsChange={setRows}/>
    </div>
  );
}


