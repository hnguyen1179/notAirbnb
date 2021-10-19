interface Props {
	category: string;
	value: number;
}

const Score = (props: Props) => {
	return (
		<div className="Score">
			<span className="Score__category">{props.category}</span>
			<div className="Score__info">
				<div className="Score__info__bar">
					<div
						className="fill"
						style={{ width: `calc(100% * ${props.value / 5})` }}
					></div>
				</div>
				<span className="Score__info__value">{props.value.toFixed(1)}</span>
			</div>
		</div>
	);
};

export default Score;
