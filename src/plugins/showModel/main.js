import Vue from 'vue'
import showModel from './showModel.vue'

const defaultOpt = {
    content: '这是一段内容',
    leftText: '取消',
    rightText: '确定',
    showLeft: false,
    callBack: function(){}
}

const Model = (options = {}) => {
    const ModelCons = Vue.extend(showModel)

    options = Object.assign({}, defaultOpt, options)

    const instance = new ModelCons({
        el: document.createElement('div'),
        data: options
    })
    document.body.appendChild(instance.$el)
    instance.visible = true
}

export default Model