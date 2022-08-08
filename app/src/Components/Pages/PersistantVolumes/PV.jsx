import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const PV = () => {
  const [pv, setPv] = useState([]);

  const namespace = "kubernetes-dashboard"

  useEffect(() => {

    const fnc = () => {
      const url = "/api/v1/persistentvolume/"
      axios.get(url).then((response) => {
        setPv(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/persistentvolume/`
      axios.get(url).then((response) => {
        setPv(response.data.items);
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
    },
    {
      name: "Namespace",
      selector: (row) => row.metadata.namespace,
    }
  ]
  return (
    <div className='component'>
      <div>
        <h1> All  PersistantVolume ( {pv.length} PersistantVolume ) </h1>
        <DataTable columns={columns} data={pv} title={"PersistantVolume"} fixedHeader selectableRows highlightOnHover />
      </div>
    </div>
  )
}

export default PV