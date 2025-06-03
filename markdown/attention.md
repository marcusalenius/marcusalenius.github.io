### Our Hope

Say we give our model the phrase "once upon a". We want it to predict the next word "time". That is, given all the words before it, it should generate the next word in the sequence. We're going to make a conceptual simplification to this: given some *information* associated with the current word, predict the next word. The information associated with a word can be influenced by earlier words, but each word's information is responsible for predicting the next word. So in our example, the information associated with the word "a" is used to make the prediction of the next word being "time". Similarly, if we wanted to predict the next word "a" given the sequence "once upon", the information associated with the word "upon" is used to predict "a". And, for predicting "upon" given "once", the information for "once" is used to predict "upon".

<div class="body-image">
    <video src="attention-predict.mp4"></video>
    <div class="image-text">With each word we associate some <em>information</em> which is used to predict the next word.</div>
</div>

We will let this notion of information be represented by a vector which we will call a _context vector_. Given this vector, how do we actually predict the next word? This is just multiclass classification, where the classes are all the words in our vocabulary.

For a simple form of multiclass classification, we learn some weight matrix that, when multiplied with a context vector, gives us a score for each word in the vocabulary. More precisely, we take the dot product between the context vector and every row of the weight matrix. As there is a row corresponding to every word in our vocabulary, this dot product gives us a score of how much the model believes that each word is next. Then, we select the word with the highest score as the model's prediction of the next word.

We would hope that given "a"'s context vector (which we will call $\vec{v_a}$), the dot product between it and the row in the weight matrix corresponding to the word "time" would be the highest. So, we would hope that the context vector for "a" is most similar to that row.

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">We perform multiclass classification on the context vector associated with "a".</div>
</div>

We can now see that the problem has reduced to making the context vector for "a" and the row corresponding to "time" as similar as possible.

### Colored? A Note About Similarity

Dot product is measure of similarity...

### An Initial Idea

Our first idea may be to represent "a" with some fixed vector. We will call this the embedding of "a". Then, we learn the weights in the matrix such that the row for "time" becomes as similar as possible to the embedding of "a". There is an issue with this approach though: we only look at the word "a" to determine the next word. So if we were able to train the model to output "time" given the embedding of "a", it would correctly complete the phrase "once upon a time" but it would incorrectly complete a phrase like "the sun is a star" and instead output "the sun is a time". 

We would like to consider all the words that came before it. So, instead of letting the context vector for "a" just be the embedding of "a", we could define the context vector for "a" to be the average of the embeddings of "once", "upon", and "a". That way, when we feed the context vector into our classifier, it has baked in information about all preceding words. 

This is a lot better. It solves our "the sun is a time" problem. But it raises another issue. Take the phrase "another words for big is" which we train to complete with "large". Recall that this means that we have learned the weights in matrix such that the context vector associated with "is", which is the average of the embeddings for "another", "word", "for", "big", "is", is most similar to the row corresponding to "large".

Now consider the phrase "another word for help is". All but one words are the same, so the average embedding will be very similar to that of the previous phrase. Hence, it is likely that our classifier will output "large" here as well. So, we'd get "another word for help is large" instead of the desired "another word for help is assist". 

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">Some figure where I show the classification with very similar vectors outputting the same predicted word.</div>
</div>

What happened here? The issue was that all words were weighted equally. We would like to weigh certain words more than others. In the example above, we would have liked to weigh the words "big" and "help" more in their respective phrases. But how do we know how much to weight each word? To develop an answer to that question, it will help to get visual.

### Embeddings

When we said that we would represent "a" by some fixed vector, that we would *embed* "a", what did we mean by that? We want to associate each word in our vocabulary with a list of numbers. For now, we will say a list of two numbers. But how should we assign numbers to words? We could of course assign two random numbers to each word. Take the words "banana", "pear", and "phone". We may randomly assign them the numbers $[+0.8, +0.5]$, $[+3.9, +2.6]$, and $[+2.1, +4.2]$. We can plot these on the Cartesian plane.

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">We can plot our random embeddings on the Cartesian plane.</div>
</div>

Let's consider whether we can do something more meaningful. A property we might hope to have is that similar words have similar embeddings, and very different words have very different embeddings. Why? As we've seen, very similar inputs to our classifier produces the same or very similar outputs. So, we want words that could have the same next word to have very similar embeddings, and words that should not have the next word in common to have very distinct embeddings.

In our "banana", "pear", and "phone" example we would like "banana" and "pear" to have similar embeddings, that is be near each other on the Cartesian plane, because they are both fruits, and "phone" to have a very different embedding. To make sense of this distinction, we can assign the idea of *fruitiness* to one of the axes and the idea of *techiness* to the other axis.

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">A more meaningful embedding where similar words are near each other. [maybe add a laptop as well?]</div>
</div>


### Words Pulling Words

Now let's think about where to place the word "apple". Where should we put it? It depends on how it is used. If it appears in the phrase "I ate a banana and an apple" it should go near the fruits, but if it is in the phrase "I got a new phone from apple" it should go by the technology devices. So, there is no one great choice for the embedding of "apple". The best we can do is place it somewhere between the two. So that's what we will do in our generic embedding.

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">Generic embedding of "apple".</div>
</div>

When we are given the phrase it appears in, we would like to adjust the embedding of of "apple" to better represent how the word is used in that phrase. In the first example we would like to move "apple" closer to the fruits, and in the second closer to the technology devices. 

How do we know that is where we want to move it? Some of the other words in the phrases give very good clues about what meaning of "apple" was intended. In "I ate a banana and an apple" the word "banana" tells us that it is talking about the fruit. And in "I got a new phone from apple", the word "phone" indicates that it meant the technology brand. 

Going back to the plane, what we would like is for "banana" to pull "apple" closer to it. And in the second example, we want "phone" to pull "apple" closer to it. 

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">On the left "apple" is pulled by "banana" and on the right it is pulled by "phone".</div>
</div>

What about the other words? How do we know that "banana" is the word that should pull "apple" and not any of the other words? Let's plot the embeddings of the other words. They are not very close to "apple" because they are not very similar to "apple". The most similar words to "apple" should pull it the most. All words exert some amount of pulling force, but the effect is dominated by the closest words. I like to compare this to gravity (where the objects have same mass). Objects that are closer exert more gravitational force on each other than objects that are far away. 



