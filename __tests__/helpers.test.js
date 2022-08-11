const {format_date, format_plural} = require('../utils/helpers');

//test to ensure that format_date() takes Date() objects and returns dates in the MM/DD/YYYY format
test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');
  
    expect(format_date(date)).toBe('3/20/2020');
});

//test for plural words. Comments will appear in its plural form only when there is multiple comments. 
test('format_plural() returns a pluralized word', () => {
    const word1 = format_plural('tiger', 1);
    const word2 = format_plural('lion', 2);
  
    expect(word1).toBe('tiger');
    expect(word2).toBe('lions');
});