import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const Secrets = () => {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    const url = "/api/v1/secrets/"
    axios.get(url).then((response) => {
      setSecrets(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        <div>
          <a href='/'>{row.metadata.name}</a>
        </div>
    },
    {
      name : "Namespace",
      selector: (row) => row.metadata.namespace, 
    },
    {
      name : "Labels",
      selector: (row) => row.metadata.name
    },
    {
      name : "Type",
      selector: (row) => row.type, 
    },
  ]
  return (
    <div className='deployments'>
      <div>
        <h1> All  Secrets ( {secrets.length} Secrets ) </h1>
        <DataTable columns={columns} data={secrets} title={"Secrets"} fixedHeader selectableRows highlightOnHover />
      </div>
    </div>
  )
}

export default Secrets