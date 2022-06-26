<template>
	<view>
		<view class="top-box" :style="{height:topBar}">
			<view class="status-bar" :style="{height:topBarHeight}">
				<!-- 这是状态栏 -->
			</view>
			<!-- 刷新按钮以及消息标题 -->
			<view class="topBar" :style="{top:topBarHeight}">
				<!-- 刷新按钮,暂时没有很好的解决方案 -->
				<navigator class="leftBox" url="./index" open-type="switchTab">
					<uni-icons type="" class="iconfont iconicon_Y_touping_shauxin"></uni-icons>
					<text>刷新</text>
				</navigator>
				<text class="nav-title">消息</text>
			</view>
		</view>
		<view class="inputBox">
			<input type="text" placeholder="搜索标题或聊天记录" />
			<!-- 搜索界面 -->
			<navigator url="" class="search">
				<uni-icons type="" class="iconfont iconsearch"></uni-icons>
			</navigator>
		</view>
			<!-- 三个按钮 -->
		<view class="navBox">
			<navigator url="" class="tUp">
				<image src="http://121.40.19.45:8080/pics/icontUp.jpg" mode="scaleToFill"></image>
				<text>赞和收藏</text>
			</navigator>
			<navigator url="" class="invite">
				<image src="http://121.40.19.45:8080/pics/iconInvite.jpg" mode="scaleToFill"></image>
				<text>邀请</text>
			</navigator>
			<navigator url="" class="info">
				<image src="http://121.40.19.45:8080/pics/iconInfo.jpg" mode="scaleToFill"></image>
				<text>评论和@</text>
			</navigator>
		</view>
		<!-- 消息列表 -->
		<view class="newsBox">
			<news-list :list="lists"></news-list>
		</view>
	</view>
</template>

<script>
	import newsList from "../../components/newsList/newsList.vue"
	var topBarHeight=uni.getSystemInfoSync().statusBarHeight + 'px' ;
	var topBar=uni.getSystemInfoSync().statusBarHeight+45+'px';
	export default{
		data(){
			return{
				topBarHeight:topBarHeight,
				topBar:topBar,
				lists:[]
			}
		},
		components:{
			"news-list":newsList 
		},
		methods:{
			async getList(){
				const res=await this.$myRequest({
					url:"/api/news"
				})
				this.lists=res.data.data;
			}
		},
		onLoad() {
			this.getList();
		}
	}  
</script>

<style lang="less">
	.top-box{
		width: 100%;
		.status-bar{
			z-index: 100;
			position: fixed;
			top: 0;
			width: 100%;
			background-color: #f6f6f6;
		}
		.topBar{
			width: 100%;
			position: fixed;
			z-index: 100;
			height: 45px;
			display: flex;
			align-items: center;
			background-color: #f6f6f6;
			justify-content: center;
			.leftBox{
				width: 100rpx;
				height: 40rpx;
				font-size: 28rpx;
				position: absolute;
				left: 10%;
			}
		}
	}
	.inputBox{
		width: 90%;
		height: 50rpx;
		background-color: #faf6eb;
		border-radius: 20px;
		margin: 0 auto;
		margin-top: 5px;
		display: flex;
		align-items: center;
		border: 1px solid #e9e9e6;
		input{
			width: 85%;
			text-indent: 17px;
			font-size: 14px;
			margin-left: 5%;
			color: #7d7b76;
		}
		.search{
			width: 10%;
			border-left: 2px solid #b6b3ab;
			.iconsearch{
				margin-left: 14rpx;
				color: #b6b3ab;
			}
		}
	}
	.navBox{
		width: 98%;
		height: 200rpx;
		background-color: #ffffff;
		margin: 0 auto;
		margin-top: 10px;
		display: flex;
		border: 2px solid #5e7aa6;
		.tUp,.invite,.info{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			text{
				margin-top: 5px;
				font-size: 12px;
				color: #a2a2a2;
			}
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
	.newsBox{
		margin-top: 20px;
		width: 100%;
		height: auto;
	}
</style>
