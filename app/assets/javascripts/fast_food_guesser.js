window.FastFoodGuesser = {

  initialize: function () {

    var questions = [
      {
        question: ('Soybean Oil, Buttermilk, Water, Distilled Vinegar, Egg Yolk, Jalapeno Peppers, High Fructose Corn Syrup,' +
          ' Granular, Monterey Jack, Parmesan, And Semisoft Cheeses (Milk, Cheese Cultures, Salt, Enzymes), Buttermilk*,' +
          ' Salt, Bell Pepper*, Xanthan Gum, Garlic*, Onion*, Mustard Seed, Whey, Natural Flavor,' +
          ' Potassium Sorbate, Sodium Benzoate, Lactic Acid, Citric Acid, Disodium Inosinate,' +
          ' Disodium Guanylate, Spice, Propylene Glycol Alginate, Calcium Disodium EDTA').split(","),
        options: ["Taco Bell's Pepper Jack Sauce", "Carl's Junior Pepperjack Cheese", "McDonald's Buttermilk Ranch Sauce"],
        answer: "Taco Bell's Pepper Jack Sauce",
        fun_fact: "fun fact 1"

      },
      {
        question: ('water, bleached wheat flour, dehydrated onion, modified corn starch, yellow corn flour, sugar, ' +
          'gelatinized wheat starch, contains 2% or less of :salt, guar gum, methylcellulose, fructose, onion powder, ' +
          'food starch-modified, sodium alginate, sunflower oil, natural flavors, grill flavor (from sunflower oil),' +
          'canola oil, wheat gluten, modified palm oil, sodium tripolyphosphate, whey, dextrose, garlic powder,' +
          ' leavening (baking soda, sodium aluminum phosphate), spice, hydroxypropylmethylcellulose, yeast extract, ' +
          'corn starch, sorbitol, dried yeast, calcium chloride. parfried in soybean oil.').split(","),
        options: ["Arby's Onion Roll", "Burger King's Onion Rings", "Pizza Hut's Breadsticks"],
        answer: "Burger King's Onion Rings",
        fun_fact: "Hydroxypropylmethylcellulose 'is a semisynthetic, inert, viscoelastic polymer used as an " +
          "ophthalmic lubricant, as well as an excipient and controlled-delivery component in oral medicaments, " +
          "found in a variety of commercial products.'  Mmmmm, that sounds delicious!"
      },
      {
        question: ('Hass Avocado, Red Onion, Jalapeño, Cilantro, Citrus Juice, Salt').split(","),
        options: ["Taco Bell's Premium Guacamole", "Burger King's Avocado Alioli", "Chipotle's Guacamole"],
        answer: "Chipotle's Guacamole",
        fun_fact: "fun fact 3"
      },
      {
        question: ('Pork Cured with Water, Salt, Sugar, Hickory Smoke Flavoring, Sodium Phosphates, Dextrose,' +
          ' Sodium Erythorbate, Sodium Nitrite.').split(","),
        options: ["Chipotle's Carnitas", "McDonald's McRib", "Carl's Junior's Bacon"],
        answer: "Carl's Junior's Bacon",
        fun_fact: "fun fact 4"
      }
    ];


    // when the page loads, have a welcome message
    var welcome = JST['templates/welcome']();
    $("main").append(welcome);

    $(document).on("click", "button#start", function (event) {
      event.preventDefault();


      var question = JST['templates/form']({current_question: questions[0], q_num: 1});
      $("main").replaceWith(question);
    });


    //the meat of it
    var counter = 1;
    var score = 0;

    var message = "boo ya";
    $(document).on("click", "button#myModalButton", function (event) {
      event.preventDefault();

      var their_guess = $('input[name="group1"]:checked').val();
      var is_correct = check_if_correct(their_guess, counter - 1);
      score = increment_score(is_correct);

      var fun_fact = questions[counter - 1]["fun_fact"];

      $(".modal-header #header").html( message );
      $(".modal-body #correct_answer").html( "The correct answer was: " + questions[counter - 1]["answer"] );
      $(".modal-body #paragraph_content").html( "Your score is now: " + score + " out of " + counter + ".  \n" + "FUN FACT! \n" + fun_fact);

      $("#myModalSucks").modal('show');


      if (counter >= questions.length) {
        var end_screen = JST['templates/ending']({current_score: score, message: message});
        $("main").replaceWith(end_screen);
      } else {
        var question = JST['templates/form']({current_question: questions[counter], q_num: counter + 1});
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