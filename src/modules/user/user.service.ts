import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { UserDailyLogin } from './user-daily-login.entity';
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
    @InjectRepository(UserDailyLogin)
    private dailyLoginRepository: Repository<UserDailyLogin>,
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

  /**
   * Записывает ежедневный вход пользователя
   * Если запись за сегодня уже существует, ничего не делает
   */
  async recordDailyLogin(userId: string): Promise<void> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

      console.log(`📅 Recording daily login for user ${userId}, date: ${today.toISOString()}`);

      // Проверяем, есть ли уже запись за сегодня
      const existingLogin = await this.dailyLoginRepository.findOne({
        where: {
          UserID: userId,
          LoginDate: today,
        },
      });

      // Если записи нет, создаем новую
      if (!existingLogin) {
        const dailyLogin = this.dailyLoginRepository.create({
          UserID: userId,
          LoginDate: today,
        });
        await this.dailyLoginRepository.save(dailyLogin);
        console.log(`✅ Daily login recorded for user ${userId}`);
      } else {
        console.log(`ℹ️ Daily login already exists for user ${userId} today`);
      }
    } catch (error: any) {
      // Проверяем, является ли ошибка ошибкой отсутствия таблицы
      if (error?.message?.includes('does not exist') || error?.code === '42P01') {
        console.error(`❌ Table user_daily_logins does not exist. Please run migrations.`);
        // Не пробрасываем ошибку, чтобы не ломать авторизацию
        return;
      }
      console.error(`❌ Error recording daily login for user ${userId}:`, error);
      // Не пробрасываем ошибку, чтобы не ломать авторизацию
    }
  }

  /**
   * Подсчитывает количество дней подряд, которые пользователь заходил в приложение
   * Дни считаются подряд от последнего дня входа назад
   * Минимальное значение - 1 день (если пользователь заходил сегодня)
   */
  async getConsecutiveLoginDays(userId: string): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      console.log(`📊 Getting consecutive login days for user ${userId}`);

      // Получаем все записи входов пользователя, отсортированные по дате (от новых к старым)
      const logins = await this.dailyLoginRepository.find({
        where: { UserID: userId },
        order: { LoginDate: 'DESC' },
      });

      console.log(`📊 Found ${logins.length} login records for user ${userId}`);

      if (logins.length === 0) {
        console.log(`📊 No login records found, returning 0`);
        return 0;
      }

      // Функция для нормализации даты (приведение к началу дня и сравнение)
      const normalizeDate = (date: Date | string): string => {
        const d = typeof date === 'string' ? new Date(date) : date;
        const normalized = new Date(d);
        normalized.setHours(0, 0, 0, 0);
        return normalized.toISOString().split('T')[0]; // Формат YYYY-MM-DD
      };

      // Создаем Set из нормализованных дат для быстрого поиска
      const loginDates = new Set(logins.map((login) => normalizeDate(login.LoginDate)));
      const todayNormalized = normalizeDate(today);

      // Проверяем, есть ли запись за сегодня
      const hasTodayLogin = loginDates.has(todayNormalized);

      // Определяем начальную дату для подсчета
      // Если есть запись за сегодня - начинаем с сегодня, иначе с вчера
      let checkDate = new Date(today);
      if (!hasTodayLogin) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      let consecutiveDays = 0;

      // Проверяем дни подряд от начальной даты назад
      for (let i = 0; i < 365; i++) {
        // Максимум проверяем год назад
        const dateNormalized = normalizeDate(checkDate);
        const hasLogin = loginDates.has(dateNormalized);

        if (hasLogin) {
          consecutiveDays++;
          // Переходим к предыдущему дню
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          // Если пропущен день, прерываем подсчет
          break;
        }
      }

      // Минимальное значение - 1 день (если пользователь заходил сегодня)
      const result = hasTodayLogin ? Math.max(1, consecutiveDays) : consecutiveDays;
      console.log(`📊 Consecutive login days for user ${userId}: ${result} (hasToday: ${hasTodayLogin}, raw count: ${consecutiveDays})`);
      return result;
    } catch (error: any) {
      // Проверяем, является ли ошибка ошибкой отсутствия таблицы
      if (error?.message?.includes('does not exist') || error?.code === '42P01') {
        console.error(`❌ Table user_daily_logins does not exist. Please run migrations.`);
        return 0;
      }
      console.error(`❌ Error getting consecutive login days for user ${userId}:`, error);
      return 0;
    }
  }
}
