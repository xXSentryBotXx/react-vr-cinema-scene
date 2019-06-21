import React from 'react';
import { View, Box, Plane,  } from 'react-360';

export const Stand = props => {
  return (
    <View {...props}>
      <Box 
        dimWidth={8}
        dimHeight={1}
        dimDepth={5}
        style={{
          transform: [
            { translateY: 3 }
          ],
          color: 'brown'
        }}
      />
      <Box 
        dimWidth={7}
        dimHeight={5}
        dimDepth={5}
        style={{
          color: 'red'
        }}
      />
    </View>
  );
}