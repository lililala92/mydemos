(function ($) {
    var zjyobj = {
       uploadDomain : 'http://file.51educloud.com',       
       upload : function(callback, fileId, complete) {   
			var formData = new FormData();
			formData.append("file",$("#" + fileId)[0].files[0]);								
	        function onprogress(evt) {
				// 写要实现的内容
				if (evt.lengthComputable) {			
					var completePercent = Math.round(evt.loaded / evt.total * 100);	
					if(callback){
					   callback(completePercent);
					}			               					
											
				}
			}
			var xhr_provider = function() {
				var xhr = jQuery.ajaxSettings.xhr();
				if (onprogress && xhr.upload) {
					xhr.upload.addEventListener('progress', onprogress, false);
				}
				return xhr;
			};
			
			$.ajax({
				url : $.zjy.uploadDomain + '/zjyfile/upload',
				type : 'POST',
				data : formData,
				processData : false,
				contentType : false,
				xhr : xhr_provider, 
				success : function(res) {
					res.returnObj = $.zjy.uploadDomain + '/files/' + res.returnObj;
					complete(res);
				},
				error : function(res) {
					console.log(res);
					complete(res);			
				}
			});     
       }
    }

   $.extend({
        zjy:zjyobj 
    });
})(window.jQuery);
