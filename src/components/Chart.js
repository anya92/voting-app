import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import formatText from '../helpers/textFormat';

const backgroundColor = ["#17BEBB", "#EE6352", "#59CD90", "#F7F06D", "#B33F62", "#2274A5"];

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
          backgroundColor,
          data
        }
      ]
    };
    const options = {
      legend: { display: false },
      responsive: true,
      fontFamily: 'Roboto',
      title: {
        display: true,
        text: `${title} (${formatText(this.props.poll.numberOfVotes)})`
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            fixedStepSize: 1
          }
        }]
      }
    };
    return (
      <div className="singlePoll__main__chart">
        <HorizontalBar
          data={chartData}
          options={options}
          height={200}
        />
      </div>
    );
  }
}

export default Chart;
