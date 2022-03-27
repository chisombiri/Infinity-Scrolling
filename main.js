const postContainer = document.querySelector('#post-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 4;
let page = 1;

//Function to get the posts from json placeholder
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

//Filter posts on search
function filterPosts(e) {
    const search = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();

        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(search) > -1 || body.indexOf(search) > -1) {
            post.style.display = 'flex';
        } else{
            post.style.display = 'none';
        }
    });
}

//function to show post on DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
            ${post.body}
        </p>
        </div>
        `;

        postContainer.appendChild(postEl);
    });
}

//Show loading and fetch more posts
function showLoading() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 200);

    }, 1000);
}

//Show posts initially
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);