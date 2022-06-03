export const dateConstant = {
  generateDate:
    `${new Date().getUTCFullYear()}/${new Date().getMonth()}/${new Date().getUTCDate()}` +
    `/${new Date().getUTCHours()}/${new Date().getMinutes()}/${Date.now()}`,
};
