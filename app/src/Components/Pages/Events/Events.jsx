import { useEffect,useState,useContext } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"
import Selector from '../LimitRanges/Selector';
import { SelectContext } from '../../Context/Context';

const Events = () => {
  const [events, setEvents] = useState([]);

  const {namespace, setNamespace} = useContext(SelectContext);
  const getAllevents = () => {
    const url = "/api/v1/events"
    axios.get(url).then((response) => {
      setEvents(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })

  }
  const getEvent = () => {
    const url = `/api/v1/namespaces/${namespace}/events`
    axios.get(url).then((response) => {
      setEvents(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {

    (
      namespace ? getEvent() : getAllevents() 
    )

  }, [namespace])

  const columns = [
    {
      name : "Type",
      selector: (row) => row.type,
    },
    {
      name : "Message",
      selector: (row) => row.message, 
    },
    {
      name : "Namespace",
      selector: (row) => row.metadata.namespace, 
    },
    {
      name : "Involved Object",
      selector: (row) => <p className='pid'> {row.involvedObject.name} </p>
    },
    {
      name : "Count",
      selector: (row) => row.count, 
    },
    {
      name : "Source",
      selector: (row) => row.source.component, 
    },
  ]
  return (
    <div className='events'>
      <div className='subcom'>
      <h1> All  Events ( {events.length} Events ) </h1>
      <Selector />
      </div>
      <DataTable columns={columns} data={events} title={"Events"} fixedHeader selectableRows highlightOnHover />

    </div>
  )
}

export default Events