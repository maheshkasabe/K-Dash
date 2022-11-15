import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const Daemonset = () => {
    const [daemonsets, setDaemonsets] = useState([]);

    const {namespace, setNamespace} = useContext(SelectContext);
    
    const getAlldemonsets = () => {
        const url = "/apis/apps/v1/daemonsets/"
        axios.get(url).then((response) => {
            setDaemonsets(response.data.items);
            console.log(response.data.items);
        }).catch((err) => {
            console.log(err);
        })
    }
    const getDemonset = () => {
        const url = `/apis/apps/v1/namespaces/${namespace}/daemonsets/`
        axios.get(url).then((response) => {
            setDaemonsets(response.data.items);
            console.log(response.data.items);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        (
            namespace ? getDemonset() : getAlldemonsets()
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
            name: "nodeSelector",
            selector: (row) => row.spec.template.spec.nodeSelector["kubernetes.io/os"],
        },
        {
            name: "Pods",
            selector: (row) => row.status.numberAvailable,
        },
        {
            name: "︙",
            selector: (row) => <button className='btn'>︙</button>
          }
    ]
    return (
        <div className='component'>
            <div className='subcom'>
                <h1> All  Daemonsets ( {daemonsets.length} Daemonsets ) </h1>
                <Selector />
                </div>
                <DataTable columns={columns} data={daemonsets} title={"Daemonsets"} fixedHeader selectableRows highlightOnHover />
        </div>
    )
}

export default Daemonset