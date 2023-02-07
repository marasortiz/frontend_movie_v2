const url = new URL(location.href);
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

const APILINK = 'https://review-backend.marasortiz.repl.co/api/v1/reviews/'

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
	<div class="card text-bg-dark mb-3" style="max-width: 18rem;">
		<div class="card-header">
		  New Review
		</div>
		<div class="card-body position-relative">
			<h5 class="card-title">Review: </h5>
			<input type="text" class="form-control bg-dark text-white" id="new_review" value="">
	
			<h5 class="card-title">User: </h5>
			<input type="text" class="form-control bg-dark text-white" id="new_user" value="">
		</div>
		<div class="card-footer">
			<a href="#" class="btn btn-dark" onclick="saveReview('new_review', 'new_user')">💾</a>
		</div>
	</div>
`
main.appendChild(div_new)

returnReviews(APILINK);

function returnReviews(url) {
	fetch(url + "movie/" + movieId).then(res => res.json())
		.then(function(data) {
			console.log(data);
			data.forEach(review => {
				const div_card = document.createElement('div');
				div_card.innerHTML = `
					<div class="card text-bg-dark mb-3" style="max-width: 18rem;" id="${review._id}">
					  <div class="card-body position-relative">
					    <h5 class="card-title">Review: </h5>
					    <p class="card-text">${review.review}</p>
					
					    <h5 class="card-title">User: </h5>
					    <p class="card-text">${review.user}</p>
					  </div>
						<div class="card-footer">
							<a href="#" class="btn btn-dark" onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a>
							<a href="#" class="btn btn-dark" onclick="deleteReview('${review._id}')">🗑️</a>
						</div>
					</div>
					
					`
				main.appendChild(div_card);
			});
		});
}

function editReview(id, review, user){

	const element = document.getElementById(id);
	const reviewInputId = "review" + id
	const userInputId = "user" + id
	
	element.innerHTML = `
		<div class="card-body position-relative">
				<h5 class="card-title">Review: </h5>
				<input type="text" class="form-control bg-dark text-white" id="${reviewInputId}" value="${review}">
		
				<h5 class="card-title">User: </h5>
				<input type="text" class="form-control bg-dark text-white" id="${userInputId}" value="${user}">
			</div>
			<div class="card-footer">
				<a href="#" class="btn btn-dark" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a>
			</div>
		</div>
 `	
}

function saveReview(reviewInputId, userInputId, id=""){

	const review = document.getElementById(reviewInputId).value;
	const user = document.getElementById(userInputId).value;

	if(id){
		fetch(APILINK + id,{
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"user": user, "review": review})
		}).then(res => res.json())
		  .then(res =>{
				console.log(res)
				location.reload();
			});
	}
	else{
		fetch(APILINK + "new",{
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
		}).then(res => res.json())
		  .then(res =>{
				console.log(res)
				location.reload();
			});	
	}
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}