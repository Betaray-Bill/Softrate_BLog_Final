var signIn = document.getElementById("Sign_In")
var signOut = document.getElementById("Sign_Out")

var title = document.getElementById("title")
var comments = document.getElementById("comments")

const btn_post = document.getElementById("btn_post")
const btn_sign = document.getElementById("btn_sign")
const btn_signOut = document.getElementById("btn_signOut")

let user_cmmt = document.getElementById("user_input")

// Data Retreival from Local Storage

let header = localStorage.getItem("header")


// Authentication

signIn.addEventListener("click", (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider)
        .then(res =>
            console.log()
        )
        .catch(err => {
            console.log(err)
        })
})

signOut.addEventListener("click", (e) => {
    e.preventDefault()
    auth.signOut()
    setTimeout(() => {
        window.location.reload()
    }, 500)
})

// Getting Comment from Database
db.collection(header)
    .orderBy("time", "desc")
    .onSnapshot(snapshot => {
        get_data(snapshot.docs)
    })



auth.onAuthStateChanged(user => {
    if (user) {
        signIn.innerHTML = `Welcome, ${user.displayName}`
        signOut.innerHTML = 'Sign Out'

        let user_name = user.displayName

        console.log("Into the Auth function..yess");
        //----ADDING DATA TO FIREBASE
        let time = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
        btn_post.addEventListener("click", (e) => {
            e.preventDefault()
            setTimeout(() => {
                window.location.reload()
            }, 500)
            db.collection(header).add({
                cmmt: user_cmmt.value,
                time: time,
                user: user_name
            })
        })

    } else {
        signIn.innerHTML = 'Sign In'
        btn_post.addEventListener("click", () => {
            alert("Sign In to Comment")
        })
    }
})



const get_data = (datas) => {
    let html = ``

    datas.map(data => {
        let doc = data.data()
        html = `   
                <div class="comment-item py-2">
                    <div class="d-flex">
                        <div class="comment-content">
                            <div class="display-2 m-0">
                                <p>${doc.user}</p>
                                &nbsp;
                                &nbsp;
                                <p>${doc.time}</p>
                            </div>
                            <p class="title-secondary text-dark">
                            ${doc.cmmt}
                            </p>
                        </div>
                    </div>
                </div>
            `
        comments.innerHTML += html
    })
}


// Importing data from local storage

window.addEventListener("load", () => {

    //LocalStorage

    let title = document.getElementById("title")
    let title_intro = document.getElementById("title_intro_para")

    let img_1 = document.getElementById("img_1")
    let img_2 = document.getElementById("img_2")

    let first_para = document.getElementById("first-para")
    let second_para = document.getElementById("second-para")

    let lists = document.getElementById("lists")
    let lists_2 = document.getElementById("lists_2")

    let first_subtopic_title = document.getElementById("first_subtopic_title")
    let first_subtopic_content = document.getElementById("first_subtopic_content")

    let second_subtopic_title = document.getElementById("second_subtopic_title")
    let second_subtopic_content = document.getElementById("second_subtopic_content")

    let third_subtopic_title = document.getElementById("third_subtopic_title")
    let third_subtopic_content = document.getElementById("third_subtopic_content")

    let fourth_subtopic_title = document.getElementById("fourth_subtopic_title")
    let fourth_subtopic_content = document.getElementById("fourth_subtopic_content")

    let sub_ponits_section = document.getElementById("sub_ponits_section")

    let author_name = document.getElementById("author_name")
    let date = document.getElementById("date")
    let author_img = document.getElementById("author_img")

    let Blog = JSON.parse(localStorage.getItem("Full"))
    console.log("Full", Blog)

    title.innerHTML = Blog.title
    title_intro.innerHTML = Blog.introduction
    first_para.innerHTML = Blog.intro
    second_para.innerHTML = Blog.intro_points

    img_1.src = Blog.land_img
    img_2.src = Blog.img_2

    first_subtopic_title.innerHTML = Blog.subTopic_1_title
    first_subtopic_content.innerHTML = Blog.subTopic_1_content

    second_subtopic_title.innerHTML = Blog.Cont_topic_2.title
    second_subtopic_content.innerHTML = Blog.Cont_topic_2.cont_points

    third_subtopic_title.innerHTML = Blog.Cont_topic_3.title
    third_subtopic_content.innerHTML = Blog.Cont_topic_3.cont_points

    fourth_subtopic_title.innerHTML = Blog.Cont_topic_4.title
    fourth_subtopic_content.innerHTML = Blog.Cont_topic_4.cont_points



    author_name.innerHTML = Blog.author
    date.innerHTML = Blog.date_of_upload
    author_img.src = Blog.author_img


    let incl = Blog.included
    let sub_incl = Blog.subTopic_2_included
    let list = '',
        list2 = ''

    incl.map((e, i) => {
        list += `
            <li class="nav-link btn bg-light" key=${i}>${e}</li>
        `
    })

    lists.innerHTML += list

    sub_incl.map((e, i) => {
        list2 += `
            <li class="nav-link btn bg-light" key=${i}>${e}</li>
        `
    })

    lists_2.innerHTML += list2
    console.log(lists_2);


    let sub_points = Blog.sub_points
    console.log("subpoints", sub_points);
    let sub_pointslist = ' '
    sub_points.map((e, i) => {
        sub_pointslist += `
            <h3 key={i}>${e.title}</h3>
            <p>${e.cont_points}</p>
        `
    })
    console.log(sub_pointslist);

    let sub_points_html = document.createElement('div')
    console.log(sub_points_html);
    sub_points_html.innerHTML = sub_pointslist

    sub_ponits_section.appendChild(sub_points_html)

})



// Animation

let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");

toggle.addEventListener('click', function() {
    collapse.forEach(col => col.classList.toggle("collapse-toggle"));
})


new Masonry("#posts .grid", {
    itemSelector: '.grid-item',
    gutter: 20
});


new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5,
    autoplay: {
        delay: 3000
    },

    breakpoints: {
        '@0': {
            slidesPerView: 2
        },

        '@1.00': {
            slidesPerView: 3
        },

        '@1.25': {
            slidesPerView: 4
        },

        '@1.50': {
            slidesPerView: 5
        }
    }
})


window.onscroll = function() { myFunction() };


let navbar = document.getElementById("header");


let sticky = navbar.offsetTop;


function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}