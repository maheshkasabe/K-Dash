import { useEffect, useState } from 'react';
import axios from "axios"
import "./pods.css"

const Pods = () => {
  const [pods, setPods] = useState([])

  const namespace = "kubernetes-dashboard"
  
  useEffect(() => {
    const fnc= () => {
      const url = "/api/v1/pods/"
      axios.get(url).then((response) => {
        setPods(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/pods/`
      axios.get(url).then((response) => {
        setPods(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    (
      namespace ? fnc1() : fnc() 
    )

  }, [])

  return (
    <div className='pods'>
      <div className='header'>
        <h1>All Pods ( {pods.length} ) Pods </h1>
      </div>

      <div className='podlist'>
        {
          pods.map((pod) => {
            return (
              <div className='pod'>
                <p>Pod :{pod.metadata.name} </p>
                <p>Namespace : {pod.metadata.namespace}</p>
                <p>Status : {pod.status.phase}  ({pod.spec.containers.length})</p>
                <p>Node   : {pod.spec.nodeName}</p>
                <p>PodIP  : {pod.status.podIP}</p>
                <p>RestartCounts  : {pod.status.containerStatuses[0].restartCount}</p>
                <p> Labels : {pod.metadata.labels && Object.keys(pod.metadata.labels).map((key, i) => {
                  return (
                    <>
                    {pod.metadata.labels[key]},
                    </>
                    
                  )
                })}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Pods