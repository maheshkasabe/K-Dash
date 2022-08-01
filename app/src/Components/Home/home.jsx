import React from 'react'

const home = () => {
  return (
    <div className='home'>
        <div className='workloads'>
        <p>Overview</p>
        <p>Pods</p>
        <p>Deployments</p>
        </div>

        <div className='configuration'>
        <p>ConfigMaps</p>
        <p>Secrets</p>
        <p>Resource Quotas</p>
        <p>HPA</p>
        </div>

        <div className='network'>
        <p>Services</p>
        <p>Endpoints</p>
        <p>Ingresses</p>
        </div>

        <div className='storage'>
        <p>Persistent Volumes</p>
        <p>Resource Quotas</p>
        </div>

        <div className='others'>
        <p>Namespaces</p>
        <p>Events</p>
        </div>

    </div>
  )
}

export default home