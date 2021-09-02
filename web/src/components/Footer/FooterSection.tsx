import React from "react";

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
				{data.list.map((item) => {
					const [text, url] = item.split(", ");

					const defined = url ? "defined" : "";
					// TODO: Update URL for resume with updated resume.
					// Maybe just save the document within assets and host it
					return (
						<li className={`FooterSection__list__item ${defined}`}>
							<a href={url || ""} target="_blank">
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
