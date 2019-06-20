import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import CardItemUI from './CardItemUI';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window');
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';

const OFFSET = 100;
const BASE_OFFSET = 500;

const applyOffset = (items, numCols) => {   
  const diagonals = findDiagonals(items, numCols);
  diagonals.forEach((diag, i) => {
    diag.forEach(elm => {
      items[elm].offset = i*OFFSET + BASE_OFFSET;
    })
  })
  return items;
}

const findDiagonals = (items, numCols) => {
  let offsets = [];
  let i = 0;
  const numRows = Math.ceil(items.length / numCols);

  while(i < numRows){
    offsets.push(getAscDiagonal(i, 0, numCols, items.length));
    i++;
  } 
  i--;
  for(let j = 1; j < numCols; j++){
    offsets.push(getAscDiagonal(i, j, numCols, items.length))
  }
  return offsets;
}

const getAscDiagonal = (i, j, numCols, maxLength) => {
  let diagonal = [];
  while(i >= 0 && j < numCols){
    const mappedIndex = i*numCols + j;
    if(mappedIndex < maxLength)
      diagonal.push(mappedIndex);
    i--;
    j++;
  }
  return diagonal;
}

export default class Demo extends React.Component {
  render() {
    const placeholders = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    const numCols = 3;
    const procesedItems = applyOffset(placeholders, numCols);
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <FlatGrid
            itemDimension={width / 3.5}
            items={procesedItems}
            renderItem={({ item }) => (
              <CardItemUI offset={item.offset} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    backgroundColor: '#4A90E2',
  },
  card: {
     backgroundColor: '#fff',
     width: width,
     height: 0.75*height,
     alignItems:'center',
     justifyContent:'flex-start'
  },
});
