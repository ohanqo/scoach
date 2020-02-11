const isEmail = (input: string): boolean => {
    const emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-z]{2,4}$/;
    return emailReg.test(input);
};

export { isEmail };
