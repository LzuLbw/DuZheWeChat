<template>
  
  
</template>

<script lang="ts">
export default {
 loadFile(url) {
 				uni.downloadFile({
 					url: '../../../image/upload',
 					success: (res) => {
 						if (res.statusCode === 200) {
 							uni.openDocument({
 								filePath: res.tempFilePath, 
                                 // 如果文件名包含中文，建议使用escape(res.tempFilePath)转码，防止ios和安卓客户端导致的差异
 								success: function(res) {
 									console.log('打开文档成功');
 								}
 							});
 						}
 					}
 				});
 			},
}
</script>

