$( function() {
	
	$("#priceCalc").click(function(){
			$('[name="uniq[rent2]"]').val(Math.ceil(($('[name="uniq[rent1]"]').val()*1.3) / 100) * 100);
			$('[name="uniq[rent3]"]').val(Math.ceil(($('[name="uniq[rent3]"]').val()*1.3) / 100) * 100);
			$('[name="uniq[rent3]"]').val(Math.ceil(($('[name="uniq[rent3]"]').val()*1.3) / 100) * 100);
			$('[name="uniq[priceAddDay]"]').val(Math.ceil(($('[name="uniq[rent1]"]').val()*0.3) / 100) * 100);
			$('[name="uniq[retailPrice]"]').val(Math.ceil(($('[name="uniq[supplierPrice]"]').val()*2) / 100) * 100);		
		});
});