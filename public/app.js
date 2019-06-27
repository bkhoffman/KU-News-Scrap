// Grab articles as a json
$.getJSON("/articles", (data) => {
  // For each article, create card with data and append to Article Section
  for (let i = 0; i < data.length; i++){
    let card = $("<div>");
      card.addClass("card article");
      card.attr("data-id='" + data[i]._id);
      card.attr("data-title", + data[i].title);
      card.attr("data-link", + data[i].link);
      // card.attr("data-image", data[i].img);

      let cardHeader = $("<div>").addClass("card-header");
      cardHeader.text(data[i].title);

      let cardBody = $("<div>").addClass("card-body");
      cardBody.html(data[i].link);

      card.append(cardHeader, cardBody);
      $("#articles").append(card);
  }
})