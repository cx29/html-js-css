<template>
	<view>
		<!-- 头像,点赞,收藏,最近浏览 -->
		<view class="topBoxs">
			<!-- 头像部分 -->
			<view class="topBox">
				<!-- 头像部分 -->
				<view class="headSculpture">
					<image v-if="mineInfo.pic_src" :src="mineInfo.pic_src" mode="scaleToFill"></image>
				</view>
				<!-- 名字部分 -->
				<view class="nameSpace">
					<!-- 名字 -->
					<text>2.9</text>
				</view>
			</view>
			<!-- 个人面板的信息部分 -->
			<view class="bottomBox">
				<navigator class="collectBox" url="../collection/index" open-type="navigate">
					<text class="num">29</text>
					<text class="name">收藏</text>
				</navigator>
				<navigator open-type="navigate" url="../myStow/index" class="goodBox">
					<text class="num">29</text>
					<text class="name">赞过</text>
				</navigator>
				<navigator open-type="navigate" url="../lastView/index" class="visitBox">
					<text class="num">29</text>
					<text class="name">最近浏览</text>
				</navigator>
			</view>
		</view>
		<view class="news_list">
			<view class="news_top">
				<navigator url="../myInfo/index" open-type="navigate" class="mineInfo" @click="setData()">
					我的资料
				</navigator>
				<navigator url="../hide/index" open-type="navigate" class="secret">
					隐私
				</navigator>
			</view>
			<view class="news_bottom">
				<view class="userTickle">
					<navigator url="../tickle/index" open-type="navigate">
						用户反馈
					</navigator>
				</view>
				<view class="groom">
					<navigator url="../groom/index" open-type="navigate">
						推荐此小程序
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mineInfo: {}
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			setData: function() {
				uni.setStorage({
					key: 'userInfo',
					data: this.mineInfo,
					success() {
						console.log('success');
					}
				})
			},
			async getData() {
				const res = await this.$myRequest({
					url: '/api/mine/user'+0
				})
				this.mineInfo = res.data.userData;
			}
		}
	}
</script>

<style lang="less">
	.topBoxs {
		width: 100%;
		height: 600rpx;
		background-image: linear-gradient(to right top, #e999b6, #ae95cc);

		.topBox {
			width: 100%;
			height: 400rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.headSculpture {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				background-color: #e8dbd3;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				image {
					width: 98%;
					height: 98%;
					border-radius: 50%;
				}
			}

			.nameSpace {
				width: 130rpx;
				height: 40rpx;
				margin-top: 10px;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					width: 100rpx;
					text-align: center;
					font-size: 28rpx;
					color: #735c5e;
					font-weight: 600;
				}
			}
		}

		.bottomBox {
			width: 100%;
			height: 200rpx;
			display: flex;

			.collectBox,
			.goodBox,
			.visitBox {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 32rpx;
				font-weight: 600;

				.name {
					font-weight: 500;
					color: #8c7a80;
					font-size: 28rpx;
				}
			}
		}
	}

	.news_list {
		width: 100%;
		height: auto;
		color: #83817c;
		font-size: 28rpx;
		font-weight: 600;

		.news_top {
			width: 100%;
			height: 200rpx;
			background-color: #ffffff;

			.mineInfo,
			.secret {
				width: 80%;
				height: 100rpx;
				display: flex;
				align-items: center;
				margin: 0 auto;
				border-bottom: 1px solid #efefef;
			}
		}

		.news_bottom {
			width: 100%;
			height: auto;

			.userTickle,
			.groom {
				width: 100%;
				height: 100rpx;
				background-color: #fff;
				margin-top: 16rpx;

				navigator {
					width: 80%;
					margin: 0 auto;
					height: 100%;
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.modify {
		position: flex;
		bottom: 0;
		width: 100%;
		height: 100px;
		background-color: pink;
	}
</style>
