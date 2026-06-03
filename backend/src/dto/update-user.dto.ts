export class UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  status?: 'pending' | 'active' | 'rejected';
}
