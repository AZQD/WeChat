import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {AtGrid, AtList, AtListItem} from 'taro-ui'

import './demo.less'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '58校校'
  }

  constructor() {
    super(...arguments)
    this.state = {
      menuData: [
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88801.png',
          value: '校园资讯'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88802.png',
          value: '脱单专区'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88803.png',
          value: '二手买卖'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88804.png',
          value: '兼职实习'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88805.png',
          value: '打折优惠'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88806.png',
          value: '床位出租'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88807.png',
          value: '社团活动'
        },
        {
          image:
            'https://img.58cdn.com.cn/weixin/r/school/visuals/visual_icon_88808.png',
          value: '求帮忙'
        },
      ],
      listData: [
        {
          cateIcon: 'https://img.58cdn.com.cn/weixin/r/school/visuals/second_icon_12052.png',
          cateName:'校园一刻',
          title:'2019秋季校园招聘——校招网申进行中,敬请期待~',
          desc: "🌈2019秋季校园招聘👇以下项目正在校招中🔥🔥🔥",
          picture:'https://pic1.58cdn.com.cn/images/xq_img/n_v2883777b39d534e168845ba112e3a793d.jpg?watermark=1&w=216&h=216&ss=1&crop=1&cpos=middle',
          zanIcon:'//img.58cdn.com.cn/weixin/r/school/visuals/has_praise.png',
          zanNum:12
        },
        {
          cateIcon: 'https://img.58cdn.com.cn/weixin/r/school/visuals/second_icon_12027.png',
          cateName:'校园招聘',
          title:'58同校招站长啦！',
          desc: "想成为上市公司创业合伙人么！·宝贵实践经验，能力飙升，·认识各院系小伙伴，延伸社交圈，·专业人员培训指导，清晰的职业成长路径，心动不如行动，快扫码报名吧！",
          picture:'https://pic6.58cdn.com.cn/images/xq_img/n_v2194e796765724971910fc3ef666471d5.jpg',
          zanIcon:'//img.58cdn.com.cn/weixin/r/school/visuals/has_praise.png',
          zanNum:66
        },
        {
          cateIcon: 'https://img.58cdn.com.cn/weixin/r/school/visuals/second_icon_12032.png',
          cateName:'同校头条',
          title:'有槽必须吐！不吐不痛快！',
          desc: "你对大学生活的某些槽点，对校校来说就是帮助点，所以校校求各位一起来聊聊大学生活有哪些是必须diss的！",
          picture:'https://pic6.58cdn.com.cn/images/xq_img/n_v243c3a2eb45bb498e9c0e388dca647c21.jpg?watermark=1&w=1000&h=1000&ss=1&crop=1&cpos=northwest',
          zanIcon:'//img.58cdn.com.cn/weixin/r/school/visuals/has_praise.png',
          zanNum:20
        },
      ]
    }
  }

  componentWillMount() {
  }

  componentDidMount() {

    console.log("demo页面的this:", this);

    /*Taro.request({
      url: 'https://txapp.58.com/m/cate/listIcon',
      data: {
        localId: '1101095',
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => console.log(res.data))*/

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    const {menuData, listData} = this.state

    return (
      <View className='index'>

        <AtList>
          <AtListItem hasBorder={false}
            title='北京邮电大学'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
        </AtList>

        <View className="menuBox">
          <AtGrid columnNum={4} hasBorder={false} data={this.state.menuData}/>
        </View>

        <View className="list-box">
          {
            listData.map((item, index) => {
              return <View className="list-li" key={index}>
                <View className="top">
                  <Image src={item.cateIcon}
                         className="cate-icon" mode="widthFix"/>
                  <Text className="cate-name">{item.cateName}</Text>
                </View>
                <View className="title"><Text>{item.title}</Text></View>
                <View className="desc">{item.desc}</View>

                <View className="img-box">
                  <Image src={item.picture}
                         className="img-icon" mode="widthFix"/>
                </View>

                <View className="ctrl">
                  <View className="ctrl-item">
                    <Image src={item.zanIcon}
                           className="ctrl-icon" mode="widthFix"/>
                    <Text
                      className="ctrl-num">{item.zanNum}</Text>
                  </View>
                </View>

              </View>
            })
          }
        </View>

      </View>
    )
  }
}

