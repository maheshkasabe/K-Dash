import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const Statefulset = () => {
    const [stateful, setStateful] = useState([]);

    const {namespace, setNamespace} = useContext(SelectContext);

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
            <div className='subcom'>
                <h1> All  Statefulsets ( {stateful.length} Statefullsets ) </h1>
                <Selector />
                </div>
                <DataTable columns={columns} data={stateful} title={"StatefulSets"} fixedHeader selectableRows highlightOnHover />
        </div>
    )
}

export default Statefulset