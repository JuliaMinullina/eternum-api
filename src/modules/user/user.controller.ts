import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserWithoutPassword } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  async getProfile(@Request() req): Promise<UserWithoutPassword> {
    return this.userService.findOne(req.user.UserID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('consecutive-login-days')
  async getConsecutiveLoginDays(@Request() req): Promise<{ days: number }> {
    console.log(`📊 ===== GET /users/consecutive-login-days called =====`);
    console.log(`📊 User ID: ${req.user?.UserID}`);
    console.log(`📊 User object:`, JSON.stringify(req.user, null, 2));
    
    try {
      // Сначала записываем сегодняшний вход (если еще не записан)
      // Это гарантирует, что сегодняшний вход будет учтен
      console.log(`📊 Step 1: Recording daily login...`);
      await this.userService.recordDailyLogin(req.user.UserID);
      console.log(`📊 Step 1: Daily login recorded`);
      
      // Затем получаем количество дней
      console.log(`📊 Step 2: Getting consecutive login days...`);
      const days = await this.userService.getConsecutiveLoginDays(req.user.UserID);
      console.log(`📊 Step 2: Got ${days} days`);
      
      console.log(`📊 ===== Returning ${days} days for user ${req.user.UserID} =====`);
      return { days };
    } catch (error: any) {
      console.error(`❌ ===== Error in getConsecutiveLoginDays endpoint =====`);
      console.error(`❌ Error type:`, error?.constructor?.name);
      console.error(`❌ Error message:`, error?.message);
      console.error(`❌ Error code:`, error?.code);
      console.error(`❌ Error stack:`, error?.stack);
      // Возвращаем 0 в случае ошибки, чтобы не ломать фронтенд
      return { days: 0 };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserWithoutPassword> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
