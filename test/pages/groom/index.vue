<template>
	<view>
		<view class="F-Box">
			<view class="pic">
				<image src="http://121.40.19.45:8080/pics/fish.png" mode="scaleToFill"></image>
			</view>
			<view class="bottomBox">
				<text class="t1">快把小游推荐给朋友们吧</text>
				<text class="t2">点击下方链接进行推荐</text>
				<button open-type="share">推荐给好友</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			      console.log(res)
			    }
			    return {
			      title: '武汉\"游\"点料',
			      path: '/pages/homepage/index',
				  imageUrl:'http://121.40.19.45:8080/pics/fengmian.png'
			    }
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f6f6f6;
	}
	.F-Box{
		width: 80%;
		height: auto;
		margin: 0 auto;
		.pic{
			width: 100%;
			height: 400rpx;
			margin: 0 auto;
			border-bottom: 2px solid #d4d4d4;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 65%;
				height: 250rpx;
			}
		}
		.bottomBox{
			width: 80%;
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin:0 auto;
			.t1,.t2{
				width: 200px;
				font-size: 28rpx;
				margin: 20px 0;
			}
			.t1{
				font-weight: 600;
				color: #8f8e8b;
				margin-bottom: 0;
			}
			.t2{
				margin-top: 0;
				font-size: 20rpx;
				color: #979797;
			}
			button{
				width: 300rpx;
				height: 80rpx;
				background-image: linear-gradient(to right,#f4cfdb,#b3a9d8);
				font-size: 32rpx;
				font-weight: 700;
			}
		}
	}
</style>
