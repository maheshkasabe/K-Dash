import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const ConfigMap = () => {
    const [configmaps, seConfigmaps] = useState([]);

    const namespace = "kubernetes-dashboard"

    useEffect(() => {
      const fnc= () => {
        const url = "/api/v1/configmaps/"
        axios.get(url).then((response) => {
          seConfigmaps(response.data.items);
          console.log(response.data.items);
        }).catch((err) => {
          console.log(err);
        })
      }
      
      const fnc1 = () => {
        const url = `/api/v1/namespaces/${namespace}/configmaps/`
        axios.get(url).then((response) => {
          seConfigmaps(response.data.items);
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
        ,
      },
      {
        name: "Namespace",
        selector: (row) => row.metadata.namespace
      },
      {
        name: "Keys",
        selector: (row) => (row.data && Object.keys(row.data).map((key, val) => {
          return (
            <div key={key}>
              {key}
            </div>
  
          )
        }))
      },
    ]
    return (
        <div className='component'>
            <>
                <h1> All  Configmaps ( {configmaps.length} Configmaps ) </h1>
                <DataTable columns={columns} data={configmaps} title={"Configmaps"} fixedHeader selectableRows highlightOnHover />
            </>
        </div>
    )
}

export default ConfigMap