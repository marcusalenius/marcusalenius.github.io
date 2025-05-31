### Our Hope

Say we give our model the phrase "once upon a". We want it to predict the next word "time". That is, given all the words before it, it should generate the next word in the sequence. We're going to make a conceptual simplification to this: given some *information* associated with the current word, predict the next word. The information associated with a word can be influenced by earlier words, but each word's information is responsible for predicting the next word. So in our example, the information associated with the word "a" is used to make the prediction of the next word being "time". Similarly, if we wanted to predict the next word "a" given the sequence "once upon", the information associated with the word "upon" is used to predict "a". And, for predicting "upon" given "once", the information for "once" is used to predict "upon".

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">With each word we associate some <em>information</em> which is used to predict the next word.</div>
</div>

We will let this notion of information be represented by a vector which we will call a _context vector_. Given this vector, how do we actually predict the next word? This is just multiclass classification, where the classes are all the words in our vocabulary.

For simple multiclass classification, we learn some weight matrix that, when multiplied with a context vector, gives us a score for each word in the vocabulary. More precisely, we take the dot product between the context vector and every row of the weight matrix. As there is a row corresponding to every word in our vocabulary, this dot product gives us a score of how much the model believes that each word is next. 

We would hope that given "a"'s context vector, the dot product between it and the row corresponding to the word "time" would be the highest. So, we would hope that the context vector for "a" is most similar to that row.

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">We perform multiclass classification on the context vector associated with "a".</div>
</div>

We can now see that the problem has reduced to making the context vector for "a" and the row corresponding to "time" as similar as possible.

### An Initial Idea


$\sqrt{2}$



