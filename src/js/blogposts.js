function initLinks() {
    $.get("../blog-post-entries.html", function(data) {
        var posts = $(data)
        var links = getBlogLinks(posts)
        fixPathForLinks(links)
        addLinksToBox(links, $("#blogs-link-list"))
    })
}

function fixPathForLinks(links) {
    for (i = 0; i < links.length; i++) {
        link = links[i].link
        lastSlash = link.lastIndexOf("/")+1
        links[i].link = link.substr(lastSlash)
    }
}
