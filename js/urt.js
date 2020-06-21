 $("#uSearch,.s2").select2({
  allowClear: true,
  minimumInputLength: 0,
  placeholder: 'Выберите',
  ajax: {
   url: "https://a.unirenter.ru/b24/api/search.php",
   type: "post",
   dataType: 'json',
   delay: 250,
   data: function (params) {
    return {
      searchSource: $(this).attr('class').split(' ')[0],
      searchTerm: params.term // search term
    };
   },
   processResults: function (response) {
     return {
        results: response.results
     };
   },
   cache: false
  }
 });
});