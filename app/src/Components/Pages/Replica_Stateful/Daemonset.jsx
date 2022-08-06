import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../Deployments/deployments.css"

const Daemonset = () => {
    const [daemonsets, setDaemonsets] = useState([]);

    useEffect(() => {
        const url = "/apis/apps/v1/daemonsets/"
        axios.get(url).then((response) => {
            setDaemonsets(response.data.items);
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
                <h1> All  Daemonsets ( {daemonsets.length} Daemonsets ) </h1>
                <DataTable columns={columns} data={daemonsets} title={"Daemonsets"} fixedHeader selectableRows highlightOnHover />
            </div>
        </div>
    )
}

export default Daemonset