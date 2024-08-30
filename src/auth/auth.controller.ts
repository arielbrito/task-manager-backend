import { Controller,  Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
/**
 * AuthController class handles authentication-related operations.
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.validateUser(createAuthDto.email, createAuthDto.password);
    return this.authService.login(user);
  }

 
}
