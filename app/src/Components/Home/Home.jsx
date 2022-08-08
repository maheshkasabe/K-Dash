import React from 'react'
import { useState } from 'react'
import "./home.css"
import { FaNetworkWired } from 'react-icons/fa';
import {MdStorage} from 'react-icons/md';
import {TbFileSettings} from 'react-icons/tb';
import {MdRemoveRedEye} from 'react-icons/md';
import {GrStackOverflow} from 'react-icons/gr';
import {MdEmojiEvents} from 'react-icons/md';

const Home = () => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  return (
    <div className='home'>
      <div className='title'>
        <p> K-Dash </p>
      </div>

      <div className='main'>
        <p onClick={() => setState1(!state1)}><MdRemoveRedEye  size={20} /> Workloads</p>
        {
          state1 && (
            <div className='sub'>
              <p><a href='/'>Overview</a></p>
              <p><a href='/pods'>Pods</a></p>
              <p><a href='/deployments'>Deployments</a></p>
              <p><a href='/replicasets'>ReplicaSets</a></p>
              <p><a href='/statefulsets'>StatefulSets</a></p>
              <p><a href='/daemonsets'>DaemonSets</a></p>
            </div>

          )
        }
      </div>

      <div className='main'>
        <p onClick={() => setState2(!state2)}><TbFileSettings size={20} />Configuration</p>
        {
          state2 && (
            <div className='sub'>
              <p><a href='/configmaps'>Configmaps</a></p>
              <p><a href='/secrets'>Secrets</a></p>
              <p><a href='/rq'>Resource Quotas</a></p>
              <p><a href='/limitranges'>Limitranges</a></p>
            </div>
          )
        }

      </div>

      <div className='main'>
      <p onClick={() => { setState3(!state3) }}> <FaNetworkWired size={20} />  Network</p>
        {
          state3 && (
            <div className='sub'>
              <p><a href='/services'>Services</a></p>
              <p><a href='/endpoints'>Endpoints</a></p>
              <p><a href='/ingress'>Ingress</a></p>
            </div>
          )
        }

      </div>

      <div className='main'>
        <p onClick={() => { setState4(!state4) }}><MdStorage color={'blue'} size={20} /> Storage</p>
        {
          state4 && (
            <div className='sub'>
              <p><a href='/pvc'>PersistentVolumeClaim  </a></p>
              <p><a href='/pv'>Persistent Volumes</a></p>
            </div>
          )
        }
      </div>

      <div className='main'>
        <p><a href='/namespaces'><GrStackOverflow size={20} /> Namespaces</a></p>
      </div>

      <div className='main'>
        <p><a href='/events'><MdEmojiEvents size={20} /> Events</a></p>
      </div>

    </div>
  )
}

export default Home