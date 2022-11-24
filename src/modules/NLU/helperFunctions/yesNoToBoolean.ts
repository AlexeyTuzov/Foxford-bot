const yesNoToBoolean = (msg: string): boolean => {
	const yesPhrases = [
		'да',
		'так',
		'конечно',
		'разумеется',
		'именно',
		'воистину',
		'верно',
		'естественно',
		'само собой',
		'ясен'
	];
	const lowercasedMsg = msg.toLowerCase();

	return !!yesPhrases.find((phrase) => {
		return lowercasedMsg.match(RegExp(phrase));
	});
};

export default yesNoToBoolean;
