<template>
	<view>
		<swiper id="sw1" :duration="1000" 	display-multiple-items="2">
			<swiper-item v-for="item in usrBoxs" :key="item.id">
				<view class="swiper-item">{{item.id}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usrBoxs: [{
						"id": "u0",
						"index":0,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr1.png"
					},
					{
						"id": "u1",
						"index":1,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr2.png"
					}, {
						"id": "u2",
						"index":2,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr3.png"
					}, {
						"id": "u3",
						"index":3,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr4.png"
					}, {
						"id": "u4",
						"index":4,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr5.png"
					}, {
						"id": "u5",
						"index":5,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr6.png"
					}, {
						"id": "u6",
						"index":6,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr7.png"
					}, {
						"id": "u7",
						"index":7,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr1.png"
					}, {
						"id": "u8",
						"index":8,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr1.png"
					}, {
						"id": "u9",
						"index":0,
						"name": "安小康",
						"pic": "http://1.116.2.144/img/usr1.png"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	#sw1{
		width: 70px;
		height: 114px;
		swiper-item{
			background-color: pink;
		}
	}
</style>
