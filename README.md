# notAirbnb
[Live link](https://not-airbnb.netlify.app/)</br></br>

![landing-desktop](https://user-images.githubusercontent.com/19617238/138088617-983edad3-57dd-483b-aa61-938c4de24982.gif)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Highlights](#highlights)
4. [Future Direction](#future-direction)

## Introduction

notAirbnb was born out of my desire to pick up some backend knowledge by creating a fullstack web application modeled after Airbnb's cool website. In addition, this project was entirely built with TypeScript, which is something I've been meaning to pick up.
</br>
</br>
In this project, users are able to browse from a multitude of listings spread over cities in the SoCal/Las Vegas region. Users are then able to book these listings as well. Each of these listings were web scrapped via Puppeteer from real listings, however all names and personal information are fictitious.
</br>
</br>
Despite being a fullstack application, the backend functionalities are pretty bare as I was primarily more focused on the frontend aspect of cloning Airbnb.

## Technologies

**Frontend** <br/> 
React

**Backend** <br/>
Apollo && PostgreSQL && GraphQL API w/ Prisma ORM 

## Highlights
* **Fully Responsive** - near pixel-perfect CSS along with an intuitive component layout allows for seamless transitions between mobile and desktop ... 

![landing-mobile](https://user-images.githubusercontent.com/19617238/138088611-254a31dd-f090-4048-ac53-a50d2d6af44b.gif)
</br>
</br>
... featuring a mobile-first design from the start of the project
</br>
</br>
![landing-responsive](https://user-images.githubusercontent.com/19617238/138088587-91c1f36b-bacd-4da8-a5ac-77e52ee6e6c7.gif)
</br>

* **Robust Search Feature** - Users are able to search listings via a complex set of filters, as well as by region, dates available and number of guests 

![search](https://user-images.githubusercontent.com/19617238/138088607-aa84cf83-4ce4-4063-bcab-e1f463dde58b.gif)
</br>
</br>

* **Browse Reservations** - After booking these listings, users are then able to navigate to their respective reservation to view further details

![trips](https://user-images.githubusercontent.com/19617238/138088666-c7749caa-970e-41f5-b734-8a0eac67be6e.gif)
</br>
</br>

* **Advanced React Patterns** - This project proved to be a great exercise in generating creative advanced React patterns for frontend problem solving. An example of which is my ```usePortal``` hook, which returns a ```<Portal />``` component. This was pretty essential in providing code reusability for all of the modal-like components found on each listing page

  ``` javascript
  import { MouseEventHandler, useCallback, useState } from "react";
  import { createPortal } from "react-dom";
  import Fade from "../components/Fade";

  const usePortal = () => {
    const [portal, setPortal] = useState(false);

    const openPortal: MouseEventHandler = useCallback((e) => {
      e.stopPropagation();
      document.body.style.overflow = "hidden";
      setPortal(true);
    }, []);

    const closePortal = useCallback(() => {
      document.body.style.overflow = "unset";
      setPortal(false);
    }, []);

    const togglePortal: MouseEventHandler = useCallback((e) => {
      e.stopPropagation();
      setPortal((prevState) => {
        if (prevState) {
          document.body.style.overflow = "unset";
        } else if (!prevState) {
          document.body.style.overflow = "hidden";
        }

        return !prevState;
      });
    }, []);

    const portalProps = {
      portal,
      closePortal,
    };

    return { Portal, portalProps, openPortal, closePortal, togglePortal };
  };

  export interface PortalProps {
    portal: boolean;
    closePortal: () => void;
    style?: any;
    configType?: "default" | "stiff";
    enableBackground?: boolean;
  }

  const Portal: React.FC<PortalProps> = ({
    children,
    portal,
    closePortal,
    style,
    configType,
    enableBackground = true,
  }) => {
    if (!portal) return null;

    return createPortal(
      <div className="Portal" aria-hidden={!portal}>
        {enableBackground && (
          <div className="Portal__background" onClick={closePortal} />
        )}
        <div
          className="Portal__children"
          onClick={(e) => e.stopPropagation()}
        >
          <Fade style={style} configType={configType}>
            <>{children}</>
          </Fade>
        </div>
      </div>,
      document.querySelector("#root") as Element
    );
  };

  export { usePortal };
  ```
