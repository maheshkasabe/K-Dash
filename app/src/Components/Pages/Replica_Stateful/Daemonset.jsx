import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const Daemonset = () => {
    const [daemonsets, setDaemonsets] = useState([]);

    const namespace = "kubernetes-dashboard"

    useEffect(() => {
        const fnc = () => {
            const url = "/apis/apps/v1/daemonsets/"
            axios.get(url).then((response) => {
                setDaemonsets(response.data.items);
                console.log(response.data.items);
            }).catch((err) => {
                console.log(err);
            })
        }
        const fnc1 = () => {
            const url = `/apis/apps/v1/namespaces/${namespace}/daemonsets/`
            axios.get(url).then((response) => {
                setDaemonsets(response.data.items);
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
            name: "nodeSelector",
            selector: (row) => row.spec.template.spec.nodeSelector["kubernetes.io/os"],
        },
        {
            name: "Pods",
            selector: (row) => row.status.numberAvailable,
        },
    ]
    return (
        <div className='component'>
            <div>
                <h1> All  Daemonsets ( {daemonsets.length} Daemonsets ) </h1>
                <DataTable columns={columns} data={daemonsets} title={"Daemonsets"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default Daemonset