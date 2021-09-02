import { useState, useMemo } from "react";
import InspirationPanel from "./InspirationPanel";
import InspirationTabs from "./InspirationTabs";

import data from "../../data/inspirations.json";

const Inspirations = () => {
	const [panel, setPanel] = useState(0);
	const titles = useMemo(() => data.map((obj) => obj.name), []);
	const locations = useMemo(() => data.map((obj) => obj.data), []);

	return (
		<div className="Inspirations">
			<div className="Inspirations__header">
				<h3>Inspiration for future getaways</h3>
			</div>
			<InspirationTabs
				titles={titles}
				panel={panel}
				setPanel={setPanel}
			/>
			<InspirationPanel locations={locations} panel={panel} />
		</div>
	);
};

export default Inspirations;
