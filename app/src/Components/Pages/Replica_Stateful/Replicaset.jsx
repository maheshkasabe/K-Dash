import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const Replicaset = () => {
    const [replicas, setReplicas] = useState([]);

    useEffect(() => {
        const url = "/apis/apps/v1/replicasets/"
        axios.get(url).then((response) => {
            setReplicas(response.data.items);
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
            name: "Namespace",
            selector: (row) => row.metadata.namespace,
        },
    ]
    return (
        <div className='deployments'>
            <div>
                <h1> All  ReplicaSets ( {replicas.length} ReplicaSets ) </h1>
                <DataTable columns={columns} data={replicas} title={"ReplicaSets"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default Replicaset