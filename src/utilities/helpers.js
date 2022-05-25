//constant definition
const song_key_codes = new Map([
		[-1, "Unkown"],
		[0, "C"],
		[1, "C#"],
		[2, "D"],
		[3, "D#"],
		[4, "E"],
		[5, "F"],
		[6, "F#"],
		[7, "G"],
		[8, "G#"],
		[9, "A"],
		[10, "A#"],
		[11, "B"]
]);

const song_mode_codes = new Map([
		[-1, "Unkown"],
		[0, "Minor"],
		[1, "Major"]
]);

// Example POST method implementation:
async function loadRequest(url, params) {
	if (params) {
		url = url + "?" + new URLSearchParams(params);
	}
  const response = await fetch(url, {
    headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
    }
	});
	
	if (response.ok) {
		return response.json(); // parses JSON response into native JavaScript objects
	} else if (response.status == 429) {
		throw new Error("Too many requests. Code: " + response.status);
	} else {
		throw new Error("Unknown request error. Code: " + response.status);
	}
}

function decimalToInteger(decimal) {
	return Math.round(decimal * 100);
}

function convertSeconds(secs) {
	let hours = Math.floor(secs / 3600);
	let minutes = Math.floor(secs % 3600 / 60);
	let seconds = Math.floor(secs % 3600 % 60);
	
	if (seconds <= 9) {
		seconds = "0" + seconds;
	}
	
	if (hours === 0) {
			return minutes + ":" + seconds;
	} else {
			return hours + ":" + minutes + ":" + seconds;
	}
}

function convertMilliseconds(millis) {
	millis = Math.floor(millis);
	let seconds = Math.floor((millis / 1000) % 60);
	let minutes = Math.floor((millis / (1000 * 60)) % 60);
	let hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

	if (seconds <= 9) {
		seconds = "0" + seconds;
	}
	
	if (hours === 0) {
			return minutes + ":" + seconds;
	} else {
			return hours + ":" + minutes + ":" + seconds;
	}
}

// Takes in a duration in milliseconds and converts it to standard minutes and seconds
function durationCalc(duration) {
	return convertMilliseconds(duration);
}

function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
		];
    return rgb;
}

// Determines the track number of the song, or returns "single" if the track is a single
function albumPositionCalc(albumType, albumLength, trackNumber) {
	if (albumType === null || albumLength === null || trackNumber === null) {
		return null;
	}
	if (albumType === "single") {
		return "Single";
	} else {
		return trackNumber + " of " + albumLength;
	}
}

function explicitCalc(explicit) {
	if (explicit === null) {
		return null;
	}
	if (explicit) {
		return "Explicit"
	} else {
		return "Not Explicit"
	}
}

function popularityCalc(popularity) {
	return popularity;
}

function availableMarketsCalc(markets) {
	if (markets === null) {
		return null;
	}
	return markets.length;
}

function releaseYearCalc(dateString) {
	if (dateString === null) {
		return null;
	}
	return new Date(dateString).toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'})
}

function danceabilityCalc(danceability) {
	if (danceability === null) {
		return null;
	}
	return decimalToInteger(danceability);
}

function energyCalc(energy) {
	if (energy === null) {
		return null;
	}
	return decimalToInteger(energy);
}

function speechinessCalc(speechiness) {
	if (speechiness === null) {
		return null;
	}
	return decimalToInteger(speechiness);
}

function acousticnessCalc(acousticness) {
	if (acousticness === null) {
		return null;
	}
	return decimalToInteger(acousticness);
}

function livenessCalc(liveness) {
	if (liveness === null) {
		return null;
	}
	return decimalToInteger(liveness);
}

function instrumentalnessCalc(instrumentalness) {
	if (instrumentalness === null) {
		return null;
	}
	return decimalToInteger(instrumentalness);
}

function valenceCalc(valence) {
	if (valence === null) {
		return null;
	}
	return decimalToInteger(valence);
}

function loudnessCalc(loudness) {
	if (loudness === null) {
		return null;
	}
	return loudness.toFixed(1);
}

function keyCalc(key) {
	if (key === null) {
		return null;
	}
	return song_key_codes.get(key);
}

function modeCalc(mode) {
	if (mode === null) {
		return null;
	}
	return song_mode_codes.get(mode);
}

function tempoCalc(tempo) {
	if (tempo === null) {
		return null;
	}
	return tempo.toFixed(0);
}

function timeSignatureCalc(timeSignature) {
	if (timeSignature === null) {
		return null;
	}
	return timeSignature + "/4";
}

function endOfFadeInCalc(endOfFadeIn) {
	if (endOfFadeIn === null) {
		return null;
	}
	return convertSeconds(endOfFadeIn);
}

function startOfFadeOutCalc(startOfFadeOut) {
	if (startOfFadeOut === null) {
		return null;
	}
	return convertSeconds(startOfFadeOut);
}

function confidenceCalc(confidence) {
	if (confidence === null) {
		return null;
	}
	return decimalToInteger(confidence) + "%" ;
}

function likedStatusCalc(likedStatus) {
	if (likedStatus === null) {
		return null;
	}
	return (likedStatus ? "\u2665" : "\u2661")
}

function recentlyPlayedCalc(songId, recentlyPlayedList) {
	if (songId === null || recentlyPlayedList === null) {
		return null;
	}
	for (let i in recentlyPlayedList) {
		if (recentlyPlayedList[i].track.id == songId) {
			return i + " Songs Ago";
		}
	}
	return "Not Recently";
}

function topSongsCalc(songId, topSongsShort, topSongsMedium, topSongsLong) {
	if (songId === null || topSongsShort === null || topSongsMedium === null || topSongsLong ===null) {
		return null;
	}
	for (let i in topSongsLong) {
		if (topSongsLong[i].id == songId) {
			return "#" + i + " (years)";
		}
	}
	for (let i in topSongsMedium) {
		if (topSongsMedium[i].id == songId) {
			return "#" + i + " (6 mo.)";
		}
	}
	for (let i in topSongsShort) {
		if (topSongsShort[i].id == songId) {
			return "#" + i + " (4 wks.)";
		}
	}
	return "Not Top 50";
}

export {
	loadRequest,
	durationCalc,
	pickHex,
	albumPositionCalc,
	explicitCalc,
	popularityCalc,
	availableMarketsCalc,
	releaseYearCalc,
	danceabilityCalc,
	energyCalc,
	speechinessCalc,
	acousticnessCalc,
	livenessCalc,
	instrumentalnessCalc,
	valenceCalc,
	loudnessCalc,
	keyCalc,
	modeCalc,
	confidenceCalc,
	tempoCalc,
	timeSignatureCalc,
	endOfFadeInCalc,
	startOfFadeOutCalc,
	likedStatusCalc,
	recentlyPlayedCalc,
	topSongsCalc
}