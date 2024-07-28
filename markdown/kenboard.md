### Full Circle

Long before coming to Carnegie Mellon, I watched the video of Steve Jobs introducing the original iPhone. I was fascinated by the applause he received when simply [scrolling through a list of artists](https://youtu.be/VQKMoT-6XSg?t=971) or pinching to zoom on a photo, something that was so natural to me. I understood that this was completely different from anything that existed before, yet so natural and intuitive.

It sparked my interest in software development and made me want to go learn from the best people in the field. I decided to leave Sweden and go to college at CMU. I wrote about the inspiration in my CMU application essay:

> I began reading everything I could find about the process of building the first iPhone. I watched interviews with the UI wizard Bas Ording and preordered the book written by the keyboard engineer Ken Kocienda. I learned about the invention of inertial scrolling and rubber banding and the AI that was required to build a reliable touch keyboard. It was fascinating.

Reading Ken Kocienda's book Creative Selection made me realize that this was a field I wanted to dedicate my career to. A project like the iPhone keyboard has a blend of creativity and deep technical problem-solving that really appeals to me.

When it was time to decide what to do for my term project in CMU's CS course 15-112, I thought: Wouldn't it be cool to end my first year at CMU by recreating the technology that made me want to come here in the first place?

### Creative Selection

In 2018 Ken Kocienda, the engineer behind the original iPhone's software keyboard, published a book about his time at Apple. Expecting a goldmine of fascinating stories, I ordered it as soon as it became available.

The most intriguing story was the now-famous keyboard derby. About a year before its announcement, Scott Forstall, the executive leading the small software team working on *Purple*, the code name for the secret phone project, paused development on all other *Purple* software and made everyone keyboard engineers. Two weeks later they all met to demo their solutions to the iPhone's most critical software challenge. Kocienda vividly describes this demo — how wonky some of the designs were, with complex gestures and key combinations, and how Forstall reacted to his normal-looking but error-free keyboard.

Kocienda's process of developing the keyboard is a centerpiece of the book. It's a great illustration of the iterative software development process — of creating prototypes and living on those prototypes, and ultimately letting the best idea, embodied by the most promising prototype, prevail — in a process he calls *creative selection*.

Beyond his work on *Purple*, Kocienda describes what it was like to demo for Steve Jobs and how a team of three engineers developed the original Safari web browser.

I can't do this book justice here — if you are interested in software engineering, product design, or just fascinating stories I highly recommend this book. The physical book contains incredible illustrations while the audiobook is read by Kocienda himself: [creativeselection.io](http://creativeselection.io/).

### My First Approach

At the core of this project is the autocorrection algorithm. My initial approach was based on my naive understanding of how the iPhone's autocorrection worked. I planned to dynamically adjust the hit region of each key based on how likely it was to be the next key the user would want to hit. That way you would have a greater chance of hitting the key you wanted to type.

<div class="body-image">
    <img src="kenboard-naive-approach.jpg" alt="Sketch of dynamic hit regions">
    <div class="image-text">Sketch of dynamic hit regions. For example, after typing ‘t’, it is likely that ‘h’ is the next letter since ‘the’ is a common word. Another ‘t’ is unlikely.</div>
</div>

To do this I planned to represent common English words in a [trie](https://en.wikipedia.org/wiki/Trie). That way, after a key is tapped, I can look at which next key has a subtree making up more common words and make that key’s touch target larger.

A big downside to this approach is that it requires the first key to be correct. This is not guaranteed since all keys' touch targets are the same size to start. If an unintended key is tapped, the algorithm will go down the wrong subtree in the trie and will never find the word the user is trying to type. It made this approach a non-starter.

### The Algorithm

I went back to Kocienda's book to read about what he had come up with. The autocorrection algorithm shipped on the first iPhone more or less worked like this:

1. All keys are grouped with their neighboring keys.
2. When a word is typed, all letter combinations possible from the keys you hit, and their neighboring keys are generated.
3. The letter combinations that are not dictionary words are disregarded.
4. From these dictionary words, the word that is more common and closer to what the user typed is suggested.

This is the approach I used for my algorithm.

The algorithm is triggered when the user taps the space bar or a punctuation key. The last typed word is run through the autocorrection. For each tapped key, the algorithm grabs its neighboring keys on the keyboard. Then, it generates all possible letter combinations from these sets of keys (that is their Cartesian product). Next, these strings of letters are compared to a [dataset of English words](https://www.kaggle.com/datasets/rtatman/english-word-frequency?resource=download), and all non-dictionary words are removed. This leaves a set of, usually a couple of dozen, words that are all plausible. So how does the algorithm determine which word to suggest?

<div class="body-image">
    <img src="kenboard-letter-combinations.jpg" alt="Sketch of how the letter combinations are generated">
    <div class="image-text">Sketch of how the letter combinations are generated. For example, when trying to type 'the' but actually tapping the 'y', 'j', and 'r' keys, the letter combinations generated form their neighboring keys include 'the'.</div>
</div>

Two parameters are used to determine which word to suggest: pattern skew and usage frequency. Every time a key is pressed, the algorithm records the coordinates of the tap. This means that each typed word has a corresponding tapped pattern on the keyboard (what Kocienda calls constellations). Each dictionary word also has an ideal constellation, which represents a tap in the center of each key. The difference between the tapped constellation and the ideal constellation for a given word is what Kocienda calls pattern skew. A smaller pattern skew means that a word is a better match.

<div class="body-image">
    <img src="kenboard-pattern-skew.jpg" alt="Sketch of pattern skew">
    <div class="image-text">Sketch of pattern skew. Here, the tapped constellation (in blue) is closer to the ideal constellation for 'the' than the ideal constellation for 'hit'.</div>
</div>

Usage frequency represents how often a word is used in the English language. This data was included in the dataset I used. Here, a higher usage frequency makes a word more probable. 

Finally, when the algorithm has decided on the best word, the string of characters you typed is replaced with that word.

### Invisible Technology

The moment I had found the right balance between pattern skew and usage frequency, typing on the keyboard felt completely effortless. It felt like none of the technology I had spent the past week coding was there — the keyboard simply typed what I wanted it to type. The technology had melted away and become invisible to the user.

I realized why this project had captured my interest all those years ago — technology is never the end goal; the end goal is always the user. Technology should be an invisible tool that aids and empowers the user.

This project had a profound impact on me — it made me realize that my ultimate goal when creating technology is to make it less obtrusive, less cumbersome, to a point where it almost disappears.
