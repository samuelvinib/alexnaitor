var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, function (items) {
        active = items.activate;
        if (active) {
            main();
        }
    });
} catch (e) {
    if (active) {
        main();
    }
}

function main() {
    (function ($) {

        var self = {
            vampNatorImgs: [
				'blob:https://web.whatsapp.com/8404aef6-018e-47fd-b974-e99549ffad84',
				'blob:https://web.whatsapp.com/0d1d0385-8e68-484c-958e-8dd7abfb720f',
			       
            ],

			//obtem todas as imagens da pagina
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
					//pula se imagem doa vamp ja foi carregada
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //imagem realmente carregada
                        if (h > 0 && w > 0) {
                            self.handleImg(item, lstImgs);
                        }
                        else {
                            //modifica imagem depois de carregada
                            $(item).load(function () {
                                //prevencao de loop infinito
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                });

                //mantem o script trocando de imagem
                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },
            //Replace one image
            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    //trata erro 
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },
			//seta imagem randomicamente
            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            },
			//remove imagem do vamp da lista, pode ser que a url nao exista mais 
            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        //executa troca de imagens
        $(function () {

            self.handleImages(self.vampNatorImgs, 3000);

        });

    })(jQuery);
}