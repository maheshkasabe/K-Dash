import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';
import Configmap_Modal from '../../Modal/Configmap_Modal';

const Secrets = () => {
  const [secrets, setSecrets] = useState([]);
  const [info, setInfo] = useState([])
  const [state, setState] = useState(false)

  const { namespace, setNamespace } = useContext(SelectContext);
  
  const getAllSecrets = () => {
    const url = "/api/v1/secrets/"
    axios.get(url).then((response) => {
      setSecrets(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }
  const getSecret = () => {
    const url = `/api/v1/namespaces/${namespace}/secrets/`
    axios.get(url).then((response) => {
      setSecrets(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {

    (
      namespace ? getSecret() :getAllSecrets()
    )
  }, [namespace])

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        <div>
          {row.metadata.name}
        </div>
    },
    {
      name: "Namespace",
      selector: (row) => row.metadata.namespace,
    },
    {
      name: "Labels",
      selector: (row) => (row.metadata.labels && Object.keys(row.metadata.labels).map((key, value) => {
        return (
          <div className='labels'>
            <span>{key} : {row.metadata.labels[key]}</span>
          </div>
        )
      }))
    },
    {
      name: "Keys",
      selector: (row) => (row.data && Object.keys(row.data).map((i, val) => {
        return (
          <div className='labels'>
            <span>{i}</span>
          </div>
        )
      }))
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "︙",
      selector: (row) => <button onClick={() => { handle(row) }} className='btn'>︙</button>
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
        <h1> All  Secrets ( {secrets.length} Secrets ) </h1>
        <Selector />
      </div>
      <div className='Modal'>
      <DataTable columns={columns} data={secrets}  fixedHeader selectableRows highlightOnHover />
      {
        state && (
          <Configmap_Modal info={info} setState={setState} />
        )
      }
    </div>
    </div>
  )
}

export default Secrets