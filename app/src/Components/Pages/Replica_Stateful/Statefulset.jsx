import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Statefulset = () => {
    const [stateful, setStateful] = useState([]);

    const namespace = "argocd"

    useEffect(() => {

        const fnc = () => {
            const url = "/apis/apps/v1/statefulsets"
            axios.get(url).then((response) => {
                setStateful(response.data.items);
                console.log(response.data.items);
            }).catch((err) => {
                console.log(err);
            })
        }
        const fnc1 = () => {
            const url = `/apis/apps/v1/namespaces/${namespace}/statefulsets`
            axios.get(url).then((response) => {
                setStateful(response.data.items);
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
        <div className='component'>
            <div>
                <h1> All  Statefulsets ( {stateful.length} Statefullsets ) </h1>
                <DataTable columns={columns} data={stateful} title={"StatefulSets"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default Statefulset