const Device = require("../device-miio");

module.exports = class extends Device {
	static model = "careli.fryer.maf10a";
	static name = "Mi Smart Air Fryer";
	static image = "";

	constructor(opts) {
		super(opts);

		this._miotSpecType = "urn:miot-spec-v2:device:air-fryer:0000A0A4:careli-maf10a:1";
		this._propertiesToMonitor = [
			"air-fryer:status",
			"air-fryer:fault",
			"air-fryer:target-time",
			"air-fryer:target-temperature",
			"air-fryer:left-time",
			"air-fryer:mode",
		];
	}

	getStatus() {
		return this.properties["air-fryer:status"];
	}

	getFault() {
		const fault = this.properties["air-fryer:fault"];
		if (fault === 0) {
			return 'No Faults"';
		}
		if (fault === 1) {
			return "E1";
		}
		if (fault === 2) {
			return "E2";
		}
		if (fault === 3) {
			return "E4";
		}
		return undefined;
	}

	getTargetTime() {
		// 1 - 1440,s teps: 1
		return this.properties["air-fryer:target-time"];
	}

	getTargetTemperature() {
		// 40 - 230, steps: 5
		return this.properties["air-fryer:target-temperature"];
	}

	getLeftTime() {
		// 0 - 1440, steps: 1
		return this.properties["air-fryer:left-time"];
	}

	getMode() {
		const mode = this.properties["air-fryer:mode"];
		if (mode === 0) {
			return "Manual";
		}
		if (mode === 1) {
			return "French Fries";
		}
		if (mode === 2) {
			return "Chicken Wing";
		}
		if (mode === 3) {
			return "Steak";
		}
		if (mode === 4) {
			return "Lamb Chops";
		}
		if (mode === 5) {
			return "Fish";
		}
		if (mode === 6) {
			return "Shrimp";
		}
		if (mode === 7) {
			return "Vegetables";
		}
		if (mode === 8) {
			return "Cake";
		}
		if (mode === 9) {
			return "Pizza";
		}
		if (mode === 10) {
			return "Defrost";
		}
		if (mode === 11) {
			return "Dried Fruit";
		}
		if (mode === 12) {
			return "Yogurt";
		}
		return undefined;
	}

	/*setPower(v) {
		return this.miotSetProperty("air-purifier:on", v);
	}

	setMode(v) {
		if (v === "auto") {
			v = 0;
		} else if (v === "sleep") {
			v = 1;
		} else if (v === "favorite") {
			v = 2;
		} else if (v === "none") {
			v = 3;
		}
		return this.miotSetProperty("air-purifier:mode", v);
	}

	setFavSpeed(v) {
		// 200-2300
		return this.miotSetProperty("custom-service:favorite-speed", v);
	}*/
};
