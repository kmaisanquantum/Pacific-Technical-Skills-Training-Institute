export const INSTITUTE = "Pacific Technical Skills Training Institute";
export const SHORT = "PTSTI";
export const CERT_FEE = "K 85.00";
export const BANK = {
  name: "Bank South Pacific (BSP)",
  acct: "1000-2345-6789",
  branch: "Waigani Branch, Port Moresby",
  bsb: "088-001",
  ref: "PTSTI-CERT-2026"
};
export const LETTERS = ["A", "B", "C", "D"];

export const MODULES = [
  {
    id: 1,
    title: "Engine Fundamentals",
    ico: "⚙️",
    dur: "45 min",
    desc: "The 4-stroke cycle, engine components, lubrication and basic diagnosis.",
    vid: "HsG_u6rMsT4",
    content: `The internal combustion engine is the heart of every vehicle. In PNG's diverse terrain — from highland roads to coastal highways — engine knowledge is essential for every mechanic.

THE 4-STROKE CYCLE
1. Intake — Piston moves down, drawing in air-fuel mixture
2. Compression — Piston moves up, compressing the mixture
3. Power — Spark ignites mixture, pushing piston down
4. Exhaust — Piston moves up, expelling burnt gases

KEY ENGINE COMPONENTS
• Cylinder Block & Head — The engine's main structure
• Pistons & Connecting Rods — Transfer combustion force
• Crankshaft — Converts linear to rotational motion
• Camshaft — Controls valve timing
• Lubrication System — Reduces friction with engine oil

PNG CONDITIONS
Hot, humid climate accelerates oil degradation. Change oil every 5,000 km or per manufacturer schedule. Overheating is the #1 engine killer on PNG roads — always check coolant level.`,
    quiz: [
      { q: "How many strokes complete one full engine cycle?", opts: ["2", "3", "4", "6"], ans: 2 },
      { q: "During the compression stroke, what happens?", opts: ["Piston moves down drawing air in", "Piston moves up compressing the mixture", "The spark plug fires", "Exhaust gases exit the cylinder"], ans: 1 },
      { q: "Which component converts linear piston motion to rotation?", opts: ["Camshaft", "Flywheel", "Crankshaft", "Valve stem"], ans: 2 },
      { q: "What is the lubrication system's main purpose?", opts: ["Cool the engine with water", "Reduce friction between moving parts", "Supply fuel to cylinders", "Remove exhaust gases"], ans: 1 },
      { q: "PNG's hot climate most commonly causes which engine problem?", opts: ["Engine freezing", "Overheating", "Low fuel pressure", "Excessive oil pressure"], ans: 1 }
    ]
  },
  {
    id: 2,
    title: "Fuel Systems",
    ico: "⛽",
    dur: "50 min",
    desc: "Carburettors, fuel injection, fuel pumps and diagnosing fuel problems.",
    vid: "toVfvRhWbj8",
    content: `Fuel systems deliver the correct air-fuel mixture to the engine. PNG vehicles range from older carburettor models to modern fuel-injected systems.

CARBURETTOR SYSTEMS
• Float chamber regulates fuel level
• Venturi creates vacuum to draw fuel
• Jets control fuel flow rate
• Common on older Land Cruisers, PMVs and utilities

FUEL INJECTION SYSTEMS
• ECU (Electronic Control Unit) manages injection timing
• Fuel injectors spray atomised fuel directly
• O2 sensors provide closed-loop feedback
• More efficient and cleaner combustion

FUEL PUMPS
• Mechanical pumps on older engines
• Electric in-tank pumps on modern vehicles

PNG-SPECIFIC ISSUES
• Contaminated fuel — water and sediment from poor storage
• Blocked fuel filters from dusty gravel roads
• Vapour lock in extreme highland/coastal heat`,
    quiz: [
      { q: "What does ECU stand for?", opts: ["Engine Control Unit", "Electronic Control Unit", "Exhaust Control Unit", "Energy Control Unit"], ans: 1 },
      { q: "Where is a modern electric fuel pump located?", opts: ["On the engine block", "In the fuel tank", "On the firewall", "Near the battery"], ans: 1 },
      { q: "What causes vapour lock in fuel lines?", opts: ["Cold temperatures", "Excessive heat vaporising fuel in lines", "A blocked air filter", "Low oil pressure"], ans: 1 },
      { q: "Which part of a carburettor regulates the fuel level?", opts: ["Main jet", "Venturi tube", "Float chamber", "Throttle body"], ans: 2 },
      { q: "A common fuel contamination issue on PNG dirt roads is:", opts: ["Petrol dilution", "Water and sediment in the fuel", "Oil mixing with petrol", "Excess fuel pressure"], ans: 1 }
    ]
  },
  {
    id: 3,
    title: "Electrical Systems",
    ico: "⚡",
    dur: "55 min",
    desc: "Battery, alternator, starter motor, wiring and fault diagnosis.",
    vid: "J9XT4BfyDd0",
    content: `Vehicle electrical systems power everything from engine starting to safety systems. PNG's humidity and rough terrain cause frequent electrical faults.

BATTERY
• Stores electrical energy (12V DC)
• Rated in CCA (Cold Cranking Amps) and Amp Hours (Ah)
• Maintenance: clean terminals, check electrolyte level

ALTERNATOR
• Charges the battery while the engine runs
• Healthy output: 13.8–14.4 volts
• Converts AC to DC via an internal rectifier

STARTER MOTOR
• Cranks the engine to start (draws 100–200 amps)
• Solenoid engages the pinion gear to the flywheel ring gear

WIRING & PROTECTION
• Fuses protect circuits from overload
• Relays switch high-current devices
• Earth/ground connections are critical

PNG TIPS
• Corroded terminals from humidity — clean with bicarbonate soda
• Check wiring for rodent damage (common in rural PNG)
• Test with a multimeter — every PNG mechanic must have one`,
    quiz: [
      { q: "What voltage should a healthy alternator produce?", opts: ["9–10V", "11–12V", "13.8–14.4V", "15–16V"], ans: 2 },
      { q: "What does CCA mean on a battery label?", opts: ["Current Charge Amps", "Cold Cranking Amps", "Circuit Control Amps", "Constant Current Amps"], ans: 1 },
      { q: "What is the purpose of a relay?", opts: ["Store electrical energy", "Protect circuits from overload", "Switch high-current devices", "Convert AC to DC"], ans: 2 },
      { q: "In PNG's humid climate, the most common battery problem is:", opts: ["Frozen electrolyte", "Corroded terminals", "Overcharging", "Very low CCA"], ans: 1 },
      { q: "Which tool is used to test alternator output voltage?", opts: ["Timing light", "Multimeter", "Compression tester", "Vacuum gauge"], ans: 1 }
    ]
  },
  {
    id: 4,
    title: "Brakes & Suspension",
    ico: "🔩",
    dur: "60 min",
    desc: "Disc and drum brakes, suspension types, steering and wheel alignment.",
    vid: "e-OyXUl7Y0g",
    content: `Brakes and suspension are critical safety systems. PNG's roads — potholes, gravel tracks, river crossings — put extreme demands on these components.

DISC BRAKES
• Caliper clamps pads against a rotor
• Excellent heat dissipation for highland mountain roads
• Always check minimum rotor thickness (stamped on rotor)

DRUM BRAKES
• Wheel cylinder pushes shoes against the drum
• Common on rear axles of trucks and utilities
• Self-adjusters maintain correct shoe clearance

BRAKE FLUID
• Hydraulic fluid transmits braking force
• Hygroscopic — absorbs moisture, must be flushed every 2 years
• Use correct grade: DOT 3 or DOT 4

SUSPENSION
• Solid Axle (Live Axle): robust, common on PNG 4WDs
• Independent Suspension: smoother ride on cars
• Leaf springs, coil springs, shock absorbers

STEERING
• Rack & Pinion: precise, common on cars
• Recirculating Ball: robust, used on trucks & 4WDs
• Check power steering fluid and pump belt regularly`,
    quiz: [
      { q: "What fluid transmits force in hydraulic brake systems?", opts: ["Engine oil", "Transmission fluid", "Brake fluid", "Power steering fluid"], ans: 2 },
      { q: "Why replace brake fluid every 2 years?", opts: ["It runs out through use", "It absorbs moisture over time", "It becomes too thick to flow", "It changes colour and fades"], ans: 1 },
      { q: "Which brake type uses a caliper and rotor?", opts: ["Drum brake", "Disc brake", "Band brake", "Wedge brake"], ans: 1 },
      { q: "What suspension type is most common on PNG 4WD vehicles?", opts: ["MacPherson strut", "Double wishbone", "Solid / live axle", "Air suspension"], ans: 2 },
      { q: "What is the function of a shock absorber?", opts: ["Support the vehicle weight", "Steer the vehicle", "Dampen spring oscillations", "Adjust wheel alignment"], ans: 2 }
    ]
  },
  {
    id: 5,
    title: "Transmission & Drivetrain",
    ico: "🏎️",
    dur: "55 min",
    desc: "Manual and automatic gearboxes, differentials, 4WD systems and driveshafts.",
    vid: "wCu9W9xNwtI",
    content: `The drivetrain transfers engine power to the wheels. Understanding these systems is vital in PNG where 4WD vehicles dominate highland and remote area driving.

MANUAL TRANSMISSION
• Clutch disconnects engine from gearbox for gear changes
• Synchromesh allows smooth gear changes
• Clutch components: pressure plate, friction disc, release bearing

AUTOMATIC TRANSMISSION
• Planetary gear sets change ratios automatically
• Torque converter replaces the manual clutch
• Automatic Transmission Fluid (ATF) must be serviced regularly

4WD SYSTEMS — ESSENTIAL FOR PNG
• Part-time 4WD: driver engages 2H / 4H / 4L when needed
• Full-time 4WD: centre differential always engaged
• 4L (Low Range): maximum torque for mud, steep grades, off-road

DIFFERENTIAL
• Allows wheels to rotate at different speeds through corners
• Open diff: standard / LSD: better traction / Locker: extreme off-road

DRIVESHAFTS & CV JOINTS
• CV joints allow steering movement and transmit power
• Inspect rubber boots for grease leaks — prevents joint failure`,
    quiz: [
      { q: "What component replaces the clutch in an automatic gearbox?", opts: ["Flywheel", "Torque converter", "Synchromesh ring", "Planetary gear"], ans: 1 },
      { q: "What does 4L mean on a transfer case selector?", opts: ["4 cylinders, Low compression", "4-wheel drive, Low range", "4th gear, Locked", "4-wheel drive, Limited"], ans: 1 },
      { q: "What is the purpose of a differential?", opts: ["Change gear ratios", "Allow wheels to turn at different speeds", "Engage 4-wheel drive", "Lubricate the gearbox"], ans: 1 },
      { q: "What should you inspect regularly on CV joints?", opts: ["Oil level inside", "Rubber boots for grease leaks", "Belt tension", "Bearing preload"], ans: 1 },
      { q: "For PNG highland tracks, which mode gives maximum torque at low speed?", opts: ["2H (2WD High)", "4H (4WD High)", "4L (4WD Low)", "Neutral"], ans: 2 }
    ]
  }
];

export const FINAL = [
  { q: "What are the four strokes in correct order?", opts: ["Power, Intake, Compression, Exhaust", "Intake, Compression, Power, Exhaust", "Compression, Intake, Power, Exhaust", "Exhaust, Compression, Intake, Power"], ans: 1 },
  { q: "Which component converts piston motion to rotation?", opts: ["Camshaft", "Crankshaft", "Flywheel", "Valve"], ans: 1 },
  { q: "A clogged fuel filter most likely causes:", opts: ["Engine overheating", "Poor fuel delivery and loss of power", "Battery drain", "Brake fade"], ans: 1 },
  { q: "Healthy alternator output voltage is:", opts: ["9–10V", "11–12V", "13.8–14.4V", "15–16V"], ans: 2 },
  { q: "Brake fluid is hygroscopic, meaning:", opts: ["It resists heat well", "It absorbs moisture from air", "It repels water", "It thickens when hot"], ans: 1 },
  { q: "Most common suspension on PNG 4WD utility vehicles:", opts: ["MacPherson strut", "Double wishbone", "Solid axle", "Air suspension"], ans: 2 },
  { q: "In a carburettor, what creates vacuum to draw fuel?", opts: ["Float chamber", "Venturi", "Throttle plate", "Needle valve"], ans: 1 },
  { q: "What does the alternator's rectifier do?", opts: ["Regulates voltage output", "Converts AC to DC", "Measures current flow", "Controls ignition timing"], ans: 1 },
  { q: "Disc brake rotors must stay above minimum thickness to prevent:", opts: ["Squealing noise only", "Heat warping and brake failure", "Pad wear", "Caliper seizure"], ans: 1 },
  { q: "A Limited Slip Differential (LSD) provides:", opts: ["Better fuel economy", "Improved traction when a wheel slips", "Lower overall gear ratios", "Reduced driveshaft vibration"], ans: 1 },
  { q: "Which sensor gives closed-loop feedback to the fuel injection ECU?", opts: ["Coolant temperature sensor", "Oxygen (O2) sensor", "MAP sensor", "Throttle position sensor"], ans: 1 },
  { q: "What engages the flywheel ring gear during engine starting?", opts: ["Armature", "Field coil", "Solenoid pinion gear", "Commutator"], ans: 2 },
  { q: "For PNG conditions, what is critical for wheel bearing maintenance?", opts: ["Replace every 10,000 km", "Repack grease regularly due to water crossings", "Only inspect when noisy", "Use sealed bearings only"], ans: 1 },
  { q: "Synchromesh in a manual gearbox:", opts: ["Locks gears in place", "Matches shaft speeds for smooth gear changes", "Prevents reverse while moving", "Reduces gear noise"], ans: 1 },
  { q: "A cracked CV joint boot will cause:", opts: ["Transmission fluid loss", "Grease loss and eventual CV joint failure", "Engine overheating", "Power steering failure"], ans: 1 },
  { q: "Why use 4L when driving through mud?", opts: ["Better fuel economy", "Maximum torque at low wheel speed", "Reduce brake wear", "Auto-engage diff lock"], ans: 1 },
  { q: "When an engine overheats in PNG's hot climate, first check:", opts: ["Fuel pressure", "Coolant level and radiator condition", "Battery voltage", "Tyre pressure"], ans: 1 },
  { q: "A worn clutch friction disc will cause:", opts: ["Hard gear selection", "Engine revs rise but vehicle doesn't accelerate", "Brake pedal goes to floor", "Steering pulls to one side"], ans: 1 },
  { q: "Correct order for bleeding brakes:", opts: ["Front left always first", "Furthest wheel from master cylinder first", "Rear axle only", "Any order works"], ans: 1 },
  { q: "Before returning a vehicle to the customer, a qualified mechanic must:", opts: ["Ensure the vehicle looks clean", "Verify all repairs are safe and roadworthy", "Keep repair time to minimum", "Charge the maximum possible rate"], ans: 1 }
];

export function fmtCard(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export function fmtExp(v) {
  return v.replace(/\D/g, "").slice(0, 4).replace(/^(.{2})/, "$1/").slice(0, 5);
}

export function today() {
  return new Date().toLocaleDateString("en-PG", { day: "numeric", month: "long", year: "numeric" });
}
