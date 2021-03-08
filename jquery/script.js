jQuery.fn.galeria = function() {
console.log("Hola!!")
    this.append("<ul id=\"thumbs\">\n" +
        "\n" +
        "</ul>\n" +
        "\n" +
        "<div id=\"detail\">\n" +

        "  <img src=\"\" id=\"main-image\" style=\"display: none\">\n" +

        "  <div id=\"modal-controller\" class=\"amagar\">\n" +
        "    <a  class=\"prev\" >prev</a>\n" +
        "    <a  class=\"next\" >next</a>\n" +
        "    <a  class=\"close\">X</a>\n" +
        "  </div>\n" +
        "</div>"
    );
    $.get({
        url: "./images.php",
        success: function(data) {
            let fitxers = data.split("\n");

            fitxers.forEach((v) => {

                let arraySplit = v.split(".");

                arraySplit[0] = arraySplit[0].trim();
                arraySplit[1] = arraySplit[1].trim();
                console.log(arraySplit[0]);
                console.log(arraySplit[1]);

                var li = document.createElement("li");
                var img = document.createElement("img");
                img.classList.add("linkImg");
                $("#thumbs").append(li);

                switch (arraySplit[1]) {

                    case "jpg":
                        img.setAttribute("data-info", "image");
                        img.setAttribute("src", "thumbs/" + arraySplit[0] + "." + arraySplit[1]);
                        li.appendChild(img);
                        imgListeners()
                        break;
                    case "png":

                        img.setAttribute("data-info", "image");
                        img.setAttribute("src", "thumbs/" + arraySplit[0] + "." + arraySplit[1]);
                        li.appendChild(img);
                        imgListeners()
                        break;

                    case "mp3":

                        img.setAttribute("data-info", "audio");
                        img.setAttribute("mp3-info", "1000Water/" + arraySplit[0] + "." + arraySplit[1]);
                        img.setAttribute("src", "thumbs/" + arraySplit[0] + ".png");
                        li.appendChild(img);
                        imgListeners()
                        break;

                    case "mp4":
                        $.ajax({
                            url: 'thumbs/'+arraySplit[0]+'.jpg',
                            error: function() {

                                img.setAttribute("data-info", "video");
                                img.setAttribute("mp4-info", "1000Water/" + arraySplit[0] + "." + arraySplit[1]);
                                img.setAttribute("src", "thumbs/" + "video.jpg");
                                li.appendChild(img);
                                imgListeners()
                            },
                            success: function() {

                                img.setAttribute("data-info", "video");
                                img.setAttribute("mp4-info", "1000Water/" + arraySplit[0] + "." + arraySplit[1]);
                                img.setAttribute("src", "thumbs/" + arraySplit[0] + ".jpg");
                                li.appendChild(img);
                                imgListeners()
                            }
                        });
                        break;
                }
            });
            controls()
        },
    });

    return this;

}



function imgListeners() {
    $(".linkImg").hover(
        function() {
            $(this).addClass("thumb-rollover");
        },
        function() {
            $(this).removeClass("thumb-rollover");
        }
    );

    $(".linkImg").click(function() {
        $(".linkImg").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".linkImg").click(function() {

        let nom_img = $(this).attr("src").split("/");
        let data = $(this).attr("data-info");
        nom_img = nom_img[1].split(".");
        $("#image-title").text(nom_img[0]);
        if(data === "video"){
            $("#main-image").attr("src", "1000Water/" + nom_img[0] + ".mp4");
            $("#main-image").css("display", "block");
            console.log("leon");
            $("#detail").addClass("modal");
            $("#detail").css('display', 'block');
        }else {
            $("#main-image").attr("src", "1000Water/" + nom_img[0] + "." + nom_img[1]);
            $("#main-image").css("display", "block");

            $("#detail").addClass("modal");
            $("#detail").css('display', 'block');
        }

        mirarVideoOAudio($(this));
    });
}

function controls() {

    $(".close").click(function() {
        $("#modal-controller").addClass("amagar");
        $("#detail").removeClass("modal");
        $("#main-image").css("display", "none");


        // console.log($(this));
        mirarVideoOAudio($(this));
    });

    $(".prev").click(function() {

        let imgParent = $("li > img.selected").parent();

        if (imgParent.prev().find("img").index() == -1) {
            let srcImg = $("li > img.linkImg")
                .parent()
                .last()
                .find("img")
                .attr("src")
                .split("/");

            $("li > img.linkImg")
                .parent()
                .first()
                .find("img")
                .removeClass("selected");

            $("li > img.linkImg").parent().last().find("img").addClass("selected");

            $("#main-image").attr("src", "imatges" + "/" + srcImg[1]);
            mirarVideoOAudio($("li > img.linkImg").parent().last().find("img"));
        } else {
            let srcImg = imgParent.prev().find("img").attr("src").split("/");

            imgParent.prev().find("img").addClass("tempClass");
            imgParent.find("img").removeClass("selected");
            $("#main-image").attr("src", "imatges" + "/" + srcImg[1]);
            $(".tempClass").addClass("selected");
            $(".selected").removeClass("tempClass");
            mirarVideoOAudio($("li > img.selected"));
        }

    });

    $(".next").click(function() {

        let imgParent = $("li > img.selected").parent();

        if (imgParent.next().find("img").index() == -1) {
            let srcImg = $("li > img.linkImg")
                .parent()
                .first()
                .find("img")
                .attr("src")
                .split("/");

            $("li > img.linkImg")
                .parent()
                .last()
                .find("img")
                .removeClass("selected");

            $("li > img.linkImg").parent().first().find("img").addClass("selected");

            $("#main-image").attr("src", "1000water" + "/" + srcImg[1]);
            mirarVideoOAudio($("li > img.linkImg").parent().first().find("img"))
        } else {
            let srcImg = imgParent.next().find("img").attr("src").split("/");

            imgParent.next().find("img").addClass("tempClass");
            imgParent.find("img").removeClass("selected");
            $("#main-image").attr("src", "1000water" + "/" + srcImg[1]);
            $(".tempClass").addClass("selected");
            $(".selected").removeClass("tempClass");
            mirarVideoOAudio($("li > img.selected"));
        }
    });
}

function mirarVideoOAudio(element) {
    if (element.attr("data-info") == "audio") {
        $("#main-image").removeClass("amagarMainImg");
        $("video").remove();
        $("audio").remove();
        // console.log("is audio");

        var audio = document.createElement("audio");
        audio.controls = true;
        audio.autoplay = true;
        var source = document.createElement("source");

        source.setAttribute("src", element.attr("mp3-info"));
        audio.appendChild(source);
        $("#main-image").after(audio);

    } else if (element.attr("data-info") == "video") {
        // console.log("is video");
        $("video").remove();
        $("audio").remove();

        var video = document.createElement("video");
        video.controls = true;
        video.autoplay = true;
        var source = document.createElement("source");
        source.setAttribute("src", element.attr("mp4-info"));
        video.appendChild(source);
        $("#main-image").after(video);

    } else {
        // console.log("not a video or audio");
        $("audio").remove();
        $("video").remove();
    }
}