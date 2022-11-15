import renderer from 'react-test-renderer';

import Home from '../Components/Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Deployment,Pods,Secrets,RQ,Services,Endpoint,Namespace, Events,PV, PVC,Replicaset,Statefulset,Daemonset,ConfigMap,LimitRanges,Overview } from "../Components"
import { SelectContext } from '../Components/Context/Context';
import { useState } from 'react';
import App from '../App';

jest.mock('../App.css');
jest.mock('../Components/Home/Home');
jest.mock("react-router-dom");
jest.mock("../Components");
jest.mock('../Components/Context/Context');

const renderTree = tree => renderer.create(tree);
describe('<App>', () => {
  it('should render component', () => {
    expect(renderTree(<App />));
  });

  it('should render component', () => {
    expect(renderTree(<Home />));
  });
  
});