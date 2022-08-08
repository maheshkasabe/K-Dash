import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Endpoint = () => {
  const [endpoints, setEndpoints] = useState([]);

  const namespace = "kubernetes-dashboard"

  useEffect(() => {
    const fnc = () => {
      const url = "/api/v1/endpoints/"
      axios.get(url).then((response) => {
        setEndpoints(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/endpoints/`
      axios.get(url).then((response) => {
        setEndpoints(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    (
      namespace ? fnc1() : fnc() 
    )

  }, [])

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
  ]
  return (
    <div className='component'>
      <>
        <h1> All  Endpoints ( {endpoints.length} endpoints ) </h1>
        <DataTable columns={columns} data={endpoints} title={"Endpoints"} fixedHeader selectableRows highlightOnHover />
      </>

    </div>
  )
}

export default Endpoint