# zetank-rank
>组件的icon使用uview,使用前请自己安装插件[uview](https://www.uviewui.com/components/install.html)

###安装
下载组件到项目即可，本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范

```html
	<view style="padding: 20upx 0;">
		<zetank-rank :rankData="rankData"></zetank-rank>
	</view>

```

```json

	rankData:[{
		user:{
			nickname:"张三",
			avatar:"/static/logo.png"
		},
		data:3
	}]

```