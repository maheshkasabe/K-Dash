import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const PVC = () => {
    const [pvc, setPvc] = useState([]);

    useEffect(() => {
      const url = "/api/v1/persistentvolumeclaims/"
      axios.get(url).then((response) => {
        setPvc(response.data.items);
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
      },
    ]
    return (
        <div className='deployments'>
            <div>
                <h1> All  PersistantVolumeClaims ( {pvc.length} PersistantVolumeClaims ) </h1>
                <DataTable columns={columns} data={pvc} title={"PersistantVolumeClaims"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default PVC