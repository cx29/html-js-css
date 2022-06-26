<template>
	<view class="collectLists">
		<view class="collectList" v-for="item in inside" :key="item.id">
			<view class="p-text">
				{{item.title}}
			</view>
			<view class="imgBox">
				<image v-if="ite.id<3" v-for="ite in item.info" :src="ite.src" mode="scaleToFill" :key="ite.id"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['inside']
	}
</script>

<style lang="less">
	.collectLists{
		.collectList{
			width: 100%;
			height: 220rpx;
			background-color: #FFFFFF;
			margin-top: 10px;
			padding: 10rpx 10rpx 10rpx 40rpx;
			.p-text{
				font-size: 28rpx;
				font-weight: 600;
			}
			.imgBox{
				width: auto;
				height: auto;
				margin-top: 10rpx;
				image{
					width: 200rpx;
					height: 165rpx;
					margin: 0 16rpx 0 0;
				}
			}
		}
	}
</style>
