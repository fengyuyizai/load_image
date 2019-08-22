import './assets/css/index.css'
import Event from './util/event.js'

const control = document.getElementById('control');
const imgList = [
    'logo1.png',
    'logo2.jpg',
    'logo3.jpg'
]

Event.addEvent(control, 'click', (e) => {
    // console.log(e)
    Event.stopEvent(e)
    const tagName = e.target.tagName
    const index = e.target.dataset.index
    if (e.path[1].tagName !== 'LI') {
        return
    }
    let totalImgTag = e.path[1].childNodes[0]
    let prompTag = e.path[1].childNodes[1].getElementsByClassName('value')[0]
    if (tagName === 'BUTTON') {
        let newTag = addImgTag(totalImgTag, index)
        listenImgLoad(newTag).then((time) => {
            modifyPrompTime(prompTag, time)
            prompTag = null
        })
    }
    totalImgTag = null
})

/**
 * 为指定的标签修改时间
 * @param {Element} tag 
 * @param {Number} time 
 */
function modifyPrompTime (tag, time) {
    tag.innerText = time + ' ms'
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
            src="static/images/${imgList[index - 1]}"
            alt="vue的logo${index}" />`
    return totalEle.children[0]
}