### Our Hope ✅

Before we begin, we need to establish what large language models (LLMs) are. LLMs are a type of artificial intelligence model trained on large amounts of text to understand and generate human-like language. In particular, they do one task *really* well: predicting the next word in a sequence. With that in mind, let's develop a model that does exactly that.

Suppose we give our model the phrase "once upon a". We want it to predict the next word: "time". More generally, we want the model to predict the next word given all previous words in the sequence. To simplify the problem conceptually, let's think of each word as being associated with some *information*. The information associated with a word may be influenced by earlier words but it is the information for the last word that is used to predict the next one. In our example, the information associated with "a" is used to predict the next word, "time". Similarly, the information for "upon" should help predict "a", and that for "once" should help predict "upon".

<div class="body-image">
    <video src="attention-predict.mp4"></video>
    <div class="image-text">With each word we associate some <em>information</em> which is used to predict the next word.</div>
</div>

We will represent this notion of information with a vector, which we'll call a *context vector*. Our goal is to predict the next word given the current word's context vector. How do we do this? It turns out that this is just multiclass classification, where the classes are all the words in our vocabulary.

To do this, we can learn a weight matrix that transforms the context vector into a set of scores — one for each word in the vocabulary. More specifically, we compute the dot product between the context vector and each row of this matrix. Since there's a row for every word in the vocabulary, we get a score indicating how likely the model thinks each word is to come next. Then, we select the word with the highest score as the model's prediction of the next word.

We would hope that the dot product between the context vector for "a" (which we will call $\vec{x}_\text{a}$) and the row in the weight matrix corresponding to the word "time" is the highest. That is, we would hope that the context vector for "a" is most similar to that row.

<div class="body-image">
    <video src="attention-classification.mp4"></video>
    <div class="image-text">We perform multiclass classification on the context vector associated with "a".</div>
</div>

We can now see that the problem has reduced to making the context vector for "a" and the row corresponding to "time" as similar as possible.

### An Initial Idea ✅

Our first idea may be to represent "a" with some fixed vector. We will call this the embedding of "a". Then, we learn the matrix weights so that the row for “time” becomes as similar as possible to the embedding of “a”. There is an issue with this approach though: we only look at the word "a" to determine the next word. So if we were able to train the model to output "time" given the embedding of "a", it would correctly complete the phrase "once upon a time", but it would incorrectly complete a phrase like "the sun is a star" and instead output "the sun is a time". 

We would like to consider all the words that came before it. So instead of using just the embedding of "a", we could define its context vector as the average of the embeddings of "once", "upon", and "a". That way, when we feed the context vector into our classifier, it has baked in information about all preceding words. 

This is a lot better. It solves our "the sun is a time" problem. But it raises another issue. Take the phrase "the capital of France is" which we train to complete with "Paris". That means we've learned the matrix so that the context vector for "is" — the average of the embeddings of "the", "capital", "of", "France", and "is" — is most similar to the row for "Paris".

Now consider the phrase "the capital of Spain is". All words except one are the same, so the average embedding vector will be nearly identical to the one for the France sentence. Hence, it is likely that our classifier will output "Paris" here as well. So, we'd get "the capital of Spain is Paris" instead of the desired "the capital of Spain is Madrid". 

<div class="body-image">
    <video src="attention-similar-classification.mp4"></video>
    <div class="image-text">Two very similar context vectors lead to the same output.</div>
</div>

So what went wrong? The issue is that all words were weighted equally. We would like to weigh certain words more than others. In the example above, we would like to weigh the words "France" and "Spain" more in their respective phrases. But how do we decide how much to weigh each word? To develop an answer to that question, it will help to get visual.

### Embeddings ✅

Earlier, we said that we would represent "a" with a fixed vector — that we would *embed* it. But what exactly does that mean? We want to associate each word in our vocabulary with a list of numbers. For now, we will say a list of two numbers. But how should we assign numbers to words? To start, we could just assign each word two random numbers. Take the words "banana", "pear", and "phone". We may randomly assign them the numbers $[+0.3, +0.2]$, $[+1.4, +1.0]$, and $[+0.8, +1.6]$. We can plot these in a 2D space.

<div class="body-image">
    <img src="attention-random-embedding.png" alt="Random embedding">
    <div class="image-text">We can plot our random embeddings in a 2D space.</div>
</div>

Let's consider whether we can do something more meaningful. A property we might hope to have is that similar words have similar embeddings and very different words have very different embeddings. Why? As we've seen, very similar inputs to our classifier tend to produce the same or very similar outputs. So we want words that are likely to be followed by the same next word to have similar embeddings, and words that are unlikely to share the same next word to have very different embeddings.

In our "banana", "pear", and "phone" example, we would like "banana" and "pear" to have similar embeddings — that is be near each other in 2D space — because they are both fruits, and "phone" to have a very different embedding. To make sense of this distinction, we can assign the idea of *fruitiness* to one of the axes and the idea of *techiness* to the other axis.

<div class="body-image">
    <img src="attention-meaningful-embedding.png" alt="Meaningful embedding">
    <div class="image-text">A more meaningful embedding where similar words are near each other.</div>
</div>

### Words Pulling Words ✅

Let's now think about where to place the word "apple". Where should we put it? It depends on how "apple" is used. If it appears in the phrase "I ate a banana and an apple", it should go near the fruits, but if it is in the phrase "I got a new phone from apple", it should be by the technology devices. So there is no one great choice for the embedding of "apple". The best we can do is place it somewhere between the two. That's what we will do in our generic embedding.

<div class="body-image">
    <img src="attention-generic-apple-embedding.png" alt='Generic embedding of "apple"'>
    <div class="image-text">Generic embedding of "apple".</div>
</div>

When we are given the phrase it appears in, we would like to adjust the embedding of "apple" to better represent how the word is used in that phrase. In the first example we would like to move "apple" closer to the fruits, and in the second closer to the technology devices. 

How do we know where we want to move it? Some of the other words in the phrases give very good clues about what meaning of "apple" is intended. In "I ate a banana and an apple", the word "banana" tells us that it is talking about the fruit. And in "I got a new phone from apple", the word "phone" indicates that it meant the technology brand. 

Returning to the embedding space, we want "banana" to pull "apple" closer to it. And in the second example, we want "phone" to pull "apple" closer to it. 

<div class="body-image">
    <video src="attention-apple-pulled-side-by-side.mp4"></video>
    <div class="image-text">On the left "apple" is pulled by "banana" and on the right it is pulled by "phone".</div>
</div>

What about the other words in the phrase? How do we know that "banana" is the word that should pull "apple" and not any of the other words? Let's plot the embeddings of the other words. We can see that they are not very close to "apple" because they are not very similar to "apple". The words that are most similar to "apple" pull it the most. So, all words exert some amount of pulling force, but the effect is dominated by the most similar words. I like to compare this to gravity (where the objects have the same mass). Objects that are closer exert more gravitational force on each other than objects that are farther away. 

<div class="body-image">
    <video src="attention-all-embeddings.mp4"></video>
    <div class="image-text">The other words are not very similar to "apple", so they don't exert as much pulling force.</div>
</div>

Let's now think about how to determine where exactly to move "apple" — that is how much each word pulls "apple". We start by computing the similarity between "apple" and every word. We will use the dot product as our measure of similarity. Two vectors have a very high dot product if they point in similar directions and have similar lengths, and a very low dot product if they point in opposite directions.

<div class="body-image">
    <video src="attention-all-dot-product.mp4"></video>
    <div class="image-text">We compute the dot product between "apple" and every word as our measure of similarity.</div>
</div>

As we would expect, other than "apple" and "apple", "apple" and "banana" have the highest dot product, so they are most similar. 

We want to use these dot products to determine how much we should nudge "apple" in the direction of each word. At an extreme, where we want "apple" to move completely to "banana", we would simply set 100% of the new "apple" vector to the coordinates of the "banana" vector. We can write this as the following linear combination: 

```math
\vec{x}_{\text{🍎}}' = 0 \vec{x}_{\text{I}} + 0 \vec{x}_{\text{ate}} + 0 \vec{x}_{\text{a}} + 1 \vec{x}_{\text{🍌}} + 0 \vec{x}_{\text{and}} + 0 \vec{x}_{\text{an}} + 0 \vec{x}_{\text{🍎}}
```

What series of dot products would suggest this linear combination? One dot product should be incredibly large (the one between "apple" and "banana") and the rest should be incredibly small. 

If we instead want "banana" to pull "apple" halfway between it and the original position for "apple", we would want this linear combination:

```math
\vec{x}_{\text{🍎}}' = 0 \vec{x}_{\text{I}} + 0 \vec{x}_{\text{ate}} + 0 \vec{x}_{\text{a}} + \frac{1}{2} \vec{x}_{\text{🍌}} + 0 \vec{x}_{\text{and}} + 0 \vec{x}_{\text{an}} + \frac{1}{2} \vec{x}_{\text{🍎}}
```

We want this if the dot products between "apple" and "apple", and "apple" and "banana" are large and pretty equal, and the rest are very small in comparison. If instead all the dot products are pretty similar, meaning that "apple" is equally similar to all words, we would want all words to pull "apple" equally. So we'd want a linear combination like this:

```math
\vec{x}_{\text{🍎}}' = \frac{1}{6} \vec{x}_{\text{I}} + \frac{1}{6} \vec{x}_{\text{ate}} + \frac{1}{6} \vec{x}_{\text{a}} + \frac{1}{6} \vec{x}_{\text{🍌}} + \frac{1}{6} \vec{x}_{\text{and}} + \frac{1}{6} \vec{x}_{\text{an}} + \frac{1}{6} \vec{x}_{\text{🍎}}
```

We see that we want all coefficients to be between 0 and 1, and for them to sum to 1. We also want to emphasize the larger dot products. Those are the most similar words, so we want them to pull more. A function that accomplishes this is the exponential function $f(x) = e^x$. So, we will exponentiate each dot product. In order for the coefficients to sum to 1, we divide each term by the sum of all the terms. This is called normalization. The function we have described is referred to as *softmax* and is usually written like this:

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

### Attention is a Weighted Average ✅

Let's return to our original goal: predicting the next word in a sequence. To do this, we feed the context vector for the last word into a multiclass classifier. The classifier uses a weight matrix with one row per word in the vocabulary. For the model to output the correct word, the row corresponding to that word must be as similar as possible to the context vector.

We realized that simply using the embedding of the last word as the context vector was not ideal. It would incorrectly predict the same next word for both "once upon a" and "the sun is a" — because it's only looking at the word "a" to make the prediction.

Next, we considered defining the context vector of the last word to be the average of the embeddings of it and the words before it. This was an improvement — it solved the "the sun is a time" problem. But it still had a weakness: sequences that differ by just one or two words, like "the capital of Spain is" and "the capital of France is", would end up with very similar context vectors and, therefore, the same prediction — even when the correct next words are very different.

The takeaway was clear: not all words should be weighed equally. Some are far more relevant than others when predicting the next word. The question we didn't know how to answer was how to determine how much to weigh each word. That's exactly what attention gives us: a way to compute a weighted average of the embeddings. The idea of words "pulling" other words is realized mathematically by computing the dot product between embeddings, applying softmax, and using the resulting scores as weights. This is the core mechanism of attention.

The result of attention, or of multiple iterations of attention, is an updated embedding vector that has soaked in the context that the word appears in. We use it as the context vector that we feed into the classifier. 

And that's the basic mechanism behind large language models like ChatGPT. If you've followed along this far, you now understand the core idea at the heart of today's most powerful AI systems.

But to turn this into an "intelligent" system — one that can complete sequences with nuance and coherence — we'll need to refine the mechanism further. Let's build those improvements together.

### The Whole Phrase ✅

So far, we've only looked at how the word "apple" is pulled. That is, we've only applied attention to update the vector for "apple" based on the other words. But in practice, we want to apply attention to all words in the phrase. We want each word to be pulled to a better place for it, given the surrounding words. Why? There are two main reasons:

1. As we've alluded to, we often apply multiple iterations of attention to refine the vector for a word. Consider the phrase "I ate an orange and an apple". Here, we want "orange" to give context to "apple", but we also want "apple" to give context to "orange". We want "apple" to help "orange" understand that it’s being used as a fruit, not a color. This will ultimately benefit the context vector for "apple". When it is pulled by all the words in the phrase in the next iteration of attention, it will be pulled by the updated vector for "orange" that has more fruit characteristics than the original vector.
1. During training, we predict the next word at every position, not just the last one. So, given the phrase "I ate a banana and an apple", we ask it to predict every next word in the sequence. For example: given "I", predict "ate"; given "I ate", predict "an"; and so on. As we're making predictions at every word, we need the vector for every word to be as informative as possible.

We can visualize what we have done so far in computing attention scores for "apple" by creating a column for every word in the phrase and creating a row for "apple". We fill in the row by computing the dot product between "apple" and the word in each column. We can extend this to more words. We will add a row for each other word and repeat the same computation steps.

<div class="body-image">
    <video src="attention-table-dot-products.mp4"></video>
    <div class="image-text">For each row, we compute the the dot product with the word in each column.</div>
</div>

We now have a table of dot products which tell us how similar each word is to every other word. Using linear algebra notation, we can write this table of dot products in a compact way. If we take all embedding vectors of the words and stack them as rows in a matrix, which we will call $X$, we can compute the matrix of dot products by doing matrix multiplication of $X$ and a transposed version of $X$. That is $XX^T$.

Just as before, the next step is to apply softmax. Previously, we only did so to the "apple" row, but we now do it to every row. We often write $\text{softmax}(XX^T)$ to mean that we apply softmax to each row.

<div class="body-image">
    <video src="attention-table-softmax.mp4"></video>
    <div class="image-text">We apply softmax to each row.</div>
</div>

This gives us a matrix of attention scores. Finally, just as before, we use each row of attention scores to compute a weighted average of all embedding vectors — one for each word.

<div class="body-image">
    <video src="attention-table-weighted-sum.mp4"></video>
    <div class="image-text">We compute the weighted average along each row.</div>
</div>

This can be written as $\text{softmax}(XX^T)X$. The rows of this final matrix contain the updated vectors for each word.

As a quick aside, it may not be obvious why this matrix multiplication gives us a row-wise weighted average. Let's work through a small example to see why it works. Let $A = \text{softmax}(XX^T)$ for brevity. We will denote the entry in the $i^\text{th}$ row and the $j^\text{th}$ column in $A$ as $a_{ij}$ and in $X$ as $x_{ij}$. So, we have the two matrices:

```math
A = 
\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
\quad
X =
\begin{bmatrix}
x_{11} & x_{12} \\
x_{21} & x_{22}
\end{bmatrix}
```

Let's first multiply $A$ and $X$:

```math
\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
\begin{bmatrix}
x_{11} & x_{12} \\
x_{21} & x_{22}
\end{bmatrix}
=
\begin{bmatrix}
a_{11} x_{11} + a_{12} x_{21} & a_{11} x_{12} + a_{12} x_{22} \\
a_{21} x_{11} + a_{22} x_{21} & a_{21} x_{12} + a_{22} x_{22}
\end{bmatrix}
```

Next, let's rewrite this as the addition of two matrices:

```math
=
\begin{bmatrix}
a_{11} x_{11} & a_{11} x_{12} \\
a_{21} x_{11} & a_{21} x_{12}
\end{bmatrix}
+
\begin{bmatrix}
a_{12} x_{21} & a_{12} x_{22} \\
a_{22} x_{21} & a_{22} x_{22}
\end{bmatrix}
```

Now, we factor out the coefficient from each row:

```math
=
\begin{bmatrix}
a_{11} [ x_{11} \;\; x_{12} ] \\
a_{21} [ x_{11} \;\; x_{12} ]
\end{bmatrix}
+
\begin{bmatrix}
a_{12} [ x_{21} \;\; x_{22} ] \\
a_{22} [ x_{21} \;\; x_{22} ]
\end{bmatrix}
```

Finally, let's add the two matrices back together:

```math
=
\begin{bmatrix}
a_{11} [ x_{11} \;\; x_{12} ] + a_{12} [ x_{21} \;\; x_{22} ] \\
a_{21} [ x_{11} \;\; x_{12} ] + a_{22} [ x_{21} \;\; x_{22} ]
\end{bmatrix}
```

The vector $[ x_{11} \;\; x_{12} ]$ is the the first row in $X$ and thus the first embedding vector $\vec{x_1}$ and $[ x_{21} \;\; x_{22} ]$ is the second embedding vector $\vec{x_2}$. We can now see that this indeed produces a row-wise weighted average.

```math
=
\begin{bmatrix}
a_{11} \vec{x_1} + a_{12} \vec{x_2} \\
a_{21} \vec{x_1} + a_{22} \vec{x_2}
\end{bmatrix}
```

### Transforming the Embeddings ✅

Let’s revisit the embedding space we used when introducing the idea of words pulling words. We had one cluster of fruits and another cluster of technology devices, and we used attention to move the embedding of "apple".

<div class="body-image">
    <img src="attention-generic-apple-embedding.png" alt='Generic embedding of "apple"'>
    <div class="image-text">Our original embedding space</div>
</div>

Were those the best embeddings for this task? The embeddings are made to be great general-purpose embeddings, but they may not be the best we can do for this very specific goal of separating the two meanings of "apple". Soon, we'll explore what a more useful embedding space might look like for this task.

But first, let's discuss how we can obtain new embeddings from our original embeddings. What we need is a function that, given a vector, outputs a different vector. Linear transformations provide a simple and powerful way to do this — they multiply a vector by a matrix to produce a new vector.

```math
T(\vec{x}) = M \vec{x}
```

In our case with two-dimensional embedding vectors, any $2\!\times\!2$ matrix $M$ will transform the embedding vector $\vec{x}$ into a new two-dimensional vector.

<div class="body-image">
    <video src="attention-apply-transformation.mp4"></video>
    <div class="image-text">Applying a linear transformation to each embedding vector.</div>
</div>

When we apply a linear transformation to the entire space — that is to every vector — we also transform the coordinate system itself. What we mean by that is that we transform the vectors $[0, 1]$ and $[1, 0]$, which are known as the unit basis vectors and define the coordinate system. This makes it easy to visualize a linear transformation and to plot the transformed vectors. For example, to plot the transformed version of the vector $[1, 2]$, we place it at the point $(1, 2)$ relative to the new (transformed) axes.

<div class="body-image">
    <video src="attention-transform-axes.mp4"></video>
    <div class="image-text">We transform the axes as well.</div>
</div>

### A Better Space for Pulling Words

Now that we have an understanding of how we can use linear transformations to obtain new embedding spaces, let's think about why this would be useful. Let's look at three spaces: our original space and two transformed spaces. 

<div class="body-image">
    <video src="attention-three-transformed-spaces.mp4"></video>
    <div class="image-text">Our original space and two transformed spaces.</div>
</div>

Is one space better than the others for pulling the word "apple"? Remember, our goal is to separate the two meanings of "apple". In space B, the attention step barely distinguishes the two meanings of "apple" whereas in space C the two updated vectors for "apple" are far apart. So here, space C is better. 

We will now use the transformed vectors to move the vector for "apple". That is, we will transform the vectors before we use them in the linear combination that defines the new "apple" vector. The transformed version of these vectors are referred to as *values*, denoted $v$, and the matrix used to compute them is referred to as $W_V$.

<div class="body-image">
    <video src="attention-values-lin-comb.mp4"></video>
    <div class="image-text">We use transformed versions of the vectors, called <em>values</em>, in the linear combination.</div>
</div>

What about computing the coefficients — that is how much each word should pull "apple"? Do we use the same transformed vectors for computing those? We certainly could and that would likely be better than using the untransformed vectors. But let's hold that thought for now.

### Asymmetric Pull 

As we've discussed, it is not only "apple" that gets pulled. Each word in the phrase pulls each other word. So, just as "banana" pulls "apple", "apple" also pulls "banana".

The pulling force that one word exerts on the other is completely determined by the similarity of the words. This means that it is always the case that "banana" pulls "apple" just as much "apple" pulls "banana". This may not always be desirable. We can find examples where we'd want asymmetric pull. 

Take the words "bride" and "ring". If a phrase contains the word "bride", it is quite likely that the word "ring" will appear. So, we want "bride" to exert a strong pulling force on "ring". On the other hand, if a phrase contains the word "ring", it is not as likely that the word "bride" will appear. It could be referring to a piece of jewelry, a boxing ring, or perhaps a phone call. So, we want "ring" to exert a less strong pulling force on "bride".

Let's introduce some vocabulary to describe this. We will call the word that is pulled the *query* and the word that pulls the *key*. In our "bride" and "ring" example we want this:

- When "bride" is the key and "ring" is the query — that is when "bride" pulls "ring" — we want a strong pulling force.
- When "ring" is the key and "bride" is the query — that is when "ring" pulls "bride" — we want a weak pulling force.

<div class="body-image">
    <img src="attention-asymmetric-forces.png" alt="Asymmetric pulling forces">
    <div class="image-text">Our desired asymmetric pulling forces.</div>
</div>

How do we create these asymmetric forces? We know that the only thing that determines the pulling force is the similarity between the embedding vectors. So, we have to make the similarity different depending on which vector is acting as the query and which is acting as the key. What if we applied one transformation to the queries and another one to the keys? Let's have a look.

We will start by placing "bride" and "ring" in a two-dimensional embedding space. Then, we make a copy of this space. We will let the left space be the keys and right space be the queries. When we calculate the force that "bride" pulls "ring", we will use the "bride" vector from key space (remember keys pull) and the "ring" vector from the query space (queries are pulled). And when we compute the force that "ring" pulls "bride", we use the "ring" vector from key space and the "bride" vector from the query space. Since these spaces are currently identical, the two pairs of vectors are equally similar.

<div class="body-image">
    <video src="attention-key-query-transformation-part-one.mp4"></video>
    <div class="image-text">When we compute the pulling force — that is the similarity (dot product) — one vector comes from the key space and the other from the query space.</div>
</div>

This gets interesting when we apply different transformations to the key and query spaces. Let's apply a transformation that shrinks the x-axis to the key space and one that shrinks the y-axis to the query space. Now, when we take the "bride" vector from the key space and the "ring" vector from the query space, we see that they are very similar. So, they have a high dot product. This means that "bride" will exert a strong pulling force on "ring". But when we take the "ring" vector from the key space and the "bride" vector from the query space we get two vectors that are not as similar. They have a lower dot product. So, the pulling force that "ring" exerts on "bride" is much weaker.

<div class="body-image">
    <video src="attention-key-query-transformation-part-two.mp4"></video>
    <div class="image-text">Applying different transformations to the key and query spaces gives us asymmetric pulling forces.</div>
</div>

Let's now apply this to our running example of how "apple" gets pulled in the phrase "I ate a banana and an apple". We want to compute the dot product between the query version of "apple" (it is pulled) and the key versions of all vectors (they pull). We will denote queries by $q$ and keys by $k$ and the matrices used to compute them as $W_Q$ and $W_K$ respectively.

<div class="body-image">
    <video src="attention-key-query-dp.mp4"></video>
    <div class="image-text">We compute the dot product between the query and the keys.</div>
</div>

These are the dot products to which we apply softmax to generate the attentions scores. That is the coefficients in the linear combination that is used to calculate the updated vector for "apple".

### Keys, Queries, and Values

We have now developed three different transformations that we apply to the embedding vectors: the transformations that produce the keys, queries, and values: 

- $\vec{k} = W_K \vec{x}$
- $\vec{q} = W_Q \vec{x}$
- $\vec{v} = W_V \vec{x}$

Let's recap the purpose of each before we look at how this affects our application of attention to the whole phrase.

The keys and queries work together to create the optimal spaces for computing the similarity between vectors. They can emphasize features that are important for measuring similarity and deemphasize those that are not. They can also combine features. All in a way to create the most optimal space to compute how strongly each word should pull each other word. Importantly, having two separate transformations allows for asymmetric pull. In our linear combination that computes the updated vector, the keys and queries produce the coefficients. 

The values create the most optimal space for actually moving the embedding of a word. They emphasize features that are important for distinguishing the different meanings of a word. Given the weights computed by the keys and queries, we combine value vectors to compute the updated vector for a word.

### The Whole Phrase — with Keys, Queries, and Values

Recall how we packaged all embedding vectors of the phrase as rows in a matrix we called $X$. We can multiply $X$ by $W_K$, $W_Q$, and $W_V$ to turn the rows into keys, queries, and values, respectively. We will call these matrices $K$, $Q$, and $V$.

- $K = X W_K$
- $Q = X W_Q$
- $V = X W_V$

Now, we take the dot product of each query vector with each key vector. We can write this as $QK^T$. Just as before, the next step is to apply softmax to each row: $\text{softmax}(QK^T)$. Finally, we use these attention scores to compute the linear combination along each row using the values. This can be written as $\text{softmax}(QK^T)V$.

Let's see this in action. We will use the same table structure as before. First, we transform the first row into keys and the first column into queries. Next, we take the dot product between each pair of keys and queries and apply softmax to each row. We now have the coefficients for the linear combinations that compute the updated vectors. To get the vectors for these linear combinations, we take a copy of our original vectors and transform them into values.

<div class="body-image">
    <video src="attention-table-kqv.mp4"></video>
    <div class="image-text">Attention using keys, queries, and values applied to the whole phrase.</div>
</div>

### Multiple Key, Query, and Value Spaces

So far, we've seen one set of transformed spaces: one for keys, one for queries, and one for values. Take the value space for example. It was made to be great at separating different meanings of words, for example the two meanings of "apple". That is, it's good at determining the semantics of a word. However, this is not the only way words influence each other, and thus not the only thing we should take into account when updating the embeddings of the words.

We would like to be able to simultaneously consider many different linguistic features. In addition to the semantics, we also want to consider something like grammatical relations. For example, how adjectives modify nouns. We want to be able to distinguish a red apple from a green apple.

How can we consider multiple linguistic features at once? Instead of using just one set of transformed spaces, we will use multiple. Each will update the embeddings in a unique way.

Let's call the value transformation that we developed above the semantic space. It is really good at updating the embeddings according to how a word is used in a sentence. Take the phrase "I ate a banana and a red apple". The semantic space works just as before: it gives the most effect of pulling "apple" towards "banana", separating it from the technology brand.

<div class="body-image">
    <video src="attention-semantic-transformation.mp4"></video>
    <div class="image-text">The semantic space gives the most effect of pulling "apple" towards "banana".</div>
</div>

Next, let's develop a grammatical relations space. In this space, we want "apple" to be shifted in a way such that it embodies a red apple more than any other color of apple.

<div class="body-image">
    <video src="attention-grammatical-transformation.mp4"></video>
    <div class="image-text">The grammatical relations space separates a red apple from a green apple, for example.</div>
</div>

We now have two different value transformations. Let's call the matrices for these $W_V^{(0)}$ and $W_V^{(1)}$. Similarly to how we developed these, we may find it useful to have two sets of key and query transformations as well: $W_K^{(0)}$ and $W_K^{(1)}$ as well as $W_Q^{(0)}$ and $W_Q^{(1)}$.

We will use the same index notation for the two sets of key, query, and value matrices:

- $K^{(i)} = X W_K^{(i)}$
- $Q^{(i)} = X W_Q^{(i)}$
- $V^{(i)} = X W_V^{(i)}$

This gives us two formulas for attention — that is for computing the updated vectors: 

- $\text{softmax}(Q^{(0)}(K^{(0)})^T)V^{(0)}$
- $\text{softmax}(Q^{(1)}(K^{(1)})^T)V^{(1)}$

This is called two *heads* of attention.

But we know have two sets of updated embedding vectors: one from each head. We still want only one set of embedding vectors. How do we combine them into one? 

Of course, we could average the two. But by now we may recognize that we can get better and more meaningful results if we let the model learn how to combine the two sets of vectors. In some cases we may want the semantic space to have more influence and vice-versa.

Let's call the two matrices of updated row vectors $\text{head}^{(0)}$ and $\text{head}^{(1)}$. If we concatenate them into one big matrix $O$, we can then multiply this larger matrix with a matrix of learnable weights that transforms it back down into a matrix of the correct shape. This way, the model can not only learn to emphasize and deemphasize the two spaces but it can also combine and reorient them as it sees fit.

-> Starts with with the final frame of attention-table-kqv (but with superscripts of (0)). Each v_i expands to a row vector with actual numbers in it. The row vectors simultaneously turn into the final, updated row vector. This matrix shrinks and is labeled head_0. A copy with different numbers appears next to it labeled head_1. They get concatenated into one big matrix O. A weight matrix appears and O and W_O are multiplied to produce a matrix with the size of X. The rows are highlighted or otherwise shown to be row vectors corresponding to the updated embedding vectors.

<div class="body-image">
    <video src=""></video>
    <div class="image-text">To combine the outputs of the two heads we concatenate them into one big matrix and use a matrix with learned weights to transform it down into a matrix of the correct shape.</div>
</div>

We can extend this beyond two heads. DeepSeek-V3, one of the best models that also happens to be open source, has 128 attention heads according to the [technical report](https://arxiv.org/pdf/2412.19437#:~:text=dimension%20to%207168,head%20dimension). (Although it has a very clever optimization that essentially gives the effect of 128 heads while using less memory and compute. [This](https://www.youtube.com/watch?v=0VLAoVGf_74&t=709s) Welch Labs video provides an excellent explanation.) 

### Increasing the Dimensionality  

Let's make one last generalization before we are done developing attention. To motivate the example above, we added colors to our embedding space. This doesn't make a whole lot of sense. We previously established that the axes may correspond to the ideas of fruitiness and techiness. How does the idea of color fit into this? It doesn't. What we really want is a third dimension for the idea of color. We can extend this further. We want each idea that we want to capture to have it's own direction is space. 

[DeepSeek-V3](https://arxiv.org/pdf/2412.19437#:~:text=dimension%20to%207168,head%20dimension) has an embedding dimension of 7168 (!). At this point, you may start to see how the attention mechanism can be so powerful. Imagine the number of ideas a model can consider with that many directions to its disposal.

But it gets even better. The number of mutually independent directions in an $N$-dimensional is $N$ — that is if we require each pair of vectors to be exactly $90^{\circ}$ apart, the maximum number of vectors we can fit in an $N$-dimensional space is $N$. But it turns out that if we relax this requirement a little bit and let the vectors be between $89^{\circ}$ and $91^{\circ}$ apart, we can fit way more vectors. It follows from a mathematical lemma, called the [Johnson–Lindenstrauss lemma](https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma), that the maximum number of vectors is then about $e^{\epsilon \cdot N}$. So, it is not 7168 ideas but upwards of $e^{7168}$ ideas, which is a number with more than 3000 zeros (!!).

Finally, let's revisit our formula for attention: 

```math
\text{softmax}(QK^T)V
```

As we increase the dimension of the keys and queries, the number of terms in the dot product increases. This leads to larger magnitudes going into the softmax function which makes the output very peaky — that is close to one value being 1 and the rest 0. This makes the model harder to train.

To mitigate this, it is common to divide the dot products by the square root of the dimension of the keys and queries, $d_k$. This gives us the final formula for attention:

```math
\text{softmax} \left( \frac{QK^T}{\sqrt{d_k}} \right) V
```

Because of the scaling factor $\frac{1}{\sqrt{d_k}}$, this is commonly referred to as scaled dot product attention. 

There we have it. We have now developed the exact formula introduced by the famous 2017 paper [Attention Is All You Need](https://arxiv.org/pdf/1706.03762).


### Some Things We Didn't Cover

While we certainly have covered a lot, there are plenty of things we have skipped over. This includes:

- __Tokenization__:
- __How embeddings are learned__: The way we described embeddings, it seems like they are manually crafted. In reality they are learned. How they are learned and the properties of the resulting embeddings are fascinating.
- __Positional encodings__: The attention mechanism is by default permutation invariant. This means that the order of the words in a sequence doesn't matter — the attention mechanism will produce the same results regardless. For example, the model will not be able to distinguish "the dog chased the cat" and "the cat chased the dog". To fix this, a positional encoding is added to the embeddings. 
- __Masking__: Especially when training the model, we do not want later words to influence earlier words. That is, when we train the model on predicting the next word, we do not want it to be able to cheat and simply look at what the next word is. To combat this, we mask out words that appear later than the word we are currently considering. We do so by making the attention scores associated with those words 0.
- __Anything about how a model using attention is trained__: We kept referring to weights as being "learned" but we did not cover how this actually happens. Just like with most modern machine learning modes, a model using attention is trained with gradient descent and backpropagation. The good news is that if you gain understanding of gradient descent and backpropagation for simpler model architecture, you can apply those same concepts here.
- __The feedforward layer in transformers__: Attention is commonly used in a model architecture called Transformers. Transformers interleave attention layers with so called feedforward layers. The feedforward layer is a standard neural network. We have not talked about how feedforward layers help improve a model's ability to generate text.
- __Optimizations to attention__: Attention is very computationally expensive. It scales quadratically with the length of the input. To make it faster and more memory efficient, several optimizations and tweaks have been developed. These include: multi-query attention (MQA), grouped-query attention (GQA), and multi-head latent attention (MLA).

### Acknowledgments  

I first saw the idea of seeing viewing attention as words pulling words in a [video](https://www.youtube.com/watch?v=RFdb2rKAqFw) by [Serrano Academy](https://www.youtube.com/@SerranoAcademy). Some of the examples I used are taken from Serrano Academy's videos on the topic.



### Appendix: All Formulas and Shapes

It may be helpful to collect the formulas and the shapes of the matrices in one place. We will do so here.

<div class="tight-list">

First, for a __single head__:

We will use the following notation: 

- $T$: The number of embedding vectors
- $d_{\text{model}}$: The dimension (length) of the embedding vectors
- $d_k$: The dimension of the keys and queries
    - Above, the keys and queries had the same dimension as the embedding vectors. In practice, the keys and queries are often projected down to a smaller dimension.

Now, let's walk through the formulas and shapes in each step.

__Step 1__: Computing keys, queries, and values.
- Inputs: 
    - $X$: $T \times d_{\text{model}}$
        - The input matrix $X$ contains $T$ embedding vectors of length $d_{\text{model}}$ stacked as the rows of the matrix.
    - $W_K$, $W_Q$: $d_{\text{model}} \times d_k$
        - The key and query transformation matrices have $d_{\text{model}}$ rows and $d_k$ columns.
    - $W_V$: $d_{\text{model}} \times d_{\text{model}}$
        - The value transformation matrix has $d_{\text{model}}$ rows and $d_{\text{model}}$ columns.
- Outputs: 
    - $K = X W_K$, $Q = X W_Q$: $T \times d_k$
        - We multiply a $T \times d_{\text{model}}$ matrix with a $d_{\text{model}} \times d_k$ matrix which produces a $T \times d_k$ matrix.
    - $V = X W_V$: $T \times d_{\text{model}}$
        - We multiply a $T \times d_{\text{model}}$ matrix with a $d_{\text{model}} \times d_{\text{model}}$ matrix which produces a $T \times d_{\text{model}}$ matrix.
        
__Step 2__: Computing attention scores.
- Inputs: 
    - $Q$: $T \times d_k$
    - $K^T$: $d_k \times T$
- Intermediate results:
    - $QK^T$: $T \times T$
        - We multiply a $T \times d_k$ matrix with a $d_k \times T$ matrix which produces a $T \times T$ matrix.
    - $\frac{QK^T}{\sqrt{d_k}}$: $T \times T$
        - Element-wise division preserves the shape.
- Output:
    - $A = \text{softmax} \left( \frac{QK^T}{\sqrt{d_k}} \right)$: $T \times T$
        - Row-wise softmax preserves the shape.

__Step 3__: Computing the weighted averages.
- Inputs: 
    - $A$ : $T \times T$
    - $V$ : $T \times d_{\text{model}}$
- Output: 
    - $AV$: $T \times d_{\text{model}}$
        - We multiply a $T \times T$ matrix with a $T \times d_{\text{model}}$ matrix which produces a $T \times d_{\text{model}}$ matrix. This is the result of one step of attention and it has the same shape as $X$.

Next, let's look at __multiple heads__:

We now have: 

- $T$: The number of embedding vectors
- $h$: The number of attention heads
- $d_k$: The dimension of the keys and queries per head
- $d_v$: The dimension of the values per head
- $d_{\text{model}} = hd_v$ (usually, also $= hd_k$ in many implementations, though $d_v$ and $d_k$ can differ).

Now, the steps look like this:

__Step 1__: Computing per-head keys, queries, and values.

- Inputs:
    - $X$: $T \times d_{\text{model}}$
    - For head $i$:
        - $W^{(i)}_Q$, $W^{(i)}_K$: $d_{\text{model}} \times d_k$
        - $W^{(i)}_V$: $d_{\text{model}} \times d_v$
- Outputs (per head): 
    - $K^{(i)} = X W_K^{(i)}$, $Q^{(i)} = X W_Q^{(i)}$: $T \times d_k$
	- $V^{(i)} = X W_V^{(i)}$: $T \times d_v$

__Step 2__: Computing attention scores for each head.

- For head $i$:
    - Inputs: 
        - $Q^{(i)}$: $T \times d_k$
        - $(K^{(i)})^T$: $d_k \times T$
    - Intermediate results:
        - $Q^{(i)} (K^{(i)})^T$: $T \times T$
        - $\frac{Q^{(i)} (K^{(i)})^T}{\sqrt{d_k}}$: $T \times T$
    - Output: 
        - $A^{(i)} = \text{softmax} \left( \frac{Q^{(i)} (K^{(i)})^T}{\sqrt{d_k}} \right)$: $T \times T$

__Step 3__: Computing the weighted averages per head.
- For head $i$:
    - Inputs: 
        - $A^{(i)}$ : $T \times T$
        - $V^{(i)}$ : $T \times d_v$
    - Output: 
        - $\text{head}^{(i)} = A^{(i)} V^{(i)}$: $T \times d_v$.

__Step 4__: Concatenating and projecting the output back to the embedding dimension.
- Inputs: 
    - $W_O$: $h d_v \times d_\text{model}$
    - For head $i$:
        - $\text{head}^{(i)}$: $T \times d_v$
- Intermediate result:
    - $O = \text{Concat}(\text{head}^{(1)}, \dots, \text{head}^{(h)})$: $T \times h d_v$
- Output:
    - $OW_O$: $T \times d_{\text{model}}$
        - This is the result of one step of multi-head attention and it has the same shape as $X$.

</div>



