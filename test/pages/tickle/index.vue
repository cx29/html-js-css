<template>
	<view>
		<view class="bigBox">
			<view class="tagBox">
				请在下方填写需要反馈的内容
			</view>
			<view class="inputBox">
				<textarea id="textNum" @input="count" value="" placeholder="请填写10个字以上的问题描述以便我们提供更好的改进与帮助"
					:maxlength="trueNum" />
				<text class="numTip" :style="numTip>199?'color:red;':''">{{numTip}}/200</text>
			</view>
			<view class="picBox">
				<view class="p-text">
					截图 ({{picNum}}/4)
				</view>
				<view class="imgBox">
					<image v-for="item in imgArr" :key="item.size" v-if="imgArr!=null" :src="item.path" mode="scaleToFill"></image>
					<image v-if="picNum<4" src="http://121.40.19.45:8080/pics/picDemo.png" mode="scaleToFill"
						@click="addimage"></image>
				</view>
			</view>
			<view class="contactBox">
				联系方式:<input type="text" placeholder="邮箱/手机号" />
			</view>
			<view class="tips">
				每一条用户反馈,小游都会认真看哦!0v0
			</view>
			<button type="default" form-type="submit" open-type="feedback">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trueNum: 200,
				numTip: 0,
				picNum: 0,
				imgArr: []
			}
		},
		methods: {
			count(e) {
				// 获取文字内容
				let text = e.target.value;
				// 获取字符串的长度
				let textNum = e.target.value.length;
				// 计算符号字符的数量
				let num = 0;
				// 文字内容的长度
				let sum = 0;
				//判断是否全为空格
				let spaceNum = 0;
				for (var i = 0; i < text.length; i++) {
					let codeNum = text[i].charCodeAt();
					if (codeNum == 32)
						spaceNum++;
					// 符号的ASCII码
					if ((codeNum > 31 && codeNum < 65) || (codeNum > 90 && codeNum < 97) || (codeNum > 122 && codeNum <
							127)) {
						num++;
					}
				}
				sum = textNum - num;
				if (spaceNum == textNum) {
					this.trueNum = 200;
				} else {
					this.trueNum += (this.trueNum - 200 == num) ? 0 : (num - (this.trueNum - 200));
				}
				this.numTip = sum;
			},
			addimage() {
				uni.chooseImage({
					count: 4,
					sourceType: ['album'],
					success: (res) => {
						this.imgArr = res.tempFiles;
						this.picNum = res.tempFiles.length;
					}
				})
			}
		},
	}
</script>

<style lang="less">
	.bigBox {
		width: 100%;
		height: auto;
		margin: 0 auto;

		.tagBox,
		.picBox,
		.contactBox {
			width: 100%;
			font-size: 24rpx;
			background-color: #ffffff;
			padding: 0 5%;
			margin: 10px 0;
			line-height: 80rpx;
		}

		.tagBox {
			height: 80rpx;
			font-weight: 600;
		}

		.inputBox {
			width: 90%;
			font-size: 26rpx;
			background-color: #ffffff;
			height: 100px;
			padding: 5% 5%;
			position: relative;

			textarea {
				width: 100%;
				height: 100%;
			}

			.numTip {
				position: absolute;
				bottom: 5%;
				right: 5%;
				color: #b2b2b2;
			}
		}

		.picBox {
			height: auto;

			.p-text {
				width: 90%;
				height: auto;
			}

			.imgBox {
				width: auto;
				height: auto;

				image {
					width: 140rpx;
					height: 140rpx;
					margin: 0 16rpx;
				}
			}
		}

		.contactBox {
			display: flex;
			align-items: center;

			input {
				width: 200px;
				margin-left: 5px;
			}
		}

		.tips {
			width: 70%;
			margin: 0 auto;
			font-size: 25rpx;
			font-weight: 600;
		}

		button {
			width: 200rpx;
			height: 80rpx;
			font-size: 28rpx;
			font-weight: 600;
			background-image: linear-gradient(to right, #f0f0f0, #e8a0b8, #aba9da);
			margin-top: 200rpx;
		}
	}
</style>
