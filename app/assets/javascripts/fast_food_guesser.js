window.FastFoodGuesser = {

  initialize: function () {

    //pops up with correct answer and some fact about the ingredients


    var questions = [
      {
        question: 'Soybean Oil, Buttermilk, Water, Distilled Vinegar, Egg Yolk, Jalapeno Peppers, High Fructose Corn Syrup,' +
          ' Granular, Monterey Jack, Parmesan, And Semisoft Cheeses (Milk, Cheese Cultures, Salt, Enzymes), Buttermilk*,' +
          ' Salt, Bell Pepper*, Xanthan Gum, Garlic*, Onion*, Mustard Seed, Whey, Natural Flavor,' +
          ' Potassium Sorbate And Sodium Benzoate Added As Preservatives, Lactic Acid, Citric Acid, Disodium Inosinate,' +
          ' Disodium Guanylate, Spice, Propylene Glycol Alginate, Calcium Disodium EDTA',
        options: ["Taco Bell's Pepper Jack Sauce", "Carl's Junior Pepperjack Cheese", "McDonald's Buttermilk Ranch Sauce"],
        answer: "Taco Bell's Pepper Jack Sauce"

      },
      {
        question: 'water, bleached wheat flour, dehydrated onion, modified corn starch, yellow corn flour, sugar, ' +
          'gelatinized wheat starch, contains 2% or less of :salt, guar gum, methylcellulose, fructose, onion powder, ' +
          'food starch-modified, sodium alginate, sunflower oil, natural flavors, grill flavor (from sunflower oil),' +
          'canola oil, wheat gluten, modified palm oil, sodium tripolyphosphate, whey, dextrose, garlic powder,' +
          ' leavening (baking soda, sodium aluminum phosphate), spice, hydroxypropylmethylcellulose, yeast extract, ' +
          'corn starch, sorbitol, dried yeast, calcium chloride. parfried in soybean oil.',
        options: ["Arby's Onion Roll", "Burger King's Onion Rings", "Pizza Hut's Breadsticks"],
        answer: "Burger King's Onion Rings"
      },
      {
        question: 'Hass Avocado, Red Onion, Jalapeño, Cilantro, Citrus Juice, Salt',
        options: ["Taco Bell's Premium Guacamole", "Burger King's Avocado Alioli", "Chipotle's Guacamole"],
        answer: "Chipotle's Guacamole"
      },
      {
        question: 'Pork Cured with Water, Salt, Sugar, Hickory Smoke Flavoring, Sodium Phosphates, Dextrose,' +
          ' Sodium Erythorbate, Sodium Nitrite.',
        options: ["Chipotle's Carnitas", "McDonald's McRib", "Carl's Junior's Bacon"],
        answer: "Carl's Junior's Bacon"
      }
    ]


    // when the page loads, have a welcome message
    var welcome = JST['templates/welcome']();
    $("main").append(welcome);

    $("#start").on("click", function (event) {
      event.preventDefault();
      var question = JST['templates/form']({current_question: questions[0], current_score: 0, message: ""});
      $("main").replaceWith(question);
    });

    $('#popit').magnificPopup({
      items: {
        src: '<div class="white-popup">Dynamically created popup</div>',
        type: 'inline'
      },
      closeBtnInside: true
    });

    //the meat of it
    var counter = 1;
    var score = 0;

    var message = "boo ya";
    $(document).on("click", "input[type=submit]", function (event) {
      event.preventDefault();

      var their_guess = $('input[name="group1"]:checked').val();
      var is_correct = check_if_correct(their_guess, counter - 1);
      score = increment_score(is_correct);


      if (counter >= questions.length) {
        var end_screen = JST['templates/ending']({current_score: score, message: message});
        $("main").replaceWith(end_screen);
      } else {
        var question = JST['templates/form']({current_question: questions[counter], current_score: score, message: message});
        $("main").replaceWith(question);
        counter++;
      }
    });


    function check_if_correct(their_guess, index) {
      if (their_guess == questions[index]["answer"]) {
        message = "Yay! You got it right!";
        return true;
      } else {
        message = "That was wrong.";
        return false;
      }
    }

    function increment_score(is_correct) {
      if (is_correct == true) {
        score++;
      }
      return score;
    }


  }

};