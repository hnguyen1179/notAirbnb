interface ILatLong {
	lat: number;
	lng: number;
}

const regions: { [region: string]: ILatLong } = {
	Anywhere: {
		lat: 38.845748,
		lng: -119.839884,
	},
	"Big Bear, CA": {
		lat: 34.2439,
		lng: -116.9114,
	},
	"Henderson, NV": {
		lat: 36.0395,
		lng: -114.9817,
	},
	"Las Vegas, NV": {
		lat: 36.1699,
		lng: -115.1398,
	},
	"Los Angeles, CA": {
		lat: 34.0522,
		lng: -118.2437,
	},
	"Palm Springs, CA": {
		lat: 33.8303,
		lng: -116.5453,
	},
	"Paradise, NV": {
		lat: 39.7596,
		lng: -121.6219,
	},
	"San Diego, CA": {
		lat: 32.7157,
		lng: -117.1611,
	},
	"Santa Barbara, CA": {
		lat: 34.4208,
		lng: -119.6982,
	},
};

const coordinates: { [address: string]: ILatLong } = {
	"2125 Westinghouse St, San Diego, CA 92111": {
		lat: 32.782766,
		lng: -117.168661,
	},
	"1333 Thomas Ave, San Diego, CA 92109": {
		lat: 32.7954932,
		lng: -117.2447158,
	},
	"961 J Ave, Coronado, CA 92118": { lat: 32.6894873, lng: -117.1872007 },
	"4162 Chamoune Ave, San Diego, CA 92105": {
		lat: 32.7525821,
		lng: -117.0967609,
	},
	"1632 Union St, San Diego, CA 92101": {
		lat: 32.7224128,
		lng: -117.1658581,
	},
	"4794 Kansas St, San Diego, CA 92116": {
		lat: 32.7645661,
		lng: -117.1317841,
	},
	"4884 Muir Ave, San Diego, CA 92107": {
		lat: 32.750346,
		lng: -117.244983,
	},
	"4843 Cape May Ave, San Diego, CA 92107": {
		lat: 32.7475821,
		lng: -117.2462956,
	},
	"4052 47th St, San Diego, CA 92105": {
		lat: 32.7505443,
		lng: -117.0935892,
	},
	"5085 Narragansett Ave, San Diego, CA 92107": {
		lat: 32.7460238,
		lng: -117.2540936,
	},
	"418 S 39th St, San Diego, CA 92113": {
		lat: 32.701912,
		lng: -117.1107798,
	},
	"1434 Law St, San Diego, CA 92109": {
		lat: 32.8049836,
		lng: -117.2454507,
	},
	"39893 Forest Rd, Big Bear Lake, CA 92315": {
		lat: 34.2457751,
		lng: -116.9318183,
	},
	"251 N Eureka Dr, Big Bear Lake, CA 92315": {
		lat: 34.2539414,
		lng: -116.9026974,
	},
	"355 Tannenbaum Dr, Big Bear, CA 92314": {
		lat: 34.2457418,
		lng: -116.8700295,
	},
	"315 Dove Ct, Big Bear Lake, CA 92315": {
		lat: 34.2465773,
		lng: -116.8919314,
	},
	"42570 Avalon Rd, Big Bear Lake, CA 92315": {
		lat: 34.2447672,
		lng: -116.8734806,
	},
	"820 Ravine Rd, Big Bear Lake, CA 92315": {
		lat: 34.2371853,
		lng: -116.8602928,
	},
	"40638 Simonds Dr, Big Bear Lake, CA 92315": {
		lat: 34.2445419,
		lng: -116.9153952,
	},
	"429 Feldstrasse Dr, Big Bear Lake, CA 92315": {
		lat: 34.2444445,
		lng: -116.8708348,
	},
	"4318 Kay Pl, Las Vegas, NV 89107": {
		lat: 36.1655384,
		lng: -115.1992676,
	},
	"2000 E Bonanza Rd, Las Vegas, NV 89101": {
		lat: 36.1736683,
		lng: -115.1217263,
	},
	"21 E Harris Ave, Las Vegas, NV 89101": {
		lat: 36.1771605,
		lng: -115.1106309,
	},
	"2154 N Carroll St, North Las Vegas, NV 89030": {
		lat: 36.1992074,
		lng: -115.1154258,
	},
	"8909 Desert Mound Dr, Las Vegas, NV 89134": {
		lat: 36.2086338,
		lng: -115.2883424,
	},
	"2505 Silverton Dr, Las Vegas, NV 89134": {
		lat: 36.2064899,
		lng: -115.2813739,
	},
	"9025 Greensboro Ln, Las Vegas, NV 89134": {
		lat: 36.1853186,
		lng: -115.2941764,
	},
	"123 Copper St, Henderson, NV 89015": {
		lat: 36.0341908,
		lng: -114.9876761,
	},
	"3808 Fairway Cir, Las Vegas, NV 89108": {
		lat: 36.1845942,
		lng: -115.1937792,
	},
	"4401 Thompson Cir, Las Vegas, NV 89107": {
		lat: 36.1800088,
		lng: -115.1999623,
	},
	"259 Fife St, Henderson, NV 89015": {
		lat: 36.0505174,
		lng: -114.952753,
	},
	"732 Kiel St, Henderson, NV 89015": {
		lat: 36.0699172,
		lng: -114.9479325,
	},
	"496 Waterwheel Falls Dr, Henderson, NV 89015": {
		lat: 36.0280194,
		lng: -115.00436,
	},
	"368 Toyabe St, Henderson, NV 89015": {
		lat: 36.0233567,
		lng: -114.997617,
	},
	"727 Greycliff Terrace, Henderson, NV 89002": {
		lat: 36.0073505,
		lng: -114.9893445,
	},
	"391 E Country Club Dr, Henderson, NV 89015": {
		lat: 36.0196319,
		lng: -114.9769238,
	},
	"304 Argonne Cir, Santa Barbara, CA 93105": {
		lat: 34.4442092,
		lng: -119.7298601,
	},
	"201 Calle Palo Colorado, Santa Barbara, CA 93105": {
		lat: 34.4426451,
		lng: -119.7313154,
	},
	"3023 Serena Rd, Santa Barbara, CA 93105": {
		lat: 34.4383775,
		lng: -119.730139,
	},
	"221 W Anapamu St, Santa Barbara, CA 93101": {
		lat: 34.4204419,
		lng: -119.7071518,
	},
	"117 W Mason St, Santa Barbara, CA 93101": {
		lat: 34.4112589,
		lng: -119.6917645,
	},
	"1723 Villa Ave, Santa Barbara, CA 93101": {
		lat: 34.4195048,
		lng: -119.7213609,
	},
	"2014 Garden St, Santa Barbara, CA 93105": {
		lat: 34.4346563,
		lng: -119.7116337,
	},
	"1603 Oramas Rd, Santa Barbara, CA 93103": {
		lat: 34.4360427,
		lng: -119.7012233,
	},
	"885 Jimeno Rd, Santa Barbara, CA 93103": {
		lat: 34.4354123,
		lng: -119.6980149,
	},
	"1061 Garcia Rd, Santa Barbara, CA 93103": {
		lat: 34.435158,
		lng: -119.6916287,
	},
	"1950 Las Tunas Rd, Santa Barbara, CA 93103": {
		lat: 34.4435253,
		lng: -119.7008613,
	},
	"2716 Clinton Terrace, Santa Barbara, CA 93105": {
		lat: 34.4328698,
		lng: -119.7315417,
	},
	"805 Levy, Las Vegas, NV 89106": { lat: 36.1793375, lng: -115.1557084 },
	"213 Woodley St, Las Vegas, NV 89106": {
		lat: 36.17071380000001,
		lng: -115.1701339,
	},
	"921 Sage Tree Ct, Las Vegas, NV 89101": {
		lat: 36.1641738,
		lng: -115.1375233,
	},
	"714 S 3rd St, Las Vegas, NV 89101": {
		lat: 36.1627574,
		lng: -115.1481274,
	},
	"1902 S Caliente Dr, Palm Springs, CA 92264": {
		lat: 33.7978394,
		lng: -116.53283,
	},
	"2286 Pso Del Rey, Palm Springs, CA 92264": {
		lat: 33.790624,
		lng: -116.531902,
	},
	"1951 S Araby Dr, Palm Springs, CA 92264": {
		lat: 33.7969336,
		lng: -116.5153173,
	},
	"690 S Grenfall Rd, Palm Springs, CA 92264": {
		lat: 33.8125044,
		lng: -116.535065,
	},
	"124 Logenita St, Palm Springs, CA 92264": {
		lat: 33.8127238,
		lng: -116.5309981,
	},
	"2910 N Bahada Rd, Palm Springs, CA 92262": {
		lat: 33.8561001,
		lng: -116.5260044,
	},
	"923 9th St, Santa Monica, CA 90403": {
		lat: 34.0266423,
		lng: -118.4976558,
	},
	"635 Maryland St, El Segundo, CA 90245": {
		lat: 33.9246373,
		lng: -118.4070226,
	},
	"23011 Strathern St, Canoga Park, CA 91304": {
		lat: 34.215226,
		lng: -118.6281427,
	},
	"1157 Calle Vista Dr, Beverly Hills, CA 90210": {
		lat: 34.0933728,
		lng: -118.4061107,
	},
	"617 Manchester Terrace, Inglewood, CA 90301": {
		lat: 33.9618449,
		lng: -118.346172,
	},
	"8119 Willow Glen Rd, Los Angeles, CA 90046": {
		lat: 34.117087,
		lng: -118.3727426,
	},
	"3960 Midway Ave, Culver City, CA 90232": {
		lat: 34.0135651,
		lng: -118.4060641,
	},
	"411 Court D, Venice, CA 90291": { lat: 33.9850308, lng: -118.4664704 },
	"20503 Big Rock Dr, Malibu, CA 90265": {
		lat: 34.0412756,
		lng: -118.6189353,
	},
	"3405 Sherbourne Dr, Culver City, CA 90232": {
		lat: 34.0286116,
		lng: -118.3815941,
	},
	"6132 Indiana Ct, Venice, CA 90291": {
		lat: 33.9959413,
		lng: -118.468698,
	},
	"4820 McConnell Ave, Los Angeles, CA 90066": {
		lat: 33.9850364,
		lng: -118.4246619,
	},
	"215 Union Pl, Los Angeles, CA 90026": {
		lat: 34.0624148,
		lng: -118.2655101,
	},
	"320 Brooks Ave, Venice, CA 90291": {
		lat: 33.9932447,
		lng: -118.4724975,
	},
	"4151 W 132nd St, Hawthorne, CA 90250": {
		lat: 33.9132836,
		lng: -118.3478613,
	},
};

export { coordinates, regions };
