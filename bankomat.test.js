const Bankomat = require("./bankomat.js");
const Card = require("./card.js");
const Account = require("./account.js");

let bankomat = new Bankomat();
let account = new Account();
let card = new Card(account);

test("Insert card", () => {
  bankomat.insertCard(card);
  expect(bankomat.cardInserted == true)
  expect(bankomat.getMessage() == "Card inserted")
})

test("Enter bad pin", () => {
  expect(bankomat.enterPin("1234")).toBe(false)
  expect(bankomat.getMessage()).toBe("Incorrect pin")
})

test("Enter correct pin", () => {
  expect(bankomat.enterPin("0123")).toBe(true)
  expect(bankomat.getMessage()).toBe("Correct pin")
})

test("Withdraw to much money for machine", () => {
  expect(bankomat.withdraw(15000)).toBe(0)
  expect(bankomat.getMessage()).toBe("Machine has insufficient funds")
})

test("Withdraw to much money for card", () => {
  expect(bankomat.withdraw(8000)).toBe(0)
  expect(bankomat.getMessage()).toBe("Card has insufficient funds")
})

test("Withdraw money", () => {
  expect(bankomat.withdraw(3000)).toBe(3000)
  expect(bankomat.getMessage()).toBe("Withdrawing 3000")
})

test("Eject card", () => {
  bankomat.ejectCard();
  expect(bankomat.cardInserted).toBe(false)
  expect(bankomat.getMessage()).toBe("Card removed, don't forget it!")
})

test("Insert card again", () => {
  bankomat.insertCard(card);
  expect(bankomat.cardInserted).toBe(true)
  expect(bankomat.getMessage()).toBe("Card inserted")
})

test("Wrong pin 3 times", () => {
  bankomat.enterPin("0001");
  bankomat.enterPin("0002");
  expect(bankomat.cardInserted).toBe(true)
  bankomat.enterPin("0003");
  bankomat.enterPin("0004");
  expect(bankomat.getMessage()).toBe("Incorrect pin")
  expect(bankomat.getMessage()).toBe("Incorrect pin")
  expect(bankomat.getMessage()).toBe("Incorrect pin")
  expect(bankomat.cardInserted).toBe(false)
  expect(bankomat.getMessage()).toBe("Card kept. Contact your bank.")
})