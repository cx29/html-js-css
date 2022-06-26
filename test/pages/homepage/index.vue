<template>
	<view>
		<view class="top-box" :style="{height:topBar}">
			<view class="status-bar" :style="{height:topBarHeight}">
				<!-- 这是状态栏 -->
			</view>
			<!-- 首页顶部导航栏 -->
			<view class="nav-bar" :style="{top:topBarHeight}">
				<view class="navMidbar">
					<!-- 地址按钮 -->
					<navigator url="" class="placeBox">
						<text class="place">洪山区</text>
						<uni-icons type="" class="iconfont iconjiantou2 pl"></uni-icons>
					</navigator>
					<view class="infoBox">
						<!-- 搜索 -->
						<uni-icons type="" class="iconfont iconsearch sh"></uni-icons>
						<input type="text" placeholder="附近好玩的地方推荐" placeholder-class="hint" class="searchText" />
					</view>
				</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="bottomBox">
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in swipers" :key="item.goods_id">
					<navigator url="">
						<image :src="item.image_src" mode="widthFix"></image>
					</navigator>
				</swiper-item>
			</swiper>
			<view class="navBox">
				<!-- 主页按钮 -->
				<view class="nav-icon">
					<navigator url="" @click="navigateToList(0)">
						<image src="http://121.40.19.45:8080/pics/icon1.jpg" mode=""></image>
						<view class="nav-text">住宿</view>
					</navigator>
				</view>
				<view class="nav-icon">
					<navigator url="" @click="navigateToList(1)">
						<image src="http://121.40.19.45:8080/pics/icon2.jpg" mode=""></image>
						<view class="nav-text">购物</view>
					</navigator>
				</view>
				<view class="nav-icon">
					<navigator url="" @click="navigateToList(2)">
						<image src="http://121.40.19.45:8080/pics/icon3.jpg" mode=""></image>
						<view class="nav-text">玩乐</view>
					</navigator>
				</view>
				<view class="nav-icon">
					<navigator url="" @click="navigateToList(3)">
						<image src="http://121.40.19.45:8080/pics/icon4.jpg" mode=""></image>
						<view class="nav-text">美食</view>
					</navigator>
				</view>
				<view class="nav-icon">
					<navigator url="" @click="navigateToList(4)">
						<image src="http://121.40.19.45:8080/pics/icon5.jpg" mode=""></image>
						<view class="nav-text">情侣</view>
					</navigator>
				</view>
			</view>
			<!-- 地图 -->
			<view class="map-btn">
				<navigator url="" @click="clickMap">
					<image src="http://121.40.19.45:8080/pics/map.jpg" mode="widthFix"></image>
				</navigator>
			</view>
			<!-- 内容框 -->
			<view class="info-box">
				<!-- 内容导航栏 -->
				<view class="info-tabs">
					<view class="info-tab " v-for="(item,index) in totalBarList" :key="item.id"
						@click="switchTab(index,item.id)" :style="active===index?'color:#333;':''">
						{{item.text}}
						<view :class="active===index?'line':'lines'"></view>
					</view>
				</view>
				<view class="contents">
					<!-- 官方推荐,热门推荐,附近推荐的内容部分 -->
					<navigator url="" @click="naviTo" v-if="active!=3" class="infos" v-for="item in inside" :key="item.id" :id="item.id">
						<image v-if="item.src" :src="item.src" mode="scaleToFill"></image>
						<view class="right-info">
							<view class="info-title">
								{{item.title}}
							</view>
							<view class="info-text">{{item.p}}</view>
							<!-- 官方推荐以及热门推荐的图标 -->
							<view class="iconBoxs" :style="active===2?'display: none;':'display: flex'">
								<navigator url="" class="revBox">
									<uni-icons type="" class="iconfont iconxiaoxikuang"></uni-icons>
									{{item.rev}}
								</navigator>
								<view class="goodBox">
									<uni-icons type="" class="iconfont iconzan"></uni-icons>
									{{item.good}}
								</view>
							</view>
							<!-- 附近推荐的图标 -->
							<view class="iconBox" :style="active!=2?'display: none;':'display: flex'">
								<navigator url="" class="revBox">
									{{item.rev}}
								</navigator>
								<view class="goodBox">
									<image src="http://121.40.19.45:8080/pics/round.jpg" mode="scaleToFill"
										class="roundPic"></image>
									{{item.good}}
								</view>
							</view>
						</view>
					</navigator>
					<!-- 我的生活内容部分 -->
					<view v-if="active===3" class="myLifeBox">
						<view class="mineBox">
							<view class="topInput">
								<image src="http://121.40.19.45:8080/pics/minePic.jpg" mode="scaleToFill"></image>
								<view class="textBox">
									<input type="text" placeholder="来记录你和小游一起走过的地方吧!" />
								</view>
							</view>
							<view class="bottomIcon">
								<navigator url="" class="b-icon" v-for="item in myIcons" :key="item.id">
									<image :src="item.src" mode="scaleToFill"></image>
									<text>{{item.icon_text}}</text>
								</navigator>
							</view>
						</view>
						<!-- 我的生活发帖 -->
						<view class="mineInfos">
							<view class="isNull" v-if="mineLife.length===0">
								{{tips}}
							</view>
							<view class="mineInfo" v-if="mineLife.length!=0" v-for="item in mineLife" :key="item.id">
								<goods-list :inside="mineLife"></goods-list>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入组件
	import goodsList from "../../components/list/list.vue"
	var topBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	var topBar = uni.getSystemInfoSync().statusBarHeight + 45 + 'px';
	export default {
		data() {
			return {
				topBarHeight: topBarHeight,
				topBar: topBar,
				swipers: [],
				totalBarList: [],
				active: 0,
				inside: [],
				myIcons: [],
				mineLife: [],
				tips: "哇,你还没有发布过生活哦\>\<"
			}
		},
		onLoad() {
			this.sendGet();
			this.sendBar();
			this.switchTab(0, 0);
		},
		//上拉刷新
		onReachBottom() {
			console.log("触发了");
		},
		// 注册组件
		components: {
			"goods-list": goodsList,
		},
		// 发送get请求
		methods: {
			//跳转到列表页面
			navigateToList:function(e){
				uni.navigateTo({
					url:'../lists/index?id='+e,
					// 跳转失败显示提示信息
					fail: (e) => {
						uni.showToast({
							icon:'none',
							title:'该页面不存在',
							mask:true,
							position:'center'
						})
					}
				})
			},
			clickMap:function(){
				uni.chooseLocation({
					success(e) {
						console.log(e);
					}
				})
			},
			//跳转页面
			naviTo:function(e){
				let id=Number(e.currentTarget.id);
				uni.navigateTo({
					url:'../detailPage/index?id='+id,
					// 跳转失败显示提示信息
					fail: (e) => {
						uni.showToast({
							icon:'none',
							title:'该页面不存在',
							mask:true,
							position:'center'
						})
					}
				})
			},
			async sendGet() { 
				const res = await this.$myRequest({
					url: '/api/pic'
				})
				this.swipers = res.data.message;
			},
			async sendBar() {
				const res = await this.$myRequest({
					url: '/api/daohang/text'
				})
				this.totalBarList = res.data.data.navList;
			},
			// 拉取用户信息时需要用户的id,来判断用户的生活
			async switchTab(index, id) {
				this.active = index;
				let url = index != 3 ? ('/api/inside/' + id) : '/api/mine/icon';
				const res = await this.$myRequest({
					url: url
				})
				this.inside = index != 3 ? res.data.message : null;
				this.myIcons = index === 3 ? res.data.message : null;
				if (index === 3) {
					const re = await this.$myRequest({
						url: "/api/mine/life" + 0
					})
					this.mineLife = re.data.message;
				}
			}
		},
	}
</script>

<style lang="less">
	.hint {
		font-size: 10px;
	}

	.top-box {
		width: 100%;

		.status-bar {
			z-index: 100;
			position: fixed;
			top: 0;
			width: 100%;
			background-image: linear-gradient(to right, #9b9ad6, #d18eb7);
		}

		.nav-bar {
			z-index: 100;
			position: fixed;
			width: 100%;
			height: 45px;
			background-image: linear-gradient(to right, #9b9ad6, #d18eb7);
			display: flex;
			align-items: center;

			.navMidbar {
				margin-left: 20rpx;
				font-size: 14px;
				display: flex;

				.placeBox {
					display: flex;
					align-items: center;

					.place {
						width: 45px;
						height: 22px;
					}

					.pl {
						width: 14px;
						height: 26px;
						font-size: 8px;
						line-height: 26px;
					}
				}

				.infoBox {
					width: 340rpx;
					height: 28px;
					background-color: #f8e4d9;
					display: flex;
					align-items: center;
					border-radius: 20px;
					margin-left: 20rpx;
					border: 1px solid #333;
					border-bottom: 0;
					border-left: 0;

					.sh {
						width: 20rpx;
						height: 20rpx;
						font-size: 10px;
						line-height: 20rpx;
						margin-left: 20rpx;
						color: #c2b8b1;
					}

					.searchText {
						width: 320rpx;
						height: 100%;
						border-radius: 20px;
						margin-left: 10rpx;
						font-size: 10px;
						color: #948d88;
						text-indent: 16rpx;
					}
				}
			}
		}
	}

	.bottomBox {
		width: 95%;
		margin: 0 auto;
		margin-top: 5px;
		height: auto;

		swiper {
			width: 100%;
			height: 340rpx;

			navigator {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
				}
			}
		}

		.navBox {
			margin-top: 5px;
			width: 100%;
			height: 200rpx;
			display: flex;
			align-items: center;
			background-color: #ffffff;
			border-radius: 10px;
			border-bottom: 1px solid #333;
			border-right: 1px solid #333;

			.nav-icon {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 100rpx;
					height: 100rpx;
				}

				.nav-text {
					font-weight: 900;
					font-size: 14px;
					text-align: center;
				}
			}
		}

		.map-btn {
			width: 100%;
			height: auto;
			margin-top: 5px;

			navigator {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 99%;
					border-radius: 5px;
				}
			}
		}

		.info-box {
			margin-top: 5px;
			width: 100%;
			height: auto;
			background-color: #ffffff;
			border-radius: 10px;

			.info-tabs {
				display: flex;
				width: 100%;
				height: 50rpx;
				padding-top: 10px;

				.info-tab {
					flex: 1;
					text-align: center;
					font-size: 28rpx;
					font-weight: 900;
					color: #b5b5b5;
					position: relative;

					.lines {
						width: 100%;
						height: 4px;
						position: absolute;
						bottom: 0;
						border-bottom: 3px solid #c7c7c7;
					}

					.line {
						width: 100%;
						height: 4px;
						position: absolute;
						bottom: 0;
						border-radius: 10px;
						background-image: linear-gradient(to right, #a798d0, #d18eb7);
					}
				}
			}

			.contents {
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

						.iconBoxs,
						.iconBox {
							width: 100%;
							height: 9%;
							margin-top: 1%;
							display: flex;
							justify-content: flex-end;

							.revBox {
								margin-right: 20rpx;
							}
						}

						.iconBox {
							height: 20px;

							.revBox {
								margin-right: 200rpx;
								font-size: 24rpx;
								font-weight: 800;
							}

							.goodBox {
								display: flex;
								color: #a1a1a1;

								.roundPic {
									width: 32rpx;
									height: 32rpx;
									margin-right: 2px;
								}
							}
						}
					}
				}

				.myLifeBox {
					display: flex;
					flex-direction: column;
					height: auto;
					width: 100%;

					.mineBox {
						width: 100%;
						height: 100px;
						background-color: #ffffff;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;

						.topInput {
							width: 90%;
							height: 50%;
							display: flex;
							align-items: center;

							.textBox {
								width: 480rpx;
								height: 50rpx;
								background-color: #fff7e4;
								border-radius: 20px;

								input {
									width: 90%;
									height: 100%;
									border: 0;
									color: #333;
									font-size: 12px;
									text-indent: 20rpx;
									margin-left: 10px;
								}
							}

							image {
								width: 60rpx;
								height: 60rpx;
								border-radius: 50%;
								margin-right: 70rpx;
							}

						}

						.bottomIcon {
							display: flex;
							width: 90%;
							height: 50%;
							justify-content: flex-end;
							align-items: center;
							border-bottom: 2px solid #b2b2b2;

							.b-icon {
								display: flex;
								align-items: center;
								flex-direction: column;
								margin-right: 50rpx;
								font-size: 10px;
								font-weight: 900;

								image {
									width: 75rpx;
									height: 55rpx;
								}

								text {
									margin-top: 2px;
								}
							}

							.b-icon:nth-child(3) {
								image {
									width: 50rpx;
									height: 60rpx;
								}
							}

							.b-icon:nth-child(4) {
								image {
									width: 60rpx;
									height: 60rpx;
								}
							}
						}
					}

					.mineInfos {
						width: 90%;
						margin: 0 auto;

						.isNull {
							text-align: center;
							margin-top: 20rpx;
							font-size: 28rpx;
							font-weight: 600;
							color: #b1b1b1;
						}

						.mineInfo {
							width: 100%;
							height: auto;

							tests {
								width: 100px;
								height: 100px;
								font-weight: 900;
								font-size: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>
