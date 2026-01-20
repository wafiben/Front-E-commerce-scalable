import { validatePassword } from "../../../validators/passwordValidator";

describe("validatePassword", () => {
  it("should pass for a valid password", () => {
    const result = validatePassword("Abcdef1!");
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should fail if password is too short", () => {
    const result = validatePassword("Ab1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Password must be at least 8 characters long.",
    );
  });

  it("should fail if missing uppercase letter", () => {
    const result = validatePassword("abcdef1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Password must contain at least one uppercase letter.",
    );
  });

  it("should fail if missing lowercase letter", () => {
    const result = validatePassword("ABCDEF1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Password must contain at least one lowercase letter.",
    );
  });

  it("should fail if missing number", () => {
    const result = validatePassword("Abcdefg!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Password must contain at least one number.",
    );
  });

  it("should fail if missing special character", () => {
    const result = validatePassword("Abcdef12");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Password must contain at least one special character (!@#$%^&*).",
    );
  });

  it("should report multiple errors at once", () => {
    const result = validatePassword("abc");
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "Password must be at least 8 characters long.",
        "Password must contain at least one uppercase letter.",
        "Password must contain at least one number.",
        "Password must contain at least one special character (!@#$%^&*).",
      ]),
    );
  });
});
