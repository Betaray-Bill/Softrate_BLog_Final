var topic_titles = document.getElementsByClassName('blog_title')

for (var i = 0; i <= topic_titles.length; i++) {
    var topic_title = topic_titles[i]

    topic_title.addEventListener("click", (e) => {
        let topic_title_clicked = e.target
        let searchText = topic_title_clicked.innerHTML
        console.log(searchText)
        blogdata_fetch(searchText)
    })
}

async function blogdata_fetch(searchText) {

    const result = await fetch("./data.json")
    const datas = await result.json()

    let blog_data = datas.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return data.title.match(regex)
    })

    console.log(blog_data);

    if (blog_data) {
        update_data(blog_data, searchText)
    } else {
        alert("No such Blog")
    }

}



function update_data(blog_data, searchText) {

    let blog_cont = blog_data[0]

    localStorage.setItem("header", blog_cont.title)

    localStorage.setItem("Full", JSON.stringify(blog_cont))

}