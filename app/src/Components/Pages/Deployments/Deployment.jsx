import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import { SelectContext } from '../../Context/Context';
import Selector from '../LimitRanges/Selector';

const Deployment = () => {
  const [deployments, setDeployments] = useState([]);

  const { namespace, setNamespace } = useContext(SelectContext);

  useEffect((name) => {
    const fnc = () => {
      const url = "/apis/apps/v1/deployments/"
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
        
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
      selector: (row) => <button className='btn'>︙</button>
    }
  ]
  return (
    <div className='component'>
      <div className='subcom'>
        <h1> All  Deployments ( {deployments.length} deployments )   </h1>
        <Selector />
      </div>
      <DataTable columns={columns} data={deployments} title={"Deployments"} fixedHeader selectableRows highlightOnHover />
    </div>
  )
}

export default Deployment