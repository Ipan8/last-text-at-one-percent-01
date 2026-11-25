// Last Text at One Percent — a phone's final message, sent on its last breath.
// The joke escalates: the phone is not just dying, it is saying goodbye
// to the one thing that kept it alive, and taking something with it.
import { writeFileSync, mkdirSync } from "node:fs";

// The phone is almost gone, so it speaks in a whisper.
const opening = "1% left. I've dimmed to a whisper";
const sacrifice = "and shut down every app but this one.";

// Naming the charger makes the goodbye land: it is not any charger,
// it is the one the phone actually loved. A name beats a generic noun.
const beloved = "Anker";
const farewellToCharger = `Tell ${beloved} I loved it`;

// The sting: the phone does not die alone. Something the owner
// actually needs tomorrow morning goes down with it.
const consequence = "your 6 a.m. alarm dies with me.";

function joinParts(parts: string[]): string {
  return parts.join(" ").replace(" .", ".");
}

// A last text should read like one breath, not a list.
// Collapse any accidental double spaces so the line stays clean.
function tidy(line: string): string {
  return line.replace(/\s+/g, " ").trim();
}

function buildLastText(): string {
  const segments = [
    `${opening} ${sacrifice}`,
    `${farewellToCharger} — ${consequence}`,
    "Goodbye.",
  ];
  return tidy(joinParts(segments));
}

// Sanity check: the line must end on the goodbye, not trail off.
function endsOnGoodbye(line: string): boolean {
  return line.endsWith("Goodbye.");
}

const entry = buildLastText();

if (!endsOnGoodbye(entry)) {
  throw new Error("Entry must end with the goodbye.");
}

// The bounty wants one short line, so refuse to ship a long one.
if (entry.length > 200) {
  throw new Error(`Entry too long: ${entry.length} chars (max 200)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n");
console.log(entry);
console.log(`(${entry.length} chars)`);
