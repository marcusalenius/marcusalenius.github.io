"use client";

import { useEffect } from "react";

import Card from "./Card";
import NavMenuItem from "./NavMenuItem";

type Props = {
  data: { [key: string]: any };
};

// Helper function to get the section that is most in view
const getMostInView = (itemSectionMap: { [key: string]: any }) => {
  const viewportTop = window.scrollY;
  const viewportBottom = window.scrollY + window.innerHeight;
  let mostInView;
  let mostInViewAmount = 0;
  for (const key in itemSectionMap) {
    const currSection = itemSectionMap[key].section;
    const sectionTop = currSection.offsetTop;
    const sectionBottom = currSection.offsetTop + currSection.offsetHeight;
    let currInViewAmount;
    // not in viewport
    if (viewportBottom < sectionTop || viewportTop > sectionBottom) {
      currInViewAmount = 0;
      // console.log(currSection, 'not in viewport');
    }
    // completely in viewport
    else if (viewportTop >= sectionTop && viewportBottom <= sectionBottom) {
      currInViewAmount = 1;
      // console.log(currSection, 'completely in viewport');
    }
    // partially in viewport, space above
    else if (viewportTop < sectionTop && viewportBottom <= sectionBottom) {
      currInViewAmount =
        (viewportBottom - sectionTop) / (viewportBottom - viewportTop);
      // console.log(currSection, 'space above', currInViewAmount);
    }
    // partially in viewport, space below
    else if (viewportBottom > sectionBottom && viewportTop >= sectionTop) {
      currInViewAmount =
        (sectionBottom - viewportTop) / (viewportBottom - viewportTop);
      // console.log(currSection, 'space below', currInViewAmount);
    }
    // partially in viewport, space above and below
    else {
      currInViewAmount = 1;
      // console.log(currSection, 'space above and below')
    }
    if (currInViewAmount >= mostInViewAmount) {
      mostInViewAmount = currInViewAmount;
      mostInView = currSection;
    }
  }
  return mostInView;
};

function NavMobile({ data }: Props) {
  // useEffect for scroll event to update navmenu item selection
  useEffect(function mount() {
    function onScroll() {
      const navmenu = document.getElementById("navmenu-mobile");
      if (!navmenu) {
        return;
      }

      // Construct a map of section names to their respective item and section elements
      const itemSectionMap: { [key: string]: any } = {
        aboutMe: {
          item: document.getElementById("navmenu-item-about-me"),
          section: document.getElementById("hero"),
        },
      };
      Object.keys(data.sections).forEach((sectionName) => {
        const nameLowerDashed = sectionName.toLowerCase().replace(" ", "-");
        itemSectionMap[nameLowerDashed] = {
          item: document.getElementById(`navmenu-item-${nameLowerDashed}`),
          section: document.getElementById(nameLowerDashed),
        };
      });

      const mostInView = getMostInView(itemSectionMap);
      for (const key in itemSectionMap) {
        // section most in view
        if (itemSectionMap[key].section === mostInView) {
          // remove hidden if navmenu hidden
          if (navmenu.classList.contains("hidden")) {
            if (itemSectionMap[key].item.classList.contains("hidden")) {
              itemSectionMap[key].item.classList.remove("hidden");
            }
          }
          // add selected
          if (!itemSectionMap[key].item.classList.contains("selected")) {
            itemSectionMap[key].item.classList.add("selected");
          }
        }
        // section not most in view
        else {
          // add hidden if navmenu hidden
          if (navmenu.classList.contains("hidden")) {
            if (!itemSectionMap[key].item.classList.contains("hidden")) {
              itemSectionMap[key].item.classList.add("hidden");
            }
          }
          // remove selected
          if (itemSectionMap[key].item.classList.contains("selected")) {
            itemSectionMap[key].item.classList.remove("selected");
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <Card className="hidden" id="navmenu-mobile">
      <NavMenuItem name="About Me" isDefault={true} />
      {Object.keys(data.sections).map((sectionName: string) => (
        <NavMenuItem name={sectionName} />
      ))}
    </Card>
  );
}

export default NavMobile;
