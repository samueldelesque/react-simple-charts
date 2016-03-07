import React from 'react'
import './bar-metric.scss'

export default (label, percent, metric) =>
  <div className="bar-metric clearfix" key={`bar-metric.${label}.${Math.random()}`}>
    <div className="label">{label}</div>
    <div className="bar-row">
      <div className="bar-container">
        <div className="bar-completed" style={{width: percent + '%'}}></div>
      </div>
      <div className="metric">{metric}</div>
    </div>
  </div>
