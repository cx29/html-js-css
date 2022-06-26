<template>
	<view class="ul">
		<navigator url="" class="li" v-for="item in list" :key="item.id">
			<image :src="item.image_src" mode="scaleToFill"></image>
			<view class="textBox">
				<text class="title">{{item.name}}</text>
				<text class="info">{{item.news}}</text>
			</view>
			<view class="time">
				{{item.time}}
			</view>
		</navigator>
	</view>
</template>

<script>
	export default{
		"props":["list"]
	}
</script>

<style lang="less">
	.ul{
		.li{
			width: 100%;
			height: 110rpx;
			background-color: #ffffff;
			margin: 3px auto;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 68rpx;
				height: 68rpx;
				margin-right: 15px;
			}
			.textBox{
				width: 400rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.title{
					font-size: 30rpx;
					font-weight: 800;
					margin-bottom: 5px;
				}
				.info{
					font-size: 26rpx;
					color: #979797;
				}
			}
			.time{
				font-size: 28rpx;
				color: #a9a9a9;
			}
		}
	}
</style>
