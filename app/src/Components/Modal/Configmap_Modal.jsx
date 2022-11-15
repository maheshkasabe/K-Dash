import React from 'react'
import "./modal.css"

const Configmap_Modal = ({ info, setState }) => {
    return (
        <div className='modal'>
            <div className='content'>
                <div className='header'>
                    <p>ConfigMaps : {info.metadata.name} </p>
                    <button onClick={() => { setState(false) }}> X </button>
                </div>
                <div className='names'>
                    <p>Name : {info.metadata.name} </p>
                    <p>Namsepace : {info.metadata.namespace} </p>
                </div>

                <div className='data'>
                    <div className='dhead'>
                        <p>Data</p>
                    </div>
                    <div className='datacontent'>
                        {
                            info.data && Object.keys(info.data).map((key, val) => {
                                return (
                                  <div className='values' key={key}>
                                    {key} : 
                                    <textarea defaultValue={info.data[key]} /> 
                                  </div>
                                )
                              })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configmap_Modal