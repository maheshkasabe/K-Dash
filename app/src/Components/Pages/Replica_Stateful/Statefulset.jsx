import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const Statefulset = () => {
    const [stateful, setStateful] = useState([]);

    useEffect(() => {
        const url = "/apis/apps/v1/statefulsets"
        axios.get(url).then((response) => {
            setStateful(response.data.items);
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
        {
            name: "Desired",
            selector: (row) => row.status.availableReplicas,
        },
        {
            name: "Current",
            selector: (row) => row.status.currentReplicas,
        },
        {
            name: "Ready",
            selector: (row) => row.status.readyReplicas,
        },
    ]
    return (
        <div className='deployments'>
            <div>
                <h1> All  Statefulsets ( {stateful.length} Statefullsets ) </h1>
                <DataTable columns={columns} data={stateful} title={"StatefulSets"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default Statefulset