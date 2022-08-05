import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "./deployments.css"

const Deployment = () => {
  const [deployments, setDeployments] = useState([]);
  
  useEffect(() => {
    const url = "/apis/apps/v1/deployments/"
    axios.get(url).then((response) => {
      setDeployments(response.data.items);
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
      selector: (row) => row.metadata.namespace, 
    },
    {
      name : "Pods",
      selector: (row) => <>
      {row.status.availableReplicas}/{row.status.replicas}
      </>
    },
    {
      name : "Replicas",
      selector: (row) => row.status.replicas, 
    },
    {
      name : "Conditions",
      selector: (row) => <>
      {row.status.conditions[0].type} | {row.status.conditions[1].type}
      </>
    },
  ]
  return (
    <div className='deployments'>
      <div>
      <h1> All  Deployments ( {deployments.length} deployments ) </h1>
      <DataTable columns={columns} data={deployments} title={"Deployments"} fixedHeader selectableRows highlightOnHover  />
      </div>
    </div>
  )
}

export default Deployment