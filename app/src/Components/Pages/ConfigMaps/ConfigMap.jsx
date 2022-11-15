import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import { SelectContext } from '../../Context/Context';
import Selector from '../LimitRanges/Selector';
import Configmap_Modal from '../../Modal/Configmap_Modal';

const ConfigMap = () => {
  const [configmaps, setConfigmaps] = useState([]);
  const [info , setInfo] = useState([])
  const [state, setState] = useState(false)

  const { namespace, setNamespace } = useContext(SelectContext);
  
  const getAllnamespaces = () => {
    const url = "/api/v1/configmaps/"
    axios.get(url).then((response) => {
      setConfigmaps(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getsingleNamespace = () => {
    const url = `/api/v1/namespaces/${namespace}/configmaps/`
    axios.get(url).then((response) => {
      setConfigmaps(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    (
      namespace ? getsingleNamespace() : getAllnamespaces()
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
            <Configmap_Modal info={info} setState={setState} />
          )
        }
      </div>
    </div>
  )
}

export default ConfigMap