import React from 'react'
import './bar-metric.scss'

export default class Bar extends React.Component{
  static defaultProps = {
    metricName: 'points',
    value: 0,
    percent: 100,
    label: 'N/A'
  }

  static propTypes = {
    metricName: React.PropTypes.string,
    value: React.PropTypes.number,
    percent: React.PropTypes.number,
    label: React.PropTypes.string,
  }

  render(){
    return (
      <div className="bar-metric clearfix" key={`bar-metric.${Math.random()}`}>
        <div className="label">{this.props.label}</div>
        <div className="bar-row">
          <div className="bar-container">
            <div className="bar-completed" style={{width: parseFloat(this.props.percent) + '%'}}></div>
          </div>
          <div className="metric">{(this.props.value ? this.props.value + " " : "") + this.props.metricName}</div>
        </div>
      </div>
    )
  }
}
