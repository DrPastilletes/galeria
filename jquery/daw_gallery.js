$(document).ready(function (){
    $("#detail").hide();
})
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

})

$(function () {
    $(".linkImg").click(
        function () {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            $("#detail").addClass('modal');
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

    $("#close").click(function (e){
        e.preventDefault();
        $(".selected").removeClass("selected");
        $("#detail").hide();
    });

    $("#prev").click(function() {

        if ($(".selected").prev().index() == -1) {
            let srcImg = $(".linkImg").last().attr("src").split("/");
            $(".linkImg").first().removeClass("selected");
            $(".linkImg").last().addClass("selected");

            $("#main-image").attr("src", "1000Water" + "/" + srcImg[1]);
        } else {
            let srcImg = $(".selected").prev().attr("src").split("/");

            $(".selected").prev().addClass("tempClass");
            $(".selected").removeClass("selected");
            $("#main-image").attr("src", "1000Water" + "/" + srcImg[1]);
            $(".tempClass").addClass("selected");
            $(".selected").removeClass("tempClass")
        }
    })


    $("#next").click(function() {

        if ($(".selected").next().index() == -1) {
            let srcImg = $(".linkImg").first().attr("src").split("/");
            $(".linkImg").last().removeClass("selected");
            $(".linkImg").first().addClass("selected");
            $("#main-image").attr("src", "1000Water" + "/" + srcImg[1]);
        } else {
            let srcImg = $(".selected").next().attr("src").split("/");

            $(".selected").next().addClass("tempClass");
            $(".selected").removeClass("selected");
            $("#main-image").attr("src", "1000Water" + "/" + srcImg[1]);
            $(".tempClass").addClass("selected");
            $(".selected").removeClass("tempClass")
        }
    })
})


