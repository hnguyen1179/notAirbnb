import { Link } from "react-router-dom";
import { format, addDays } from "date-fns";

const Hero = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntilNextWeek = 7 - currentDay;

  // Formatted 'mm-dd-yyyy'
  const startOfNextWeek = format(
    addDays(today, daysUntilNextWeek),
    "MM-dd-yyyy"
  );
  // Formatted 'mm-dd-yyyy'
  const endOfNextWeek = format(
    addDays(new Date(startOfNextWeek), 6),
    "MM-dd-yyyy"
  );

  const link = `/search?region=Anywhere&check-in=${startOfNextWeek}&check-out=${endOfNextWeek}&guests=1&page=1`;

  return (
    <div className="Landing__hero__content">
      <div className="Landing__hero__content__image">
        <picture>
          <source
            media="(min-width: 950px)"
            type="image/webp"
            srcSet="https://res.cloudinary.com/dcufjeb5d/image/upload/v1631167470/assets/hero-image-large_compressed.webp"
          />
          <source
            media="(min-width: 744px)"
            type="image/webp"
            srcSet="https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378604/assets/hero-image-medium.jpg"
          />
          <img
            src={`https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378604/assets/hero-image-small.jpg`}
            alt="Silhouette of man with child and dog exploring woods"
          />
        </picture>
      </div>
      <div className="Landing__hero__content__text">
        <span>Not sure where to go?</span>
        <span>Perfect.</span>
        <Link to={link}>
          <button>
            <span>I'm flexible</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
