import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const RQ = () => {
  const [rq, setRQ] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);

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

  }, [namespace])

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
      <div className='subcom'>
        <h1> All  Resourse Quotas ( {rq.length} Resourse Quotas ) </h1>
        <Selector />
        </div>
        <DataTable columns={columns} data={rq} title={"Resourse Quotas"} fixedHeader selectableRows highlightOnHover />
    </div>
  )
}

export default RQ