import React, { Component } from "react";
import { getMetrics } from "../actions/github";
import { connect } from "react-redux";
import GoogleMapReact from 'google-map-react';

class Github extends Component {
  constructor(...args) {
    super(...args);
     this.state = {
      data:{},
      //center location of map
      center : {
        lat: 34.028906199757344, 
        lng: -92.7531930532451
      },

      //how much you want to zoom
      zoom : 3,

      myMarker : {
      name : 'Marker',
      lat : 34.028906199757344,
      lng : -92.7531930532451,
    }
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.metrics.length>0){
     nextProps.metrics.sort(function(a, b){return b.timestamp - a.timestamp});
     this.setState({
       data:nextProps.metrics[0],
       myMarker:{...this.state.myMarker,
         lat:nextProps.metrics[0].latitude,
         lng:nextProps.metrics[0].longitude
       }
       })
    }
  }
  componentDidMount(){
     setInterval(() => {
        this.props.getMetrics(); 
        }, 4000);   
  }
  render() {
    const Marker = ({text}) => {
        return (
              <div><b>{text}</b></div>
        );
    }
    return (
      <div>
          <div >
            <h4>Temperature: {this.state.data && this.state.data.metric}</h4>
            <h4>Latitude: {this.state.data && this.state.data.latitude}</h4>
            <h4>Longitude: {this.state.data && this.state.data.longitude}</h4>
            <h4>Last received: 4 seconds ago</h4>
          </div>
      
        <hr/>
        <h2>Map</h2>
         <center>
        <div style={ { height: '50vh', width: '90%' } }>

          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBiBGd1wMllwtgMRY2crh7_t_WK7EhqZ54' /*Google API Key goes here */ }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom} 
          >

          
          {
            //Add a list of Markers to Your Map
              <Marker
                lat = {this.state.myMarker.lat}
                lng = {this.state.myMarker.lng}
                text = {this.state.myMarker.name}
              />
          }

          </GoogleMapReact>
         
        </div> 
        </center>

        <hr/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.githubState.isLoading,
    metrics: state.githubState.metrics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMetrics: () => dispatch(getMetrics())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Github);
