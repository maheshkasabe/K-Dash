import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const Replicaset = () => {
    const [replicas, setReplicas] = useState([]);

    const { namespace, setNamespace } = useContext(SelectContext);

    useEffect(() => {
        const getAllreplicasets = () => {
            const url = "/apis/apps/v1/replicasets/"
            axios.get(url).then((response) => {
                setReplicas(response.data.items);
                console.log(response.data.items);
            }).catch((err) => {
                console.log(err);
            })
        }
        const getReplicaset = () => {
            const url = `/apis/apps/v1/namespaces/${namespace}/replicasets/`
            axios.get(url).then((response) => {
                setReplicas(response.data.items);
                console.log(response.data.items);
            }).catch((err) => {
                console.log(err);
            })
        }

        (
            namespace ? getReplicaset() : getAllreplicasets()
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
            name: "Current",
            selector: (row) => row.status.availableReplicas,
        },
        {
            name: "Ready",
            selector: (row) => row.status.readyReplicas,
        },
        {
            name: "︙",
            selector: (row) => <button className='btn'>︙</button>
          }
    ]
    return (
        <div className='component'>
            <div className='subcom'>
                <h1> All  ReplicaSets ( {replicas.length} ReplicaSets ) </h1>
                <Selector />
            </div>
            <DataTable columns={columns} data={replicas} title={"ReplicaSets"} fixedHeader selectableRows highlightOnHover />

        </div>
    )
}

export default Replicaset