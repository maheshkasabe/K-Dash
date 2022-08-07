import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const RQ = () => {
  const [rq, setRQ] = useState([]);

  useEffect(() => {
    const url = "/api/v1/resourcequotas/"
    axios.get(url).then((response) => {
      setRQ(response.data.items);
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
      name: "Namespace",
      selector: (row) => row.metadata.namespace,
    },
  ]
  return (
    <div className='deployments'>
    <div>
      <h1> All  Resourse Quotas ( {rq.length} Resourse Quotas ) </h1>
      <DataTable columns={columns} data={rq} title={"Resourse Quotas"} fixedHeader selectableRows highlightOnHover />
    </div>
  </div>
  )
}

export default RQ