import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const Services = () => {
  const [services, setServices] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);
  const getAllservices = () => {
    const url = "/api/v1/services/"
    axios.get(url).then((response) => {
      setServices(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }
  const getService = () => {
    const url = `/api/v1/namespaces/${namespace}/services/`
    axios.get(url).then((response) => {
      setServices(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    (
      namespace ? getService() : getAllservices()
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
    {
      name: "︙",
      selector: (row) => <button className='btn'>︙</button>
    }
  ]
  return (
    <div className='component'>
      <div className='subcom'>
        <h1> All  Services ( {services.length} Services ) </h1>
        <Selector />
        </div>
        <DataTable columns={columns} data={services} title={"Services"} fixedHeader selectableRows highlightOnHover />
      
    </div>
  )
}

export default Services