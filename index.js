web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AssetList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"assetInventory","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"totalByAsset","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"addAssetToInventory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"validAsset","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"AssetNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"bytes32"},{"indexed":false,"name":"assetCount","type":"uint8"}],"name":"AssetAdded","type":"event"}]');
AssetTrackerContract = web3.eth.contract(abi);
// In your nodejs AssetTrackerContract, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = AssetTrackerContract.at('0xe9466500af387bf1e453a71cd099127003f072d0');
assets = {"Waivers": "asset-1", "Conditions": "asset-2", "Legal": "asset-3", "Money": "asset-4"}

//deployedContract = AssetTrackerContract.new(['Waivers', 'Conditions', 'Legal', 'Money'], {data: byteCode, from:web3.eth.accounts[0], gas:4700000})
// ['Waivers', 'Conditions', 'Legal', 'Money']
function addAssetToInventory() {
  assetName = $("#asset").val();
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}

function addWaiver() {
  assetName = "Waivers";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}
function addConditions() {
  assetName = "Conditions";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}
function addMoney() {
  assetName = "Money";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}

function addLegal() {
  assetName = "Legal";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}


$(document).ready(function() {
  assetNames = Object.keys(assets);
  for (var i = 0; i < assetNames.length; i++) {
    let name = assetNames[i];
    let val = contractInstance.totalByAsset.call(name);
    //bool val
    let isComplete = "false";
    if (val > 0) {
      isComplete = "true";
    }
    $("#" + assets[name]).html(isComplete);
  }
  var assetEvent = contractInstance.AssetAdded();

  assetEvent.watch(function(error, result){
    if (!error){
        console.log("no error");
        console.log("Event result:",result);
    } else {
        console.log(error);
    }
  })
});