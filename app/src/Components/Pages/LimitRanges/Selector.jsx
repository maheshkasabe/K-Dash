import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import { SelectContext } from '../../Context/Context';

const Selector = () => {
  const [namespaces, setNamespaces] = useState([]);

  const { setNamespace } = useContext(SelectContext);

  const handle = (e) => {
    setNamespace(e.target.value);
  }

  useEffect(() => {
    const url = "/api/v1/namespaces"
    axios.get(url).then((response) => {
      setNamespaces(response.data.items);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className='selector'>
      <select onChange={handle}>
        <option value={""}>All Namespaces</option>
        {
          namespaces.map((i) => {
            return (
              <>
                <option value={i.metadata.name}>{i.metadata.name}</option>
              </>
            )
          })
        }
      </select>
    </div>
  )
}

export default Selector