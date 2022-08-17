import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import { SelectContext } from '../../Context/Context';
import Selector from '../LimitRanges/Selector';
import Modal from '../../Modal/Modal';

const Deployment = () => {
  const [deployments, setDeployments] = useState([]);
  const [info , setInfo] = useState([])
  const [state, setState] = useState(false)

  const { namespace, setNamespace } = useContext(SelectContext);

  useEffect((name) => {
    const fnc = () => {
      const url = "/apis/apps/v1/deployments/"
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
        //console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1 = () => {
      const url = `/apis/apps/v1/namespaces/${namespace}/deployments/`
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
        //console.log(response.data.items);
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
      selector: (row) => row.metadata.namespace,
    },
    {
      name: "Pods",
      selector: (row) => <>
        {row.status.availableReplicas}/{row.status.replicas}
      </>
    },
    {
      name: "Replicas",
      selector: (row) => row.status.replicas,
    },
    {
      name: "Conditions",
      selector: (row) => <>
        {row.status.conditions[0].type} | {row.status.conditions[1].type}
      </>
    },
    {
      name: "︙",
      selector: (row) => <button onClick={() => {handle(row)}} className='btn'>︙</button>
    }
  ]

  const handle = (metadata) => {
    setState(true)
    setInfo(metadata)
    console.log(metadata)
  }
  return (
    <div className='component'>
      <div className='subcom'>
        <h1> All  Deployments ( {deployments.length} deployments )   </h1>
        <Selector />

      </div>
      <div className='Modal'>

      <DataTable columns={columns} data={deployments} fixedHeader selectableRows highlightOnHover />
      {
          state && (
            <Modal info={info} setState={setState} />
          )
        }
      </div>
    </div>
  )
}

export default Deployment