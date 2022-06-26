<template>
	<view class="pages">
		<goodslist :inside="list"></goodslist>
		<view class="tips">
			暂时没有更多浏览哦,快和小游一起去看看吧!
		</view>
	</view>
</template>

<script>
	import goodslist from "../../components/list/list.vue"
	export default{
		data(){
			return {
				list:[]
			}
		},
		onLoad() {
			this.getData();
		},
		methods:{
			async getData(){
				const res=await this.$myRequest({
					url:'/api/inside/0'
				})
				console.log(res.data);
				this.list=res.data.message;
			}
		},
		components:{
			"goodslist":goodslist,
		}
	}
</script>

<style lang="less">
	.pages{
		display: flex;
		flex-direction: column;
		align-items: center;
		goodslist{
			.infos{
				border: 1px solid #cfcfcf;
				border-top: 1px solid #cfcfcf;
				border-bottom: 1px solid #cfcfcf;
				margin-top: 10rpx;
				padding: 0 10px;
				border-radius: 10px;
			}
		}
		.tips{
			width: 80%;
			height: 30rpx;
			border-top: 2px solid #dadada;
			margin-top: 10rpx;
			padding-top: 10rpx;
			font-size: 24rpx;
			text-align: center;
			color: #a6a6a6;
		}
	}
</style>
