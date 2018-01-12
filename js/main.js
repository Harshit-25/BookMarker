document.getElementById('myForm').addEventListener('submit',saveBookmarks);

function saveBookmarks(e){

	let siteName = document.getElementById('siteName').value;
	let siteUrl = document.getElementById('siteUrl').value;


	if(!siteName || !siteUrl){

		alert('Please fill in the form');

		return false;

	}


	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);


    if(!siteUrl.match(regex)){

    	alert('Please enter the valid URL');

    	return false;
    }

	let bookmark = {

		name:siteName,
		url:siteUrl
	}

	if(localStorage.getItem('bookmarks') === null){

		let bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	} else{

		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}


	document.getElementById('myForm').reset();


	fetchBookmarks();

	e.preventDefault();
}

function deleteBookmark(url){

	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(let i = 0;i < bookmarks.length; i++)

	{
		if(bookmarks[i].url == url){

			bookmarks.splice(i,1);
		}
	}
    
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks();

}


function fetchBookmarks(){
 
 let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 let bookmarksresults = document.getElementById('bookmarksresults');

 bookmarksresults.innerHTML = '';

 for(let i = 0; i < bookmarks.length;i++){

 	let name = bookmarks[i].name;
 	let url = bookmarks[i].url;

 	bookmarksresults.innerHTML += `<div class="well"><h3>${name}
                                   <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
                                   <a onclick="deleteBookmark(\'${url}\')" class="btn btn-danger" href="#">Delete</a>
                                   </h3>
                                   </div>`;
 }



}