import React, { useEffect, useState, useRef } from "react";
import RadioButton from "./RadioButton";
import { UseFormReturn } from "react-hook-form";

const LOCATIONS = [
	"Big Bear, CA",
	"Henderson, NV",
	"Las Vegas, NV",
	"Los Angeles, CA",
	"Palm Springs, CA",
	"Paradise, NV",
	"San Diego, CA",
	"Santa Barbara, CA",
];

interface Props {
	next: () => void;
	form?: UseFormReturn;
	location?: string;
	setLocation?: (x: string) => void;
}

const LocationSearch = ({ form, location, setLocation, next }: Props) => {
	const focused = useRef(false);

	const handleRadioSelect = (e: any) => {
		// The reason why we use a 'useRef' instead of a 'useState'
		// is that 'setFocused' causes a rerender within the 'removeFocus()'
		// function, which will cause 'active' to be removed from 'searchResults'
		// meaning pointer-events: none to be set, thereby preventing the
		// handleRadioSelect onClick to be triggered

		// changing 'focused' via useRef's current does not cause a rerender,
		// and so active is still set on 'searchResults' where 'removeFocus()' is ran

		if (setLocation) setLocation(e.currentTarget.value);
		if (form) form.setValue("location", e.currentTarget.value);
		next();
	};

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") e.preventDefault();
	};

	useEffect(() => {
		const checkboxDivs = document.querySelectorAll(
			".radio"
		) as NodeListOf<HTMLElement>;

		const searchInput = document?.querySelector(".searchColumn");
		const searchResults = document?.querySelector(
			".searchResults"
		) as HTMLElement;

		const autocomplete = (e: any) => {
			const input = e.currentTarget as HTMLInputElement;
			let flag = false;

			for (let i = 0; i < checkboxDivs.length; i++) {
				const checkbox = checkboxDivs[i]
					.children[0] as HTMLInputElement;

				if (
					(checkbox.value
						.toLowerCase()
						.includes(input.value.toLowerCase()) &&
						input.value.length > 0) ||
					input.value.length === 0
				) {
					checkboxDivs[i].style.display = "block";
					flag = true;
				} else {
					checkboxDivs[i].style.display = "none";
				}
			}

			if (!flag) {
				searchResults.style.display = "none";
			} else {
				searchResults.style.display = "block";
			}
		};

		const setFocus = () => {
			focused.current = true;
		};

		const removeFocus = () => {
			focused.current = false;
		};

		searchInput?.addEventListener("input", autocomplete);
		searchInput?.addEventListener("focus", setFocus);
		searchInput?.addEventListener("blur", removeFocus);

		return () => {
			searchInput?.removeEventListener("input", autocomplete);
			searchInput?.removeEventListener("focus", setFocus);
			searchInput?.removeEventListener("blur", removeFocus);
		};
	}, []);

	const showResults = focused.current ? "active" : "";

	return (
		<div className="LocationSearch">
			<>
				{form ? (
					<input
						className="searchColumn"
						type="text"
						placeholder="Select a location"
						autoComplete="off"
						onKeyDown={handleEnter}
						id="location"
						{...form.register("location")}
					/>
				) : (
					<input
						className="searchColumn"
						type="text"
						placeholder="Select a location"
						autoComplete="off"
						onChange={(e) => {
							if (setLocation) setLocation(e.currentTarget.value);
						}}
						onKeyDown={handleEnter}
						value={location}
					/>
				)}
			</>

			<div
				className={`searchResults ${showResults}`}
				onClick={(e) => e.stopPropagation()}
			>
				{LOCATIONS.map((loc) => {
					return (
						<RadioButton
							key={loc}
							location={loc}
							handleRadioSelect={handleRadioSelect}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default LocationSearch;
