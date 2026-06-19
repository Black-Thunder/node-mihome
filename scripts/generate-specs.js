const fs = require("fs");
const path = require("path");

const SPECS = [
	"urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-mb3:2",
	"urn:miot-spec-v2:device:air-purifier:0000A007:zhimi-mb5:1",
	"urn:miot-spec-v2:device:air-fryer:0000A0A4:careli-maf10a:1",
];

(async () => {
	const result = {};

	for (const spec of SPECS) {
		console.log(`Downloading ${spec}`);

		const url = `https://miot-spec.org/miot-spec-v2/instance?type=${encodeURIComponent(spec)}`;

		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Failed: ${res.status} ${res.statusText}`);
		}

		const json = await res.json();

		const mapping = {};

		json.services.forEach(service => {
			if (!service.properties) {
				return;
			}

			service.properties.forEach(property => {
				const key = [service.type.split(":")[3], property.type.split(":")[3]].join(":");

				mapping[key] = {
					siid: service.iid,
					piid: property.iid,
					desc: `${service.description} - ${property.description}`,
				};
			});
		});

		result[spec] = mapping;
	}

	const outputFile = path.join(__dirname, "miot-spec-cache.json");

	fs.writeFileSync(outputFile, JSON.stringify(result, null, 4), "utf8");

	console.log(`Written ${outputFile}`);
})();
