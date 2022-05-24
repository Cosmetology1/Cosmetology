const catchErrors = (error) => {
  let errorMsg;

  if (error.response) {
    errorMsg = error.response.data;
    console.log(`Error at error.response ${errorMsg}`);
  } else if (error.request) {
    errorMsg = error.request;
    console.log(`Error at error.request ${errorMsg}`);
  } else {
    errorMsg = error.msg;
    console.log(`Error at catchErrors ${errorMsg}`);
  }
  return errorMsg;
};

export default catchErrors;
