function likeIfNeeded($target) {
    var url = location.href;
    var re = /.*\/companies\/altplus\/post_articles\/(\d+)/i;
    var found = url.match(re);
    if (found) {
        var articleId = found[1];
        var likeUrl = 'https://www.wantedly.com/api/internal/posts/' + articleId + '/like';

        var $likeButton = $target.find(".post-like-button");
        if (!$likeButton.is(".liked")) {
            var csrfToken = $("meta[name=csrf-token]").attr("content");
            chrome.runtime.sendMessage({command: "like", csrfToken: csrfToken, likeUrl: likeUrl});
            $likeButton.addClass("liked");
            $.toast({
                text: "「いいね!」しました。",
                position: "top-right"
            });
        } else {
            console.log("Already liked.");
        }
    }
}

$(function () {
    // 企業ページから各記事を開いた時
    $(document).on("click", ".stream-post", function() {
        var $self = $(this);
        setTimeout(function () { likeIfNeeded($self); }, 1000);
    });
    // 記事を直接開いた時
    setTimeout(function () { likeIfNeeded($("body")); }, 1000);
});
