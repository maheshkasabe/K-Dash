import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const LimitRanges = () => {
  const [limitranges, setLlimitranges] = useState([]);

  const namespace = "kubernetes-dashboard"

  useEffect(() => {
    const fnc = () => {
      const url = "/api/v1/limitranges/"
      axios.get(url).then((response) => {
        setLlimitranges(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/limitranges/`
      axios.get(url).then((response) => {
        setLlimitranges(response.data.items);
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
  ]
  return (
    <div className='component'>
      <>
        <h1> All  limitranges ( {limitranges.length} limitranges ) </h1>
        <DataTable columns={columns} data={limitranges} title={"limitranges"} fixedHeader selectableRows highlightOnHover />
      </>
    </div>
  )
}

export default LimitRanges