<template>
	<view>
		<view class="bigBox">
			<view v-for="item in list" class="listBox" :key="item.id">
				<text>{{item.text}}</text>
				<view class="switchbox" @click="checkbtn(item)">
					<view v-if="!item.switch" class="round"></view>
					<view v-if="item.switch" class="select"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.setData();
		},
		methods: {
			async setData(){
				const res=await this.$myRequest({
					url:'/api/hide/user0/list'
				})
				this.list=res.data.data;
			},
			checkbtn(e) {
				this.list[e.id].switch=!e.switch;
			}
		}
	}
</script>

<style lang="less">
	.bigBox {
		width: 100%;
		height: auto;

		.listBox {
			width: 90%;
			padding: 0 5%;
			height: 80rpx;
			margin: 10px 0;
			background-color: #fff;
			font-size: 28rpx;
			font-weight: 600;
			display: flex;
			align-items: center;

			.switchbox {
				width: 90rpx;
				height: 45rpx;
				background-color: #e8e8e8;
				border-radius: 20px;
				border: 1px solid #8F8F94;
				position: absolute;
				right: 6%;

				.round,
				.select {
					width: 45rpx;
					height: 45rpx;
					background-color: #ffffff;
					border-radius: 50%;
					position: absolute;
					left: 0%;
				}

				.select {
					left: 50%;
					background-image: linear-gradient(to right top, #d599b6, #a7a1d0);
				}
			}
		}
	}
</style>
