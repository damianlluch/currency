import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      dolar: [],
      mxn: [],
      gbp: [],
    }

  }

  componentDidMount() {
    setInterval(() => {
      return fetch('http://192.168.1.104:3000/dolar')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dolar: responseJson
          }, function() {
            return fetch('http://192.168.1.104:3000/mxn').then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({
                      mxn: responseJson
                    }), function() {
                      return fetch('http://192.168.1.104:3000/gbp').then((response) => response.json())
                      .then((responseJson) => {
                        this.setState({
                          gbp: responseJson
                        });
                        console.log(this.state.gbp);
                      })
                    }
                  })
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 4000);

    }


  render() {
    return (
      <View style={styles.container} >
        <Text>Moneda base: {this.state.dolar.base}</Text>
        <Text>Fecha: {this.state.dolar.date}</Text>
        <Text>{this.state.dolar.valor}</Text>
        <Text>{this.state.mxn.valor}</Text>
        <Text>{this.state.gbp.valor}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
