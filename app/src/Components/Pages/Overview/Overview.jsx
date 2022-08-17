import { useContext, useEffect, useState } from 'react';
import "../main.css"
import axios from "axios"
import DataTable from 'react-data-table-component'
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto';

const Overview = () => {
  const [events, setEvents] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [pods, setPods] = useState([])
  const [daemonsets, setDaemonsets] = useState([]);
  const [replicas, setReplicas] = useState([]);
  const [stateful, setStateful] = useState([]);

  const { namespace, setNamespace } = useContext(SelectContext);

  useEffect(() => {

    const fnc = () => {
      const url = "/api/v1/events"
      axios.get(url).then((response) => {
        setEvents(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/events`
      axios.get(url).then((response) => {
        setEvents(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }


    //daemonsets 
    const fnc2 = () => {
      const url = "/apis/apps/v1/daemonsets/"
      axios.get(url).then((response) => {
        setDaemonsets(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const fnc3 = () => {
      const url = `/apis/apps/v1/namespaces/${namespace}/daemonsets/`
      axios.get(url).then((response) => {
        setDaemonsets(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc4 = () => {
      const url = "/apis/apps/v1/replicasets/"
      axios.get(url).then((response) => {
        setReplicas(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const fnc5 = () => {
      const url = `/apis/apps/v1/namespaces/${namespace}/replicasets/`
      axios.get(url).then((response) => {
        setReplicas(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc6 = () => {
      const url = "/apis/apps/v1/statefulsets"
      axios.get(url).then((response) => {
        setStateful(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc7 = () => {
      const url = `/apis/apps/v1/namespaces/${namespace}/statefulsets`
      axios.get(url).then((response) => {
        setStateful(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc8 = () => {
      const url = "/api/v1/pods/"
      axios.get(url).then((response) => {
        setPods(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc9 = () => {
      const url = `/api/v1/namespaces/${namespace}/pods/`
      axios.get(url).then((response) => {
        setPods(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc10 = () => {
      const url = "/apis/apps/v1/deployments/"
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc11 = () => {
      const url = `/apis/apps/v1/namespaces/${namespace}/deployments/`
      axios.get(url).then((response) => {
        setDeployments(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const mainfnc = (() => {
      fnc()
      fnc2()
      fnc4()
      fnc6()
      fnc8()
      fnc10()
    })

    const notmainfnc = () => {
      fnc1()
      fnc3()
      fnc5()
      fnc7()
      fnc9()
      fnc11()
    }

    (
      namespace ? notmainfnc() : mainfnc()
    )

  }, [namespace])

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
    {
      name: "Namespace",
      selector: (row) => row.metadata.namespace,
    },
    {
      name: "Involved Object",
      selector: (row) => <p className='pid'> {row.involvedObject.name} </p>
    },
    {
      name: "Count",
      selector: (row) => row.count,
    },
    {
      name: "Source",
      selector: (row) => row.source.component,
    },
  ]

  const data1 = {
    labels: [
      `Pods (${pods.length})`,
    ],
    datasets: [{
      label: 'Pods',
      data: [pods.length],
      backgroundColor: [
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  }

  const data2 = {
    labels: [
      `Deployments (${deployments.length})`,
    ],
    datasets: [{
      label: 'Pods',
      data: [deployments.length],
      backgroundColor: [
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  }

  const data3 = {
    labels: [
      `StatefulSets (${stateful.length})`,
    ],
    datasets: [{
      label: 'Pods',
      data: [stateful.length],
      backgroundColor: [
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  }

  const data4 = {
    labels: [
      `ReplicaSets (${replicas.length})`,
    ],
    datasets: [{
      label: 'Pods',
      data: [replicas.length],
      backgroundColor: [
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  }

  const data5 = {
    labels: [
      `DaemonSets (${daemonsets.length})`,
    ],
    datasets: [{
      label: 'Pods',
      data: [daemonsets.length],
      backgroundColor: [
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  }

  return (
    <div className='overview'>
      <div className='subcom'>
        <h1> Overview </h1>
        <Selector />
      </div>
      <div className='chart'>
        <div style={ { width: 200 } }>
        <Doughnut data={data1 } />
        </div>

        <div style={ { width: 200 } }>
        <Doughnut data={data2 } />
        </div>

        <div style={ { width: 200 } }>
        <Doughnut data={data3 } />
        </div>

        <div style={ { width: 200 } }>
        <Doughnut data={data4 } />
        </div>

        <div style={ { width: 200 } }>
        <Doughnut data={data5 } />
        </div>

      </div>
      <DataTable columns={columns} data={events} title={"Events"} fixedHeader selectableRows highlightOnHover />
    </div>

  )
}

export default Overview