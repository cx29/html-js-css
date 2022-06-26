<template>
	<view class="goodsList">
		<navigator url="" @click="naviTo" class="infos" v-for="item in inside" :key="item.id">
			<image v-if="item.src" :src="item.src" mode="scaleToFill"></image>
			<view class="right-info">
				<view class="info-title">
					{{item.title}}
				</view>
				<view class="info-text">{{item.p}}</view>
				<!-- 官方推荐以及热门推荐 -->
				<view class="iconBoxs">
					<navigator url="" class="revBox">
						<uni-icons type="" class="iconfont iconxiaoxikuang"></uni-icons>
						{{item.rev}}
					</navigator>
					<view class="goodBox">
						<uni-icons type="" class="iconfont iconzan"></uni-icons>
						{{item.good}}
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: ['inside'],
		methods: {
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
	.goodsList {
		width: 100%;
		height: auto;

		.infos {
			width: 90%;
			height: 240rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			border-bottom: 2px solid #efefef;
			border-top: 1px solid #efefef;

			image {
				// width: 230rpx;
				width: 30%;
				// height: 160rpx;
				height: 70%;
				border-radius: 5px;
			}

			.right-info {
				width: 68%;
				height: 70%;
				display: flex;
				margin-left: 2%;
				flex-direction: column;

				.info-title {
					width: 100%;
					height: 20%;
					font-size: 30rpx;
					font-weight: 900;
				}

				.info-text {
					width: 100%;
					height: 69%;
					margin-top: 1%;
				}

				.iconBoxs {
					width: 100%;
					height: 9%;
					margin-top: 1%;
					display: flex;
					justify-content: flex-end;

					.revBox {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
