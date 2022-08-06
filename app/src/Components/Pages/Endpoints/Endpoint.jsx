import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const Endpoint = () => {
  const [endpoints, setEndpoints] = useState([]);
  
  useEffect(() => {
    const url = "/api/v1/endpoints/"
    axios.get(url).then((response) => {
      setEndpoints(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const columns = [
    {
      name : "Name",
      selector: (row) =>  
          <div>
            <a href='/'>{row.metadata.name}</a>
          </div>
      ,
    },
    {
      name : "Namespace",
      selector: (row) => row.metadata.namespace 
    },
  ]
  return (
    <div className='deployments'>
      <>
      <h1> All  Endpoints ( {endpoints.length} endpoints ) </h1>
      <DataTable columns={columns} data={endpoints} title={"Endpoints"} fixedHeader selectableRows highlightOnHover  />
      </>

    </div>
  )
}

export default Endpoint