<template>
	<view>
		<view class="bigBox">
			<view class="list" v-for="item in list" :key="item.id" @click="modify(item)">
				<view class="btn">
					<view class="leftBox">
						<image :src="item.ico" mode="scaleToFill"></image>
						<text>{{item.text}}</text>
					</view>
					<view class="rightBox">
						<view v-if="item.id===1">{{userInfo.userName}}</view>
						<view v-if="item.id===2" class="birthDate">
							<picker mode="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view>{{userInfo.birthDate}}</view>
							</picker>
						</view>
						<view v-if="item.id===3">
							<picker mode="selector" v-if="userInfo!=null" :value="index" :range="arraySex"
								@change="bindSexChange">
								<view>{{arraySex[index]}}</view>
							</picker>
						</view>
						<view v-if="item.id===4">
							<picker v-if="userInfo!=null" mode="region" @change="bindPlaceChange"
								:value="index">
								<view>
									{{userInfo.place[0]}}{{userInfo.place[1]}}{{userInfo.place[2]}}
								</view>
							</picker>
						</view>
						<uni-icons type="" class="iconfont iconjiantou2 ico"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 更改头像 -->
		<view v-if="picShow" class="modifyPic" :style="{width:width,height:height}">
			<view class="meng" @click="hidePicModify(0)"></view>
			<view class="btnBox">
				<button class="btn" type="default" @click="modifyPic_action(0)">从相册选择图片</button>
				<button class="btn" type="default" @click="modifyPic_action(1)">拍照</button>
				<button class="btn" type="default" @click="hidePicModify(0)" style="color: red;">取消</button>
			</view>
		</view>
		<!-- 更改用户名 -->
		<view v-if="nameShow" class="modifyName" :style="{width:width,height:height}">
			<view class="meng" @click="hidePicModify(1)"></view>
			<view class="inputBox">
				<text>请输入新的用户名(8个字符内哦)</text>
				<input type="text" @input="reName" value="" maxlength="8" />
				<view class="btnBox2">
					<view class="btnNo" @click="hidePicModify(1)">取消</view>
					<view class="btnYes" @click="modifyName_action(e)">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var width = uni.getSystemInfoSync().windowWidth + 'px';
	var height = uni.getSystemInfoSync().windowHeight + 'px';

	let getDate = (e) => {
		let date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDay();

		if (e === "start") {
			year -= 10;
		} else if (e === "end") {
			year += 10;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				index: 0,
				arraySex: ["男", "女"],
				list: [],
				userInfo: {},
				width: width,
				height: height,
				picShow: false,
				nameShow: false,
				startDate: getDate("start"),
				endDate: getDate("end"),
				userName: "",
				date: getDate({
					formate: true
				})
			}
		},
		onLoad() {
			this.setData();
			this.getUserData();
		},
		methods: {
			bindPlaceChange: function(e) {
				console.log(e);
				this.userInfo.place=[e.detail.value[0],e.detail.value[1],e.detail.value[2]];
			},
			bindSexChange: function(e) {
				this.index = e.detail.value;
				this.userInfo.sex = e.detail.value === "男" ? 1 : 2;
			},
			bindDateChange: function(e) {
				this.date = e.detail.value;
				console.log(e.detail.value);
				this.userInfo.birthDate = e.detail.value;
			},
			// 读取存储的数据
			getUserData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						console.log(res.data);
						this.userInfo = res.data;
					}
				})
			},
			// 修改数据
			modify: function(res) {
				switch (res.id) {
					case 0: {
						//显示修改头像的按钮
						this.picShow = true;
					}
					break;
				case 1: {
					//显示用户名的框子
					this.nameShow = true;
				}
				break;
				case 2: {
					console.log(res);
				}
				break;
				case 3: {
					console.log(3);

				}
				break;
				case 4: {
					console.log(4);
				}
				break;
				}
			},
			// 两种获取本地头像的方式
			modifyPic_action: function(e) {
				uni.chooseImage({
					count: 1,
					sourceType: [e == 0 ? 'album' : 'camera'],
					success: (res) => {
						console.log(res.tempFiles);
						console.log(res.tempFiles.length);
					}
				})
			},
			reName: function(e) {
				this.userName = e.target.value;
			},
			//将用户名修改
			modifyName_action: function() {
				this.userInfo.userName = this.userName;
				this.nameShow = false;
			},
			//隐藏更改头像的按钮
			hidePicModify: function(e) {
				if (e === 0) {
					this.picShow = false;
				} else if (e === 1) {
					this.nameShow = false;
				}
			},
			async setData() {
				const res = await this.$myRequest({
					url: '/api/myInfo/list'
				})
				this.list = res.data.data;
			}
		}
	}
</script>

<style lang="less">
	.bigBox {
		z-index: 1;
		width: 100%;
		height: auto;
		position: relative;

		.list {
			width: 90%;
			height: 100rpx;
			padding: 0 5%;
			display: flex;
			margin: 10px 0;
			background-color: #fff;
			align-items: center;

			.btn {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				border: 0;

				.rightBox {
					width: 50%;
					display: flex;
					justify-content: flex-end;
					color: #9d9d9d;
					height: 100%;
					align-items: center;

					view {
						width: 180rpx;
						font-size: 24rpx;
						margin-right: 20px;
					}

					.ico {
						transform-origin: 50%;
						transform: rotate(-90deg);
						font-size: 20rpx;
					}
				}

				.leftBox {
					display: flex;
					align-items: center;
					width: 50%;

					image {
						width: 45rpx;
						height: 45rpx;
						margin-right: 20px;
					}

					text {
						font-size: 24rpx;
						font-weight: 600;
					}
				}
			}
		}
	}

	.modifyPic,
	.modifyName {
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;

		.meng {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 3;
		}

		.btnBox {
			width: 100%;
			height: auto;
			position: absolute;
			bottom: 34rpx;
			z-index: 4;

			.btn {
				width: 100%;
				height: 100rpx;
				background-color: #ffffff;
			}
		}
	}

	.modifyName {
		display: flex;
		justify-content: center;
		align-items: center;

		.inputBox {
			width: 60%;
			height: 200rpx;
			background-color: #fff;
			font-size: 28rpx;
			padding: 40rpx;
			z-index: 4;
			border-radius: 20px;

			input {
				margin: 10rpx 0;
				border: 1px solid #acacac;
			}

			.btnBox2 {
				width: 100%;
				height: 100rpx;
				display: flex;
				margin-top: 40rpx;

				.btnNo,
				.btnYes {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					border-left: 1px solid #8F8F94;
					font-size: 32rpx;
				}

				.btnNo {
					border: 0;
					border-right: 1px solid #8F8F94;
					color: red;
				}
			}
		}
	}
</style>
