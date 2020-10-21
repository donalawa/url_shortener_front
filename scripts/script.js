
let all = []

let urls = localStorage.getItem('shorturls');
let allUrls = document.getElementById('allurls');
// console.log(urls)
if (!urls) {
    localStorage.setItem('shorturls', JSON.stringify(all));
} else {
    all = JSON.parse(localStorage.getItem('shorturls'))
}

//Getting And Displaying all urls
let allComming = ''
for (let i = 0; i < all.length; i++) {
    allComming += `<a href="http://${all[i]}" target="_blank" class="pt-4">${all[i]}</a><i class="pr-5 float-right text-danger fa fa-trash" aria-hidden="true"></i><br/><br/>`
}
allUrls.innerHTML = allComming

const btn = document.getElementById('add').addEventListener('click', async function (e) {
    e.preventDefault()
    const url = document.getElementById('longurl').value;
    document.getElementById('longurl').value = ""

    const rawResponse = await fetch('http://sgpsurl.herokuapp.com', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl: url })
    })

    const content = await rawResponse.json();
    if (!rawResponse.ok) {
        alert("Please Enter A Valid Url")
        // console.log('There was an error')
    } else {
        let data = [];

        data = JSON.parse(localStorage.getItem('shorturls'));

        if (data.indexOf(content.shortUrl) >= 0) {
            alert('Url Already Exist')
        } else {
            data.push(content.shortUrl);
            localStorage.setItem('shorturls', JSON.stringify(data))
            window.location.reload()
            // let newAll = [];
            // newAll = JSON.parse(localStorage.getItem('shorturls'));
            // let allComming = ''
            // for (let i = 0; i < newAll.length; i++) {
            //     allComming += `<a href="${newAll[i]}" target="_blank" class="p-4">${newAll[i]}</a><i class="text-danger pr-5 float-right fa fa-trash" aria-hidden="true"></i><br/>`
            // }
            // allUrls.innerHTML = allComming
        }
    }

})

let ele = document.querySelectorAll('.fa-trash');

for(el of ele) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        let remove = e.target.previousSibling.innerText;
        let data = [];

        data = JSON.parse(localStorage.getItem('shorturls'));
        data.splice(data.indexOf(remove),1);
        localStorage.setItem('shorturls', JSON.stringify(data))
        window.location.reload()
        // let newAll = [];
        // newAll = JSON.parse(localStorage.getItem('shorturls'));
        // let allComming = ''
        // for (let i = 0; i < newAll.length; i++) {
        //     allComming += `<a href="${newAll[i]}" target="_blank" class="p-4">${newAll[i]}</a><i class="text-danger pr-5 float-right fa fa-trash" aria-hidden="true"></i><br/>`
        // }
        // allUrls.innerHTML = allComming
        alert('Url Dleleted')
    })
}
