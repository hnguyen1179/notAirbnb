interface FooterData {
	title: string;
	list: string[];
}

interface Props {
	data: FooterData;
}

const FooterSection = ({ data }: Props) => {
	return (
		<div className="FooterSection">
			<div className="FooterSection__head">
				<h4>{data.title}</h4>
			</div>
			<ul className="FooterSection__list">
				{data.list.map((item, idx) => {
					const [text, url] = item.split(", ");

					const defined = url ? "defined" : "";

					return (
						<li
							key={idx}
							className={`FooterSection__list__item ${defined}`}
						>
							<a
								href={url || ""}
								target="_blank"
								rel="noreferrer"
							>
								{text}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default FooterSection;
