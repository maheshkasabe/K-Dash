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

export { Deployment,Pods,Secrets,RQ,Services,Endpoint,Namespace, Events,PV, PVC,Replicaset,Statefulset,Daemonset,ConfigMap,LimitRanges,Overview }