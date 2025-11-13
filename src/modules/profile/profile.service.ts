import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from '../user/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUserId(userId: string): Promise<Profile> {
    // Загружаем полный объект профиля
    const profile = await this.profileRepository.findOne({
      where: { UserID: userId },
      relations: ['user'],
    });

    if (!profile) {
      // Создаем профиль, если его нет
      return this.create(userId);
    }

    // Используем raw query для правильной загрузки массивов PostgreSQL
    const rawProfile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.UserID = :userId', { userId })
      .getRawOne();

    console.log('📥 Profile loaded from database (raw):', {
      userId,
      rawInterests: rawProfile?.profile_interests,
      rawLearningFeatures: rawProfile?.profile_learningFeatures,
      rawAgeRange: rawProfile?.profile_ageRange,
    });

    console.log('📥 Profile loaded from database (entity):', {
      userId,
      ageRange: profile.ageRange,
      interests: profile.interests,
      learningFeatures: profile.learningFeatures,
      interestsType: typeof profile.interests,
      learningFeaturesType: typeof profile.learningFeatures,
      interestsIsArray: Array.isArray(profile.interests),
      learningFeaturesIsArray: Array.isArray(profile.learningFeatures),
    });

    // Используем данные из raw query для массивов, если они есть
    // Это гарантирует правильную обработку массивов PostgreSQL
    if (rawProfile) {
      // Обрабатываем interests из raw query
      if (rawProfile.profile_interests !== null && rawProfile.profile_interests !== undefined) {
        if (Array.isArray(rawProfile.profile_interests)) {
          profile.interests = rawProfile.profile_interests;
        } else if (typeof rawProfile.profile_interests === 'string') {
          // PostgreSQL может вернуть массив как строку "{value1,value2}" или "{}" для пустого массива
          const cleaned = rawProfile.profile_interests.replace(/^{|}$/g, '').trim();
          if (cleaned === '') {
            profile.interests = [];
          } else {
            profile.interests = cleaned.split(',').map(s => s.trim()).filter(s => s.length > 0);
          }
        } else {
          profile.interests = [];
        }
      } else {
        profile.interests = [];
      }

      // Обрабатываем learningFeatures из raw query
      if (rawProfile.profile_learningFeatures !== null && rawProfile.profile_learningFeatures !== undefined) {
        if (Array.isArray(rawProfile.profile_learningFeatures)) {
          profile.learningFeatures = rawProfile.profile_learningFeatures;
        } else if (typeof rawProfile.profile_learningFeatures === 'string') {
          // PostgreSQL может вернуть enum массив как строку "{VALUE1,VALUE2}" или "{}" для пустого массива
          const cleaned = rawProfile.profile_learningFeatures.replace(/^{|}$/g, '').trim();
          if (cleaned === '') {
            profile.learningFeatures = [];
          } else {
            profile.learningFeatures = cleaned.split(',').map(s => s.trim()).filter(s => s.length > 0) as LearningFeature[];
          }
        } else {
          profile.learningFeatures = [];
        }
      } else {
        profile.learningFeatures = [];
      }
    } else {
      // Если raw query не вернул данные, нормализуем массивы из entity
      if (!Array.isArray(profile.interests)) {
        if (typeof profile.interests === 'string') {
          try {
            profile.interests = JSON.parse(profile.interests);
          } catch {
            profile.interests = [];
          }
        } else {
          profile.interests = [];
        }
      }
      if (!Array.isArray(profile.learningFeatures)) {
        if (typeof profile.learningFeatures === 'string') {
          try {
            profile.learningFeatures = JSON.parse(profile.learningFeatures);
          } catch {
            profile.learningFeatures = [];
          }
        } else {
          profile.learningFeatures = [];
        }
      }
    }

    return profile;
  }

  async create(userId: string): Promise<Profile> {
    // Проверяем, существует ли пользователь
    const user = await this.userRepository.findOne({
      where: { UserID: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Проверяем, нет ли уже профиля
    const existingProfile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.UserID = :userId', { userId })
      .getOne();

    if (existingProfile) {
      // Нормализуем массивы для существующего профиля
      if (!Array.isArray(existingProfile.interests)) {
        existingProfile.interests = [];
      }
      if (!Array.isArray(existingProfile.learningFeatures)) {
        existingProfile.learningFeatures = [];
      }
      return existingProfile;
    }

    // Создаем новый профиль
    const profile = this.profileRepository.create({
      UserID: userId,
    });

    const savedProfile = await this.profileRepository.save(profile);
    
    // Загружаем профиль с пользователем
    const loadedProfile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.ProfileID = :profileId', { profileId: savedProfile.ProfileID })
      .getOne();
    
    const resultProfile = loadedProfile || savedProfile;
    
    // Нормализуем массивы: гарантируем, что они всегда являются массивами
    if (!Array.isArray(resultProfile.interests)) {
      resultProfile.interests = [];
    }
    if (!Array.isArray(resultProfile.learningFeatures)) {
      resultProfile.learningFeatures = [];
    }
    
    return resultProfile;
  }

  async findOne(profileId: string): Promise<Profile> {
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.ProfileID = :profileId', { profileId })
      .getOne();

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }

    // Нормализуем массивы: гарантируем, что они всегда являются массивами
    if (!Array.isArray(profile.interests)) {
      profile.interests = [];
    }
    if (!Array.isArray(profile.learningFeatures)) {
      profile.learningFeatures = [];
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    updateDto: UpdateProfileDto,
  ): Promise<Profile> {
    const user = await this.userRepository.findOne({
      where: { UserID: userId },
      select: ['UserID', 'Email', 'password', 'UserName', 'UserSurname', 'Role', 'isActive', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Обновление email
    if (updateDto.Email && updateDto.Email !== user.Email) {
      // Проверяем, не занят ли email другим пользователем
      const existingUser = await this.userRepository.findOne({
        where: { Email: updateDto.Email },
      });

      if (existingUser && existingUser.UserID !== userId) {
        throw new ConflictException('Email уже используется другим пользователем');
      }

      user.Email = updateDto.Email;
    }

    // Обновление пароля
    if (updateDto.newPassword) {
      if (!updateDto.currentPassword) {
        throw new BadRequestException('Текущий пароль обязателен для изменения пароля');
      }

      // Проверяем текущий пароль
      if (!user.password) {
        throw new BadRequestException('Текущий пароль указан неверно');
      }

      const isPasswordValid = await bcrypt.compare(
        updateDto.currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Текущий пароль указан неверно');
      }

      // Хешируем новый пароль
      user.password = await bcrypt.hash(updateDto.newPassword, 10);
    }

    await this.userRepository.save(user);

    // Получаем или создаем профиль
    let profile = await this.profileRepository.findOne({
      where: { UserID: userId },
    });

    if (!profile) {
      // Создаем профиль, если его нет
      profile = await this.create(userId);
    }

    // Обновляем поля профиля напрямую
    if (updateDto.ageRange !== undefined) {
      profile.ageRange = updateDto.ageRange;
    }
    if (updateDto.interests !== undefined) {
      // Нормализуем массив интересов: null/undefined -> пустой массив
      profile.interests = Array.isArray(updateDto.interests) ? updateDto.interests : [];
    }
    if (updateDto.learningFeatures !== undefined) {
      // Нормализуем массив особенностей обучения: null/undefined -> пустой массив
      profile.learningFeatures = Array.isArray(updateDto.learningFeatures) ? updateDto.learningFeatures : [];
    }
    
    console.log('💾 Saving profile to database:', {
      userId,
      profileId: profile.ProfileID,
      ageRange: profile.ageRange,
      interests: profile.interests,
      learningFeatures: profile.learningFeatures,
    });
    
    // Сохраняем профиль - TypeORM должен правильно обработать массивы PostgreSQL
    // Но для надежности используем прямое обновление через save
    await this.profileRepository.save(profile);
    
    // Проверяем, что данные сохранились
    const checkProfile = await this.profileRepository.findOne({
      where: { ProfileID: profile.ProfileID },
    });
    
    console.log('🔍 Profile after save (direct check):', {
      profileId: checkProfile?.ProfileID,
      ageRange: checkProfile?.ageRange,
      interests: checkProfile?.interests,
      learningFeatures: checkProfile?.learningFeatures,
    });

    // Возвращаем обновленный профиль
    const savedProfile = await this.findByUserId(userId);
    
    console.log('✅ Profile loaded from database after save:', {
      userId,
      ageRange: savedProfile.ageRange,
      interests: savedProfile.interests,
      learningFeatures: savedProfile.learningFeatures,
    });
    
    return savedProfile;
  }
}


