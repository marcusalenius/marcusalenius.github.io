### Motivation

This project is a collaboration between me and my friend Raymond Welgosh, a fellow CMU student. We had an idea of how we could improve the experience of watching movies and TV shows and decided to give our best shot at making our vision a reality.

How many times have you watched a movie or TV show and wondered who’s playing a character? You look up the movie or the show and scroll through all the actors that come up trying to find the one that looks like the person you saw on screen. If it’s a minor role, or worse yet, a guest appearance on a TV show, you might not find the actor at all.

We thought this experience could be made a whole lot better. What if it would just tell you who the actor is without you ever having to leave the movie or the TV show? What if you could overlay an actor’s name and other useful information right on top of the content? This would be so much less obtrusive and disorienting.

How could we bring this experience to your favorite movies and TV shows? We needed something that can work with existing streaming services — that can extend the way they present content. A Chrome extension seemed like the best bet. We chose to focus our efforts on creating an extension optimized for Netflix.

### Identifying Actors and Getting Details

The first step in enabling our envisioned experience is to figure out what actors are currently on screen. Amazon provides an [API](https://docs.aws.amazon.com/rekognition/latest/dg/celebrities-procedure-image.html) that recognizes celebrity faces, which, of course, includes actors. So, when the user presses the button to identify actors, we capture the content of the Netflix video player and run the Amazon celebrity recognition on this image. The call returns the names of the celebrities in the image.

Once we know what actors are on the user’s screen, we can gather information about them. For this, we use [The Movie Database](https://www.themoviedb.org/?language=en-US) (TMDB), which is a community-built movie and TV database, similar to IMDB. We make calls to the [TMDB API](https://developer.themoviedb.org/docs) to get information like who the actor is playing in this particular movie or TV show, the actor’s biography, and an image of the actor. We also query other movies and TV shows the actor has starred in. We try to be smart about how we display these. The top four productions are displayed according to TMDB’s [popularity score](https://developer.themoviedb.org/docs/popularity-and-trending), which is continuously updated to reflect what’s currently trending. We also discard any sequels, so that the user gets to see a wider range of movies the actor has appeared in.

### Presenting the Information

Through calls to the Amazon Rekognition API and the TMDB API, we have all the information we need to provide details about the actors on screen. Now, we just shove this into the extension popup, right? While this would certainly be an improvement over having to go to a search engine to compile this information yourself, we thought we could do better.

The most seamless experience would be if the name of the actor appeared right next to their face. That way there is no hunting down the character in a list tucked away by the toolbar — just look at their face, and the name of the actor will be right there.

Fortunately, the Amazon Rekognition API provides the location of the face on the given source image. Still, there was a big technical challenge. There might be one face, or there may be many faces. The faces can be of any size and anywhere on the screen. Where should we place the cards containing the actor information so that it doesn’t cover any faces or other cards? There are way too many possibilities to consider. We needed to come up with an algorithm that could find the best placements of the cards. 

<div class="body-image">
    <video src="actordentify-slideshow.mp4"></video>
    <div class="image-text">We wanted to place the actor's name by their face</div>
</div>

It turns out that finding the best card placements is very similar to solving a puzzle, where the solution is placing the cards such that they don’t overlap with any faces, other cards, or go off the screen. What algorithm is great for solving puzzles? [Backtracking](https://en.wikipedia.org/wiki/Backtracking).

### Design

Placing the actor information on top of the content did not only present a technical challenge but also a design challenge. How do we present the information in the cards so that it doesn’t cover up too much of the content?

We were inspired by the design of [windows in visionOS](https://developer.apple.com/videos/play/wwdc2023/10076), which were designed in response to a similar question: how should windows placed in your physical space appear so that they don’t obstruct what’s around you? Like a windows in visionOS, we gave the cards a translucent, glassy material that lets the background come through. It works great with dark backgrounds, as well as with light backgrounds, allowing consistency and familiarity in their appearance.

<div class="body-image">
    <img src="actordentify-card-background.jpg" alt="Card background letting the background come through">
    <div class="image-text">Cards allow the background to come through</div>
</div>


Another key to not obstructing the content was to present a condensed version of the card that can be expanded to show details. Initially, only the name of the actor and their character are displayed. This may be all the information the user wanted — maybe they just couldn’t remember the name of an actor. If more information is desired, the card can be expanded to reveal a short biography and other movies and TV shows the actor has appeared in. If the user wants to learn even more, the card links to the actor’s full biography.

<div class="body-image">
    <video src="actordentify-expand.mp4"></video>
    <div class="image-text">Cards expand to reveal more information
</div>
</div>
