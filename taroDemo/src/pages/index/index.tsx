import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtDrawer, AtButton } from 'taro-ui'
import './index.less'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      show:false
    }
  }

  componentWillMount () { }

  componentDidMount () { 
      console.log("index页面的this:", this);//在 Taro 的页面和组件类中，this 指向的是 Taro 页面或组件的实例
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  openMenu=()=>{
    this.setState({
      show:true
    })
  }

  onClose(){
    this.setState({
      show:false
    })
  }

  onItemClick (index) {
    const ENV = Taro.getEnv()
    let content
    if (typeof index !== 'number') {
      content = ''
    } else {
      content = `你点击了第 ${+index + 1} 个项目`
    }
    if (ENV === 'WEAPP') content && Taro.showModal({ content, showCancel: false })
    else if (ENV === 'WEB') content && alert(content)

    if(index === 2){
      Taro.navigateTo({
      url: '/pages/demo/demo?test=1'
    })
    }
  }

  render () {
    return (
      <View className="index">
        <AtDrawer
          show={this.state.show}
          mask
          onClose={this.onClose.bind(this)}
          items={['项目一', '项目二', '58校校']}
          onItemClick={this.onItemClick.bind(this)}
        ></AtDrawer>


        <View className='indexMenu' onClick={this.openMenu}>

          <Image src="https://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2"
                 className="logo-icon" mode="widthFix"/>
          <Text className="welcome">Hello World!</Text>

        </View>
      </View>

    )
  }
}

