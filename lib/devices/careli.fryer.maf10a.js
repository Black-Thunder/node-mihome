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
		const status = this.properties["air-fryer:status"];

		if (status === 0) {
			return "Off";
		}
		if (status === 1) {
			return "Idle";
		}
		if (status === 2) {
			return "Paused";
		}
		if (status === 3) {
			return "Delay";
		}
		if (status === 4) {
			return "Cooking";
		}
		if (status === 5) {
			return "Preheat";
		}
		if (status === 6) {
			return "Cooking Completed";
		}
		if (status === 7) {
			return "Preheat Completed";
		}
		if (status === 8) {
			return "Preheat Paused";
		}
		if (status === 9) {
			return "Turn Pot Paused";
		}
		if (status === 10) {
			return "Keep Warm";
		}
		if (status === 11) {
			return "Keep Warm Paused";
		}
		if (status === 12) {
			return "Keep Warm Completed";
		}
		if (status === 13) {
			return "Crispy Roast";
		}
		if (status === 14) {
			return "Degrease";
		}

		return undefined;
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
		// 1 - 1440, steps: 1
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

	setTargetTime(v) {
		// 1 - 1440
		return this.miotSetProperty("air-fryer:target-time", v);
	}

	setTargetTemperature(v) {
		// 40 - 230
		return this.miotSetProperty("air-fryer:target-temperature", v);
	}

	setMode(v) {
		if (v === "Manual") {
			v = 0;
		} else if (v === "French Fries") {
			v = 1;
		} else if (v === "Chicken Wing") {
			v = 2;
		} else if (v === "Steak") {
			v = 3;
		} else if (v === "Lamb Chops") {
			v = 4;
		} else if (v === "Fish") {
			v = 5;
		} else if (v === "Shrimp") {
			v = 6;
		} else if (v === "Vegetables") {
			v = 7;
		} else if (v === "Cake") {
			v = 8;
		} else if (v === "Pizza") {
			v = 9;
		} else if (v === "Defrost") {
			v = 10;
		} else if (v === "Dried Fruit") {
			v = 11;
		} else if (v === "Yogurt") {
			v = 12;
		}
		return this.miotSetProperty("air-fryer:mode", v);
	}
};
