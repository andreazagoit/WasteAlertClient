export const getErrorMessage = (errorCode) => {
  console.log(errorCode);
  switch (errorCode) {
    case "ER_NO_SUCH_TABLE":
      return "Nessuna tabella presente nel Database. L'hai creata dalla sezione amministratore?";

    default:
      return errorCode;
  }
};
