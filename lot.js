document.getElementById("calculate").addEventListener("click", function(event) {
    // Get the input values
    var entryPrice = document.getElementById("entryPrice").value;
    var stopLoss = document.getElementById("stopLoss").value;
    var accountBalance = document.getElementById("accountBalance").value;
    var percentageRisk = document.getElementById("percentageRisk").value;
    var pair = document.getElementById("pair").value;

    // Check if the inputs are empty or contain invalid characters
    if (entryPrice == "" || isNaN(entryPrice) || stopLoss == "" || isNaN(stopLoss) || accountBalance == "" || isNaN(accountBalance) || percentageRisk == "" || isNaN(percentageRisk)) {
        alert("Please enter valid numbers for Entry Price, Stop Loss, Account Balance and Percentage Risk.");
        return;
    }

    if (!accountBalance || !percentageRisk) {
        document.getElementById("lotSize").innerHTML = "Please enter Account Balance and Risk Percentage";
        return;
    }

    // Perform the calculation
    var lotSize = Math.abs((accountBalance * (percentageRisk / 100)) / (stopLoss - entryPrice));

    if (pair === "Step Index") {
        lotSize = lotSize / 10;
    }
    var risk = (accountBalance * (percentageRisk / 100));
    document.getElementById("lotSize").innerHTML = lotSize.toFixed(4);
    document.getElementById("risk").innerHTML = "Risk: $" + risk.toFixed(2);

    // New feature: calculate number of positions
    const smallestUnits = {
        'Volatility 100 index': 0.5,
        'Volatility 75 index': 0.001,
        'Volatility 50(1s) index': 0.005,
        'Volatility 25(1s) index': 0.005,
        'Volatility 250(1s) index': 0.005,
        'Jump 25 index': 0.01,
        'Jump 75 index': 0.01,
        'Boom 1000 index': 0.2,
        'Boom 300 index': 1.0,
        'Crash 300 index': 0.5,
        'Step index': 0.1,
        'Volatility 25 index': 0.5,
        'Volatility 50 index': 4.0,
        'Volatility 100(1s) index': 0.2,
        'Volatility 150(1s) index': 0.01,
        'Volatility 10(1s) index': 0.5,
        'Jump 10 index': 0.01,
        'Jump 50 index': 0.01,
        'Crash 1000 index': 0.2,
        'Crash 500 index': 0.2,
        'Volatility 10 index': 0.5,
        'Volatility 75(1s) index': 0.05,
        'Jump 100 index': 0.01,
        'Boom 500 index': 0.2
    };

    function calculatePositions(pair, totalLots) {
        let smallestUnit = smallestUnits[pair];
        if (!smallestUnit) {
            return "Pair not found!";
        }
        let numPositions = totalLots / smallestUnit;
        return numPositions;
    }

    let numPositions = calculatePositions(pair, lotSize);
    document.getElementById("positions").innerHTML = `To open ${lotSize.toFixed(4)} lots on ${pair}, you need to open ${numPositions} positions of ${smallestUnits[pair]} lots each.`;

    event.preventDefault();
});

document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("entryPrice").value = "";
    document.getElementById("stopLoss").value = "";
    document.getElementById("accountBalance").value = "";
    document.getElementById("percentageRisk").value = "";
    document.getElementById("lotSize").innerHTML = "";
    document.getElementById("risk").innerHTML = "";
    document.getElementById("positions").innerHTML = "";
});
