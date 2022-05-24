const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
//* find/change regex to something that can sort real names (so no numbers or symbols)


module.exports = regexUserName;

