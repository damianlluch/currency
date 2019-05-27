require('dotenv').config();
const axios = require('axios');

const usd = process.env.USD || 'USD';
const GBP = process.env.GBP || 'GBP';
const MXN = process.env.MXN || 'MXN';



// Axios Client Declaration
const api = axios.create({
  baseURL: 'http://data.fixer.io/api',
  params: {
    access_key: process.env.API_KEY,
  },
  timeout: process.env.TIMEOUT || 5000,
});

const getDolar = async (url) => {
  const response = await api.get(url);
  const { data } = response;
  if (data.success) {
    Object.keys(data).map(function(key) {
      let mone = data[key];
      if(mone = "USD"){
        data.moneda = mone;
        let texto = JSON.stringify(data[key]);
        data.valor = texto.substr(1).slice(0, -1)
        console.log(data.valor);
      }
      });
    return data;
  }
  throw new Error(data.error.type);
};

const getMXN = async (url) => {
  const response = await api.get(url);
  const { data } = response;
  if (data.success) {
    Object.keys(data).map(function(key) {
      let mone = data[key];
      if(mone = "MXN"){
        data.moneda = mone;
        let texto = JSON.stringify(data[key]);
        data.valor = texto.substr(1).slice(0, -1)
        console.log(data.valor);
      }
      });
    return data;
  }
  throw new Error(data.error.type);
};

const getGBP = async (url) => {
  const response = await api.get(url);
  const { data } = response;
  if (data.success) {
    Object.keys(data).map(function(key) {
      let mone = data[key];
      if(mone = "GBP"){
        data.moneda = mone;
        let texto = JSON.stringify(data[key]);
        data.valor = texto.substr(1).slice(0, -1)
        console.log(data.valor);
      }
      });
    return data;
  }
  throw new Error(data.error.type);
};

module.exports = {
  getDolar: () => getDolar(`/latest&symbols=${usd}&base=EUR`),
  getGBP: () => getGBP(`/latest&symbols=${GBP}&base=EUR`),
  getMXN: () => getMXN(`/latest&symbols=${MXN}&base=EUR`),
  getSymbols: () => get('/symbols'),
  getHistoricalRate: date => get(`/${date}&symbols=${symbols}&base=EUR`),
};
