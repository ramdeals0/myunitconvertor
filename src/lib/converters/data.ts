import type { Category } from "./types";
import { u } from "./factor";

// Length — base meter
const length: Category = {
  id: "length",
  name: "Length",
  description: "Convert meters, feet, inches, miles, kilometers and more.",
  group: "common",
  baseUnit: "m",
  units: [
    u("m", "Meter", "m", 1, ["meters", "metre"]),
    u("km", "Kilometer", "km", 1000),
    u("cm", "Centimeter", "cm", 0.01),
    u("mm", "Millimeter", "mm", 0.001),
    u("um", "Micrometer", "µm", 1e-6),
    u("nm", "Nanometer", "nm", 1e-9),
    u("mi", "Mile", "mi", 1609.344),
    u("yd", "Yard", "yd", 0.9144),
    u("ft", "Foot", "ft", 0.3048, ["feet"]),
    u("in", "Inch", "in", 0.0254, ["inches"]),
    u("nmi", "Nautical Mile", "nmi", 1852),
    u("ly", "Light Year", "ly", 9.4607e15),
    u("au", "Astronomical Unit", "AU", 1.495978707e11),
    u("pc", "Parsec", "pc", 3.0857e16),
  ],
  popular: [
    { from: "cm", to: "in" }, { from: "in", to: "cm" },
    { from: "mm", to: "in" }, { from: "in", to: "mm" },
    { from: "m", to: "ft" }, { from: "ft", to: "m" },
    { from: "km", to: "mi" }, { from: "mi", to: "km" },
  ],
};

// Weight — base kilogram
const weight: Category = {
  id: "weight",
  name: "Weight & Mass",
  description: "Kilograms, pounds, ounces, tonnes and more.",
  group: "common",
  baseUnit: "kg",
  units: [
    u("kg", "Kilogram", "kg"), u("kg", "Kilogram", "kg", 1).id ? u("kg", "Kilogram", "kg", 1) : u("kg", "Kilogram", "kg", 1),
    u("g", "Gram", "g", 0.001),
    u("mg", "Milligram", "mg", 1e-6),
    u("t", "Metric Ton", "t", 1000),
    u("lb", "Pound", "lb", 0.45359237, ["lbs", "pounds"]),
    u("oz", "Ounce", "oz", 0.028349523125),
    u("st", "Stone", "st", 6.35029318),
    u("ct", "Carat", "ct", 0.0002),
    u("ton_us", "US Ton (short)", "ton", 907.18474),
    u("ton_uk", "UK Ton (long)", "ton", 1016.0469088),
  ].filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i),
  popular: [
    { from: "kg", to: "lb" }, { from: "lb", to: "kg" },
    { from: "g", to: "oz" }, { from: "oz", to: "g" },
  ],
};

// Fix: rewrite weight cleanly
weight.units = [
  u("kg", "Kilogram", "kg", 1),
  u("g", "Gram", "g", 0.001),
  u("mg", "Milligram", "mg", 1e-6),
  u("t", "Metric Ton", "t", 1000),
  u("lb", "Pound", "lb", 0.45359237, ["lbs", "pounds"]),
  u("oz", "Ounce", "oz", 0.028349523125),
  u("st", "Stone", "st", 6.35029318),
  u("ct", "Carat", "ct", 0.0002),
  u("ton_us", "US Ton (short)", "ton (US)", 907.18474),
  u("ton_uk", "UK Ton (long)", "ton (UK)", 1016.0469088),
];

// Temperature — non-linear, base Celsius
const temperature: Category = {
  id: "temperature",
  name: "Temperature",
  description: "Celsius, Fahrenheit, Kelvin and Rankine.",
  group: "common",
  baseUnit: "c",
  units: [
    { id: "c", name: "Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
    { id: "f", name: "Fahrenheit", symbol: "°F", toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    { id: "k", name: "Kelvin", symbol: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    { id: "r", name: "Rankine", symbol: "°R", toBase: (v) => (v - 491.67) * 5/9, fromBase: (v) => (v + 273.15) * 9/5 },
  ],
  popular: [
    { from: "c", to: "f" }, { from: "f", to: "c" },
    { from: "c", to: "k" }, { from: "k", to: "c" },
  ],
};

// Volume — base liter
const volume: Category = {
  id: "volume",
  name: "Volume",
  description: "Liters, gallons, cups, milliliters and more.",
  group: "common",
  baseUnit: "L",
  units: [
    u("L", "Liter", "L", 1),
    u("mL", "Milliliter", "mL", 0.001),
    u("m3", "Cubic Meter", "m³", 1000),
    u("cm3", "Cubic Centimeter", "cm³", 0.001),
    u("gal_us", "US Gallon", "gal", 3.785411784),
    u("gal_uk", "UK Gallon", "gal (UK)", 4.54609),
    u("qt", "US Quart", "qt", 0.946352946),
    u("pt", "US Pint", "pt", 0.473176473),
    u("cup", "US Cup", "cup", 0.2365882365),
    u("floz", "US Fluid Ounce", "fl oz", 0.0295735296),
    u("tbsp", "Tablespoon", "tbsp", 0.0147867648),
    u("tsp", "Teaspoon", "tsp", 0.0049289216),
    u("bbl", "Oil Barrel", "bbl", 158.987294928),
  ],
  popular: [
    { from: "L", to: "gal_us" }, { from: "gal_us", to: "L" },
    { from: "mL", to: "floz" }, { from: "floz", to: "mL" },
  ],
};

// Area — base m²
const area: Category = {
  id: "area",
  name: "Area",
  description: "Square meters, acres, hectares, square feet.",
  group: "common",
  baseUnit: "m2",
  units: [
    u("m2", "Square Meter", "m²", 1),
    u("km2", "Square Kilometer", "km²", 1e6),
    u("cm2", "Square Centimeter", "cm²", 1e-4),
    u("mm2", "Square Millimeter", "mm²", 1e-6),
    u("ha", "Hectare", "ha", 10000),
    u("ac", "Acre", "ac", 4046.8564224),
    u("ft2", "Square Foot", "ft²", 0.09290304),
    u("in2", "Square Inch", "in²", 0.00064516),
    u("yd2", "Square Yard", "yd²", 0.83612736),
    u("mi2", "Square Mile", "mi²", 2589988.110336),
  ],
};

// Pressure — base Pascal
const pressure: Category = {
  id: "pressure",
  name: "Pressure",
  description: "Pascals, bars, PSI, atmospheres.",
  group: "common",
  baseUnit: "Pa",
  units: [
    u("Pa", "Pascal", "Pa", 1),
    u("kPa", "Kilopascal", "kPa", 1000),
    u("MPa", "Megapascal", "MPa", 1e6),
    u("bar", "Bar", "bar", 1e5),
    u("mbar", "Millibar", "mbar", 100),
    u("psi", "Pound per Sq. Inch", "psi", 6894.757293168),
    u("atm", "Atmosphere", "atm", 101325),
    u("torr", "Torr", "Torr", 133.322368421),
    u("mmHg", "Millimeter of Mercury", "mmHg", 133.322387415),
  ],
};

// Energy — base Joule
const energy: Category = {
  id: "energy",
  name: "Energy",
  description: "Joules, calories, kilowatt-hours, BTU.",
  group: "common",
  baseUnit: "J",
  units: [
    u("J", "Joule", "J", 1),
    u("kJ", "Kilojoule", "kJ", 1000),
    u("cal", "Calorie", "cal", 4.184),
    u("kcal", "Kilocalorie", "kcal", 4184),
    u("Wh", "Watt-hour", "Wh", 3600),
    u("kWh", "Kilowatt-hour", "kWh", 3.6e6),
    u("BTU", "British Thermal Unit", "BTU", 1055.05585262),
    u("eV", "Electronvolt", "eV", 1.602176634e-19),
    u("ftlb", "Foot-pound", "ft·lb", 1.35581794833),
  ],
};

// Power — base Watt
const power: Category = {
  id: "power",
  name: "Power",
  description: "Watts, horsepower, kilowatts.",
  group: "common",
  baseUnit: "W",
  units: [
    u("W", "Watt", "W", 1),
    u("kW", "Kilowatt", "kW", 1000),
    u("MW", "Megawatt", "MW", 1e6),
    u("hp", "Horsepower (mech)", "hp", 745.6998715822702),
    u("hp_m", "Horsepower (metric)", "hp (M)", 735.49875),
    u("BTU_h", "BTU/hour", "BTU/h", 0.29307107),
    u("ftlb_s", "Foot-pound/second", "ft·lb/s", 1.3558179483),
  ],
  popular: [{ from: "hp", to: "kW" }, { from: "kW", to: "hp" }],
};

// Force — base Newton
const force: Category = {
  id: "force",
  name: "Force",
  description: "Newtons, pounds-force, dynes.",
  group: "common",
  baseUnit: "N",
  units: [
    u("N", "Newton", "N", 1),
    u("kN", "Kilonewton", "kN", 1000),
    u("lbf", "Pound-force", "lbf", 4.4482216152605),
    u("kgf", "Kilogram-force", "kgf", 9.80665),
    u("dyn", "Dyne", "dyn", 1e-5),
  ],
};

// Time — base second
const time: Category = {
  id: "time",
  name: "Time",
  description: "Seconds, minutes, hours, days, years.",
  group: "common",
  baseUnit: "s",
  units: [
    u("s", "Second", "s", 1),
    u("ms", "Millisecond", "ms", 1e-3),
    u("us", "Microsecond", "µs", 1e-6),
    u("min", "Minute", "min", 60),
    u("h", "Hour", "h", 3600),
    u("d", "Day", "d", 86400),
    u("wk", "Week", "wk", 604800),
    u("mo", "Month (30 d)", "mo", 2592000),
    u("yr", "Year (365 d)", "yr", 31536000),
  ],
};

// Speed — base m/s
const speed: Category = {
  id: "speed",
  name: "Speed",
  description: "m/s, km/h, mph, knots.",
  group: "common",
  baseUnit: "mps",
  units: [
    u("mps", "Meter/second", "m/s", 1),
    u("kph", "Kilometer/hour", "km/h", 1 / 3.6),
    u("mph", "Mile/hour", "mph", 0.44704),
    u("fps", "Foot/second", "ft/s", 0.3048),
    u("knot", "Knot", "kn", 0.514444),
    u("mach", "Mach (sea level)", "M", 340.29),
  ],
  popular: [{ from: "mph", to: "kph" }, { from: "kph", to: "mph" }],
};

// Angle — base radian
const angle: Category = {
  id: "angle",
  name: "Angle",
  description: "Degrees, radians, gradians.",
  group: "common",
  baseUnit: "rad",
  units: [
    u("rad", "Radian", "rad", 1),
    u("deg", "Degree", "°", Math.PI / 180),
    u("grad", "Gradian", "grad", Math.PI / 200),
    u("arcmin", "Arcminute", "'", Math.PI / 10800),
    u("arcsec", "Arcsecond", '"', Math.PI / 648000),
    u("turn", "Turn", "tr", Math.PI * 2),
  ],
  popular: [{ from: "deg", to: "rad" }, { from: "rad", to: "deg" }],
};

// Data storage — base byte
const data: Category = {
  id: "data",
  name: "Data Storage",
  description: "Bytes, kilobytes, megabytes, gigabytes.",
  group: "common",
  baseUnit: "B",
  units: [
    u("b", "Bit", "b", 0.125),
    u("B", "Byte", "B", 1),
    u("KB", "Kilobyte", "KB", 1e3),
    u("MB", "Megabyte", "MB", 1e6),
    u("GB", "Gigabyte", "GB", 1e9),
    u("TB", "Terabyte", "TB", 1e12),
    u("PB", "Petabyte", "PB", 1e15),
    u("KiB", "Kibibyte", "KiB", 1024),
    u("MiB", "Mebibyte", "MiB", 1024 ** 2),
    u("GiB", "Gibibyte", "GiB", 1024 ** 3),
    u("TiB", "Tebibyte", "TiB", 1024 ** 4),
  ],
};

// Fuel consumption — base L/100km
const fuel: Category = {
  id: "fuel",
  name: "Fuel Consumption",
  description: "L/100km, MPG (US), MPG (UK), km/L.",
  group: "common",
  baseUnit: "lp100km",
  units: [
    { id: "lp100km", name: "Liter/100 km", symbol: "L/100km", toBase: (v) => v, fromBase: (v) => v },
    { id: "kmpl", name: "Kilometer/Liter", symbol: "km/L", toBase: (v) => 100 / v, fromBase: (v) => 100 / v },
    { id: "mpg_us", name: "Miles/Gallon (US)", symbol: "mpg", toBase: (v) => 235.214583 / v, fromBase: (v) => 235.214583 / v },
    { id: "mpg_uk", name: "Miles/Gallon (UK)", symbol: "mpg (UK)", toBase: (v) => 282.480936 / v, fromBase: (v) => 282.480936 / v },
  ],
};

// Frequency
const frequency: Category = {
  id: "frequency",
  name: "Frequency",
  description: "Hertz, kilohertz, megahertz, gigahertz.",
  group: "light",
  baseUnit: "Hz",
  units: [
    u("Hz", "Hertz", "Hz", 1),
    u("kHz", "Kilohertz", "kHz", 1e3),
    u("MHz", "Megahertz", "MHz", 1e6),
    u("GHz", "Gigahertz", "GHz", 1e9),
    u("THz", "Terahertz", "THz", 1e12),
    u("rpm", "Revolutions/min", "rpm", 1 / 60),
  ],
};

// Density — base kg/m³
const density: Category = {
  id: "density",
  name: "Density",
  description: "Kilogram/m³, g/cm³, lb/ft³.",
  group: "engineering",
  baseUnit: "kgm3",
  units: [
    u("kgm3", "Kilogram/m³", "kg/m³", 1),
    u("gcm3", "Gram/cm³", "g/cm³", 1000),
    u("gml", "Gram/mL", "g/mL", 1000),
    u("lbft3", "Pound/ft³", "lb/ft³", 16.018463374),
    u("lbin3", "Pound/in³", "lb/in³", 27679.904710203),
  ],
};

// Acceleration — base m/s²
const acceleration: Category = {
  id: "acceleration",
  name: "Acceleration",
  description: "m/s², g-force, ft/s².",
  group: "engineering",
  baseUnit: "mps2",
  units: [
    u("mps2", "Meter/sec²", "m/s²", 1),
    u("g", "Standard Gravity", "g", 9.80665),
    u("fps2", "Foot/sec²", "ft/s²", 0.3048),
    u("gal", "Galileo", "Gal", 0.01),
  ],
};

// Torque — base N·m
const torque: Category = {
  id: "torque",
  name: "Torque",
  description: "Newton-meters, foot-pounds.",
  group: "engineering",
  baseUnit: "Nm",
  units: [
    u("Nm", "Newton-meter", "N·m", 1),
    u("kNm", "Kilonewton-meter", "kN·m", 1000),
    u("ftlb", "Foot-pound", "ft·lb", 1.355817948),
    u("inlb", "Inch-pound", "in·lb", 0.112984829),
    u("kgfm", "Kilogram-force meter", "kgf·m", 9.80665),
  ],
};

// Electric current — base ampere
const current: Category = {
  id: "current",
  name: "Electric Current",
  description: "Amperes, milliamperes.",
  group: "electricity",
  baseUnit: "A",
  units: [
    u("A", "Ampere", "A", 1),
    u("mA", "Milliampere", "mA", 1e-3),
    u("uA", "Microampere", "µA", 1e-6),
    u("kA", "Kiloampere", "kA", 1e3),
  ],
};

// Voltage
const voltage: Category = {
  id: "voltage",
  name: "Electric Potential",
  description: "Volts, millivolts, kilovolts.",
  group: "electricity",
  baseUnit: "V",
  units: [
    u("V", "Volt", "V", 1),
    u("mV", "Millivolt", "mV", 1e-3),
    u("kV", "Kilovolt", "kV", 1e3),
    u("MV", "Megavolt", "MV", 1e6),
  ],
};

// Resistance
const resistance: Category = {
  id: "resistance",
  name: "Electric Resistance",
  description: "Ohms, kiloohms, megaohms.",
  group: "electricity",
  baseUnit: "ohm",
  units: [
    u("ohm", "Ohm", "Ω", 1),
    u("kohm", "Kiloohm", "kΩ", 1e3),
    u("Mohm", "Megaohm", "MΩ", 1e6),
    u("mohm", "Milliohm", "mΩ", 1e-3),
  ],
};

// Flow rate — base m³/s
const flow: Category = {
  id: "flow",
  name: "Flow Rate",
  description: "Cubic meters/sec, liters/min, gallons/min.",
  group: "fluids",
  baseUnit: "m3s",
  units: [
    u("m3s", "Cubic m/sec", "m³/s", 1),
    u("Ls", "Liter/sec", "L/s", 1e-3),
    u("Lmin", "Liter/min", "L/min", 1.6667e-5),
    u("gpm_us", "Gallon/min (US)", "gpm", 6.30902e-5),
    u("cfm", "Cubic ft/min", "cfm", 4.71947e-4),
  ],
};

export const CATEGORIES: Category[] = [
  length, weight, temperature, volume, area, pressure, energy, power, force,
  time, speed, angle, fuel, data, frequency, density, acceleration, torque,
  current, voltage, resistance, flow,
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);

export function convert(category: Category, value: number, fromId: string, toId: string): number {
  const from = category.units.find((x) => x.id === fromId);
  const to = category.units.find((x) => x.id === toId);
  if (!from || !to) return NaN;
  return to.fromBase(from.toBase(value));
}

export function formatResult(v: number): string {
  if (!isFinite(v) || isNaN(v)) return "—";
  const abs = Math.abs(v);
  if (abs === 0) return "0";
  if (abs < 1e-4 || abs >= 1e15) return v.toExponential(6);
  // adaptive significant digits
  const digits = abs >= 1 ? Math.min(8, 10 - Math.floor(Math.log10(abs))) : 8;
  return Number(v.toPrecision(digits)).toString();
}
