import { useEffect, useState,useContext } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from './Selector';
import { SelectContext } from '../../Context/Context';

const LimitRanges = () => {
  const [limitranges, setLlimitranges] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);

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

  }, [namespace])

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
      <div className='subcom'>
        <h1> All  Limitranges ( {limitranges.length} Limitranges ) </h1>
        <Selector />
        </div>
        <DataTable columns={columns} data={limitranges} title={"Limitranges"} fixedHeader selectableRows highlightOnHover />
    </div>
  )
}

export default LimitRanges