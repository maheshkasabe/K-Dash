import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Deployment from './Components/Pages/Deployments/Deployment';
import Pods from './Components/Pages/Pods/Pods';
import Secrets from './Components/Pages/Secrets/Secrets';
import RQ from './Components/Pages/rq/RQ';
import Services from './Components/Pages/Services/Services';
import Endpoint from './Components/Pages/Endpoints/Endpoint';
import Namespace from './Components/Pages/Namespaces/Namespace';
import Events from './Components/Pages/Events/Events';
import PV from './Components/Pages/PersistantVolumes/PV';
import Replicaset from './Components/Pages/Replica_Stateful/Replicaset';
import Statefulset from './Components/Pages/Replica_Stateful/Statefulset';
import Daemonset from './Components/Pages/Replica_Stateful/Daemonset';
import PVC from './Components/Pages/PersistantVolumes/PVC';
import ConfigMap from './Components/Pages/ConfigMaps/ConfigMap';
import LimitRanges from './Components/Pages/LimitRanges/LimitRanges';
import Overview from './Components/Pages/Overview/Overview';

import { SelectContext } from './Components/Context/Context';
import { useState } from 'react';
import Selector from './Components/Pages/LimitRanges/Selector';

function App() {
  const [namespace, setNamespace] = useState("");
  return (
    <div className="App">
      <SelectContext.Provider value={{namespace, setNamespace}}>
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

          </Routes>
        </BrowserRouter>
      </SelectContext.Provider>
    </div>

  );
}

export default App;
