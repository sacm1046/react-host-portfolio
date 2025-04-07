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
  const [title, setTitle] = useState("Title");
  const render = {
    main: <FederatedWrapper><FederatedMain title={title} /></FederatedWrapper>,
    actions: <FederatedWrapper><FederatedActions /></FederatedWrapper>,
    list: <FederatedWrapper><FederatedList /></FederatedWrapper>,
    comments: <FederatedWrapper><FederatedComments /></FederatedWrapper>
  }

  const availableCards = {
    main: { title: 'Principal', render: render.main, key: 'main' },
    actions: { title: 'Acción', render: render.actions, key: 'actions' },
    list: { title: 'Lista', render: render.list, key: 'list' },
    comments: { title: 'Comentarios', render: render.comments, key: 'comments' },
  };

  const [rows, setRows] = useState([[]]);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   console.log(rows)
  // }, [rows]);

  return (
    <div className="home__container">
      <div className="home__actions">
        <CardToggleDropdown cards={availableCards} rows={rows} onRowsChange={setRows} />
        {
          rows[0]?.length ? <button
            className="home__button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Desactivar' : 'Activar'} Edición
          </button> : null
        }

      </div>
      <GridBoard rows={rows} onRowsChange={setRows} editMode={isEditing} />
    </div>
  );
}


