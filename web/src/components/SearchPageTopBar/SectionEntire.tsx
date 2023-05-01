import { ReactComponent as CheckmarkSvg } from "../../assets/icons/checkmark.svg";

interface Props {
  entireChecked: boolean;
  privateChecked: boolean;
  handleToggleBooleanField: React.ChangeEventHandler<HTMLInputElement>;
}

const SectionEntire = ({
  entireChecked,
  privateChecked,
  handleToggleBooleanField,
}: Props) => {
  return (
    <>
      <h2>Type of Place</h2>

      <div className="types">
        <div className="type">
          <label htmlFor="entire-place">
            <div>Entire place</div>
            <div>Have a place to yourself</div>
          </label>
          <div className="checkbox-container">
            <input
              id="entire-place"
              name="entire"
              type="checkbox"
              value="entire"
              checked={entireChecked}
              onChange={handleToggleBooleanField}
            />
            <span className="checkbox">
              <CheckmarkSvg />
            </span>
          </div>
        </div>
        <div className="type">
          <label htmlFor="private-place">
            <div>Private room</div>
            <div>Have your own room and share some common spaces</div>
          </label>
          <div className="checkbox-container">
            <input
              id="private-place"
              name="entire"
              type="checkbox"
              value="privateListing"
              checked={privateChecked}
              onChange={handleToggleBooleanField}
            />
            <span className="checkbox">
              <CheckmarkSvg />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionEntire;
