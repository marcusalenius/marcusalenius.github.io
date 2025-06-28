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
    <video src="attention-classification.mp4"></video>
    <div class="image-text">We perform multiclass classification on the context vector associated with "a".</div>
</div>

We can now see that the problem has reduced to making the context vector for "a" and the row corresponding to "time" as similar as possible.

### Colored? A Note About Similarity

Dot product is measure of similarity...

### An Initial Idea

Our first idea may be to represent "a" with some fixed vector. We will call this the embedding of "a". Then, we learn the weights in the matrix such that the row for "time" becomes as similar as possible to the embedding of "a". There is an issue with this approach though: we only look at the word "a" to determine the next word. So if we were able to train the model to output "time" given the embedding of "a", it would correctly complete the phrase "once upon a time" but it would incorrectly complete a phrase like "the sun is a star" and instead output "the sun is a time". 

We would like to consider all the words that came before it. So, instead of letting the context vector for "a" just be the embedding of "a", we could define the context vector for "a" to be the average of the embeddings of "once", "upon", and "a". That way, when we feed the context vector into our classifier, it has baked in information about all preceding words. 

This is a lot better. It solves our "the sun is a time" problem. But it raises another issue. Take the phrase "the capital of France is" which we train to complete with "Paris". Recall that this means that we have learned the weights in the matrix such that the context vector associated with "is", which is the average of the embeddings for "the", "capital", "of", "France", "is", is most similar to the row corresponding to "Paris".

Now consider the phrase "the capital of Spain is". All but one words are the same, so the average embedding will be very similar to that of the previous phrase. Hence, it is likely that our classifier will output "Paris" here as well. So, we'd get "the capital of Spain is Paris" instead of the desired "the capital of Spain is Madrid". 

<div class="body-image">
    <img src="" alt="">
    <div class="image-text">Some figure where I show the classification with very similar vectors outputting the same predicted word.</div>
</div>

What happened here? The issue was that all words were weighted equally. We would like to weigh certain words more than others. In the example above, we would have liked to weigh the words "France" and "Spain" more in their respective phrases. But how do we know how much to weigh each word? To develop an answer to that question, it will help to get visual.

### Embeddings

When we said that we would represent "a" by some fixed vector, that we would *embed* "a", what did we mean by that? We want to associate each word in our vocabulary with a list of numbers. For now, we will say a list of two numbers. But how should we assign numbers to words? We could of course assign two random numbers to each word. Take the words "banana", "pear", and "phone". We may randomly assign them the numbers $[+0.3, +0.2]$, $[+1.4, +1.0]$, and $[+0.8, +1.6]$. We can plot these on the Cartesian plane.

<div class="body-image">
    <img src="attention-random-embedding.png" alt="Random embedding">
    <div class="image-text">We can plot our random embeddings on the Cartesian plane.</div>
</div>

Let's consider whether we can do something more meaningful. A property we might hope to have is that similar words have similar embeddings, and very different words have very different embeddings. Why? As we've seen, very similar inputs to our classifier produces the same or very similar outputs. So, we want words that could have the same next word to have very similar embeddings, and words that should not have the next word in common to have very distinct embeddings.

In our "banana", "pear", and "phone" example we would like "banana" and "pear" to have similar embeddings, that is be near each other on the Cartesian plane, because they are both fruits, and "phone" to have a very different embedding. To make sense of this distinction, we can assign the idea of *fruitiness* to one of the axes and the idea of *techiness* to the other axis.

<div class="body-image">
    <img src="attention-meaningful-embedding.png" alt="Meaningful embedding">
    <div class="image-text">A more meaningful embedding where similar words are near each other.</div>
</div>


### Words Pulling Words

Now let's think about where to place the word "apple". Where should we put it? It depends on how it is used. If it appears in the phrase "I ate a banana and an apple" it should go near the fruits, but if it is in the phrase "I got a new phone from apple" it should go by the technology devices. So, there is no one great choice for the embedding of "apple". The best we can do is place it somewhere between the two. So that's what we will do in our generic embedding.

<div class="body-image">
    <img src="attention-generic-apple-embedding.png" alt='Generic embedding of "apple"'>
    <div class="image-text">Generic embedding of "apple".</div>
</div>

When we are given the phrase it appears in, we would like to adjust the embedding of of "apple" to better represent how the word is used in that phrase. In the first example we would like to move "apple" closer to the fruits, and in the second closer to the technology devices. 

How do we know that is where we want to move it? Some of the other words in the phrases give very good clues about what meaning of "apple" was intended. In "I ate a banana and an apple" the word "banana" tells us that it is talking about the fruit. And in "I got a new phone from apple", the word "phone" indicates that it meant the technology brand. 

Going back to the plane, what we would like is for "banana" to pull "apple" closer to it. And in the second example, we want "phone" to pull "apple" closer to it. 

<div class="body-image">
    <video src="attention-apple-pulled-side-by-side.mp4"></video>
    <div class="image-text">On the left "apple" is pulled by "banana" and on the right it is pulled by "phone".</div>
</div>

What about the other words? How do we know that "banana" is the word that should pull "apple" and not any of the other words? Let's plot the embeddings of the other words. We can see that they are not very close close to "apple" because they are not very similar to "apple". The words that are most similar to "apple" pull it the most. So, all words exert some amount of pulling force, but the effect is dominated by the most similar words. I like to compare this to gravity (where the objects have same mass). Objects that are closer exert more gravitational force on each other than objects that are far away. 

<div class="body-image">
    <video src="attention-all-embeddings.mp4"></video>
    <div class="image-text">The other words are not very similar to "apple", so they don't exert as much pulling force.</div>
</div>

-> Maybe a subheader (and colored section?) here

Let's walk through the actual math to see how we determine where to move "apple" — that is how much each word pulls "apple". We start by computing the similarity between "apple" and every word. We will use dot product as our measure of similarity. As we would expect, other than "apple" and "apple", "apple" and "banana" have the highest dot product, so they are most similar. 

<div class="body-image">
    <video src="attention-all-dot-product.mp4"></video>
    <div class="image-text">We compute the dot product between "apple" and every word as our measure of similarity.</div>
</div>

We want to use these dot products to determine how much we should nudge "apple" in the direction of each word. At an extreme, where we want "apple" to move completely to "banana", we would simply set 100% of the new "apple" vector to the coordinates of the "banana" vector. We can write this as the following linear combination: 

```math
\vec{v_{\text{apple}}}' = 0 \vec{v_{\text{I}}} + 0 \vec{v_{\text{ate}}} + 0 \vec{v_{\text{a}}} + 1 \vec{v_{\text{banana}}} + 0 \vec{v_{\text{and}}} + 0 \vec{v_{\text{an}}} + 0 \vec{v_{\text{apple}}}
```

What series of dot products would suggest this linear combination? One dot product should be incredibly large (the one between "apple" and "banana") and the rest should be incredibly small. 

If we instead want "banana" to pull "apple" halfway between it and the original position for "apple", we would want this linear combination:

```math
\vec{v_{\text{apple}}}' = 0 \vec{v_{\text{I}}} + 0 \vec{v_{\text{ate}}} + 0 \vec{v_{\text{a}}} + \frac{1}{2} \vec{v_{\text{banana}}} + 0 \vec{v_{\text{and}}} + 0 \vec{v_{\text{an}}} + \frac{1}{2} \vec{v_{\text{apple}}}
```

We want this if the dot products between "apple" and "apple", and "apple" and "banana" are large and pretty equal, and the rest are very small in comparison. If instead all the dot products were pretty similar, meaning that "apple" is equally similar to all words, we would want all words to pull "apple" equally. So we'd want a linear combination like this:

```math
\vec{v_{\text{apple}}}' = \frac{1}{6} \vec{v_{\text{I}}} + \frac{1}{6} \vec{v_{\text{ate}}} + \frac{1}{6} \vec{v_{\text{a}}} + \frac{1}{6} \vec{v_{\text{banana}}} + \frac{1}{6} \vec{v_{\text{and}}} + \frac{1}{6} \vec{v_{\text{an}}} + \frac{1}{6} \vec{v_{\text{apple}}}
```

We see that we want all coefficients to be between 0 and 1, and for them to sum to 1. There's another characteristic that would be nice to have: emphasize the highest dot products. Those are the most similar words, so we want them to pull more. A function that accomplishes this is the exponential function $f(x) = e^x$. So, we will exponentiate each dot product. Finally, we want them all to sum to 1. We can achieve that by diving each term by the sum of all tne terms. This is called normalization. The function we have described is referred to as *softmax* and is usually written like this:

```math
\text{softmax}(\bold{x})_i = \frac{e^{x_i}}{\sum_j e^{x_j}}
```

<div class="body-image">
    <video src="attention-all-softmax.mp4"></video>
    <div class="image-text">We apply softmax to turn the dot products into coefficients for the linear combination.</div>
</div>

These coefficients are referred to as *attention scores*. They tell us how much to pay attention to each word — that is how much each word should pull "apple". We can now compute the linear combination to get the updated vector for "apple".

<div class="body-image">
    <video src="attention-update-apple.mp4"></video>
    <div class="image-text">We compute the updated vector for "apple" using the attention scores.</div>
</div>

The process we have just developed is called *attention*. Specifically, it is one iteration of attention. We can repeat this process multiple times to further refine the vector for "apple".

### Some Header

Let's now turn back to the question we aimed to answer. To predict the next word in a sequence, we feed the context vector associated with the last word into a multiclass classifier. To have it output the correct word, we need the row corresponding to the correct next word in the weight matrix and the context vector to be as similar as possible. We realized that simply using the embedding of the last word as the context vector associated with that word was not ideal. It would incorrectly predict the next same word for both "once upon a" and "the star is a", for example "time", as we're only looking at the word "a" to determine the next word. 

Next, we considered defining the context vector of the last word to be the average of the embeddings of all the words that came before it, including the last word itself. This was better and solved the ...

We figured that we do not want to weigh each word equally. Certain words have higher relevance when predicting the next word. The question we didn't know how to answer was how to determine how much to weigh each word. But now we have a method of computing a weighted average of the embeddings of words. The concept of words pulling words — of *attention* — is just about computing a weighted average. Computing the similarity between words through the dot product and then applying softmax gives us the weights for the weighted average. 

### The Whole Phrase 

So far, we've only focused on the word "apple" getting pulled. That is, we've only applied attention to update the vector for "apple" based on the other words. But in practice, we want to apply attention to all words in the phrase. We want each word to get pulled to a better place for it, given the surrounding words. Why? There are two main reasons:

1. As we've eluded to, we often apply multiple iterations of attention to refine the vector for a word. Let's modify our example phrase: "I ate an orange and an apple". Here, we want "orange" to give context to "apple", but we also want "apple" to give context to "orange". We want "apple" to tell "orange" that it is being used as the fruit and not the color. So, when "apple" is pulled by the words in the phrase, we want it to ultimately be pulled by the updated vector for "orange" that has more fruitiness than the original vector.
1. During training we predict the next word at every position, not just the last one. So, given the phrase "I ate a banana and an apple", we ask it to predict every next word in the sequence. Given "I", predict "ate". Given "I ate", predict "an". Given "I ate an", predict "orange". And so on. As we're making predictions at every word, we need the vector for every word to be as informative as possible.

-> A note to remove or place somewhere else: In masked self-attention a word can only attend to previous words, not future ones. For example, in the sentence "I ate an orange and an apple", when the model processes "orange", it can attend to "I", "ate", and "an", but not to "apple". Even though "orange" can't look forward to "apple", it still needs to be updated based on everything that came before it. That way later words like "apple" can attend to a contextually rich version of "orange". If we didn’t contextualize "orange", then "apple" would be attending to a less informative representation. For example we still want "ate" to have influenced "orange". 

We can visualize what we have done so far in computing attention scores for "apple" by creating a column for every word in the phrase and creating a row for "apple". We fill in the row by computing the dot product of "apple" and the word in each column. We can now extend this to more words. We will add a row for each other word and repeat the same computation steps.

<div class="body-image">
    <video src="attention-table-dot-products.mp4"></video>
    <div class="image-text">For each row, we compute the the dot product with the word in each column.</div>
</div>

We now have a table of dot products which tell us how similar each word is to every other word. Using some linear algebra notation we can write this table of dot products in a succinct way. If we take all embedding vectors of our words and stack them as rows in a matrix that we will call $X$, we can compute the matrix of dot products by doing matrix multiplication of $X$ and a transposed version of $X$. That is $XX^T$.

Just as before, the next step is to apply softmax. Previously, we only did so to the "apple" row, but now we do it to every row. We often write $\text{softmax}(XX^T)$ to mean that we apply softmax to each row.

<div class="body-image">
    <video src="attention-table-softmax.mp4"></video>
    <div class="image-text">We apply softmax to each row.</div>
</div>

This gives us a matrix of attention scores. Finally, just as before, we use the attention scores to compute a linear combination of all vectors. This can be written as $\text{softmax}(XX^T)X$. 

<div class="body-image">
    <video src="attention-table-weighted-sum.mp4"></video>
    <div class="image-text">We compute the weighted sum along each row.</div>
</div>

The rows of this final matrix contain the updated vectors for each word.




### A Better Space for Pulling Words

Let's return to the example we used when introducing the idea of words pulling words. Recall how the embedding space one cluster of fruits and another cluster of technology devices, and we applied attention to move the embedding of "apple". 

<div class="body-image">
    <img src="attention-generic-apple-embedding.png" alt='Generic embedding of "apple"'>
    <div class="image-text">Our original embedding space</div>
</div>

Were these the most optimal embeddings for this purpose? The embeddings are learned to be great general purpose embeddings, but they may not be the best we can do for this very specific use case of separating the two meanings of "apple". We will soon explore what a better embedding space for this purpose might look like. 

But first let's discuss how we can obtain new embeddings given our original embeddings. What we want is some function that given a vector outputs a different vector. Linear transformations do exactly this. A linear transformation simply multiplies the input vector by some matrix to obtain an output vector:

```math
T(\vec{v}) = M \vec{v}
```

In our case with two dimensional embedding vectors, any 2x2 matrix $M$ will transform the embedding vector $\vec{v}$ into a new two dimensional vector.

<div class="body-image">
    <video src="attention-apply-transformation.mp4"></video>
    <div class="image-text">Applying a linear transformation to each embedding vector.</div>
</div>

When we apply a linear transformation to every vector, that is to a whole vector space, we often transform the axes as well. What we mean by this is that we transform the vectors $[0, 1]$ and $[1, 0]$, which are known as the unit basis vectors and define the coordinate system. This makes it easy to visualize a linear transformation and to plot the transformed vectors. For example, to plot the transformed version of the vector $[1, 2]$, we can simply plot it at the point $(1, 2)$ defined by the new axes.

<div class="body-image">
    <video src="attention-transform-axes.mp4"></video>
    <div class="image-text">We often transform the axes as well.</div>
</div>


Now that we have an understanding on how we can use a linear transformation to obtain new embedding spaces, let's think about why this would be useful. Let's look at three spaces: our original space and two transformed spaces. 

<div class="body-image">
    <video src="attention-three-transformed-spaces.mp4"></video>
    <div class="image-text">Our original space and two transformed spaces.</div>
</div>

Is one space better than the others for pulling the word "apple"? In space B, the attention step barely distinguishes the two meanings of "apple" whereas in space C the two updated vectors for "apple" are very far apart. So, here space C is better. In space C, we get more bang for our buck when pulling words.

-> Some examples of how the transformations may get crafted


### Asymmetric Pull 



