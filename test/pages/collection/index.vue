<template>
	<view>
		<!-- 新建收藏类 -->
		<view class="newBox">
			<view class="p-text">
				创建收藏分类
			</view>
			<view class="imgBox">
				<image src="http://121.40.19.45:8080/pics/picDemo.png" mode="scaleToFill"
					@click="addimage"></image>
			</view>
		</view>
		<!-- 列表 -->
		<collect-list :inside="inside"></collect-list>
	</view>
</template>

<script>
	import collectList from "../../components/list3/index.vue"
	export default {
		data(){
			return{
				"inside":[]
			}
		},
		onLoad() {
			this.getData();
		},
		components:{
			"collect-list":collectList
		},
		methods: {
			async getData(){
				const res=await this.$myRequest({
					url:'/api/mine/user'+0
				})
				this.inside=res.data.userData.myCollectList;
			},
			naviTo: function(e) {
				let id = Number(e.currentTarget.id);
				uni.navigateTo({
					url: '../detailPage/index?id=' + id,
					// 跳转失败显示提示信息
					fail: (e) => {
						uni.showToast({
							icon: 'none',
							title: '该页面不存在',
							mask: true,
							position: 'center'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.newBox{
		width: 100%;
		height: 220rpx;
		background-color: #FFFFFF;
		margin-top: 3px;
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
				width: 165rpx;
				height: 165rpx;
				margin: 0 16rpx 0 0;
			}
		}
	}
</style>
