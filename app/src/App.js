import './App.css';
import Home from './Components/Home/Home';
import {BrowserRouter , Route , Routes } from "react-router-dom"  
import Deployment from './Components/Pages/Deployments/Deployment';
import Pods from './Components/Pages/Pods/Pods';
import Secrets from './Components/Pages/Secrets/Secrets';
import RQ from './Components/Pages/rq/RQ';
import Services from './Components/Pages/Services/Services';
import Endpoint from './Components/Pages/Endpoints/Endpoint';
import Namespace from './Components/Pages/Namespaces/Namespace';
import Events from './Components/Pages/Events/Events';
import PV from './Components/Pages/PersistantVolumes/PV';
import Hpa from './Components/Pages/HPA/Hpa';
import Replicaset from './Components/Pages/Replica_Stateful/Replicaset';
import Statefulset from './Components/Pages/Replica_Stateful/Statefulset';
import Daemonset from './Components/Pages/Replica_Stateful/Daemonset';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<> <Home /> <Pods />  </>} />
        <Route path='/pods' element={<> <Home /> <Pods />  </>} />
        <Route path='/deployments' element={<> <Home /> <Deployment /> </>} />
        <Route path='/replicasets' element={<> <Home /> <Replicaset /> </>} />
        <Route path='/statefulsets' element={<> <Home /> <Statefulset /> </>} />
        <Route path='/daemonsets' element={<> <Home /> <Daemonset /> </>} />
        <Route path='/secrets' element={<> <Home /> <Secrets /> </>} />
        <Route path='/rq' element={<> <Home /> <RQ />  </>} />
        <Route path='/hpa' element={<> <Home /> <Hpa />  </>} />
        <Route path='/services' element={<> <Home /> <Services /> </>} />
        <Route path='/endpoints' element={<> <Home /> <Endpoint /> </>} />
        <Route path='/ingress' element={<> <Home /> <PV />  </>} />
        <Route path='/pv' element={<> <Home /> <PV />  </>} />
        <Route path='/namespaces' element={<> <Home /> <Namespace /> </>} />
        <Route path='/events' element={<> <Home /> <Events />  </>} />
        
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
