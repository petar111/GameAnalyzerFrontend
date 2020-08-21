export class User{
  public id: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public dateOfBirth: Date;
  public country: string;
  public password: string;
  public isAccountNonExpired: boolean;
  public isAccountNonLocked: boolean;
  public isCredentialsNonExpired: boolean;
  public isEnabled: boolean;
  public experience: number;
  constructor() {
  }
}
