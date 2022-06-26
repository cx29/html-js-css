<template>
	<view>
		<info-list :inside="infoLists"></info-list>
	</view>
</template>

<script>
	import infoLists from "../../components/list2/index.vue"
	export default {
		data() {
			return {
				"urlList": [],
				"infoLists": []
			}
		},
		onLoad() {
			this.getList();
		},
		components: {
			"info-list": infoLists,
		},
		methods: {
			async getInfo() {
				let list = [];
				for (var i = 0; i < this.urlList.length; i++) {
					const res = await this.$myRequest({
						url: this.urlList[i]
					})
					list[i] = res.data.data;
				}
				this.infoLists = list;
			},
			async getList() {
				const res = await this.$myRequest({
					url: '/api/stow/list1'
				})
				this.urlList = res.data.data;
				this.getInfo();
			}
		}
	}
</script>

<style>
</style>
