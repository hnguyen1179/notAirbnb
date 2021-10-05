import { IDates } from '../../context/AppContext'

interface Props {
  dates: IDates,
  setDates: (dates: IDates) => void;
}

const ListingReservation = (props: Props) => {
  return (
    <div className="ListingReservation">
      {props.dates.checkIn.toLocaleDateString()}
      {props.dates.checkOut.toLocaleDateString()}
    </div>
  )
}

export default ListingReservation
