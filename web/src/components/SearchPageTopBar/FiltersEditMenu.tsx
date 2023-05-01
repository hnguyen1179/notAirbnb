import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import SectionEntire from "./SectionEntire";
import SectionSuperhost from "./SectionSuperhost";
import SectionTags from "./SectionTags";
import SectionListingTypes from "./SectionListingTypes";
import SectionLanguages from "./SectionLanguages";
import SectionRules from "./SectionRules";
import { useURLParams } from "../../context/URLParamsContext";
import { useEffect } from "react";

export type ArrayField = "tags" | "listingType" | "languages";
export type BooleanField =
  | "superhost"
  | "pets"
  | "smoking"
  | "privateListing"
  | "entire";

const FiltersEditMenu = () => {
  const {
    state,
    submitNewQuery,
    resetFilters,
    handleCloseEditMenu,
    filterHandlers: { handleToggleBooleanField, handleToggleArrayField },
  } = useURLParams();

  const handleBodyClick = () => {
    const closeNavigation = new Event("closeNavigation");
    window.dispatchEvent(closeNavigation);
  };

  useEffect(() => {
    window.addEventListener("closeNavigation", handleCloseEditMenu);
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      window.removeEventListener("closeNavigation", handleCloseEditMenu);
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [handleCloseEditMenu]);

  return (
    <div className="FiltersEditMenu" onClick={(e) => e.stopPropagation()}>
      <header className="FiltersEditMenu__header">
        <button
          aria-label="Back"
          onClick={() => {
            handleCloseEditMenu();
          }}
        >
          <BackSvg />
        </button>

        <h1>Filters</h1>

        <button onClick={resetFilters}>
          <div>Clear</div>
        </button>
      </header>
      <div className="FiltersEditMenu__sections">
        <div className="FiltersEditMenu__section FiltersEditMenu__section--entire">
          <SectionEntire
            entireChecked={state.entire}
            privateChecked={state.privateListing}
            handleToggleBooleanField={handleToggleBooleanField}
          />
        </div>
        <div className="FiltersEditMenu__section FiltersEditMenu__section--superhost">
          <SectionSuperhost
            superhostChecked={state.superhost}
            handleToggleBooleanField={handleToggleBooleanField}
          />
        </div>
        <div className="FiltersEditMenu__section FiltersEditMenu__section--tags">
          <SectionTags
            tags={state.tags}
            handleToggleArrayField={handleToggleArrayField}
          />
        </div>
        <div className="FiltersEditMenu__section FiltersEditMenu__section--listing-types">
          <SectionListingTypes
            listingTypes={state.listingType}
            handleToggleArrayField={handleToggleArrayField}
          />
        </div>
        <div className="FiltersEditMenu__section FiltersEditMenu__section--rules">
          <SectionRules
            pets={state.pets}
            smoking={state.smoking}
            handleToggleBooleanField={handleToggleBooleanField}
          />
        </div>
        <div className="FiltersEditMenu__section FiltersEditMenu__section--languages">
          <SectionLanguages
            languages={state.languages}
            handleToggleArrayField={handleToggleArrayField}
          />
        </div>
      </div>
      <footer className="FiltersEditMenu__submit">
        <button onClick={submitNewQuery}>
          <span>Show results</span>
        </button>
      </footer>
    </div>
  );
};

export default FiltersEditMenu;
