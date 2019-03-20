navigator.getBattery().then(function (battery) {
    function currentBatteryInfo() {
        console.log("___Battery charging: " + battery.charging);
        console.log("___Remaining time to fully charge: " + battery.chargingTime);
        console.log("___Remaining time to discharge: " + battery.dischargingTime);
        console.log("___Battery level: " + battery.level * 100 + "%");
    }
    currentBatteryInfo();

    battery.addEventListener('chargingchange', function () {
        console.log("___Battery charging status changed: " + (battery.charging ? "Charging..." : "No Charging"));
    });
});