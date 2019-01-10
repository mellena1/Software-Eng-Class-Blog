var numberOfPostsVisible = 3

function init() {
    $("#posts").load("blog-post-entries.html", function(){
        initBtns()
        initLinks()
    })
}

function initBtns() {
    var posts = $("#posts").children()

    if (posts.length <= numberOfPostsVisible) {
        $("#olderBtn").addClass("disabled")
        // newerBtn disabled by default
        return
    }

    hideChildren(posts, numberOfPostsVisible, posts.length-1)
}

function initLinks() {
    var posts = $("#posts").children()
    console.log(posts)

    var links = getBlogLinks(posts)
    addLinksToBox(links, $("#blogs-link-list"))
}

function olderPosts() {
    /*
     * Oldest posts are at the bottom
     */
    var posts = $("#posts").children()

    var oldRange = getRangeOfVisiblePosts(posts)
    var newRange = [oldRange[1] + 1, oldRange[1] + numberOfPostsVisible]

    if (newRange[1] >= posts.length) {
        newRange[1] = posts.length - 1
        newRange[0] = newRange[1] - numberOfPostsVisible + 1
        if (newRange[0] < 0) {
            newRange[0] = 0
        }
        $("#olderBtn").addClass("disabled")
    }

    hideChildren(posts, oldRange[0], oldRange[1])
    showChildren(posts, newRange[0], newRange[1])

    $("#newerBtn").removeClass("disabled")
}

function newerPosts() {
    /*
     * Newer posts are at the top
     */
    var posts = $("#posts").children()

    var oldRange = getRangeOfVisiblePosts(posts)
    var newRange = [oldRange[0] - numberOfPostsVisible, oldRange[0] - 1]
    
    if (newRange[0] < 0) {
        newRange[0] = 0
        newRange[1] = numberOfPostsVisible - 1
        if (newRange[1] >= posts.length) {
            newRange[1] = posts.length - 1
        }
        $("#newerBtn").addClass("disabled")
    }

    hideChildren(posts, oldRange[0], oldRange[1])
    showChildren(posts, newRange[0], newRange[1])

    $("#olderBtn").removeClass("disabled")
}

function getRangeOfVisiblePosts(children) {
    var range = []
    var first = true
    for (i = 0; i < children.length; i++) {
        if (first && $(children[i]).is(":visible")) {
            range[0] = i
            first = false
        }
        if (i == children.length - 1 && $(children[i]).is(":visible")) {
            range[1] = i
            return range
        } else if ($(children[i]).is(":visible") && !$(children[i+1]).is(":visible")) {
            range[1] = i
            return range
        }
    }
}
