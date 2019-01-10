function getBlogLinks(posts) {
    var links = []
    posts.each(function() {
        var name = $(this).find(".card-title").text()
        var link = $(this).find(".btn").attr("href")
        if (typeof name !== "undefined" && typeof link !== "undefined") {
            struct = {name: name, link: link}
            links.push(struct)
        }
    })
    return links
}

function addLinksToBox(links, unorderedList) {
    for (i = 0; i < links.length; i++) {
        var linkobj = links[i]
        var li = "<li><a href=\""+linkobj.link+"\">"+linkobj.name+"</a></li>"
        unorderedList.append(li)
    }
}

function hideChildren(children, start, end) {
    for (i = start; i <= end; i++) {
        $(children[i]).hide()
    }
}

function showChildren(children, start, end) {
    for (i = start; i <= end; i++) {
        $(children[i]).show()
    }
}
