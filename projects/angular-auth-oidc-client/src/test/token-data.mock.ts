export const testAccessTokenHeader = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJvb3AifQ';
export const testAccessTokenPayload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidGVzdENsYWltMSI6ImRvb3QiLCJ0ZXN0Q2xhaW0yIjoid29vcCIsInRlc3RDbGFpbTMiOnRydWUsInRlc3RDbGFpbTQiOmZhbHNlLCJ0b2tlblR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9';
export const testAccessTokenSignature = 'OZVP5sVYGldj_a2VLx6tYwk6jpbuLnjOJBwwLrqGP1GiAMKPeEaQxDjGEQszGAcGZholby-ZyQNxKYOg0kOb4tCEYZ5fFCp-Fyz3ibQz8kq1wizr-a7u5-2P01Gtkq2TrVnC1sXjxvobo-26xd4SleGGvw7_ZlUpUjLDlw9f7wywGc_KQEEw_n0KQodQXg2UKoZ7PGp_oT2DIQVpgso_Z5c2MIw6hjWOLITUH6yLs1OWIgGRU5TwX12pSDSBlj1h83DsLUe2whXPG88SoZEIIxewQvuHIwNUJaUzycPpLRRCn24ydKEg9HYoX-FAI0tU1dBQ_ywNxGHmYkWc9opZBw';
export const testAccessToken = [testAccessTokenHeader, testAccessTokenPayload, testAccessTokenSignature].join('.');
export const testAccessTokenHeaderData = {
  "alg": "RS256",
  "typ": "JWT",
  "kid": "boop"
};
export const testAccessTokenPayloadData = {
  sub: "1234567890",
  name: "John Doe",
  testClaim1: "doot",
  testClaim2: "woop",
  testClaim3: true,
  testClaim4: false,
  tokenType: "access_token",
  iat: 1516239022
};
export const testIdTokenHeader = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJvb3AifQ';
export const testIdTokenPayload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidGVzdENsYWltMSI6ImRvb3QiLCJ0ZXN0Q2xhaW0yIjoid29vcCIsInRlc3RDbGFpbTMiOnRydWUsInRlc3RDbGFpbTQiOmZhbHNlLCJ0b2tlblR5cGUiOiJpZF90b2tlbiIsImlhdCI6MTUxNjIzOTAyMn0';
export const testIdTokenSignature = 'QCAsaB_wmU3t0jOubH0yR0qlYYr_QldAILbJ12xadW6VeQIRPJrJY4X8lKjqGKzjfFmaxHu8f0dOEHM3Uy2atTfYACKprI5tP7xAzfu9UydqiOBN3R5a6TYR1QZTD1Lqx8wYqU7wweLLjjhvBcXGragkU1sU7eKZXTPwPNTuymED7ryK9-f9zUSrFdo_WDGgaZekLsHSiG1D7bmVMhdb3Mo1y3naWPlrJa7ml_0XP5SpF3ZycZvnQGFKRRgRAvTJkaPVb0XCF9YmeNqaMtVvsix96ogzpy61nTpJKkqjRcdM8uUnDuSSZOJMztc8fNipJwHqQGKN3I4OJI2RAgvaqA';
export const testIdToken = [testIdTokenHeader, testIdTokenPayload, testIdTokenSignature].join('.');
export const testIdTokenHeaderData = {
  "alg": "RS256",
  "typ": "JWT",
  "kid": "boop"
};
export const testIdTokenPayloadData = {
  sub: "1234567890",
  name: "John Doe",
  testClaim1: "doot",
  testClaim2: "woop",
  testClaim3: true,
  testClaim4: false,
  tokenType: "id_token",
  iat: 1516239022
};

export const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
  'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCNLxX8/ziOSW0Q\n' +
  'zFPTeadbT/HhcsQs9ii8mPEMeEMpoufLwNVwHNcltSxybMlS9mKBBQKtbpnOpMAY\n' +
  'KnndOn6GBOKG897LR2YpBlzkMKctJE4lcPKWREONqYAoA/R8v1ZTAlkXLutVwycz\n' +
  'I+sy9w4k7SaVayvC5x6yZHBHJIpySBRapxtwQnS4CjmTsWwBLDBflqx7+PkypI0o\n' +
  'TT4noTdwgVbSSbBJkeTKS+RGXBiIZ3CpwdJdmFVyUjJiXwSYI4AkGju5eEeI3K66\n' +
  '/vWHlFvUFR0C0tyI6Edr0iOn4/RPbjQ2M1MsjbNZoU/qm/2u4X/hBlO6rUNNZv/A\n' +
  'Izz8Et8vAgMBAAECggEAO7JgKsTD5i4X5tVu0GmNISgRj5FWb+h52x0UN4CWbYGL\n' +
  'X3UfCrO3KSONMqjbC7BQgFtdAXZVpLG248D6HFgCbaqdGhD98Jg1Ez20g2wrFARY\n' +
  '4q36dR1SLxEvtjvN4f2Jg7nnb80QBwhoh9A1QCyEl4qLGPzi2RueuDGN5BcITz+Y\n' +
  'I1vNLyiyn67byF9+sESfpzHgus/aABXuVP+ZDRe+xBfdgUFnFtUUeq6JLm61yXNz\n' +
  'lLJtUYH0zW4pXrNhfJOiibYvDPWnUShEvBmOK2rweaBXLdGfKdqo3H1mCkR3+g3I\n' +
  'bjtz+mUzOLwNJ2yPPNAKWwShf8/kjxQCi+SLBgL0YQKBgQDG7KQ2XC5JNyrwenHl\n' +
  'oXBMzefxD/wO1hGDyIF4G+lqoYG5XXL4HCrM2XEKei7z0i2sg54yxr7rx4Yrvxwe\n' +
  'Ru33fP8mKOiuAjma/+Q6tZsvXVsVjBwpuyzB0yLGbvAjuceYKrImFiA18nOrGth0\n' +
  '+rIoqgNzYtLfewKXDPy6yKSsXwKBgQC1sU2P8IDn2TZ2U6ZH6qe9uyXgw/n9G0Ul\n' +
  'OmHDxEycQ2dAxLHWWz27LqPPj9oSR7TuAYTRhbpz4Y1bE4Rg3MnAJLrCdzbKTi+n\n' +
  '6IkFsjYcInd4O6o1Y/v/eYgIPkc0sbf9y1ZKWK63E+lrr/WUm8QJjtbJbabRnkPW\n' +
  'qcEcXO2/MQKBgEVsYQL3uM+kiT/T+9wAM4kac1AWHAmxe/taBpU8aIHmS7e9fVpJ\n' +
  'ukYzvNfDPI+rUnVameNuqULwJ0stL0sBxhsRbJqMvGe+LwyBMc2rg7VMB3XFqC6I\n' +
  'PF6IqSJHpVdShu38OKBCKIurSeL1Q4XP2E2IyBuE6cNE0uqUhb9KNu5RAoGBALWe\n' +
  'I+/r8o7PG5ewChj9QOtw9W31uB//cGDEORGdWQ8ieUXO2A1zawN+nZRPMSbwsrTu\n' +
  'o7tkt3o6TjhqC/te9/SvQlg9HnGfMhffY4hkGZ6J/W4cBgoUhcNb0lSbHEZaF5cD\n' +
  '+J+cghjTOJLCcvM3uP/s3lq+1u/WCe28BiK56ZUhAoGBAKrSy1iscM2jErBqsGtc\n' +
  '6YfMpPoXbEqcY9kRwtUR4OxTwGwClwmLsSc6lRxBiUBf19YYhcFMGw4GU16M9FA2\n' +
  'MIVDY5LPLYnfg0EoVBFdg7NFDRp7RJemKldQjcP5r5n/+X9ikyK71dd7sRWbL1i1\n' +
  'KVw/DAFOCDuA/mFM4v7hiTak\n' +
  '-----END PRIVATE KEY-----';
export const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjS8V/P84jkltEMxT03mn\n' +
  'W0/x4XLELPYovJjxDHhDKaLny8DVcBzXJbUscmzJUvZigQUCrW6ZzqTAGCp53Tp+\n' +
  'hgTihvPey0dmKQZc5DCnLSROJXDylkRDjamAKAP0fL9WUwJZFy7rVcMnMyPrMvcO\n' +
  'JO0mlWsrwucesmRwRySKckgUWqcbcEJ0uAo5k7FsASwwX5ase/j5MqSNKE0+J6E3\n' +
  'cIFW0kmwSZHkykvkRlwYiGdwqcHSXZhVclIyYl8EmCOAJBo7uXhHiNyuuv71h5Rb\n' +
  '1BUdAtLciOhHa9Ijp+P0T240NjNTLI2zWaFP6pv9ruF/4QZTuq1DTWb/wCM8/BLf\n' +
  'LwIDAQAB\n' +
  '-----END PUBLIC KEY-----';
export const publicJwk = {
  kty: "RSA",
  e: "AQAB",
  use: "sig",
  kid: "boop",
  alg: "RS256",
  n: "jS8V_P84jkltEMxT03mnW0_x4XLELPYovJjxDHhDKaLny8DVcBzXJbUscmzJUvZigQUCrW6ZzqTAGCp53Tp-hgTihvPey0dmKQZc5DCnLSROJXDylkRDjamAKAP0fL9WUwJZFy7rVcMnMyPrMvcOJO0mlWsrwucesmRwRySKckgUWqcbcEJ0uAo5k7FsASwwX5ase_j5MqSNKE0-J6E3cIFW0kmwSZHkykvkRlwYiGdwqcHSXZhVclIyYl8EmCOAJBo7uXhHiNyuuv71h5Rb1BUdAtLciOhHa9Ijp-P0T240NjNTLI2zWaFP6pv9ruF_4QZTuq1DTWb_wCM8_BLfLw"
};
export const jwks = {
  keys: [
    publicJwk
  ]
};
