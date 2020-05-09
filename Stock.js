import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }


componentDidMount(){
  this.fetchStock();
}

fetchStock(){
  const pointerToThis = this;
  console.log(pointerToThis);
  let symbol = 'AAPL';
  let API_KEY = 'HPZ81FBCURYZWIYY';
  let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`
  let stockChartXValuesFunction = [];
  let StockChartYValuesFunction = [];
  fetch(API_CALL)
    .then(
      function (response) {
        return response.json();
      })
    .then(
      function (data) {
        console.log(data);
        for(var key in data['Time Series (Daily)']){
          stockChartXValuesFunction.push(key);
          StockChartYValuesFunction.push(data['Time Series (Daily)']
          [key]['4. close']);
        }
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: StockChartYValuesFunction
        });
      }
    )

}




  render() {
    return (
     <div>
     <h1>STOCK GRAPH</h1>
       <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'green'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
     </div>
    )
  }

}

export default Stock;
