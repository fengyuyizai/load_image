import './assets/css/index.css'
import Event from './util/event.js'

const control = document.getElementById('control');

Event.addEvent(control, 'click', (e) => {
    Event.stopEvent(e)
    const tagName = e.target.tagName
    const index = e.target.dataset.index
    let totalImgTag = e.path[1].childNodes[0]
    let prompTag = e.path[1].childNodes[1].getElementsByClassName('value')[0]
    if (tagName === 'BUTTON') {
        let newTag = addImgTag(totalImgTag, index)
        listenImgLoad(newTag).then((time) => {
            modifyPrompTime(prompTag, time)
        })
    }
    totalImgTag = null
    prompTag = null
    console.log(e)
})

/**
 * 为指定的标签修改时间
 * @param {Element} tag 
 * @param {Number} time 
 */
function modifyPrompTime (tag, time) {
    tag.innerText = time
}

/**
 * 监听图片加载
 * @param {Element} imgTag
 * @returns {Promise}
 */
function listenImgLoad(imgTag) {
    let startTime = (new Date()).getTime()
    return new Promise((resolve, rejects) => {
        imgTag.onload = function() {
            let endTime = (new Date()).getTime()
            resolve(endTime - startTime)
        }
    })
}

/**
 * 添加图片
 * @param {Element} totalEle 
 * @param {Number} index 
 * @returns {Element}
 */
function addImgTag (totalEle, index) {
    totalEle.innerHTML = `
        <img 
            class="image"
            id="image_${index}"
            src="static/images/logo${index}.png"
            alt="vue的logo${index}" />`
    return totalEle.children[0]
}