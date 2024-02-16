const { price } = require('./rentalPrice');

describe('price function', () => {

    test("Individuals holding a driver's license for less than a year are ineligible to rent", ()=> {
        const result = price('2024-02-09', '2024-02-11', 'Compact', 30, '2023-03-10');
        expect(result).toBe("Individuals holding a driver's license for less than a year are ineligible to rent");
    })

    test('should apply a 30% surcharge for drivers with a license held for less than two years', () => {
        const result = price('2024-02-09', '2024-02-11', 'Compact', 30, '2023-02-09');
        expect(result).toBe("$78");
    });

    test("If the driver's license has been held for less than three years, then an additional 15 euros will be added to the daily rental price during high season", () => {
        const result = price('2024-02-09', '2024-02-10', 'Compact', 30, '2021-05-09');
        expect(result).toBe("$30");
    });

});
