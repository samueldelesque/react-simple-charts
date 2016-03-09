import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import DatePickerRange from 'react-daterange-picker'

import Area from 'components/charts/area/area'
import CirclePie from 'components/charts/circle-pie/circle-pie'
import BarMetric from 'components/charts/bar-metric/bar-metric'

import DemoData from './demo-data'

import 'node_modules/react-daterange-picker/dist/css/react-calendar.css'
import './demo.scss'

export default class Demo extends React.Component {
  state = {
    width: 768,
    graph: [],
    totals: [],
    timeFrame: '1m',
    maxPoints: 31,
    displayCustomDatePicker: false,
    startDate: moment(),
    endDate: moment(),
  }

  componentDidMount(){
    this.timeLimit()
    this.domEvents()
  }

  componentWillUnmount(){
    window && window.removeEventListener('resize')
  }

  domEvents(){
    window && window.addEventListener('resize', ()=>this.setState({width: this.refs.graphContainer.clientWidth}))
    this.setState({width: this.refs.graphContainer.clientWidth})
  }

  updateInput(){
    let settings = {
      startDate: this.state.startDate.format(),
      endDate: this.state.endDate.format(),
      maxPoints: this.state.maxPoints
    }
    let data = new DemoData(settings)

    this.setState({
        graph: data.linearGraph(),
        totals: data.totals(),
    })
  }

  timeLimit(options={frame: '1m'}){
    let now = moment(),
        endDate = moment(),
        startDate,
        maxPoints = 31

    switch(options.frame){
      case '1w':
        startDate = now.subtract(1, 'week')
      break
      case '3m':
        maxPoints = 15
        startDate = now.subtract(3, 'months')
      break
      case '1y':
        maxPoints = 12
        startDate = now.subtract(1, 'year')
      break
      case '1m':
      default:
        startDate = now.subtract(1, 'months')
      break
    }

    this.setState({endDate: endDate, startDate: startDate, maxPoints: maxPoints, timeFrame: options.frame}, this.updateInput.bind(this))
  }

  openCustomDatePicker(){
    this.setState({displayCustomDatePicker: !this.state.displayCustomDatePicker, timeFrame: 'custom'})
  }

  pickCustomDate(range){
    this.setState({endDate: range.end.add(1, 'day'), startDate: range.start, displayCustomDatePicker: false}, this.updateInput.bind(this))
  }

  render(){
    return(
      <div className="react-simple-charts-demo">
        <div className="block" ref="graphContainer">
          <div className="toolbar">
            <span className="tool time-frame-picker">
              <span className={this.state.timeFrame === '1w'?'active':null} onClick={this.timeLimit.bind(this, {frame: '1w'})}>1W</span>
              <span className={this.state.timeFrame === '1m'?'active':null} onClick={this.timeLimit.bind(this, {frame: '1m'})}>1M</span>
              <span className={this.state.timeFrame === '3m'?'active':null} onClick={this.timeLimit.bind(this, {frame: '3m'})}>3M</span>
              <span className={this.state.timeFrame === '1y'?'active':null} onClick={this.timeLimit.bind(this, {frame: '1y'})}>1Y</span>
              <span className={this.state.timeFrame === 'custom'?'active':null}>
                <span onClick={this.openCustomDatePicker.bind(this)}> &lt; {this.state.startDate.format('l')} - {this.state.endDate.format('l')} &gt; </span>
                <div style={{display: this.state.displayCustomDatePicker?'block':'none'}} className="datepicker-container">
                  <DatePickerRange
                    numberOfCalendars={1}
                    selectionType="range"
                    singleDateRange={true}
                    maximumDate={new Date(moment().subtract(1, 'day'))}
                    onSelect={this.pickCustomDate.bind(this)}
                    initialDate={new Date(this.state.startDate.format())}/>
                </div>
              </span>
            </span>
          </div>

          <div>
            {this.state.graph.length > 0 ?
              <Area data={this.state.graph} width={this.state.width}/> :
              <div className="error">No Data.</div>
            }
            <div className="totals">
              {this.state.totals.map((total,index)=>{
                return (
                  <div className="metric" key={`total.${index}`}>
                    <div className="label">{total.label}</div>
                    <div className="value">{numberToString(total.value)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="small-blocks">
          <div className="small-block">
            <div className="inner">
              <BarMetric label="Dogs who like cats" percentage={90} metricName="Most dogs"/>
              <BarMetric label="Cats who like dogs" percentage={2} metricName="Sorry dogs"/>
              <BarMetric label="Cats who eat cables" value={9023} percentage={92.5} metricName="cats"/>
            </div>
          </div>
          <div className="small-block">
            <div className="inner">
              <BarMetric label="Cats enjoying water" value={542} percentage={11} metricName="cats"/>
              <BarMetric label="Cats using an iPhone" value={142} percentage={1} metricName="cats"/>
              <BarMetric label="Cats who eat fish" value={10823} percentage={99.5} metricName="cats"/>
            </div>
          </div>
        </div>

        <div className="small-blocks">
          <div className="small-block">
            <div className="inner">
              <div className="pie-area">
                <CirclePie percent={95}/>
                <p>Cats gifs / All gifs</p>
              </div>
            </div>
          </div>
          <div className="small-block">
            <div className="inner">
              <div className="pie-area">
                <CirclePie percent={15}/>
                <p>Awesomeness / Cats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function numberToString (value){
  if(typeof value !== 'number') return value
  if(value > 1000000000) return Math.round(value/100000000)/10 + 'B'
  if(value > 10000000) return Math.round(value/1000000) + 'M'
  if(value > 1000000) return Math.round(value/100000)/10 + 'M'
  if(value > 10000) return Math.round(value/1000) + 'K'
  if(value > 1000) return Math.round(value/100)/10 + 'K'
  return value
}
