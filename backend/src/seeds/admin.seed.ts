import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

export async function seedAdmin(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  const existing = await userRepo.findOne({
    where: { email: 'admin@gmail.com' },
  });

  if (existing) return;

  const admin = userRepo.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password_hash: await bcrypt.hash('admin123', 10),
    role: 'admin',
    status: 'active',
  });

  await userRepo.save(admin);

  console.log('Admin seeded successfully');
}
