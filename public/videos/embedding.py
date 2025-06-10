import math
from manim import *

from utils import center_matrix_entries, str_entry, color_from_value

_DARKRED = ManimColor("#8A0000")

EMBEDDING_COORDS = {
    "banana": (0.22, 1.52),
    "pear": (0.37, 1.74),
    "phone": (1.56, 0.19),
    "laptop": (1.85, 0.37),
    "apple": (0.96, 1.0),
    "I": (0.15, -1.63),
    "ate": (-0.81, -0.81),
    "a": (-1.04, -1.78),
    "and": (-1.74, -1.19),
    "an": (-1.33, -1.67),
}

NEW_APPLE_COORDS = (0.57, 1.12)


class BaseEmbedding(Scene):
    def construct(self, 
                  x_range=(0, 2.3), y_range=(0, 2.3), 
                  x_length=6, y_length=6,
                  x_label=None, y_label=None,
                  font_size=36,
                  show_coordinates=True):
        self.camera.background_color = WHITE

        self.FONT_SIZE = font_size

        self.axes = Axes(
            x_range=[x_range[0], x_range[1], 1],  # start, end, step
            y_range=[y_range[0], y_range[1], 1],
            x_length=x_length,
            y_length=y_length,
            axis_config={
                "color": BLACK,
                "stroke_color": BLACK,
                "include_tip": True,
                "tip_shape": StealthTip,
                "tip_height": 0.3,
                "tip_width": 0.3,
            },
        )

        if x_label is not None: 
            self.m_x_label = self.axes.get_x_axis_label(
                label=Text(x_label, font_size=28),
            ).set_color(BLACK)
            self.add(self.m_x_label)
        if y_label is not None:
            self.m_y_label = self.axes.get_y_axis_label(
                label=Text(y_label, font_size=28),
            ).set_color(BLACK)
            self.add(self.m_y_label)
        
        if show_coordinates:
            self.axes.add_coordinates(color=BLACK)

            for number in self.axes.x_axis.numbers:
                number.set_color(BLACK)
                number.set_font_size(self.FONT_SIZE)
            for number in self.axes.y_axis.numbers:
                number.set_color(BLACK)
                number.set_font_size(self.FONT_SIZE)

        self.add(self.axes)

    def create_translucent_line(self, from_point, to_point, width, opacity):
        """Create a translucent line with specified width and opacity."""
        return Line(
            from_point, 
            to_point, 
            color=LIGHT_GRAY, 
            stroke_width=width
        ).set_stroke(opacity=opacity)
    
    def make_blur_lines(self, from_point, to_mobject, widths=None, 
                        opacity_start=0.1, opacity_step=0.1):
        """Create multiple translucent lines with decreasing opacity."""
        blur_lines = []
        if widths is None:
            widths = [20, 16, 12, 8]
        for i, width in enumerate(widths):
            blur_line = always_redraw(
                lambda w=width, o=opacity_start + i * opacity_step: 
                self.create_translucent_line(
                    from_point, to_mobject.get_center(), w, o
                )
            )
            blur_lines.append(blur_line)
        return blur_lines

class RandomEmbedding(BaseEmbedding):
    def construct(self):
        super().construct()

        words = ["banana", "pear", "phone"]
        coords = [(0.8, 0.5), (3.9, 2.6), (2.1, 4.2)]
        vectors = [
            [[num] for num in point] for point in coords
        ]
        vectors_centered = [
            center_matrix_entries(vector, font_size=self.FONT_SIZE) 
            for vector in vectors
        ]
        m_vectors = [
            MobjectMatrix(
                vector, 
                h_buff=0.3, 
                bracket_h_buff=SMALL_BUFF,
                bracket_config={"font_size": self.FONT_SIZE}
            ).set_color(BLACK)
            for vector in vectors_centered
        ]
        points = [self.axes.coords_to_point(x, y) for x, y in coords]

        image_mobjects = []
        for word, point in zip(words, points):
            image_path = f"assets/{word}.png"
            emoji_img = ImageMobject(image_path).scale(0.5).move_to(point)
            image_mobjects.append(emoji_img)
            self.add(emoji_img)

        for m_vector, image_mobject in zip(m_vectors, image_mobjects):
            m_vector.next_to(image_mobject, UP + RIGHT, buff=0.05)
            self.add(m_vector)

        # self.wait(2)

class MeaningfulEmbedding(BaseEmbedding):
    def construct(self):
        super().construct(x_label="techiness", y_label="fruitiness")

        words = ["banana", "pear", "phone", "laptop"]
        coords = [EMBEDDING_COORDS[word] for word in words]
        points = [self.axes.coords_to_point(x, y) for x, y in coords]

        image_mobjects = []
        for word, point in zip(words, points):
            image_path = f"assets/{word}.png"
            emoji_img = ImageMobject(image_path).scale(0.5).move_to(point)
            image_mobjects.append(emoji_img)
            self.add(emoji_img)

        # self.wait(2)

class GenericAppleEmbedding(BaseEmbedding):
    def construct(self):
        super().construct(x_label="techiness", y_label="fruitiness")

        words = ["banana", "pear", "phone", "laptop", "apple"]
        coords = [EMBEDDING_COORDS[word] for word in words]
        points = [self.axes.coords_to_point(x, y) for x, y in coords]

        image_mobjects = []
        for word, point in zip(words, points):
            image_path = f"assets/{word}.png"
            emoji_img = ImageMobject(image_path).scale(0.5).move_to(point)
            image_mobjects.append(emoji_img)
            self.add(emoji_img)

        # self.wait(2)

class ApplePulledSideBySide(BaseEmbedding):
    def construct(self):
        super().construct(x_label="techiness", y_label="fruitiness")

        # Construct the two coordinate systems

        # Remove existing labels if they exist
        if hasattr(self, "m_x_label") and self.m_x_label is not None:
            self.remove(self.m_x_label)
        if hasattr(self, "m_y_label") and self.m_y_label is not None:
            self.remove(self.m_y_label)

        self.remove(self.axes)
        self.left_axes = self.axes.copy().shift(LEFT * 3.3)
        self.right_axes = self.axes.copy().shift(RIGHT * 3.5)
        self.add(self.left_axes, self.right_axes)

        words = ["banana", "pear", "phone", "laptop", "apple"]
        coords = [EMBEDDING_COORDS[word] for word in words]
        left_points = [self.left_axes.coords_to_point(x, y) for x, y in coords]
        right_points = [self.right_axes.coords_to_point(x, y) for x, y in coords]

        left_image_mobjects = []
        right_image_mobjects = []
        for word, left_point, right_point in zip(words, left_points, right_points):
            image_path = f"assets/{word}.png"
            left_emoji_img = ImageMobject(image_path).scale(0.5).move_to(left_point)
            right_emoji_img = ImageMobject(image_path).scale(0.5).move_to(right_point)
            left_image_mobjects.append(left_emoji_img)
            right_image_mobjects.append(right_emoji_img)
            self.add(left_emoji_img, right_emoji_img)

        self.wait(1)

        # Animate pulling on the left and right sides

        banana_idx = words.index("banana")
        phone_idx = words.index("phone")
        apple_idx = words.index("apple")
        left_banana_point = left_points[banana_idx]
        right_phone_point = right_points[phone_idx]
        
        # Create multiple lines for blur effect that follow the apple
        left_blur_lines = self.make_blur_lines(
            from_point=left_banana_point,
            to_mobject=left_image_mobjects[apple_idx]
        )
        right_blur_lines = self.make_blur_lines(
            from_point=right_phone_point,
            to_mobject=right_image_mobjects[apple_idx]
        )
        all_lines = left_blur_lines + right_blur_lines
        
        for line in all_lines:
            self.add(line)
        
        self.bring_to_front(left_image_mobjects[banana_idx])
        self.bring_to_front(left_image_mobjects[apple_idx])
        self.bring_to_front(right_image_mobjects[phone_idx])
        self.bring_to_front(right_image_mobjects[apple_idx])
        
        self.play(
            *[Create(line) for line in all_lines],
            run_time=1.5
        )
        
        # Move apple - the lines will follow automatically
        self.play(
            left_image_mobjects[apple_idx].animate.move_to(
                left_banana_point + RIGHT * 0.7 + DOWN * 0.5),
            right_image_mobjects[apple_idx].animate.move_to(
                right_phone_point + LEFT * 0.6 + UP * 0.8),
            run_time=1.5
        )

        # Uncreate the lines
        self.play(*[Uncreate(line) for line in all_lines])

        self.wait(2)

class AllEmbeddings(BaseEmbedding):
    def construct_static(self):

        self.camera.background_color = WHITE

        self.FONT_SIZE = 36
        self.SCALE_FACTOR = 0.6

        self.axes = Axes(
            x_range=[-2.2, 2.3, 1],  # start, end, step
            y_range=[-2.2, 2.3, 1],
            x_length=12,
            y_length=12,
            axis_config={
                "color": BLACK,
                "stroke_color": BLACK,
                "include_tip": True,
                "tip_shape": StealthTip,
                "tip_height": 0.3,
                "tip_width": 0.3,
            }
        )

        self.add(self.axes)

        self.axes.scale(self.SCALE_FACTOR)

        self.words = ["banana", "pear", "phone", "laptop", "apple"]
        self.coords = [EMBEDDING_COORDS[word] for word in self.words]
        self.points = [self.axes.coords_to_point(x, y) for x, y in self.coords]

        self.image_mobjects = []
        for word, point in zip(self.words, self.points):
            image_path = f"assets/{word}.png"
            emoji_img = ImageMobject(image_path).scale(0.5).move_to(point)
            self.image_mobjects.append(emoji_img)
            self.add(emoji_img)

        self.other_words = ["I", "ate", "a", "and", "an"]
        self.other_coords = [EMBEDDING_COORDS[word] for word in self.other_words]
        self.other_points = [self.axes.coords_to_point(x, y) for x, y in self.other_coords]
        
        self.dot_mobjects = []
        self.label_mobjects = []
        for word, point in zip(self.other_words, self.other_points):
            dot_mob = Dot(point, color=BLACK, radius=0.1)
            self.dot_mobjects.append(dot_mob)
            self.add(dot_mob)

            label = Text(f'"{word}"', font_size=34, color=BLACK)
            label.next_to(dot_mob, UP, buff=0.1)
            self.label_mobjects.append(label)
            self.add(label)
        
        # Scale individual objects BEFORE creating always_redraw lines
        for image_mob in self.image_mobjects:
            image_mob.scale(self.SCALE_FACTOR)
        for dot_mob in self.dot_mobjects:
            dot_mob.scale(self.SCALE_FACTOR)
        for label_mob in self.label_mobjects:
            label_mob.scale(self.SCALE_FACTOR)

    def construct(self):
        self.construct_static()

        # Delay before starting
        self.wait(1)

        # Add blurred lines connecting each word to "apple"
        apple_index = self.words.index("apple")
        apple_mobject = self.image_mobjects[apple_index]
        self.line_mobjects = []
        for i, (word, point) in enumerate(
            zip(self.other_words + ["banana"], 
                self.other_points + [self.points[0]])
            ):
            if word == "banana":
                opacity_start = 0.12
                opacity_step = 0.12
            elif word == "ate":
                opacity_start = 0.03
                opacity_step = 0.03
            elif word == "I":
                opacity_start = 0.03
                opacity_step = 0.03
            elif word == "a" or word == "and":
                opacity_start = 0.02
                opacity_step = 0.02
            elif word == "an":
                opacity_start = 0.02
                opacity_step = 0.02
            else:
                raise ValueError(f"Should not happen: {word}")
            blur_lines = self.make_blur_lines(
                from_point=point,
                to_mobject=apple_mobject,
                widths=[16, 12, 8, 4],
                opacity_start=opacity_start, 
                opacity_step=opacity_step
            )
            for line in blur_lines:
                self.add(line)
                self.line_mobjects.append(line)

        # Bring images, dots, and labels to the front
        for image_mob in self.image_mobjects:
            self.bring_to_front(image_mob)
        for dot_mob in self.dot_mobjects:
            self.bring_to_front(dot_mob)
        for label_mob in self.label_mobjects:
            self.bring_to_front(label_mob)

    
        self.play(
            *[Create(line) for line in self.line_mobjects], 
            run_time=1.5
        )

        new_apple_point = self.axes.coords_to_point(*NEW_APPLE_COORDS)
        self.play(
            self.image_mobjects[apple_index].animate.move_to(new_apple_point),
            run_time=1.5
        )

        # Uncreate the lines
        self.play(*[Uncreate(line) for line in self.line_mobjects])

        self.wait(2)

class AllDotProduct(AllEmbeddings):
    def construct(self):
        super().construct_static()

        phrase_words = ["I", "ate", "a", "banana", "and", "an", "apple"]

        # Remove "pear", "phone", "laptop" images
        for word, image_mob in zip(self.words, self.image_mobjects):
            if word not in phrase_words:
                self.remove(image_mob)

        # Delay before starting
        self.wait(1)

        ######################################
        ### Line up images/dots at the top 
        ######################################

        # Get remaining images and all dots/labels
        remaining_images_dots = []
        remaining_label_mobjects = []
        for word in phrase_words:
            if word in self.words:
                idx = self.words.index(word)
                remaining_images_dots.append(self.image_mobjects[idx])
                remaining_label_mobjects.append(None)  # No label for images
            elif word in self.other_words:
                idx = self.other_words.index(word)
                remaining_images_dots.append(self.dot_mobjects[idx])
                remaining_label_mobjects.append(self.label_mobjects[idx])

        # Calculate target positions - evenly spaced across the top
        target_y = 1.5  # Top of the screen
        total_objects = len(remaining_images_dots)
        x_spacing = 10 / max(1, total_objects - 1)  # Spread across 10 units
        start_x = -5
        
        target_positions = []
        for i in range(total_objects):
            x_pos = start_x + i * x_spacing
            target_positions.append([x_pos, target_y, 0])
        
        # Create animations for moving objects and labels
        move_animations = []
        for obj, target_pos in zip(remaining_images_dots, target_positions):
            move_animations.append(obj.animate.move_to(target_pos))
        
        # Move labels with their corresponding dots
        for label, image_dot in zip(remaining_label_mobjects, remaining_images_dots):
            if label is None:
                continue
            # Find the index of the dot in the original list
            dot_index = remaining_images_dots.index(image_dot)

            label_target = target_positions[dot_index].copy()
            label_target[1] += 0.4  # Keep labels above dots
            move_animations.append(label.animate.move_to(label_target))
        
        # Animate everything together: objects moving up and axes fading out
        self.play(
            *move_animations,
            FadeOut(self.axes),
            run_time=1.5
        )

        ######################################
        ### Add vectors 
        ######################################

        phrase_coords = []
        for word in phrase_words:
            if word in self.words:
                idx = self.words.index(word)
                phrase_coords.append(self.coords[idx])
            elif word in self.other_words:
                idx = self.other_words.index(word)
                phrase_coords.append(self.other_coords[idx])

        vector_font_size = int(self.FONT_SIZE * 1.2 * self.SCALE_FACTOR)
        vectors = [
            [[num] for num in point] for point in phrase_coords
        ]
        vectors_centered = [
            center_matrix_entries(vector, font_size=vector_font_size) 
            for vector in vectors
        ]
        m_vectors = []
        for i, vector in enumerate(vectors_centered):
            color = _DARKRED if phrase_words[i] == "apple" else BLACK
            m_vector = MobjectMatrix(
                vector, 
                h_buff=0.3,
                v_buff=0.7,
                bracket_h_buff=SMALL_BUFF,
                bracket_config={"font_size": vector_font_size}
            ).set_color(color)
            m_vectors.append(m_vector)

        # Position vectors below the images/dots
        for m_vector, target_pos in zip(m_vectors, target_positions):
            m_vector.move_to(target_pos + DOWN * 1.2)
        
        self.play(
            AnimationGroup(
                *[FadeIn(m_vector) for m_vector in m_vectors],
                lag_ratio=0.1,
                run_time=1.5
            )
        )

        ##############################################
        ### Take dot product of apple with all others
        ##############################################

        # Animate apple vector and other vectors transforming
        # into numbers below each vector, one at a time

        apple_idx = phrase_words.index("apple")
        apple_vector = m_vectors[apple_idx]
        apple_coords = phrase_coords[apple_idx]

        # Create dot product results for each other vector with apple
        dot_products = []
        for i, coord in enumerate(phrase_coords):
            dot_product = (
                coord[0] * apple_coords[0] + coord[1] * apple_coords[1]
            )
            dot_products.append(round(dot_product, 2))

        # Create tex mobjects for dot products
        dot_product_font_size = int(vector_font_size * 1.2)
        dot_product_texs = []
        for i, dot_product in enumerate(dot_products):
            dot_tex = MathTex(str_entry(dot_product), font_size=dot_product_font_size)
            dot_tex.set_color(color_from_value(dot_product, min_val=-3, max_val=3))
            dot_tex.move_to(target_positions[i] + DOWN * 3)
            dot_product_texs.append(dot_tex)
        
        vector_entries = [m_vector.get_entries() for m_vector in m_vectors]
        apple_entires = apple_vector.get_entries()
        
        for i in range(len(dot_product_texs)):
            vector_entries_copy = vector_entries[i].copy()
            apple_entries_copy = apple_entires.copy()

            dot_product_text = dot_product_texs[i]

            # Animate the transformation
            transforms = []
            transforms.append(Transform(vector_entries_copy, dot_product_text, 
                                        run_time=1.2))
            transforms.append(Transform(apple_entries_copy, dot_product_text, 
                                        run_time=1.2))
            if transforms:
                self.play(FadeIn(vector_entries_copy, run_time=0.2),
                          FadeIn(apple_entries_copy, run_time=0.2))
                self.play(*transforms)
            self.wait(0.4)
        
        self.wait(3)

class AllSoftmax(AllEmbeddings):
    def construct(self):
        ##############################################
        ### Set up scene to match end of AllDotProduct
        ##############################################
        super().construct_static()

        phrase_words = ["I", "ate", "a", "banana", "and", "an", "apple"]

        # Remove unwanted images (no animation)
        for word, image_mob in zip(self.words, self.image_mobjects):
            if word not in phrase_words:
                self.remove(image_mob)

        # Remove axes (no animation)
        self.remove(self.axes)

        # Set up objects in their final Part 1 positions (no animation)
        remaining_images_dots = []
        remaining_label_mobjects = []
        for word in phrase_words:
            if word in self.words:
                idx = self.words.index(word)
                remaining_images_dots.append(self.image_mobjects[idx])
                remaining_label_mobjects.append(None)
            elif word in self.other_words:
                idx = self.other_words.index(word)
                remaining_images_dots.append(self.dot_mobjects[idx])
                remaining_label_mobjects.append(self.label_mobjects[idx])

        # Calculate positions (same as Part 1)
        target_y = 1.5
        total_objects = len(remaining_images_dots)
        x_spacing = 10 / max(1, total_objects - 1)
        start_x = -5
        
        target_positions = []
        for i in range(total_objects):
            x_pos = start_x + i * x_spacing
            target_positions.append([x_pos, target_y, 0])
        
        # Move objects to their final positions instantly
        for obj, target_pos in zip(remaining_images_dots, target_positions):
            obj.move_to(target_pos)
        
        for label, image_dot in zip(remaining_label_mobjects, remaining_images_dots):
            if label is None:
                continue
            dot_index = remaining_images_dots.index(image_dot)
            label_target = target_positions[dot_index].copy()
            label_target[1] += 0.4
            label.move_to(label_target)

        # Add dot products instantly (no animation)
        vector_font_size = int(self.FONT_SIZE * 1.2 * self.SCALE_FACTOR)
        phrase_coords = []
        for word in phrase_words:
            if word in self.words:
                idx = self.words.index(word)
                phrase_coords.append(self.coords[idx])
            elif word in self.other_words:
                idx = self.other_words.index(word)
                phrase_coords.append(self.other_coords[idx])

        apple_idx = phrase_words.index("apple")
        apple_coords = phrase_coords[apple_idx]

        # Calculate dot products
        dot_products = []
        for i, coord in enumerate(phrase_coords):
            dot_product = (
                coord[0] * apple_coords[0] + coord[1] * apple_coords[1]
            ) 
            dot_products.append(round(dot_product, 2))

        # Create and add dot product text instantly
        dot_product_font_size = int(vector_font_size * 1.2)
        dot_product_texs = []
        j = 0  # Index for dot_products array (skipping apple)
        for i in range(len(phrase_words)):
            dot_product = dot_products[j]
            dot_tex = MathTex(str_entry(dot_product), font_size=dot_product_font_size)
            dot_tex.set_color(color_from_value(dot_product, min_val=-3, max_val=3))
            dot_tex.move_to(target_positions[i] + DOWN * 1.2)
            dot_product_texs.append(dot_tex)
            self.add(dot_tex)
            j += 1
        

        ##############################################
        ### Apply softmax to dot products
        ##############################################

        self.wait(1)


        # Create an instance of the softmax formula for each dot product
        softmax_texs = []
        for i, dot_product in enumerate(dot_products):
            softmax_tex = MathTex(
                r"\frac{e^{" + str_entry(dot_product) + r"}}{+13.06}",
                font_size=int(dot_product_font_size)
            )
            softmax_tex.set_color(BLACK)
            softmax_tex.set_opacity(0)

            softmax_tex.move_to(dot_product_texs[i].get_center() + DOWN * 0.8)
            softmax_texs.append(softmax_tex)
            self.add(softmax_tex)

        # Animate dot products transforming into the exponents
        move_animations = []
        numerator_e = []
        numerator_groups = []
        for i, (dot_product_tex, softmax_tex) in enumerate(
            zip(dot_product_texs, softmax_texs)
            ):
            
            exponent_part = softmax_tex[0][1:1+len(str_entry(dot_products[i]))]
            target_position = exponent_part.get_center()

            move_animations.append(
                dot_product_tex.animate
                    .move_to(target_position)
                    .set_color(BLACK)
                    .scale(0.8)
            )

            numerator_e.append(softmax_tex[0][0])
            numerator_groups.append(
                VGroup(
                    dot_product_tex, 
                    numerator_e[-1]
                )
            )
            
        numerator_e_fade_in_animations = [
            e.animate.set_opacity(1)
            for e in numerator_e
        ]

        self.play(
            AnimationGroup(
                *move_animations,
                lag_ratio=0.1
            ),
            AnimationGroup(
                *numerator_e_fade_in_animations,
                lag_ratio=0.1
            ),
            run_time=1.5
        )


        # Transform into the evaluated numerator
        numerator_evaluated = [
            round(math.exp(dot_product), 2) for dot_product in dot_products
        ]
        numerator_evaluated_tex = [
            MathTex(
                str_entry(numerator), 
                font_size=int(dot_product_font_size)
            ).set_color(BLACK).move_to(numerator_groups[i].get_center())
            for i, numerator in enumerate(numerator_evaluated)
        ] 

        self.play(
            AnimationGroup(
                *[Transform(numerator_groups[i], numerator_evaluated_tex[i]) 
                  for i in range(len(numerator_groups))],
                lag_ratio=0.1
            ),
            run_time=1.5
        )
        
        # Write the fraction line
        fraction_lines = [
            Line(
                softmax_tex.get_left(), 
                softmax_tex.get_right(), 
                color=BLACK,
                stroke_width=1
            ).move_to(softmax_tex.get_center())
            for softmax_tex in softmax_texs
        ]
        self.play(
            AnimationGroup(
                *[Create(line) for line in fraction_lines], 
                lag_ratio=0.1
            ),
            run_time=1.5
        )

        # Transform the denominator into the actual sum
        # But only for the first one
        denominator_sum_value = round(sum(numerator_evaluated), 2)
        denominator_sum = MathTex(
            str_entry(denominator_sum_value),
            font_size=int(dot_product_font_size)
        ).set_color(BLACK)

        target_positions = [
            softmax_tex.get_center() + DOWN * 0.25
            for softmax_tex in softmax_texs
        ]

        denominator_sums = [
            denominator_sum.copy().move_to(target_positions[0]) 
            for _ in range(len(softmax_texs))
        ]

        all_numerators_group = VGroup(*numerator_evaluated_tex)
        all_numerators_group_copy = all_numerators_group.copy()
        self.play(
            Transform(
                all_numerators_group_copy, 
                denominator_sums[0],
                run_time=1.2
            ),
            run_time=1.5
        )

        # Move each denominator sum to its target position
        denominator_sum_animations = [
            denominator_sums[i].set_opacity(0).animate.move_to(target_position).set_opacity(1)
            for i, target_position in enumerate(target_positions)
        ]
        self.play(
            AnimationGroup(
                *denominator_sum_animations,
                lag_ratio=0.1
            ),
            run_time=1.5
        )
        # Remove the all_numerators_group_copy (now in the appearance of the denominator)
        self.remove(all_numerators_group_copy)


        # Group the numerator, denominator, and fraction line
        softmax_groups = []
        for i in range(len(softmax_texs)):
            group = VGroup(
                numerator_groups[i],
                denominator_sums[i],
                fraction_lines[i],
            )
            softmax_groups.append(group)

        # Transform the softmax groups into the final result
        final_results = []
        final_results_texs = []
        for i in range(len(softmax_texs)):
            final_result = round(
                numerator_evaluated[i] / denominator_sum_value, 2
            )
            final_result_tex = MathTex(
                str_entry(final_result), 
                font_size=int(dot_product_font_size)
            ).set_color(BLACK).move_to(softmax_texs[i].get_center())
            final_results.append(final_result_tex)
            final_results_texs.append(final_result_tex)
        
        self.play(
            AnimationGroup(
                *[Transform(softmax_groups[i], final_results_texs[i]) 
                  for i in range(len(softmax_groups))],
                lag_ratio=0.1
            ),
            run_time=1.5
        )


        self.wait(2)

        

