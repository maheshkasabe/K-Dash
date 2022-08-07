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
      name: "Labels",
      selector: (row) =>(row.metadata.labels &&  Object.keys(row.metadata.labels).map((key, value) => {
        return (
          <div className='labels'>
            <span>{key} : {row.metadata.labels[key]}</span>
          </div>
        )
      }))
    },
    {
      name : "Keys",
      selector: (row) =>(row.data &&  Object.keys(row.data).map((i,val) => {
        return (
          <div className='labels'>
            <span>{i}</span>
          </div>
        )
      }))
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