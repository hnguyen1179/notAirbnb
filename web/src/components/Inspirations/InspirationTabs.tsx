interface Props {
	titles: string[];
	panel: number;
	setPanel: React.Dispatch<React.SetStateAction<number>>;
}

const InspirationTabs = ({ titles, panel, setPanel }: Props) => {
	const clickTab = (e: React.MouseEvent<HTMLElement>) => {
		const nextTab = Number(e.currentTarget.getAttribute("tabIndex"));
		setPanel(nextTab);
	};

	return (
		<div className="InspirationTabs">
			<div className="InspirationTabs__tabs">
				{titles.map((title, idx) => {
					const active = idx === panel ? "active" : "";

					return (
						<div key={idx} className={`InspirationTabs__tabs__tab ${active}`}>
							<button tabIndex={idx} onClick={clickTab}>
								<span>{title}</span>
							</button>
						</div>
					);
				})}
			</div>

			<div className="InspirationTabs__line"></div>
		</div>
	);
};

export default InspirationTabs;
