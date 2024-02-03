import * as passwordGenerator from 'password-generator';

export function generatePassword(length = 10): string {
  return passwordGenerator(length, false);
}
