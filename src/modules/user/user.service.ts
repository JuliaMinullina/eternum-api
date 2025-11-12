import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

export interface UserWithoutPassword {
  UserID: string;
  Role: UserRole;
  UserName: string;
  UserSurname: string;
  Email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.usersRepository.find({
      select: [
        'UserID',
        'Role',
        'UserName',
        'UserSurname',
        'Email',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
    return users;
  }

  async findOne(id: string): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findOne({
      where: { UserID: id },
      select: [
        'UserID',
        'Role',
        'UserName',
        'UserSurname',
        'Email',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { Email: email },
      select: [
        'UserID',
        'Role',
        'UserName',
        'UserSurname',
        'Email',
        'password',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const existingUser = await this.findByEmail(createUserDto.Email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const updatedUser = await this.usersRepository.findOne({
      where: { UserID: id },
    });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(updatedUser, updateUserDto);
    const savedUser = await this.usersRepository.save(updatedUser);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { UserID: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
