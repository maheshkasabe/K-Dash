import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const Services = () => {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    const url = "/api/v1/services/"
    axios.get(url).then((response) => {
      setServices(response.data.items);
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
    {
      name : "Type",
      selector: (row) => row.spec.type
    },
    {
      name : "ClusterIP",
      selector: (row) => row.spec.clusterIP
    },
    {
      name : "Selector",
      selector: (row) => row.selector 
    },
    {
      name : "Status",
      selector: (row) => row.spec.status
    },
  ]
  return (
    <div className='deployments'>
      <div>
      <h1> All  Services ( {services.length} Services ) </h1>
      <DataTable columns={columns} data={services} title={"Services"} fixedHeader selectableRows highlightOnHover  />
      </div>
    </div>
  )
}

export default Services