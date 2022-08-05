import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "./events.css"

const Events = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const url = "/api/v1/events"
    axios.get(url).then((response) => {
      setEvents(response.data.items);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

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
      selector: (row) => row.involvedObject.name, 
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
      <div>
      <h1> All  Events ( {events.length} Events ) </h1>
      <DataTable columns={columns} data={events} title={"Events"} fixedHeader selectableRows highlightOnHover />
      </div>

    </div>
  )
}

export default Events