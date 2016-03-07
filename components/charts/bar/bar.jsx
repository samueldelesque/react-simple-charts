import React from 'react'
import BarMetric from './bar-metric'


export default class Bar extends React.Component{
    static defaultProps = {
        metricName: 'points',
        value: 0,
        percentage: 100,
        label: 'N/A'
    }
    render(){
        let index = Math.random()
        return BarMetric(this.props.label, this.props.percentage, (this.props.value ? this.props.value + " " : "") + this.props.metricName)
    }
}
