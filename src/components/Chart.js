import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import '../../node_modules/chart.piecelabel.js/src/Chart.PieceLabel.js';

class Chart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      title: '',
      labels: [],
      data: []
    };
  }

  componentDidMount() {
    let { answers, title } = this.props.poll;
    this.convertData(answers, title);
  }

  componentWillReceiveProps(nextProps) {
    let { answers, title } = nextProps.poll;
    this.convertData(answers, title);    
  }

  convertData = (answers, title) => {
    let labels = [], data = [];

    // sorting answers by number of votes
    Object.entries(answers).sort((arr1, arr2) => arr2[1] - arr1[1]).forEach(answer => {
      labels.push(answer[0]);
      data.push(answer[1]);
    });
    this.setState({ title, labels, data });
  }

  render() {
    const { title, labels, data } = this.state;
    const chartData = {
      labels,
      datasets: [
        {
          label: "głosów",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data
        }
      ]
    };
    const doughnutOptions = {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      pieceLabel: {
        render: 'label',
        fontColor: 'white',
        fontFamily: 'Roboto',
        fontSize: 14,
        overlap: true
      },
      title: {
        display: true,
        text: title
      }
    };
    const barOptions = {
      legend: { display: false },
      title: {
        display: true,
        text: title
      }
    };
    return (
      <div>
        <HorizontalBar
          data={chartData}
          options={barOptions}
          width={600}
          height={400}
        />
        <Doughnut 
          data={chartData}
          options={doughnutOptions}
          width={800}
          height={450}
        />
      </div>
    );
  }
}

export default Chart;
