import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import styled from "styled-components";
import Markers from "./mapcomponents/Markers"

import axiosWithAuth from "../utils/axiosWithAuth";

const MapWrapper = styled.div`
  width:100vw;
  height:100vh;
`;

export default function LakesMap() {
  const [location, setLocation] = useState([]);
  const [logs, setLogs] = useState([]);
  //  useEffect(() => {
  //   setLocation([{
  //     "locationname": "Connecticut River",
  //     "locationpicurl": "http://tinyimg.io/i/pabHplC.jpg",
  //     "locationdesc": "A placid body of water known for its plentiful carp."
  // },{
  //     "locationname": "Grand View Lake",
  //     "locationpicurl": "http://tinyimg.io/i/pabHplC.jpg",
  //     "locationdesc": "A torrid body of water known for its sizeable Trout."
  // },{
  //     "locationname": "Clear Lake",
  //     "locationpicurl": "http://tinyimg.io/i/pabHplC.jpg",
  //     "locationdesc": "A small body of water known for its moody bass"
  // }])}, [])
  
  useEffect(() => {
    axiosWithAuth().get("locations/all").then((response) => {
        setLocation(response.data)
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })
    axiosWithAuth().get("logs/all").then((response) => {
        setLogs(response.data)
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })
    

  }, [])

    const [viewport, setViewport] = useState({
      width: '100%',
      height: '100%',
      latitude: 45,
      longitude: -95,
      zoom: 5,
    });

    const _onViewportChange = viewport => {
        setViewport({ ...viewport });
      };

      return (
          <MapWrapper>
            <ReactMapGL
                mapStyle='mapbox://styles/mapbox/light-v9'
                {...viewport}
                mapboxApiAccessToken={
                'pk.eyJ1IjoiYnJ1bmNodGltZSIsImEiOiJjazIwdG80MGkxN3lmM25vaWZ5cThkZDU1In0.uYqrXjiEyUL1mTEO_N5-0w'
                }
                onViewportChange={_onViewportChange}>
                <Markers lakes={location}/>
            </ReactMapGL>
          </MapWrapper>
      );
    }