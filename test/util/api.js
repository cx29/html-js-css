const BASE_url="https://www.fastmock.site/mock/16b7597cc59335effce409ef4d6ca48f/29"
export const myRequest=(options)=>{
	return new Promise((reslove,reject)=>{
		uni.request({
			url:BASE_url+options.url,
			method:options.method||'GET',
			data:options.data||{},
			success: (res) => {
				if(res.statusCode==200){
					reslove(res);
				}
			},
			fail: (err) => {
				uni.showToast({
					title:'拉取数据失败'
				})
				reject(err);
			}
		})
	})
}