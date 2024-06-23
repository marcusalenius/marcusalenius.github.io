"use client";

import "./NavMobile.css";

import { useEffect, useState } from "react";

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
  // Hook for scroll event to update navmenu item selection
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

  // Hook for scroll event to auto-hide navmenu
  const [yUnhideNavmenu, setYUnhideNavmenu] = useState(-1); // -1 means not set
  useEffect(function mount() {
    function onScroll() {
      const navmenu = document.getElementById("navmenu-mobile");
      const navmenuItems = document.querySelectorAll(".navmenu-item");
      if (!navmenu) {
        return;
      }
      if (
        yUnhideNavmenu !== -1 &&
        Math.abs(yUnhideNavmenu - window.scrollY) >= 200
      ) {
        // hide navmenu
        if (!navmenu.classList.contains("hidden")) {
          navmenu.classList.add("hidden");
          navmenuItems.forEach((item) => {
            if (!item.classList.contains("selected")) {
              item.classList.add("hidden");
            }
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  });

  const hideNavmenu = () => {
    const navmenu = document.getElementById("navmenu-mobile");
    if (!navmenu) {
      return;
    }
    const navmenuItems = document.querySelectorAll(".navmenu-item");
    // unset yUnhideNavmenu
    setYUnhideNavmenu(-1);
    // hide navmenu
    if (!navmenu.classList.contains("hidden")) {
      navmenu.classList.add("hidden");
      navmenuItems.forEach((item) => {
        if (!item.classList.contains("selected")) {
          item.classList.add("hidden");
        }
      });
    }
  };

  const unhideNavmenu = () => {
    const navmenu = document.getElementById("navmenu-mobile");
    if (!navmenu) {
      return;
    }
    const navmenuItems = document.querySelectorAll(".navmenu-item");
    // unhide navmenu
    if (navmenu.classList.contains("hidden")) {
      navmenu.classList.remove("hidden");
      navmenuItems.forEach((item) => {
        if (!item.classList.contains("selected")) {
          item.classList.remove("hidden");
        }
      });
    }
    // set yUnhideNavmenu
    setYUnhideNavmenu(window.scrollY);
  };

  // Hook for click outside to hide navmenu
  useEffect(function mount() {
    function onClick(event: MouseEvent) {
      const navmenu = document.getElementById("navmenu-mobile");
      if (!navmenu) {
        return;
      }
      if (event.target !== navmenu) {
        hideNavmenu();
      }
    }

    document.addEventListener("click", onClick);

    return function unMount() {
      document.removeEventListener("click", onClick);
    };
  });

  return (
    <Card className="card hidden" id="navmenu-mobile">
      <NavMenuItem
        name="About Me"
        hideNavmenu={hideNavmenu}
        unhideNavmenu={unhideNavmenu}
        isDefault={true}
      />
      {Object.keys(data.sections).map((sectionName: string) => (
        <NavMenuItem
          name={sectionName}
          hideNavmenu={hideNavmenu}
          unhideNavmenu={unhideNavmenu}
          key={data.sections[sectionName].id}
        />
      ))}
    </Card>
  );
}

export default NavMobile;
