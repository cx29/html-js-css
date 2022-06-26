<template>
	<view>
		<view class="topBox">
			<!-- 顶部搜索框 -->
			<view class="inputBox">
				<input type="text" :placeholder="tips[id]" placeholder-style="p-text" />
				<view class="iconBox">
					<uni-icons type="" class="iconfont iconsearch"></uni-icons>
				</view>
			</view>
			<goodslist :inside="datas"></goodslist>
		</view>
	</view>
</template>

<script>
	import goodslist from "../../components/list/list.vue"
	export default {
		data() {
			return {
				datas: [],
				title: ["住宿", "购物", "玩了", "美食", "情侣"],
				tips: [
					"有什么推荐的住宿?",
					"有什么购物广场?",
					"有什么好玩的地方?",
					"有什么好吃的美食?",
					"有什么适合情侣的?"
				],
				id: -1
			}
		},
		components:{
			"goodslist":goodslist,
		},
		onLoad(e) { 
			this.id = Number(e.id);
			this.getData();
		},
		methods: {
			async getData() {
				//这个链接待更换,以适应不同的选项卡 
				const res = await this.$myRequest({
					url: '/api/inside/0'
				})
				this.datas = res.data.message;
				//动态更改详情页标题
				uni.setNavigationBarTitle({
					title: this.title[this.id]
				})
			},
		}
	}
</script>

<style lang="less">
	.topBox {
		width: 100%;
		height: 50px;

		.inputBox {
			width: 85%;
			height: 70%;
			background-color: #fff7e4;
			display: flex;
			align-items: center;
			border-radius: 20px;
			margin: 10px auto;
			border: 1px solid #e9e8e4;

			input {
				width: 85%;
				height: 100%;
				margin-left: 2%;
				font-size: 28rpx;
			}

			.p-text {
				font-size: 28rpx;
			}

			.iconBox {
				width: 10%;
				height: 78%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #746f65;
				border-left: 2px solid #e3dbca;
			}
		}
	}
</style>
