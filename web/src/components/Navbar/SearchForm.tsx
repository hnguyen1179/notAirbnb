import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
	location: string;
	checkIn: Date;
	checkOut: Date;
	guests: number;
}

const SearchForm = () => {
	const { handleSubmit, register } = useForm();

	// https://www.daterangepicker.com/#options for calendar
	// Use this option for smaller windows 
	// singleDatePicker: (true/false) Show only a single calendar to choose one date, instead of a range picker with two calendars. The start and end dates provided to your callback will be the same single date chosen.

	return (
		<div className="SearchForm">
			<form className="SearchForm__container">
				<div className="SearchForm__container__input">
					<label htmlFor="location">Location</label>
					<input
						type="text"
						placeholder="Where are you going?"
						id="location"
						{...register("location")}
					/>
				</div>

				<div className="SearchForm__container__input">
					<label htmlFor="checkIn">Check in</label>
					<input
						type="date"
						placeholder="Add dates"
						id="checkIn"
						{...register("checkIn")}
					/>
				</div>

				<div className="SearchForm__container__input">
					<label htmlFor="checkOut">Check out</label>
					<input
						type="date"
						placeholder="Add dates"
						id="checkOut"
						{...register("checkOut")}
					/>
				</div>

				<div className="SearchForm__container__input">
					<label htmlFor="guests">Guests</label>
					<input
						type="text"
						placeholder="Add guests"
						id="guests"
						{...register("guests")}
					/>
				</div>
			</form>
		</div>
	);
};

export default SearchForm;
