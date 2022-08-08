import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Services = () => {
  const [services, setServices] = useState([]);

  const namespace = "argocd"

  useEffect(() => {
    const fnc = () => {
      const url = "/api/v1/services/"
      axios.get(url).then((response) => {
        setServices(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/services/`
      axios.get(url).then((response) => {
        setServices(response.data.items);
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
      name: "Type",
      selector: (row) => row.spec.type
    },
    {
      name: "ClusterIP",
      selector: (row) => row.spec.clusterIP
    },
    {
      name: "Selector",
      selector: (row) => Object.keys(row.metadata.labels).map((key, value) => {
        return (
          <div className='labels'>
            <span>{key} : {row.metadata.labels[key]}</span>
          </div>
        )
      })
    },
  ]
  return (
    <div className='component'>
      <div>
        <h1> All  Services ( {services.length} Services ) </h1>
        <DataTable columns={columns} data={services} title={"Services"} fixedHeader selectableRows highlightOnHover />
      </div>
    </div>
  )
}

export default Services