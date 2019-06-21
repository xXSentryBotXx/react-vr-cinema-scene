import React from 'react';
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Plane,
  Video,
  Cylinder,
  VrButton
} from 'react-360';

import { Tree } from './components/Tree';
import { Stand } from './components/Stand';

const createTreeLine = (qty = 0, separation = 0.5, axis = 'X') => {
  const Forest = [];

  for (let i = 0; i < qty; i++) {
    Forest.push(
      <Tree
        key={i}
        style={{
          transform: [
            { [`translate${axis}`]: i * separation }
          ]
        }}
      />
    );
  }

  return (
    <View>
      {Forest}
    </View>
  );
}

const createRandomTrees = (min, max, qty) => {
  const Forest = [];

  for (let i = 0; i < qty; i++) {
    let x = Math.random() > 0.49 ? 1 : -1;
    let z = Math.random() > 0.49 ? 1 : -1;

    x = x * Math.random() * 50;
    z = z * Math.random() * 50; 

    Forest.push(
      <Tree
        key={i}
        style={{
          transform: [
            { translate: [x, 0, z] }
          ]
        }}
      />
    );
  }

  return (
    <View>
      {Forest}
    </View>
  );
}

const frontTreeline = createTreeLine(50, 2);
const backTreeline = createTreeLine(50, 2);
const leftTreeline = createTreeLine(50, 2, 'Z');
const rightTreeline = createTreeLine(50, 2, 'Z');
const randomForest = createRandomTrees(-50, 50, 100);

export default class CinemaVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      color: 'brown'
    }
  }

  handleGlobalInput(e) {
    console.log("globalInput", e);
  }

  handleClick() {
    console.log("handleClick", !this.state.play);
    this.setState({
      play: !this.state.play
    });
  }

  render() {
    const { play, color } = this.state;
    return (
      <View>
        <View
          style={{
            position: 'relative',
            transform: [
              { translate: [0, -19.5, 14] }
            ]
          }}
        >
          <Stand />
        </View>
        <View 
          style={styles.videoPanel}
        >
          { !play ?
            <View>
              <VrButton
                onClick={this.handleClick.bind(this)}
                onLongClick={() => { console.log('clicked long'); }}
                onButtonPress={() => { console.log('pressed'); }}
                onButtonRelease={() => { console.log('released'); }}
                onEnter={() => { this.setState({color: 'red'})}}
                onExit={() => { this.setState({color: 'brown'})}}
                longClickDelayMS={1000}
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: color,
                  alignSelf: 'center'
                }}
              >
                <Text
                  style={{fontSize: 5, alignSelf: 'center'}}
                >
                  Play
                </Text>
              </VrButton>
            </View> :
            <Video
              style={styles.video}
              onInput={this.handleClick.bind(this)}
              source={asset('SampleVideo.mp4')}
              muted
              controls
              loop
              autoplay={false}
            />
          }
          <Cylinder 
            style={{
              color: '#555555',
              transform: [
                { translate: [-8, 0, -14] }
              ]
            }}
            radiusTop={0.25}
            radiusBottom={0.25}
            dimHeight={37}
          />
          <Cylinder 
            style={{
              color: '#555555',
              transform: [
                { translate: [48, 0, -14] }
              ]
            }}
            radiusTop={0.25}
            radiusBottom={0.25}
            dimHeight={37}
          />
        </View>
        <View>
          <Plane
            style={{
              color: '#554500',
              transform: [
                { translate: [0, -0.5, -10] }, 
                { rotateX: -90 }
              ]
            }}
            dimWidth={120}
            dimHeight={120}
          />
        </View>
        <View
          style={{
            transform: [
              { translate: [-50, 0, -50] }
            ]
          }}
        >
          {frontTreeline}
        </View>
        <View
          style={{
            transform: [
              { translate: [50, 0, -50] }
            ]
          }}
        >
          {rightTreeline}
        </View>
        <View
          style={{
            transform: [
              { translate: [-50, 0, 50] }
            ]
          }}
        >
          {backTreeline}
        </View>
        <View
          style={{
            transform: [
              { translate: [-50, 0, -50] }
            ]
          }}
        >
          {leftTreeline}
        </View>
        <View>
          {randomForest}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  videoPanel: {
    width: 40,
    height: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    transform: [
      { translate: [-20, 3, -35] }
    ]
  },
  video: {
    width: '100%',
    height: '100%',
  }
});

const eventTracked = WrappedComponent => {

  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    
    handleGlobalInput(e) {
      console.log("globalInput", e);
    }

    render () {
      return (
        <WrappedComponent onInput={this.handleGlobalInput.bind(this)} {...this.props}/>
      );
    }
  }
};


AppRegistry.registerComponent('CinemaVR', () => eventTracked(CinemaVR));
