### Our Hope ✅

Suppose we give our model the phrase “once upon a”. We want it to predict the next word: “time”. In general, we want our model to generate the next word given all the words seen so far. To simplify the problem conceptually, let’s think of each word as being associated with some *information*. The information associated with a word may be influenced by earlier words but it is the information for the last word that is used to predict the next one. So in our example, the information associated with “a” is used to predict “time”. Similarly, the information for “upon” should help predict “a”, and that for “once” should help predict “upon”.

<div class="body-image">
    <video src="attention-predict.mp4"></video>
    <div class="image-text">With each word we associate some <em>information</em> which is used to predict the next word.</div>
</div>

We will let this notion of information be represented by a vector which we will call a _context vector_. Our goal is to predict the next word given the current word’s context vector. How do we do this? It turns out that this is just multiclass classification, where the classes are all the words in our vocabulary.

To do this, we can learn a weight matrix that transforms the context vector into a set of scores — one for each word in the vocabulary. More specifically, we compute the dot product between the context vector and each row of this matrix. As there is a row corresponding to every word in the vocabulary, we get a score of how much the model believes that each word is next. Then, we select the word with the highest score as the model's prediction of the next word.

We would hope that the dot product between the context vector for "a" (which we will call $\vec{x}_\text{a}$) and the row in the weight matrix corresponding to the word "time" is the highest. That is, we would hope that the context vector for "a" is most similar to that row.

<div class="body-image">
    <video src="attention-classification.mp4"></video>
    <div class="image-text">We perform multiclass classification on the context vector associated with "a".</div>
</div>

We can now see that the problem has reduced to making the context vector for "a" and the row corresponding to "time" as similar as possible.

-> Some note about similarity? Dot product is measure of similarity...

### An Initial Idea ✅

Our first idea may be to represent "a" with some fixed vector. We will call this the embedding of "a". Then, we learn the weights in the matrix such that the row for "time" becomes as similar as possible to the embedding of "a". There is an issue with this approach though: we only look at the word "a" to determine the next word. So if we were able to train the model to output "time" given the embedding of "a", it would correctly complete the phrase "once upon a time" but it would incorrectly complete a phrase like "the sun is a star" and instead output "the sun is a time". 

We would like to consider all the words that came before it. So, instead of letting the context vector for "a" just be the embedding of "a", we could define the context vector for "a" to be the average of the embeddings of "once", "upon", and "a". That way, when we feed the context vector into our classifier, it has baked in information about all preceding words. 

This is a lot better. It solves our "the sun is a time" problem. But it raises another issue. Take the phrase "the capital of France is" which we train to complete with "Paris". Recall that this means that we have learned the weights in the matrix such that the context vector associated with "is", which is the average of the embeddings for "the", "capital", "of", "France", "is", is most similar to the row corresponding to "Paris".

Now consider the phrase "the capital of Spain is". All but one words are the same, so the average embedding will be very similar to that of the previous phrase. Hence, it is likely that our classifier will output "Paris" here as well. So, we'd get "the capital of Spain is Paris" instead of the desired "the capital of Spain is Madrid". 

<div class="body-image">
    <video src="attention-similar-classification.mp4"></video>
    <div class="image-text">Two very similar context vectors lead to the same output.</div>
</div>

What happened here? The issue was that all words were weighted equally. We would like to weigh certain words more than others. In the example above, we would have liked to weigh the words "France" and "Spain" more in their respective phrases. But how do we know how much to weigh each word? To develop an answer to that question, it will help to get visual.

### Embeddings ✅

When we said that we would represent "a" by some fixed vector — that we would *embed* "a" — what did we mean by that? We want to associate each word in our vocabulary with a list of numbers. For now, we will say a list of two numbers. But how should we assign numbers to words? We could of course assign two random numbers to each word. Take the words "banana", "pear", and "phone". We may randomly assign them the numbers $[+0.3, +0.2]$, $[+1.4, +1.0]$, and $[+0.8, +1.6]$. We can plot these in a 2D space.

<div class="body-image">
    <img src="attention-random-embedding.png" alt="Random embedding">
    <div class="image-text">We can plot our random embeddings in a 2D space.</div>
</div>

Let's consider whether we can do something more meaningful. A property we might hope to have is that similar words have similar embeddings and very different words have very different embeddings. Why? As we've seen, very similar inputs to our classifier produces the same or very similar outputs. So, we want words that are likely to be followed by the same next word to have similar embeddings, and words that are unlikely to share the same next word to have very different embeddings.

In our "banana", "pear", and "phone" example we would like "banana" and "pear" to have similar embeddings — that is be near each other in 2D space — because they are both fruits, and "phone" to have a very different embedding. To make sense of this distinction, we can assign the idea of *fruitiness* to one of the axes and the idea of *techiness* to the other axis.

<div class="body-image">
    <img src="attention-meaningful-embedding.png" alt="Meaningful embedding">
    <div class="image-text">A more meaningful embedding where similar words are near each other.</div>
</div>

### Words Pulling Words ✅

Now let's think about where to place the word "apple". Where should we put it? It depends on how it is used. If it appears in the phrase "I ate a banana and an apple" it should go near the fruits, but if it is in the phrase "I got a new phone from apple" it should go by the technology devices. So, there is no one great choice for the embedding of "apple". The best we can do is place it somewhere between the two. So that's what we will do in our generic embedding.

<div class="body-image">
    <img src="attention-generic-apple-embedding.png" alt='Generic embedding of "apple"'>
    <div class="image-text">Generic embedding of "apple".</div>
</div>

When we are given the phrase it appears in, we would like to adjust the embedding of of "apple" to better represent how the word is used in that phrase. In the first example we would like to move "apple" closer to the fruits, and in the second closer to the technology devices. 

How do we know where we want to move it? Some of the other words in the phrases give very good clues about what meaning of "apple" is being used. In "I ate a banana and an apple" the word "banana" tells us that it is talking about the fruit. And in "I got a new phone from apple", the word "phone" indicates that it meant the technology brand. 

Going back to the plane, what we would like is for "banana" to pull "apple" closer to it. And in the second example, we want "phone" to pull "apple" closer to it. 

<div class="body-image">
    <video src="attention-apple-pulled-side-by-side.mp4"></video>
    <div class="image-text">On the left "apple" is pulled by "banana" and on the right it is pulled by "phone".</div>
</div>

What about the other words in the phrase? How do we know that "banana" is the word that should pull "apple" and not any of the other words? Let's plot the embeddings of the other words. We can see that they are not very close close to "apple" because they are not very similar to "apple". The words that are most similar to "apple" pull it the most. So, all words exert some amount of pulling force, but the effect is dominated by the most similar words. I like to compare this to gravity (where the objects have the same mass). Objects that are closer exert more gravitational force on each other than objects that are far away. 

<div class="body-image">
    <video src="attention-all-embeddings.mp4"></video>
    <div class="image-text">The other words are not very similar to "apple", so they don't exert as much pulling force.</div>
</div>

Let's walk through the math to see how we determine where to move "apple" — that is how much each word pulls "apple". We start by computing the similarity between "apple" and every word. We will use dot product as our measure of similarity. As we would expect, other than "apple" and "apple", "apple" and "banana" have the highest dot product, so they are most similar. 

<div class="body-image">
    <video src="attention-all-dot-product.mp4"></video>
    <div class="image-text">We compute the dot product between "apple" and every word as our measure of similarity.</div>
</div>

We want to use these dot products to determine how much we should nudge "apple" in the direction of each word. At an extreme, where we want "apple" to move completely to "banana", we would simply set 100% of the new "apple" vector to the coordinates of the "banana" vector. We can write this as the following linear combination: 

```math
\vec{x}_{\text{apple}}' = 0 \vec{x}_{\text{I}} + 0 \vec{x}_{\text{ate}} + 0 \vec{x}_{\text{a}} + 1 \vec{x}_{\text{banana}} + 0 \vec{x}_{\text{and}} + 0 \vec{x}_{\text{an}} + 0 \vec{x}_{\text{apple}}
```

What series of dot products would suggest this linear combination? One dot product should be incredibly large (the one between "apple" and "banana") and the rest should be incredibly small. 

If we instead want "banana" to pull "apple" halfway between it and the original position for "apple", we would want this linear combination:

```math
\vec{x}_{\text{apple}}' = 0 \vec{x}_{\text{I}} + 0 \vec{x}_{\text{ate}} + 0 \vec{x}_{\text{a}} + \frac{1}{2} \vec{x}_{\text{banana}} + 0 \vec{x}_{\text{and}} + 0 \vec{x}_{\text{an}} + \frac{1}{2} \vec{x}_{\text{apple}}
```

We want this if the dot products between "apple" and "apple", and "apple" and "banana" are large and pretty equal, and the rest are very small in comparison. If instead all the dot products were pretty similar, meaning that "apple" is equally similar to all words, we would want all words to pull "apple" equally. So we'd want a linear combination like this:

```math
\vec{x}_{\text{apple}}' = \frac{1}{6} \vec{x}_{\text{I}} + \frac{1}{6} \vec{x}_{\text{ate}} + \frac{1}{6} \vec{x}_{\text{a}} + \frac{1}{6} \vec{x}_{\text{banana}} + \frac{1}{6} \vec{x}_{\text{and}} + \frac{1}{6} \vec{x}_{\text{an}} + \frac{1}{6} \vec{x}_{\text{apple}}
```

We see that we want all coefficients to be between 0 and 1. We also want to emphasize the highest dot products. Those are the most similar words, so we want them to pull more. A function that accomplishes all of this is the exponential function $f(x) = e^x$. So, we will exponentiate each dot product. Finally, we want them all to sum to 1. We can achieve that by diving each term by the sum of all the terms. This is called normalization. The function we have described is referred to as *softmax* and is usually written like this:

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

### Attention is a Weighted Average

Let's now return to our original goal: predicting the next word. To predict the next word in a sequence, we feed the context vector associated with the last word into a multiclass classifier. To have it output the correct word, we need the row corresponding to the correct next word in the weight matrix and the context vector to be as similar as possible. We realized that simply using the embedding of the last word as the context vector was not ideal. It would incorrectly predict the same next word for both "once upon a" and "the sun is a" as its only looking at the word "a" to determine the next word. 

Next, we considered defining the context vector of the last word to be the average of the embeddings of it and the words before it. This was better and solved our "the sun is a time" problem. However, sequences that share most words but have a few words that differ would be given the same next word, even if the words that do differ change the meaning. Two such sequences are "the capital of Spain is" and "the capital of France is".

We figured that we do not want to weigh each word equally. Certain words have higher relevance when predicting the next word. The question we didn't know how to answer was how to determine how much to weigh each word. But now we have a method of computing a weighted average of the embeddings of words. The concept of words pulling words — of *attention* — is precisely about computing a weighted average. Computing the similarity between words through the dot product and applying softmax gives us the weights for the weighted average. 

That is the basics of how the language models that power ChatGPT and the other AI chatbots work. If you've followed most of what we've covered up to this point, you have a pretty good understanding of the mechanism that is at the core of modern AI models. 

There are some improvements we will need to make to the attention mechanism to make it a really good and accurate system for completing sequences. Let's develop them together.

-> -> -> Focus on above first <- <- <-

### The Whole Phrase 

So far, we've only focused on the word "apple" getting pulled. That is, we've only applied attention to update the vector for "apple" based on the other words. But in practice, we want to apply attention to all words in the phrase. We want each word to get pulled to a better place for it, given the surrounding words. Why? There are two main reasons:

1. As we've eluded to, we often apply multiple iterations of attention to refine the vector for a word. Let's modify our example phrase: "I ate an orange and an apple". Here, we want "orange" to give context to "apple", but we also want "apple" to give context to "orange". We want "apple" to tell "orange" that it is being used as the fruit and not the color. This will ultimately benefit the context vector for "apple". When it is pulled by the words in the phrase in the next iteration of attention, it will be pulled by the updated vector for "orange" that has more fruit characteristics than the original vector.
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

### Transforming the Embeddings

Let's return to the example we used when introducing the idea of words pulling words. Recall how the embedding space had one cluster of fruits and another cluster of technology devices, and we applied attention to move the embedding of "apple". 

<div class="body-image">
    <img src="attention-generic-apple-embedding.png" alt='Generic embedding of "apple"'>
    <div class="image-text">Our original embedding space</div>
</div>

Were these the most optimal embeddings for this purpose? The embeddings are learned to be great general purpose embeddings, but they may not be the best we can do for this very specific use case of separating the two meanings of "apple". We will soon explore what a better embedding space for this purpose might look like. 

But first let's discuss how we can obtain new embeddings given our original embeddings. What we want is some function that given a vector outputs a different vector. Linear transformations do exactly this. A linear transformation simply multiplies the input vector by some matrix to obtain an output vector:

```math
T(\vec{x}) = M \vec{x}
```

In our case with two dimensional embedding vectors, any 2x2 matrix $M$ will transform the embedding vector $\vec{v}$ into a new two dimensional vector.

<div class="body-image">
    <video src="attention-apply-transformation.mp4"></video>
    <div class="image-text">Applying a linear transformation to each embedding vector.</div>
</div>

When we apply a linear transformation to every vector, that is to a whole vector space, we often transform the axes as well. What we mean by this is that we transform the vectors $[0, 1]$ and $[1, 0]$ which are known as the unit basis vectors and define the coordinate system. This makes it easy to visualize a linear transformation and to plot the transformed vectors. For example, to plot the transformed version of the vector $[1, 2]$, we can simply plot it at the point $(1, 2)$ defined by the new axes.

<div class="body-image">
    <video src="attention-transform-axes.mp4"></video>
    <div class="image-text">We often transform the axes as well.</div>
</div>

### A Better Space for Pulling Words

Now that we have an understanding of how we can use a linear transformation to obtain new embedding spaces, let's think about why this would be useful. Let's look at three spaces: our original space and two transformed spaces. 

<div class="body-image">
    <video src="attention-three-transformed-spaces.mp4"></video>
    <div class="image-text">Our original space and two transformed spaces.</div>
</div>

Is one space better than the others for pulling the word "apple"? Remember, our goal is to separate the two meanings of "apple". In space B, the attention step barely distinguishes the two meanings of "apple" whereas in space C the two updated vectors for "apple" move far apart. So, here space C is better. 

Now, we will use the transformed vectors to move the vector for "apple". That is, we will transform the vectors before we use them in the linear combination. The transformed version of these vectors are referred to as *values*, denoted $v$, and the matrix used to compute them is referred to as $W_v$.

<div class="body-image">
    <video src="attention-values-lin-comb.mp4"></video>
    <div class="image-text">We use transformed version of the vectors, called <em>values</em>, in the linear combination.</div>
</div>

-> Some examples of how the transformations may get crafted?

What about computing the coefficients — that is how much each word should pull "apple"? Do we use the same transformed vectors for computing those? We certainly could and that would likely be better than using the untransformed vectors. But let's hold that thought for now.

### Asymmetric Pull 

As we've discussed, it is not only "apple" that gets pulled. Each word in the phrase pulls each other word. So, just as "banana" pulls "apple", "apple" also pulls "banana".

The pulling force that one word exerts on the other is completely determined by the similarity of the words. This means that it is always the case that "banana" pulls "apple" just as much "apple" pulls "banana". This may not always be desirable. We can find examples where we'd want asymmetric pull. 

Take the words "bride" and "ring". If a phrase contains the word "bride", it is quite likely that the word "ring" will appear. So, we want "bride" to exert a strong pulling force on "ring". On the other hand, if a phrase contains the word "ring", it is no where near as likely that the word "bride" will appear. It could be referring to a piece of jewelry, a boxing ring, or perhaps a phone call. So, we want "ring" to exert a less strong pulling force on "bride".

Let's introduce some vocabulary to describe this. We will call the word that is pulled the *query* and the word that pulls the *key*. In our "bride" and "ring" example we want this:

- When "bride" is the key and "ring" is the query, that is when "bride" pulls "ring", we want a strong pulling force.
- When "ring" is the key and "bride" is the query , that is when "ring" pulls "bride", we want a weak pulling force.

<div class="body-image">
    <img src="attention-asymmetric-forces.png" alt="Asymmetric pulling forces">
    <div class="image-text">Our desired asymmetric pulling forces.</div>
</div>

How do we create these asymmetric forces? We know that the only thing that determines the pulling force is the similarity between the embedding vectors (or the transformed embedding vectors). So, we have to make the similarity different depending on which vector is acting as the query and which is acting as the key. What if we applied one transformation to the queries and another one to the keys? Let's have a look.

We will start by placing "bride" and "ring" in a two-dimensional embedding space. Then, we make a copy of this space. We will call the left space the keys and right space the queries. When we calculate the force that "bride" pulls "ring", we will use the "bride" vector from key space (remember keys pull) and the "ring" vector from the query space (queries are pulled). And when we compute the force that "ring" pulls "bride", we use the "ring" vector from key space and the "bride" vector from the query space. Since these spaces are currently identical, the two pairs of vectors are equally similar.

<div class="body-image">
    <video src="attention-key-query-transformation-part-one.mp4"></video>
    <div class="image-text">When we compute the pulling force, that is the similarity (dot product), one vector comes from the key space and the other from the query space.</div>
</div>

This gets interesting when we apply different transformations to the key and query spaces. Let's apply a transformation that squashes the x-axis to the key space and one that squashes the y-axis to the query space. Now, when we take the "bride" vector from the key space and the "ring" vector from the query space, we see that they are very similar. So, they have a high dot product. This means that "bride" will exert a strong pulling force on "ring". But when we take the "ring" vector from the key space and the "bride" vector from the query space we get two vectors that are not as similar. They have a lower dot product. So, the pulling force that "ring" exerts on "bride" is much weaker.

<div class="body-image">
    <video src="attention-key-query-transformation-part-two.mp4"></video>
    <div class="image-text">Applying different transformations to the key and query spaces gives us asymmetric pulling forces.</div>
</div>

Let's now apply this to our running example of how "apple" gets pulled in the phrase "I ate a banana and an apple". We want to compute the dot product between the query version of "apple" (it is pulled) and the key versions of all vectors (pull). We will denote queries by $q$ and values by $v$ and the matrices used to compute them as $W_q$ and $W_k$ respectively.

<div class="body-image">
    <video src="attention-key-query-dp.mp4"></video>
    <div class="image-text">We compute the dot product between the query and the keys.</div>
</div>

These are now the dot products to which we apply softmax to generate the attentions scores, that is the coefficients in linear combination for the updated vector for "apple".


-> Some examples of how the transformations may get crafted

### Keys, Queries, and Values

We have now developed three different transformations that we apply to the embedding vectors: the transformations that produce the keys, queries, and values: 

- $\vec{k} = W_k \vec{x}$
- $\vec{q} = W_q \vec{x}$
- $\vec{v} = W_v \vec{x}$

Let's recap the purpose of each before we look at how this effects our application of attention to the whole phrase.

The keys and queries work together to create the optimal spaces for computing the similarity between vectors. They can emphasize features that are important for measuring similarity and deemphasize those that are not. They can also combine features. All in a way to create the most optimal space to compute how strongly each word should pull each other word. Importantly, have two separate transformations allows for asymmetric pull. In our linear combination that computes the updated vector, the keys and query produce the coefficients. 

The values create the most optimal space for actually moving the embedding of a word. They emphasize features that are important for distinguishing the different meanings of a word. Given the weights computed by the key and queries, we combine value vectors to compute the new vector for a word.

### The Whole Phrase — with Keys, Queries, and Values

Recall how we packaged all embedding vectors of the phrase as rows in a matrix we called $X$. We can multiply $X$ by $W_k$, $W_q$, and $W_v$ to turn the rows into keys, queries, and values, respectively. We will call these matrices $K$, $Q$, and $V$.

- $K = X W_k$
- $Q = X W_q$
- $V = X W_v$

Now, we take the dot product of each query vector with each key vector. We can write this as $QK^T$. Just as before, the next step is to apply softmax to each row: $\text{softmax}(QK^T)$. Finally, we use these attention scores to compute the linear combination along each row using the values. This can be written as $\text{softmax}(QK^T)V$.

Let's see this in action. Let's use the same table structure as before. First, we transform the first row into keys and the first column into queries. Next, we take the dot product between each pair of keys and queries and apply softmax to each row. We now have the coefficient for the linear combination that computes the updated vectors. To get the vectors, we take a copy of our original vectors and transform that into values and then use them in the linear combination in each row.

<div class="body-image">
    <video src="attention-table-kqv.mp4"></video>
    <div class="image-text">Attention using keys, queries, and values applied to the whole phrase.</div>
</div>

### Multiple Key, Query, and Value Spaces


### Increasing the Dimensionality  

-> Introduce dividing by sqrt d_k here


