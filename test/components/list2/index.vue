<template>
	<view class="infoLists">
		<view class="infoList" v-for="item in inside" :key="item.id" @click="naviTo">
			<view class="middleBox">
				<view class="imgBox">
					<image v-if="item.img" :src="item.img[0].src" mode="aspectFit"></image>
				</view>
				<view class="titleBox">
					<view class="firstLine">
						{{item.title}}
					</view>
					<view class="secondLine">
						<view class="sleftBox">
							<image :src="item.belong.pic_tou" mode="widthFix"></image>
							<text>{{item.belong.name}}</text>
						</view>
						<view class="sRightBox">
							<uni-icons type="" class="iconfont iconzan"></uni-icons>
							<text>{{item.laud}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
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
	.infoLists {
		display: flex;
		flex-wrap: wrap;

		.infoList {
			width: 320rpx;
			height: 500rpx;

			margin: 15rpx;
			padding: 10rpx;
			border: 1px solid #d7d7d7;
			border-radius: 10px;

			.middleBox {
				width: 100%;
				height: 100%;
				background-color: #ffffff;
				border-radius: 10px;

				.imgBox {
					width: 100%;
					height: 77%;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.titleBox {
					width: 100%;
					height: 23%;
					font-size: 28rpx;
					font-weight: 600;

					.firstLine {
						width: 100%;
						height: 40%;
					}

					.secondLine {
						width: 100%;
						height: 60%;
						display: flex;

						.sleftBox {
							width: 65%;
							height: 100%;
							display: flex;
							align-items: center;

							image {
								margin-left: 5px;
								width: 65rpx;
								height: 65rpx;
								border-radius: 50%;
								background-color: #f1e7e8;
							}

							text {
								margin-left: 3px;
							}
						}

						.sRightBox {
							width: 35%;
							height: 100%;
							display: flex;
							align-items: center;
							font-weight: 500;
							.iconzan{
								color: #deb2cd;
								font-size: 60rpx;
							}
							text{
								color: #a1a1a1;
								font-size: 28rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
