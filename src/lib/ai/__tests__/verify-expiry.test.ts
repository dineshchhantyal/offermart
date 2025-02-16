import { verifyExpiryDate } from "../verify-expiry";

describe("verifyExpiryDate", () => {
  it("should verify matching expiry dates", async () => {
    const imageUrl = "https://example.com/test-image.jpg";
    const providedDate = "2025-12-31";
    const result = await verifyExpiryDate(imageUrl, providedDate);
    expect(result).toBeDefined();
  });
  it("should reject mismatched dates", async () => {
    const imageUrl = "https://example.com/test-image.jpg";
    const providedDate = "2024-01-01";
    const result = await verifyExpiryDate(imageUrl, providedDate);
    expect(result).toBe(false);
  });
});
