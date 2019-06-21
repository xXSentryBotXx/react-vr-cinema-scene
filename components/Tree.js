import React from 'react';
import { View, Sphere, Cylinder } from 'react-360';

export const Tree = props => {
  return (
  <View {...props}>
    <Sphere 
        style={{
            color: 'green',
            transform: [{ translateY: 0.8 }]
        }}
    />
    <Cylinder 
        style={{
            color:'brown'
        }}
        radiusTop={0.05}
        radiusBottom={0.05}
    />
  </View>
  );
};

export default Tree;