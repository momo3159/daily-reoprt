import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: "",
});

export const yOffSetState = atom({
  key: "yOffSetState",
  default: 0,
});
