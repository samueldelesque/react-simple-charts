import React from 'react'

export default class Bar extends React.Component{
  static defaultProps = {
    metricName: 'points',
    value: 0,
    percent: 100,
    metricPadding: 15,
    metricColor: '#777',
    barWidth: 70,
    barHeight: 7,
    barRailColor: '#ddd',
    barColor: '#408AE5',
    label: 'N/A'
  }

  static propTypes = {
    metricName: React.PropTypes.string,
    value: React.PropTypes.number,
    percent: React.PropTypes.number,
    barWidth: React.PropTypes.number,
    barHeight: React.PropTypes.number,
    metricPadding: React.PropTypes.number,
    label: React.PropTypes.string,
    metricColor: React.PropTypes.string,
    barColor: React.PropTypes.string,
    barRailColor: React.PropTypes.string,
  }

  render(){
    return (
      <div>
        <div style={{fontSize: 13, textTransform: 'uppercase'}}>{this.props.label}</div>
        <div className="bar-row">
          <div style={{
              backgroundColor: this.props.barRailColor,
              width: this.props.barWidth + '%',
              height: this.props.barHeight,
              marginTop:4,
              display: 'inline-block',
              position: 'relative'}}>
            <div style={{
                width: this.props.percent + '%',
                height: this.props.barHeight,
                position: 'absolute',
                backgroundColor: this.props.barColor,
                top: 0,
                left: 0,
                bottom: 0,
                transition: 'all .5s'}}></div>
          </div>
          <div style={{
              width: 100 - this.props.barWidth + '%',
              paddingLeft: this.props.metricPadding,
              fontSize: 13,
              display: 'inline-block',
              color: this.props.metricColor,
              textAlign: 'right'}}>
              {(this.props.value ? this.props.value + " " : "") + this.props.metricName}
          </div>
        </div>
        <br style={{display: 'table',clear: 'both'}}/>
      </div>
    )
  }
}
