const Event = {
    // 页面加载
    readEvent : function(fn) {
        if (fn === null) {
            fn = document
        }
        var oldonload = window.onload
        if (typeof window.onload !== 'function') {
            window.onload = fn
        } else {
            window.onload = function() {
                oldonload()
                fn()
            }
        }
    },
    // 监听
    addEvent: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element)
            })
        } else {
            element['on' + type] = handler
        }
    },
    // 移除事件
    removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler)
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = null
        }
    },
    // 阻止事件
    stopEvent: function(event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.stopPropagation()
        }
    },
    // 获取目标
    getTarget: function(event) {
        return event.target || event.srcElement
    },
    // 获取event对象引用
    getEvent: function(e) {
        let ev = e || window.event
        if (!ev) {
            var c = this.getEvent.caller
            while(c) {
                ev = c.arguments[0]
                if (ev && Event == ev.constructor) {
                    break
                }
                c = c.caller
            }
        }
        return ev
    }
}

export default Event