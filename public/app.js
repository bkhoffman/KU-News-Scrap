// Grab articles as a json
$.getJSON("/articles", (data) => {
  // For each article, create card with data and append to Article Section
  for (let i = 0; i < data.length; i++){
    console.log("numb of articles: " + data.length)
    let card = $("<div>");
      card.addClass("card article");
     
      let cardHeader = $("<div>").addClass("card-header");
      let link = $('<a>');
      link.attr('href', 'http://www2.kusports.com/' + data[i].link);
      link.text(data[i].title);
      cardHeader.html(link);

      let cardBody = $("<div>").addClass("card-body");
      cardBody.text(data[i].summary);
      // console.log("summary: "+ data[i].summary)

      let saveButton = $("<button>")
      saveButton.attr('data-id', data[i]._id);
      saveButton.addClass("btn btn-success btn-saveArt").text("Save Article");
      saveButton.attr('data-test', 'test');
      
      card.append(cardHeader, cardBody, saveButton);
      $("#articles").append(card);
  }
})

// Scrape website by using Button to send to /scrape page
$(document).on("click", "#scrape", function(){
  console.log("Scraped button pushed");
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(data){
    console.log(data);
  })
})

// Save Article button
$(document).on("click", ".btn-saveArt", function() {
  let thisId = $(this).attr("data-id");
  console.log("Saved Articles button pushed" + thisId);
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"
  })
});

// Delete Article button
$(document).on("click", ".delete", function() {
  let thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});
