import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Deployment,Pods,Secrets,RQ,Services,Endpoint,Namespace, Events,PV, PVC,Replicaset,Statefulset,Daemonset,ConfigMap,LimitRanges,Overview } from "./Components"
import { SelectContext } from './Components/Context/Context';
import { useState } from 'react';
import Selector from './Components/Pages/LimitRanges/Selector';

function App() {
  const [namespace, setNamespace] = useState("");

  return (
    <div className="App">
    <SelectContext.Provider value={{namespace, setNamespace }}>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<> <Home /> <Overview />  </>} />
            <Route path='/pods' element={<> <Home /> <Pods />  </>} />
            <Route path='/deployments' element={<> <Home /> <Deployment /> </>} />
            <Route path='/replicasets' element={<> <Home /> <Replicaset /> </>} />
            <Route path='/statefulsets' element={<> <Home /> <Statefulset /> </>} />
            <Route path='/daemonsets' element={<> <Home /> <Daemonset /> </>} />
            <Route path='/configmaps' element={<> <Home /> <ConfigMap /> </>} />
            <Route path='/secrets' element={<> <Home /> <Secrets /> </>} />
            <Route path='/rq' element={<> <Home /> <RQ />  </>} />
            <Route path='/limitranges' element={<> <Home /> <LimitRanges />  </>} />
            <Route path='/services' element={<> <Home /> <Services /> </>} />
            <Route path='/endpoints' element={<> <Home /> <Endpoint /> </>} />
            <Route path='/ingress' element={<> <Home /> <PV />  </>} />
            <Route path='/pvc' element={<> <Home /> <PVC />  </>} />
            <Route path='/pv' element={<> <Home /> <PV />  </>} />
            <Route path='/namespaces' element={<> <Home /> <Namespace /> </>} />
            <Route path='/events' element={<> <Home /> <Events />  </>} />
            
            <Route path='/test' element={<> <Home /> <Selector />  </>} />

          </Routes>
        </BrowserRouter>
      </SelectContext.Provider>
    </div>

  );
}

export default App;
