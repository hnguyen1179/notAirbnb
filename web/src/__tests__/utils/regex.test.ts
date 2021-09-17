import { emailRegex, symbolRegex } from "../../utils/regex";

// Test emailRegex
test("emailRegex should return correct boolean", () => {
	/**
	 *  Should follow the format of ...
	 *    1. only one @ symbol
	 *    2. at least one character for the mail server
	 *    3. at least two characters for the domain
   *    4. no whitespace at all
   *    5. no quotations 
	 */

	const result1 = emailRegex.test("random@gmail.com");
	const result2 = emailRegex.test("@twoAtSymbols@gmail.com");
  const result3 = emailRegex.test("randomEmail@.com");
  const result4 = emailRegex.test("randomEmail@gmail.c")
  const result5 = emailRegex.test("random Email@gmail.com")
  const result6 = emailRegex.test('random"Email@gmail.com')

	expect(result1).toBe(true);
	expect(result2).toBe(false);
	expect(result3).toBe(false);
	expect(result4).toBe(false);
	expect(result5).toBe(false);
	expect(result6).toBe(false);
});

test("symbolRegex should return correct boolean", () => {
  const result1 = symbolRegex.test("thishouldfail");
  const result2 = symbolRegex.test("thishould@pass");

  expect(result1).toBe(false);
  expect(result2).toBe(true);
})
