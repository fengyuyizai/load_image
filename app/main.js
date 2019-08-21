import './assets/css/index.css'
import Event from './util/event.js'


const control = document.getElementById('control');

Event.addEvent(control, 'click', (e) => {
    const tagName = e.target.tagName
    if (tagName === 'BUTTON') {
        
    }
    // console.log(e.target.tagName)
})