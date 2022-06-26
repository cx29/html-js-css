<template>
	<view>
		<view class="boxBig" :style="{height:topHeight}">
			<scroll-view v-if="datas" scroll-y="true" :style="{height:sTop}">
				<!-- 轮播图 -->
				<swiper v-if="datas" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
					indicator-active-color="#fff" indicator-color="#b9c1c4">
					<swiper-item v-for="item in datas.img" :key="item.index">
						<image :src="item.src" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
				<view class="textBox" v-if="datas">
					<text>{{datas.title}}</text>
					<view class="text">
						{{datas.text}}
					</view>
				</view>
			</scroll-view>
			<view class="bottomBox">
				<view class="leftBox">
					<view class="inputBox">
						<uni-icons type="" class="iconfont iconbiji"></uni-icons>
							<input type="text" placeholder="说点什么..." />
						</view>
					</view>
				<view class="rightBox">
					<!-- 评论 -->
					<view class="newsBox">
						<uni-icons type="" class="iconfont iconxiaoxikuang"></uni-icons>
						<text>{{datas.comment}}</text>
					</view>
					<!-- 赞 -->
					<view class="laudBox">
						<uni-icons type="" class="iconfont iconzan"></uni-icons>
						<text>{{datas.laud}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//获取屏幕高度
	let height = uni.getSystemInfoSync().screenHeight;
	export default {
		data() {
			return {
				topHeight: height + 'px',
				sTop: (height - 50) + 'px',
				datas: {},
				info: {},
				id: -1
			}
		},
		onLoad(e) {
			this.id = Number(e.id);
			this.getInfo();
			this.getData();
		},
		methods: {
			async getInfo() {
				const res = await this.$myRequest({
					url: '/api/inside/0'
				})
				this.info = res.data.message[this.id];
				//动态更改详情页标题
				uni.setNavigationBarTitle({
					title: this.info.title
				})
			},
			async getData() {
				const res = await this.$myRequest({
					url: '/api/info/list' + this.id
				})
				this.datas = res.data.data;
			}
		}
	}
</script>

<style lang="less">
	.boxBig {
		background-color: #fff;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		// justify-content: center;
		scroll-view {
			width: 100%;

			swiper {
				width: 98%;
				height: 425px;

				image {
					width: 100%;
					height: 100%;
				}
			}
 
			.textBox {
				width: 98%;
				height: auto;
				margin-top: 10px;

				text {
					width: 100%;
					height: auto;
					font-size: 18px;
					font-weight: 800;
				}

				.text {
					font-size: 14px;
					margin-top: 10px;
				}
			}
		}

		.bottomBox {
			width: 100%;
			height: 50px;
			position: fixed;
			background-color: #fff;
			bottom: 0;
			display: flex;
			align-items: center;
			.leftBox,.rightBox{
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				color: #aaaaaa;
			}
			.inputBox{
				width: 50%;
				height: 50%;
				border: 1px solid #e4e4e4;
				display: flex;
				align-items: center;
				margin: 0 auto;
				border-radius: 20px;
				padding: 5px;
				margin-left: 10%;
				input{
					width: 80%;
					color: #625b5a;
					font-size: 24rpx;
				}
			}
			.rightBox{
				justify-content: space-between;
				height: 40%;
				margin-right: 10%;
			}
		}
	}
</style>
