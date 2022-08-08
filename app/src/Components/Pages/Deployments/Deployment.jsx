import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Deployment = () => {
  const [deployments, setDeployments] = useState([]);

  const namespace = "kubernetes-dashboard"
  
  useEffect(() => {
    const fnc= () => {
      const url = "/apis/apps/v1/deployments/"
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1= () => {
      const url = `/apis/apps/v1/namespaces/${namespace}/deployments/`
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
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
      name : "Name",
      selector: (row) =>  
          <div>
           {row.metadata.name}
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
    <div className='component'>
      <div>
      <h1> All  Deployments ( {deployments.length} deployments ) </h1>
      <DataTable columns={columns} data={deployments} title={"Deployments"} fixedHeader selectableRows highlightOnHover  />
      </div>
    </div>
  )
}

export default Deployment