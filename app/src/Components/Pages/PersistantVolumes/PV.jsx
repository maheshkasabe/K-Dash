import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const PV = () => {
  const [pv, setPv] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);

  useEffect(() => {

    const getAllpvs = () => {
      const url = "/api/v1/persistentvolume/"
      axios.get(url).then((response) => {
        setPv(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const getPV = () => {
      const url = `/api/v1/namespaces/${namespace}/persistentvolume/`
      axios.get(url).then((response) => {
        setPv(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    (
      namespace ? getPV() :getAllpvs()
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
        <h1> All  PersistantVolume ( {pv.length} PersistantVolume ) </h1>
        <Selector />
        </div>
        <DataTable columns={columns} data={pv} title={"PersistantVolume"} fixedHeader selectableRows highlightOnHover />
    </div>
  )
}

export default PV