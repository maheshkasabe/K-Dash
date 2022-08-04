import { useEffect,useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'

const Events = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const url = "/apis/events.k8s.io/v1/watch/events"
    axios.get(url).then((response) => {
      setEvents(response.data);
      console.log(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const columns = [
    {
      name : "Name",
      selector: (row) => row.name,
    },
    {
      name : "Labels",
      selector: (row) => row.name, 
    },
    {
      name : "age",
      selector: (row) => row.name, 
    },
    {
      name : "Status",
      selector: (row) => row.name, 
    },
  ]
  return (
    <div>
      <DataTable columns={columns} data={events} />
    </div>
  )
}

export default Events