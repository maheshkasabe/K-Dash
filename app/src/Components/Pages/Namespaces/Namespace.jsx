import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Namespace = () => {
  const [namespaces, setNamespaces] = useState([]);
  
  useEffect(() => {
    const url = "/api/v1/namespaces"
    axios.get(url).then((response) => {
      setNamespaces(response.data.items);
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
            {row.metadata.name}
          </div>
      ,
    },
    {
      name : "Labels",
      selector: (row) => (row.metadata.labels &&  Object.keys(row.metadata.labels).map((key, value) => {
        return (
          <div className='labels'>
            <span>{key} : {row.metadata.labels[key]}</span>
          </div>
        )
      }))
    },
    {
      name : "Age",
      selector: (row) => row.metadata.creationTimestamp
    },
    {
      name : "Status",
      selector: (row) => row.status.phase, 
    },
  ]
  return (
    <div className='component'>
      <div>
        <h1> All  Namespaces ( {namespaces.length} namespace ) </h1>
      <DataTable columns={columns} data={namespaces} title={"Namespaces"} fixedHeader selectableRows highlightOnHover  />
      </div>
        
    </div>
  )
}

export default Namespace