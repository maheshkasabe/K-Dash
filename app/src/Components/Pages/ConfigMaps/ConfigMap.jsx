import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import { SelectContext } from '../../Context/Context';
import Selector from '../LimitRanges/Selector';
import Modal1 from '../../Modal/Modal1';

const ConfigMap = () => {
  const [configmaps, seConfigmaps] = useState([]);
  const [info , setInfo] = useState([])
  const [state, setState] = useState(false)

  const { namespace, setNamespace } = useContext(SelectContext);

  useEffect(() => {
    const fnc = () => {
      const url = "/api/v1/configmaps/"
      axios.get(url).then((response) => {
        seConfigmaps(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/configmaps/`
      axios.get(url).then((response) => {
        seConfigmaps(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    (
      namespace ? fnc1() : fnc()
    )

  }, [namespace])

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        <div>
          {row.metadata.name}
        </div>
      ,
    },
    {
      name: "Namespace",
      selector: (row) => row.metadata.namespace
    },
    {
      name: "Keys",
      selector: (row) => (row.data && Object.keys(row.data).map((key, val) => {
        return (
          <div key={key}>
            {key}
          </div>

        )
      }))
    },
    {
      name: "︙",
      selector: (row) => <button onClick={() => {handle(row)}}  className='btn'>︙</button>
    }
  ]

  const handle = (metadata) => {
    setState(true)
    setInfo(metadata)
    console.log(metadata)
  }
  return (
    <div className='component'>
      <div className='subcom'>
        <h1> All  Configmaps ( {configmaps.length} Configmaps ) </h1>
        <Selector />
      </div>

      <div className='Modal'>
        <DataTable columns={columns} data={configmaps} fixedHeader selectableRows highlightOnHover />
        {
          state && (
            <Modal1 info={info} setState={setState} />
          )
        }
      </div>
    </div>
  )
}

export default ConfigMap