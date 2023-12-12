import { readFileSync, writeFileSync } from "fs";

var UsersData = [];

export function getUsersData() {
  return UsersData;
}

export function printUsers() {
  console.log(UsersData.toString());
}

export function getUser(user) {}

export function readUsersData() {
  let jsonData = readFileSync("backend/data/users.json");
  let Users;
  Users = JSON.parse(jsonData.toString());
  UsersData = Array.isArray(Users) ? Users : [];
}

export function addUser(user) {
  if (user.username === undefined || user.hash === undefined) {
    return false;
  }
  UsersData.push(user);
  writeUserData();
  console.log("User added");
  return true;
}

export function checkUserExists(username) {
  return UsersData.some((user) => user.username === username);
}

export function writeUserData() {
  writeFileSync("backend/data/users.json", JSON.stringify(UsersData));
  readUsersData();
}
