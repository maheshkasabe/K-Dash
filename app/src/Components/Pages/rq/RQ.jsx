import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const RQ = () => {
  const [rq, setRQ] = useState([]);

  const namespace = "argocd"

  useEffect(() => {
    const fnc = () => {
      const url = "/api/v1/resourcequotas/"
      axios.get(url).then((response) => {
        setRQ(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/resourcequotas/`
      axios.get(url).then((response) => {
        setRQ(response.data.items);
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
    },
  ]
  return (
    <div className='component'>
      <div>
        <h1> All  Resourse Quotas ( {rq.length} Resourse Quotas ) </h1>
        <DataTable columns={columns} data={rq} title={"Resourse Quotas"} fixedHeader selectableRows highlightOnHover />
      </div>
    </div>
  )
}

export default RQ