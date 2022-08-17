import React from 'react'
import "./modal.css"

const Modal = ({ info, setState }) => {
    return (
        <div className='modal'>
            <div className='content'>
                <div className='header'>
                    <p>Deployment : {info.metadata.name} </p>

                    <button onClick={() => { setState(false) }}> X </button>
                     
                </div>
                <div className='names'>
                    <p>Name : {info.metadata.name} </p>
                    <p>Namsepace : {info.metadata.namespace} </p>
                    <p>Labels :  </p>
                    <p>Annotations :  </p>
                    <p>Annotations : </p>
                    <p>Replicas : {info.status.replicas}</p>
                    <p>Selector : </p>
                    <p>Node Selector : </p>
                    <p>Conditions : {info.status.conditions[0].type} | {info.status.conditions[1].type}</p>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default Modal