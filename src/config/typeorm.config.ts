import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
})

