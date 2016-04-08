import moment from 'moment'

export default class demoData {
  range = 31

  constructor(settings){
    this.settings = Object.assign({
      startDate: Date.now(),
      endDate: Date.now(),
      maxPoints: 31
    }, settings)

    this.settings.startDate = moment(parseInt(this.settings.startDate))
    this.settings.endDate = moment(parseInt(this.settings.endDate))
  }

  cleanGraphData(data = []){
    var results = []
    // Force each point ot have a time
    data.forEach((point, i)=>{if(!point.time)data[i].time = point.id || 0;results.push(point)})

    // Convert unix time to ms unix time
    // results.forEach((point, i)=>{if(results[i].format !== 'x'){results[i].time = parseFloat(point.time) * 1000;results[i].format = 'x'}})

    // Remove data which is out of range
    let s = parseFloat(this.settings.startDate.format('x')),
        e = parseFloat(this.settings.endDate.format('x'))

    results = results.filter(point=>point.time >= s && point.time <= e)

    // Limit number of points for given data set
    if(results.length > this.settings.maxPoints){
      let zScale = results.length / this.settings.maxPoints, selectedRange = []
      results.forEach((point, i) => {
        let k = Math.floor(i / zScale),
            v = parseFloat(point.value)
        if(selectedRange[k]) selectedRange[k].value += v
        else selectedRange[k] = {value: v, label: point.label, time: point.time}
      })
      return selectedRange
    }
    else
      return results
  }

  linearGraph(){
    return this.cleanGraphData(genGraphData(this.settings.startDate, this.settings.endDate))
  }

  totals(){
    return genTotals()
  }
}

// FIXTURES
function genGraphData(startDate, endDate, intervalLength=86400000){
  let range = Math.abs(moment(startDate).diff(moment(endDate), 'days'))
  let views = [], value = 3000, steps = range / 7, growth = [1,-1,1,-2,2,3,5], startTime = parseInt(moment(startDate).format('x'))
  for(let i = 0;i<range;i++){
    let val = Math.abs(value + (1000 * growth[Math.floor(i/steps)]) + Math.round(Math.random() * 3000))
    views.push({time: startTime + i * intervalLength, value: val, label: '{{value}} cats online'})
  }
  return views
}
function genTotals(){
  return [
    {label: 'Total cats', value: Math.round(Math.random() * 1004200 + 10000)},
    {label: 'Clicks', value: Math.round(Math.random() * 30000 + 50000)},
    {label: 'Comments', value: Math.round(Math.random() * 20000 + 1000)}
  ]
}
