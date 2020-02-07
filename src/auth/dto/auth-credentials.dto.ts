import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Passwords will contain at least 1 upper case letter
// Passwords will contain at least 1 lower case letter
// Passwords will contain at least 1 number or special character
// There is no length validation (min, max) in this regex!
const passWordRegex = new RegExp(
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
);

class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passWordRegex, { message: 'Password is too weak!' })
  password: string;
}

export { AuthCredentialsDto };
