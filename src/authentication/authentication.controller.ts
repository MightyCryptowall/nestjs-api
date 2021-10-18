import RequestWithUser from './requestWithUser.interface';
import { AuthenticationService } from './authentication.service';
import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/RegisterDto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ){}

    @Post("register")
    async register(@Body() registerDto: RegisterDto){
        return this.authenticationService.register(registerDto);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post("login-in")
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) { 
        const user = request.user;
        const cookie = this.authenticationService.getCookieWithJwtToken(+user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
      response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
      return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
      const user = request.user;
      user.password = undefined;
      return user;
    }
}
