// Grab articles as a json
$.getJSON("/articles", (data) => {
  // For each article, create card with data and append to Article Section
  for (let i = 0; i < data.length; i++){
    console.log("numb of articles: " + data.length)
    let card = $("<div>");
      card.addClass("card article");
      card.attr("data-id='" + data[i]._id);
      card.attr("data-title", + data[i].title);
      card.attr("data-summary", + data[i].summary);
      card.attr("data-link", + data[i].link);
      // card.attr("data-image", data[i].img);

      let cardHeader = $("<div>").addClass("card-header");
      cardHeader.text(data[i].title);

      let cardBody = $("<div>").addClass("card-body");
      cardBody.text(data[i].summary);
      console.log("summary: "+ data[i].summary)
      cardBody.html(data[i].link);

      let saveButton = $("<button>").addClass("btn-saveArt").text("Save Article");

      card.append(cardHeader, cardBody, saveButton);
      $("#articles").append(card);
  }
})

$(document).on("click", "#scrape", function(){
  console.log("Scraped button pushed");
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(data){
    console.log(data);
  })
})

$(document).on("click", "#home", function(){
  console.log("Home button pushed");
  res.render("index");
});