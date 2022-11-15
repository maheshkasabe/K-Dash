import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const RQ = () => {
  const [rq, setRQ] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);
  
  const getAllresourcequotas = () => {
    const url = "/api/v1/resourcequotas/"
    axios.get(url).then((response) => {
      setRQ(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }
  const getResourceQuota = () => {
    const url = `/api/v1/namespaces/${namespace}/resourcequotas/`
    axios.get(url).then((response) => {
      setRQ(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {

    (
      namespace ? getResourceQuota() : getAllresourcequotas()
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
    {
      name: "︙",
      selector: (row) => <button className='btn'>︙</button>
    }
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