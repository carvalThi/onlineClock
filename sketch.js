// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Clock
// Video: https://youtu.be/E4RyStef-gY

var w = window.innerWidth;
var h = window.innerHeight;
var fontsize = h / 15;
var font;
var refRadius = 2 * Math.floor(Math.min(w / 3, h / 2) * 0.75)

function preload() {
	// Ensure the .ttf or .otf font stored in the assets directory
	// is loaded before setup() and draw() are called
	font = loadFont('digital-7.ttf');
}

function setup() {
	createCanvas(w, h);
	angleMode(DEGREES);
	textFont(font);
}

function draw() {
	background(0);

	let hr = hour();
	let mn = minute();
	let sc = second();
	let dy = day();
	let mt = month();
	let yr = year();

	var timeText = ("0" + hr).slice(-2) + ":" + ("0" + mn).slice(-2) + ":" + ("0" + sc).slice(-2)
	var dateText = ("0" + dy).slice(-2) + "/" + ("0" + mt).slice(-2) + "/" + yr
	var weekDateTexte = "Week " + getWeekNumber()

	noStroke()
	fill(252, 199, 119)
	textSize(fontsize * 2);
	text(timeText, w * 0.02, h * 0.4)
	textSize(fontsize);
	text(dateText, w * 0.02, h * 0.4 + fontsize * 1.3)
	text(weekDateTexte, w * 0.02, h * 0.4 + fontsize * 2.5)
	textSize(h / 30);
	text("Created by T. Carval on the 11/11/2018", w * 0.02, h*0.97)

	translate(3 * w / 5, h / 2);
	rotate(-90);

	noFill();
	strokeWeight(8);

	stroke(237, 64, 60);
	let secondAngle = map(sc, 0, 60, 0, 360);
	arc(0, 0, refRadius - 120, refRadius - 120, 0, secondAngle);

	stroke(89, 47, 147);
	let minuteAngle = map(mn, 0, 60, 0, 360);
	arc(0, 0, refRadius - 100, refRadius - 100, 0, minuteAngle);

	stroke(0, 172, 172);
	let hourAngle = map(hr % 12, 0, 12, 0, 360);
	arc(0, 0, refRadius - 80, refRadius - 80, 0, hourAngle);

	stroke(254, 241, 3);
	let dayAngle = map(dy % getModDay(mt, yr), 0, getModDay(mt, yr), 0, 360);
	arc(0, 0, refRadius - 20, refRadius - 20, 0, dayAngle);

	stroke(250, 250, 250);
	let monthAngle = map(mt % 12, 0, 12, 0, 360);
	arc(0, 0, refRadius, refRadius, 0, monthAngle);

	push();
	rotate(secondAngle);
	stroke(237, 64, 60);;
	line(0, 0, (refRadius - 120) / 2 * 0.85, 0);
	pop();

	push();
	rotate(minuteAngle);
	stroke(89, 47, 147);
	line(0, 0, (refRadius - 120) / 2 * 0.6, 0);
	pop();

	push();
	rotate(hourAngle);
	stroke(0, 172, 172);
	line(0, 0, (refRadius - 120) / 2 * 0.35, 0);
	pop();


	stroke(255);
	point(0, 0);


	//  fill(255);
	//  noStroke();
	//  text(hr + ':' + mn + ':' + sc, 10, 200);
}

function getModDay(mth, yr) {
	var month31 = [1, 3, 5, 7, 8, 10, 12]
	var month30 = [2, 4, 6, 9, 11]
	if (month31.indexOf(mth) >= 0) {
		return 31
	} else if (month30.indexOf(mth) >= 0) {
		return 30
	} else {
		if (getNbDaysYear(yr) == 365) {
			return 28
		} else {
			return 29
		}
	}

}

function getNbDaysYear(yr) {
	if (yr % 4 == 0) {
		if (yr % 100 == 0) {
			if (yr % 400 == 0) {
				return 366
			} else {
				return 365
			}
		} else {
			return 366
		}
	} else {
		return 365
	}
}

function getWeekNumber() {
	var d = new Date();
	var dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};