import Model from './showModel/main'
const plugins = {
    $showModel: Model
}

const install = function(vue) {
    for(const plugin in plugins) {
        vue.prototype[plugin] = plugins[plugin]
    }
}

export default install
