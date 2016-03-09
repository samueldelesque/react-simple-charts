import React, {Component} from 'react'

export default class Chart extends Component{
  static defaultProps = {
    border: 'none',
    height: 400,
    width: 600,
  }

  render(){
    return (
      <svg
        className={`react-chart ${this.props.type}`}
        width={this.props.width}
        style={{overflow: 'visible', border: this.props.border}}
        height={this.props.height}>
        {this.props.children}
      </svg>
    )
  }
}
