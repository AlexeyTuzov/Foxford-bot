const isTemporaryToBoolean = (msg: string): boolean => {
	const isTemporaryPhrases = [
		'временн',
		'период',
		'время',
		'месяц',
		'недел',
		'определен',
		'определён'
	];

	const lowercasedMsg = msg.toLowerCase();

	return !!isTemporaryPhrases.find((phrase) => {
		return lowercasedMsg.match(RegExp(phrase));
	});
};

export default isTemporaryToBoolean;
