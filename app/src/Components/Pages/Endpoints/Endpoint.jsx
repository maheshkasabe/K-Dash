import { useEffect, useContext ,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const Endpoint = () => {
  const [endpoints, setEndpoints] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);

  const getAllendpoints = () => {
    const url = "/api/v1/endpoints/"
    axios.get(url).then((response) => {
      setEndpoints(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getEndpoint = () => {
    const url = `/api/v1/namespaces/${namespace}/endpoints/`
    axios.get(url).then((response) => {
      setEndpoints(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    (
      namespace ? getEndpoint() : getAllendpoints() 
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
      name: "Endpoints",
      selector: (row) => (row.subsets && row.subsets[0].addresses[0].ip)
    },
    {
      name: "Ports",
      selector: (row) => (row.subsets && (row.subsets[0].ports).map((key, val) => {
        return (
          <div key={key}>
            {key.name} : {key.port} : {key.protocol}
          </div>

        )
      }))
    },
    {
      name: "︙",
      selector: (row) => <button className='btn'>︙</button>
    }
  ]
  return (
    <div className='component'>
      <div className='subcom'>
        <h1> All  Endpoints ( {endpoints.length} endpoints ) </h1>
        <Selector />
      </div>
      <DataTable columns={columns} data={endpoints} title={"Endpoints"} fixedHeader selectableRows highlightOnHover />
    </div>
  )
}

export default Endpoint