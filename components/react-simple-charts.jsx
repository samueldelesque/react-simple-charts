import AreaChart from 'charts/area/area'
import PieChart from 'charts/pie/pie'
import BarChart from 'charts/bar/bar'
import React from 'react'

export class Area extends React.Component{
    render(){
        return <Area {...this.props}/>
    }
}
export class Pie extends React.Component{
    render(){
        return <PieChart {...this.props}/>
    }
}
export class Bar extends React.Component{
    render(){
        return <BarChart {...this.props}/>
    }
}
