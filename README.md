# K-Dash : Kubernetes Monitoring Tool 

## [![Docker Image CI](https://github.com/Mahesh-Kasabe/K-Dash/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Mahesh-Kasabe/K-Dash/actions/workflows/ci-cd.yml)

Build with React & JavaScript. Real-time Monitoring of Your Kubernetes Cluster with Kubernetes API.

![alt tag](https://github.com/Mahesh-Kasabe/K-Dash/blob/master/Images/overview.png?raw=true)


https://user-images.githubusercontent.com/60398112/208110242-b3ecad1d-2a4e-4a4d-b79d-b3cc3c7e33ee.mp4


## What is it ?

-------------------------------

K-Dash is Browser Based Real-time monitoring tool for Kubernetes  Cluster .The general idea behind the above submitted code sample is , it is a Browser based kubernetes cluster monitoring web application . Which hop over the Cluster data in front of your desktop by fetching the data from Kubernetes (Kubectl) API . The Web Application is made up of Javascript on the ReactJS framework , on a Broader spectrum  the application fetches and puts the essential information on the screen like Events , Namspaces , storage , nodes , pods , configmap , secrets , resource quotas , deployments , endpoints etc... , in a tabular form . The Overview Page shows the overall (big picture ) of total running pods using chartJs  and events (in tabel form) , You can also add Namespaces in the cluster through API . The Secrets and ConfigmapPage also shows you  the neccesary Keys and passwords in order to quickly locate and copy your  credentials . This are all the functions i have put together in order to be able to see the big picture of any kuberntes cluster in a quick way .

![alt tag](https://github.com/Mahesh-Kasabe/K-Dash/blob/master/Images/secrets.png?raw=true)

![alt tag](https://github.com/Mahesh-Kasabe/K-Dash/blob/master/Images/configmaps.png?raw=true)

![alt tag](https://github.com/Mahesh-Kasabe/K-Dash/blob/master/Images/events.png?raw=true)

## Technologies Used

----------------------------------

1. ReactJS
2. Javascript
3. Kubernetest(kubectl) API
4. HTML & CSS
5. ChartJS

## Features 
------------------------------------
1. Real Time Overview of the cluster
2. Switch between namespaces quickly
3. Quickly copy/paste Credentials 

## Running App on your local system
-------------------------------------

```bash

git clone https://github.com/Mahesh-Kasabe/K-Dash

cd app

yarn install

bash ./start_server.sh

yarn run start 

```
## Features to be included in future

---------------------------------------------

1. Adding Namespaces 
2. Adding / Deleting pods 
3. Better UI 
4. More scalability
