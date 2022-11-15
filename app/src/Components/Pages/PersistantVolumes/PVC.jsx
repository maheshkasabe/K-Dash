import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const PVC = () => {
  const [pvc, setPvc] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);

  useEffect(() => {
    const getAllpvcs = () => {
      const url = "/api/v1/persistentvolumeclaims/"
      axios.get(url).then((response) => {
        setPvc(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const getPVC = () => {
      const url = `/api/v1/namespaces/${namespace}/persistentvolumeclaims/`
      axios.get(url).then((response) => {
        setPvc(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    (
      namespace ? getPVC() : getAllpvcs()
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
        <h1> All  PersistantVolumeClaims ( {pvc.length} PersistantVolumeClaims ) </h1>
        <Selector />
        </div>
        <DataTable columns={columns} data={pvc} title={"PersistantVolumeClaims"} fixedHeader selectableRows highlightOnHover />
    </div>
  )
}

export default PVC