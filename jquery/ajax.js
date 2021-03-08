$.get('./images.php', function(data){
    console.log(data);
    var lines = data.split("\n");
    $.each(lines, function(n,elem) {
        $('#thumbs').append('<img src="thumbs/'+elem+'" class="linkImg">');
     });
    })