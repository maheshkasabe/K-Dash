import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Replicaset = () => {
    const [replicas, setReplicas] = useState([]);

    const namespace = "kubernetes-dashboard"

    useEffect(() => {
        const fnc = () => {
            const url = "/apis/apps/v1/replicasets/"
            axios.get(url).then((response) => {
                setReplicas(response.data.items);
                console.log(response.data.items);
            }).catch((err) => {
                console.log(err);
            })
        }
        const fnc1 = () => {
            const url = `/apis/apps/v1/namespaces/${namespace}/replicasets/`
            axios.get(url).then((response) => {
                setReplicas(response.data.items);
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
    ]
    return (
        <div className='component'>
            <div>
                <h1> All  ReplicaSets ( {replicas.length} ReplicaSets ) </h1>
                <DataTable columns={columns} data={replicas} title={"ReplicaSets"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default Replicaset