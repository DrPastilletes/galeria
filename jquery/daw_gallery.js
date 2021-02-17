$(function () {
    $(".linkImg").hover(
        function () {
            $(this).addClass("thumb-rollover");
        }, function () {
            $(this).removeClass("thumb-rollover");
        }
    );
})

$(function () {
    $("#main-image").addClass('modal');
})

$(function () {
    $(".linkImg").click(
        function () {
            $('.linkImg').removeClass('border-vermell');
            $(this).addClass('border-vermell');
            let name_arr = $(this).attr('src').split('/');
            name_arr = name_arr[name_arr.length - 1].split('.')[0];
            $("#image-title").text(name_arr);
            let size = $("#detail").width();
            if (size >= 1000) {
                $("#main-image").attr('src', '1000Water/' + name_arr + '.jpg');
            } else if (size >= 800) {
                $("#main-image").attr('src', '800Water/' + name_arr + '.jpg');
            } else {
                $("#main-image").attr('src', '500Water/' + name_arr + '.jpg');
            }
            $("#detail").css('display', 'block');
        }
    );
})
