
function price(pickupDate, dropoffDate, carClass, age, licenserelease) {
    // Get car rent days count
    const rentalDaysCount = getDaysCount(pickupDate, dropoffDate);

    // Get drivers license days count
    const todaysDate = new Date().getTime();
    const driversLicenseCount = getDaysCount(licenserelease, todaysDate);

    // Get "Low" or "High" season type
    const seasonType = getSeasonType(pickupDate, dropoffDate);

    const MIN_DRIVER_AGE = 18;
    const MAX_COMPACT_DRIVER_AGE = 21;
    const RACER_DISCOUNT_AGE = 25;

    const HIGH_SEASON_INCREASE = 1.15;
    const LOW_SEASON_DECREASE = 0.9;

    // Individuals holding a driver's license for less than a year are ineligible to rent.
    if (driversLicenseCount < 365) {
        return "Individuals holding a driver's license for less than a year are ineligible to rent";
    }

    if (age < MIN_DRIVER_AGE) {
        return "Driver too young - cannot quote the price";
    }

    if (age <= MAX_COMPACT_DRIVER_AGE && carClass !== "Compact") {
        return "Drivers 21 y/o or less can only rent Compact vehicles";
    }

    let rentalprice = age * rentalDaysCount;

    // If the driver's license has been held for less than two years,
    // the rental price is increased by 30%.
    if (driversLicenseCount < 365 * 2) {
        rentalprice *= 1.3;
    }

    // If the driver's license has been held for less than three years,
    // then an additional 15 euros will be added to the daily rental price during high season.
    if (driversLicenseCount < (365 * 3) && seasonType === "High") {
        rentalprice += (rentalDaysCount * 15);
    }

    if (carClass === "Racer" && age <= RACER_DISCOUNT_AGE && seasonType === "High") {
        rentalprice *= 1.5;
    }

    if (seasonType === "High") {
        rentalprice *= HIGH_SEASON_INCREASE;
    }

    if (rentalDaysCount > 10 && seasonType === "Low") {
        rentalprice *= LOW_SEASON_DECREASE;
    }
    return '$' + rentalprice;
}

function getDaysCount(pickupDate, dropoffDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(pickupDate);
    const secondDate = new Date(dropoffDate);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

function getSeasonType(pickupDate, dropoffDate) {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    const April = 4;
    const October = 10;

    const pickupMonth = pickup.getMonth();
    const dropoffMonth = dropoff.getMonth();

    if (
        (pickupMonth >= April && pickupMonth <= October) ||
        (dropoffMonth >= April && dropoffMonth <= October)
    ) {
        return "High";
    } else {
        return "Low";
    }
}

exports.price = price;
