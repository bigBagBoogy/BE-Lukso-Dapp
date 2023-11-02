import Web3 from "web3";
const web3 = new Web3("https://rpc.testnet.lukso.network/");
import dotenv from "dotenv/config";
const accountAddress = process.env.MY_PUBLIC_KEY;
// console.log("Account address: ", accountAddress);

async function getBalance() {
  try {
    const balance = await web3.eth.getBalance(accountAddress);
    console.log(
      "My balance: " + web3.utils.fromWei(balance, "ether") + " LYXt"
    );
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

getBalance();
