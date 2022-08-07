import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const PV = () => {
  const [pv, setPv] = useState([]);

  useEffect(() => {
    const url = "/api/v1/persistentvolume/"
    axios.get(url).then((response) => {
      setPv(response.data.items);
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
    }
  ]
  return (
    <div className='deployments'>
      <div>
        <h1> All  PersistantVolume ( {pv.length} PersistantVolume ) </h1>
        <DataTable columns={columns} data={pv} title={"PersistantVolume"} fixedHeader selectableRows highlightOnHover />
      </div>
    </div>
  )
}

export default PV